import { Pinecone } from '@pinecone-database/pinecone';
import dotenv from 'dotenv';
import path from 'path';
import problems from './data/problems.json';
import { getEmbeddingsBatch } from './embeddings';

// Load environment variables from Next.js env files
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const pc = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY || ''
});

async function main() {
  const apiKey = process.env.PINECONE_API_KEY;
  const indexName = process.env.PINECONE_INDEX || 'interviewgpt-problems';

  if (!apiKey) {
    console.error("Error: PINECONE_API_KEY is not defined in the environment.");
    process.exit(1);
  }

  console.log(`Connecting to Pinecone index: "${indexName}"`);
  const index = pc.Index(indexName);

  console.log(`Loaded ${problems.length} problems from local JSON.`);

  const batchSize = 25; // Smaller batch size to prevent Hugging Face payload limits
  for (let i = 0; i < problems.length; i += batchSize) {
    const chunk = problems.slice(i, i + batchSize);
    console.log(`[Batch ${i / batchSize + 1}/${Math.ceil(problems.length / batchSize)}] Processing problems ${i} to ${Math.min(i + batchSize, problems.length)}...`);

    // Create text representations for embeddings
    const texts = chunk.map(p => 
      `Title: ${p.title}\n` +
      `Topics: ${p.topics}\n` +
      `Difficulty: ${p.difficulty}\n` +
      `Approach: ${p.approach}\n` +
      `Companies: ${p.companies ? p.companies.join(', ') : ''}`
    );

    try {
      const embeddings = await getEmbeddingsBatch(texts);
      
      const vectors = chunk.map((p, idx) => ({
        id: String(p.id),
        values: embeddings[idx],
        metadata: {
          id: p.id,
          title: p.title,
          difficulty: p.difficulty,
          topics: p.topics,
          approach: p.approach,
          time: p.time,
          space: p.space,
          companies: p.companies || [],
        }
      }));

      // In the modern Pinecone SDK, the upsert argument is an object with { records: [...] }
      await index.upsert({ records: vectors });
      console.log(`Successfully upserted batch ${i / batchSize + 1}`);
      
      // Small delay to prevent rate limits
      await new Promise(r => setTimeout(r, 1000));
    } catch (err) {
      console.error(`Error in batch ${i / batchSize + 1}:`, err);
      // Wait 5 seconds and retry once
      console.log("Waiting 5 seconds before retrying...");
      await new Promise(r => setTimeout(r, 5000));
      
      try {
        const embeddings = await getEmbeddingsBatch(texts);
        const vectors = chunk.map((p, idx) => ({
          id: String(p.id),
          values: embeddings[idx],
          metadata: {
            id: p.id,
            title: p.title,
            difficulty: p.difficulty,
            topics: p.topics,
            approach: p.approach,
            time: p.time,
            space: p.space,
            companies: p.companies || [],
          }
        }));
        await index.upsert({ records: vectors });
        console.log(`Successfully upserted batch ${i / batchSize + 1} on retry`);
      } catch (retryErr) {
        console.error(`Retry failed for batch ${i / batchSize + 1}:`, retryErr);
        process.exit(1);
      }
    }
  }

  console.log("Database successfully seeded to Pinecone!");
}

main().catch(console.error);
