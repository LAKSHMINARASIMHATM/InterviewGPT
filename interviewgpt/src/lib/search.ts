import { Pinecone } from '@pinecone-database/pinecone';
import { getEmbedding } from './embeddings';

const pc = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY || ''
});

export async function retrieveProblems(query: string, k = 8): Promise<any[]> {
  try {
    const indexName = process.env.PINECONE_INDEX || 'interviewgpt-problems';
    if (!process.env.PINECONE_API_KEY) {
      throw new Error("PINECONE_API_KEY is not defined.");
    }

    // 1. Generate query embedding vector (1024-dimensional)
    const queryVector = await getEmbedding(query);

    // 2. Query Pinecone index
    const index = pc.Index(indexName);
    const queryResponse = await index.query({
      vector: queryVector,
      topK: k,
      includeMetadata: true
    });

    // 3. Map matches to standard problem format
    return (queryResponse.matches || []).map(match => {
      const meta = match.metadata as any;
      return {
        id: Number(match.id),
        title: meta?.title || '',
        difficulty: meta?.difficulty || 'Easy',
        topics: meta?.topics || '',
        approach: meta?.approach || '',
        time: meta?.time || '',
        space: meta?.space || '',
        companies: meta?.companies || [],
        _score: match.score || 0
      };
    });
  } catch (err) {
    console.error("Pinecone query error, falling back to local search:", err);
    // Returning empty array will trigger the route's robust keyword fallback
    return [];
  }
}
