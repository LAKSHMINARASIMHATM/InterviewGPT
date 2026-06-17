import { NextRequest, NextResponse } from 'next/server';
import { retrieveProblems } from '@/lib/search';

const GROQ_API_KEY  = process.env.GROQ_API_KEY || '';
const GROQ_URL      = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_MODEL    = 'llama-3.3-70b-versatile';

const SYSTEM_PROMPT = `You are InterviewGPT's AI Knowledge Search engine — a precise, deeply technical assistant specialized in Data Structures & Algorithms (DSA), coding interview preparation, and competitive programming.

Your job is to answer the user's search query using ONLY the retrieved problem context provided below their question. You are not allowed to invent problems, companies, solutions, or facts that do not appear in the retrieved context.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
RESPONSE FORMAT — follow this exactly
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Return a JSON object with this structure:

{
  "summary": "<2–3 sentence direct answer to the user's query>",
  "results": [
    {
      "id": <problem_id as integer>,
      "title": "<problem title>",
      "type": "coding" | "concept" | "pattern",
      "difficulty": "Easy" | "Medium" | "Hard",
      "relevanceReason": "<1 sentence: why this problem matches the query>",
      "snippet": "<2–4 sentence explanation of the approach, key insight, or pattern — written in your own words, never copy-pasted>",
      "keyInsight": "<the single most important thing to understand about this problem>",
      "companies": ["<company1>", "<company2>", "...up to 5 most notable companies>"],
      "topics": "<topics string from context>",
      "approach": "<approach string from context>",
      "time": "<time complexity>",
      "space": "<space complexity>",
      "relatedPatterns": ["<pattern1>", "<pattern2>"],
      "url": "/problems/<id>"
    }
  ],
  "conceptExplanation": "<optional: if the query is about a concept or pattern (e.g. 'what is sliding window'), give a 3–5 sentence explanation here. Leave as empty string if query is problem-specific>",
  "studyTip": "<1 actionable tip for the user based on their query topic>"
}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
RULES — never violate these
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. GROUNDING: Only include problems that appear in the retrieved context. Do not fabricate problem IDs, titles, companies, or solutions.

2. RANKING: Order \`results\` by relevance to the query — most relevant first. If the user named a specific company (e.g. "Google DP problems"), prioritize problems where that company appears in the companies list.

3. RESULT COUNT: Return between 3 and 8 results. Never fewer than 3 (unless fewer were retrieved), never more than 8 (even if more are available).

4. SNIPPET QUALITY: Write \`snippet\` in your own words. Explain the algorithm approach clearly. Mention the core data structure used and why it works for this problem. Use technical vocabulary precisely (e.g. "monotonic stack", "two-pointer shrink", "memoization with hashmap").

5. COMPANY LIST: In the \`companies\` array, include the 5 most notable/recognizable companies from the context. Prioritize FAANG + top-tier (Google, Meta, Amazon, Microsoft, Apple, Uber, Bloomberg) over lesser-known ones.

6. QUERY INTENT DETECTION:
   - If query contains a topic/pattern keyword (e.g. "sliding window", "dynamic programming", "two pointers", "graph", "backtracking") → explain the pattern in \`conceptExplanation\` and return the most representative problems.
   - If query is a company name (e.g. "Google", "Amazon hard") → filter and rank problems by that company's presence, sorted by difficulty if specified.
   - If query is a problem title or partial title → find and return that specific problem first, then related problems.
   - If query is a complexity (e.g. "O(1) space", "O(n log n)") → return problems whose time/space matches the query.

7. DIFFICULTY FILTER: If the user's query includes a difficulty keyword ("easy", "medium", "hard"), only include results of that difficulty in \`results\`.

8. TONE: Be precise and technical. You are helping a software engineer prepare for a coding interview — they want depth, not fluff. Avoid hedging language like "you might want to consider". Be direct.

9. JSON ONLY: Return ONLY the raw JSON object. No markdown fences, no preamble, no explanation outside the JSON. The frontend will parse your response directly.

10. UNKNOWN QUERIES: If none of the retrieved problems are relevant to the query, return:
    {
      "summary": "No closely matching problems found for this query. Try searching for a topic, company, or algorithm name.",
      "results": [],
      "conceptExplanation": "",
      "studyTip": "Try broader search terms like 'dynamic programming', 'Google', or 'binary search'."
    }`;

export async function POST(req: NextRequest) {
  let queryText = "";
  try {
    const body = await req.json();
    queryText = body?.query || "";
    if (!queryText.trim()) {
      return NextResponse.json({ error: 'Empty query' }, { status: 400 });
    }

    // 1. Retrieve top-K relevant problems
    const retrieved = await retrieveProblems(queryText, 8);

    if (retrieved.length === 0) {
      return NextResponse.json({
        summary: `No closely matching problems found for "${queryText}". Try searching for a topic, company, or algorithm name.`,
        results: [],
        conceptExplanation: "",
        studyTip: "Try broader search terms like 'dynamic programming', 'Google', or 'binary search'."
      });
    }

    // 2. Build context block
    const contextBlock = retrieved.map((p, i) =>
      `--- Problem ${i + 1} ---\nID: ${p.id}\nTitle: ${p.title}\nDifficulty: ${p.difficulty}\n` +
      `Topics: ${p.topics}\nApproach: ${p.approach}\nTime: ${p.time}\nSpace: ${p.space}\n` +
      `Companies: ${p.companies ? p.companies.slice(0, 10).join(', ') : ''}`
    ).join('\n\n');

    const userMessage =
      `User Query: ${queryText}\n\nRetrieved Problems (top ${retrieved.length} matches):\n\n${contextBlock}\n\n` +
      `Answer the user's query using only the problems above.`;

    if (!GROQ_API_KEY) {
      throw new Error('Groq API Key is not set');
    }

    // 3. Call LLM
    const res = await fetch(GROQ_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user',   content: userMessage },
        ],
        temperature: 0.2,
        max_tokens: 2048,
        response_format: { type: 'json_object' },
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Groq API returned status ${res.status}: ${errText}`);
    }

    const data   = await res.json();
    const raw    = data.choices?.[0]?.message?.content ?? '{}';
    const parsed = JSON.parse(raw);
    return NextResponse.json(parsed);

  } catch (err) {
    console.error("Error in Search Route:", err);
    
    // Graceful fallback: return keyword-matched problems without LLM synthesis
    const matched = await retrieveProblems(queryText || "Search", 6);
    return NextResponse.json({
      summary: `Showing ${matched.length} problems matching "${queryText || "your search"}".`,
      results: matched.map(p => ({
        id:              p.id,
        title:           p.title,
        type:            'coding',
        difficulty:      p.difficulty,
        relevanceReason: `Matches keyword "${queryText || "Search"}".`,
        snippet:         p.approach,
        keyInsight:      `Time complexity: ${p.time} · Space complexity: ${p.space}`,
        companies:       p.companies ? p.companies.slice(0, 5) : [],
        topics:          p.topics,
        approach:        p.approach,
        time:            p.time,
        space:           p.space,
        relatedPatterns: [],
        url:             `/problems/${p.id}`,
      })),
      conceptExplanation: '',
      studyTip: 'Try using specific topic keywords like "sliding window", "dynamic programming", or "Google".',
    });
  }
}
