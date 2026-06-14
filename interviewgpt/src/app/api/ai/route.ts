import { NextRequest, NextResponse } from "next/server";

// AI Route - Llama via Groq (cloud, free tier) or Ollama (local)
//
// Option A — Groq (recommended, free): https://console.groq.com
//   Set GROQ_API_KEY in .env.local
//   Model: llama-3.3-70b-versatile (free, fast)
//
// Option B — Ollama (local, no key needed):
//   Run: ollama run llama3
//   Set OLLAMA_URL=http://localhost:11434 in .env.local (optional, this is the default)
//
// Priority: GROQ_API_KEY → Ollama → smart mock fallback

const GROQ_API_KEY = process.env.GROQ_API_KEY || "";
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = "llama-3.3-70b-versatile";

const OLLAMA_URL = process.env.OLLAMA_URL || "http://localhost:11434";
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || "llama3";

export async function POST(req: NextRequest) {
  try {
    const { messages, problemContext } = await req.json();

    const systemPrompt = buildSystemPrompt(problemContext);
    const llmMessages = [
      { role: "system", content: systemPrompt },
      ...(messages || []),
    ];

    // Try Groq first (cloud Llama)
    if (GROQ_API_KEY) {
      const result = await callGroq(llmMessages);
      if (result) return NextResponse.json({ response: result, source: "groq-llama" });
    }

    // Try Ollama next (local Llama)
    const ollamaResult = await callOllama(llmMessages);
    if (ollamaResult) return NextResponse.json({ response: ollamaResult, source: "ollama-llama" });

    // Smart mock fallback (no API key / Ollama not running)
    return NextResponse.json({
      response: generateMockResponse(messages, problemContext),
      source: "mock",
    });
  } catch (error) {
    console.error("AI route error:", error);
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}

// ── Groq (OpenAI-compatible endpoint) ────────────────────────────────────────
async function callGroq(messages: Array<{ role: string; content: string }>) {
  try {
    const res = await fetch(GROQ_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages,
        temperature: 0.7,
        max_tokens: 1024,
        stream: false,
      }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.choices?.[0]?.message?.content ?? null;
  } catch {
    return null;
  }
}

// ── Ollama (local) ────────────────────────────────────────────────────────────
async function callOllama(messages: Array<{ role: string; content: string }>) {
  try {
    const res = await fetch(`${OLLAMA_URL}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        messages,
        stream: false,
        options: { temperature: 0.7, num_predict: 1024 },
      }),
      signal: AbortSignal.timeout(15000), // 15s timeout
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.message?.content ?? null;
  } catch {
    return null; // Ollama not running — fall through to mock
  }
}

// ── System prompt ─────────────────────────────────────────────────────────────
function buildSystemPrompt(ctx?: {
  title: string;
  difficulty: string;
  topics: string;
  approach: string;
  time: string;
  space: string;
}) {
  const base = `You are an elite coding interview coach and algorithm expert with deep FAANG interview experience. You guide students through DSA problems using the Socratic method — asking questions rather than immediately giving answers. Keep responses concise (2–4 paragraphs), use markdown formatting, include code blocks when showing code, and always end with a question to keep the student engaged.`;

  if (!ctx) return base;

  return `${base}

You are currently coaching on this problem:
- Title: ${ctx.title}
- Difficulty: ${ctx.difficulty}
- Topics: ${ctx.topics}
- Optimal Approach: ${ctx.approach}
- Time Complexity: ${ctx.time}
- Space Complexity: ${ctx.space}

Guide without spoiling. Start broad (brute force → optimize), then drill into edge cases.`;
}

// ── Smart mock fallback ───────────────────────────────────────────────────────
function generateMockResponse(
  messages: Array<{ role: string; content: string }> = [],
  ctx?: { title: string; approach: string; topics: string }
): string {
  const last = messages[messages.length - 1]?.content?.toLowerCase() || "";

  if (last.includes("evaluate my drafted answer") || last.includes("evaluate my draft")) {
    return `### 🤖 AI Evaluation Report

**Readiness Assessment:** Intermediate (7/10)

#### 🎯 Key Strengths
* **Structured Approach:** Your draft matches the standard requirements of the round.
* **Component Partitioning:** You successfully broke the core operations into clear phases or classes.

#### 🔍 Critical Gaps & Areas for Improvement
* **System Design / Scalability:** If this is an architectural round, expand on database sharding metrics (e.g. sharding keys) and cache eviction policies.
* **Coding DSA:** If this is a coding round, explicitly detail the O(N) runtime and O(1) space constraints and mention custom test bounds.
* **Behavioral:** Ensure you focus heavily on the *Action* and *Result* phases of the STAR framework, quoting concrete percentages or metrics if possible.

#### 💡 Actionable Recommendation
*Refine your draft by addressing edge cases: e.g., null pointers, network failures, or distributed race conditions. Try writing out a quick class signature or API path definition.*`;
  }

  if (last.includes("generate a unique, realistic faang interview practice question") || last.includes("generate a unique, realistic faang")) {
    // Determine the round from context
    let roundType = "coding";
    if (last.includes("round 1")) roundType = "oa";
    if (last.includes("round 3")) roundType = "advanced";
    if (last.includes("round 4")) roundType = "design";
    if (last.includes("round 5")) roundType = "behavioral";

    let payload = {
      questionTitle: "Merge k Sorted Lists (Optimal Heap)",
      questionDescription: "You are given an array of k linked-lists lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it. Analyze time & space complexity."
    };

    if (roundType === "oa") {
      payload = {
        questionTitle: "Aptitude: Relative Velocity & Stream Filtering",
        questionDescription: "Two trains of lengths 120m and 80m travel in opposite directions at 42 km/h and 30 km/h respectively. How long do they take to cross each other? Also write an algorithm to filter duplicate network requests in O(1) time."
      };
    } else if (roundType === "advanced") {
      payload = {
        questionTitle: "Course Schedule II (Topological Sort)",
        questionDescription: "Find a valid order to complete 'numCourses' given a 2D array of prerequisites. If no order exists, return an empty array."
      };
    } else if (roundType === "design") {
      payload = {
        questionTitle: "Design a Distributed Unique ID Generator (Snowflake)",
        questionDescription: "Design a highly available ID generation service that produces globally unique 64-bit integer IDs with low latency (< 2ms) and high throughput (10,000+ IDs/sec) without using database locks."
      };
    } else if (roundType === "behavioral") {
      payload = {
        questionTitle: "Behavioral: Resolving Critical Production Bugs",
        questionDescription: "Describe a situation where a code change you deployed caused an outage, and how you managed stakeholders and resolved the bug."
      };
    }

    return JSON.stringify(payload);
  }

  if (last.includes("provide the optimal solution blueprint") || last.includes("optimal solution")) {
    let solution = "Initialize a Min-Heap (Priority Queue). Insert the head node of each linked list. Repeatedly extract the minimum node, append it to your result list, and insert the next node of that list if it exists.\n\n*Time Complexity:* O(N log k), where N is total nodes and k is list count.\n*Space Complexity:* O(k) for the priority queue.";
    
    if (last.includes("Aptitude") || last.includes("Relative Velocity")) {
      solution = "Relative speed = 42 + 30 = 72 km/h = 72 * (5/18) = 20 m/s. Total distance = 120 + 80 = 200m. Time taken = 200 / 20 = 10 seconds.\n\nFor stream filtering: Use a sliding Window HashSet containing timestamps. Filter repeats in O(1) average lookup.";
    } else if (last.includes("Course Schedule II") || last.includes("Topological Sort")) {
      solution = "Apply Kahn's algorithm (BFS-based topological sort). Track in-degrees. Initialize a queue with all nodes having 0 in-degree. Pop from queue, add to order, decrement neighbors' in-degree. If neighbor's in-degree drops to 0, push it. If output length matches numCourses, order is valid.\n\n*Time Complexity:* O(V + E)\n*Space Complexity:* O(V + E)";
    } else if (last.includes("Distributed Unique ID") || last.includes("Snowflake")) {
      solution = "Use a structured 64-bit ID structure (Twitter Snowflake):\n- 1 bit sign bit (always 0)\n- 41 bits Epoch Timestamp (milliseconds precision)\n- 10 bits Node/Machine ID (allows up to 1024 unique instances)\n- 12 bits Sequence Counter (local sequence per machine, wraps at 4096)\n\n*Why it works:* Zero synchronization required between generators since each node controls its machine ID, yielding partition tolerance and absolute lock-free speeds.";
    } else if (last.includes("Resolving Critical Production") || last.includes("outage")) {
      solution = "Utilize the STAR framework:\n- **Situation:** Deployed a performance patch that triggered a thread leak, causing the gateway to drop 15% of inbound requests.\n- **Task:** Mitigate immediate system downtime and update client support teams.\n- **Action:** Quickly rolled back the deployment to the last stable container image. Verified mitigation, then analyzed log stack traces to fix the unclosed connection pool resource leak.\n- **Result:** System restored in 3 minutes. Put a lint rule checking resource closures in CI, preventing future leaks.";
    }

    return solution;
  }

  if (last.includes("hint") || last.includes("stuck")) {
    return `Here's a nudge in the right direction 🧭\n\n**Think about this:** What data structure gives you O(1) average-time lookups? If you're iterating with nested loops (O(n²)), consider whether a hash map could let you answer "have I seen the complement of this element?" in a single pass.\n\n**Question:** What would the key and value be in that hash map?`;
  }
  if (last.includes("complex") || last.includes("optim")) {
    return `Great focus on complexity! Here's the breakdown:\n\n| Approach | Time | Space |\n|---|---|---|\n| Brute Force | O(n²) | O(1) |\n| Optimal (${ctx?.approach || "Hash Map"}) | ${ctx ? "Optimal" : "O(n)"} | O(n) |\n\nThe trade-off: extra space buys us dramatically better time — almost always the right call in interviews unless constrained.\n\n**Question:** Can you walk me through your solution step by step?`;
  }
  if (last.includes("code") || last.includes("solution")) {
    return `Here's a clean Python skeleton to get you started:\n\n\`\`\`python\ndef solve(input):\n    # 1. Handle edge cases\n    # 2. Initialize your data structure\n    # 3. Single pass — build and query simultaneously\n    pass\n\`\`\`\n\nTry filling it in! Think about the ${ctx?.approach || "optimal"} approach.\n\n**Question:** What edge cases should we test first?`;
  }

  // Default / greeting
  const title = ctx?.title || "this problem";
  return `👋 I'm your AI Interview Coach (powered by **Llama**), and I'm here to help you ace **${title}**.\n\nHere's our game plan:\n1. **Understand** — restate the problem in your own words\n2. **Brute Force** — simplest working solution first\n3. **Optimize** — improve with better data structures\n4. **Code & Test** — implement and check edge cases\n5. **Analyze** — walk through time/space complexity\n\n**To kick things off:** What's your initial read on this problem? What approach comes to mind first?`;
}
