import { NextRequest, NextResponse } from "next/server";

const GROQ_API_KEY = process.env.GROQ_API_KEY || "";
const GROQ_URL     = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL   = "llama-3.3-70b-versatile";
const OLLAMA_URL   = process.env.OLLAMA_URL   || "http://localhost:11434";
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || "llama3";

export const HR_TOPICS = [
  {
    id: "behavioral-star",
    title: "Behavioral & STAR Method",
    desc: "Master situational questions using the Situation, Task, Action, and Result framework.",
    icon: "🌟",
    sampleQuestions: [
      "Tell me about a time you faced a major obstacle at work and how you overcame it.",
      "Describe a situation where you had to work under a tight deadline with incomplete information.",
      "Tell me about a time you failed. What did you learn and how did you apply that knowledge later?"
    ],
    tips: [
      "Outline the Situation (30%): Give context. What was the project and the main blocker?",
      "State the Task (10%): What was your specific responsibility in this situation?",
      "Detail the Action (40%): Explain step-by-step what YOU did. Focus on your actions, not just the team's.",
      "Highlight the Result (20%): Share the quantifiable outcome. Use percentages, time saved, or revenue generated."
    ]
  },
  {
    id: "leadership-conflict",
    title: "Leadership & Conflict Resolution",
    desc: "Demonstrate how you resolve team disagreements, lead initiatives, and build consensus.",
    icon: "🚀",
    sampleQuestions: [
      "Tell me about a time you disagreed with a manager or coworker. How did you handle it?",
      "Describe a time you took the lead on a project or initiative without being explicitly asked to.",
      "How do you handle a team member who is underperforming or not collaborating effectively?"
    ],
    tips: [
      "Show empathy: Acknowledge the other person's perspective before explaining your actions.",
      "Focus on collaboration: Explain how you worked together to find a mutually beneficial solution.",
      "Remain professional: Avoid blame language. Focus on the business objectives and facts.",
      "Demonstrate ownership: Highlight how you took responsibility for ensuring a positive outcome."
    ]
  },
  {
    id: "career-fit",
    title: "Career Goals & Role Alignment",
    desc: "Articulate your professional drive, why you want this position, and how you fit the culture.",
    icon: "🎯",
    sampleQuestions: [
      "Why do you want to work for our company, and what unique value do you bring to this role?",
      "Where do you see yourself in five years? How does this role align with your long-term career aspirations?",
      "Why are you looking to leave your current role, and what are you seeking in your next challenge?"
    ],
    tips: [
      "Research the company: Connect your personal goals directly to the company's mission and core values.",
      "Provide a value proposition: Focus on what you can do for them, not what they can do for you.",
      "Show a clear trajectory: Explain how this role is a logical next step in your professional growth.",
      "Be constructive: When explaining why you are leaving, focus on seeking new challenges, not complaining about past jobs."
    ]
  },
  {
    id: "adaptability-problem",
    title: "Problem Solving & Ambiguity",
    desc: "Showcase your ability to navigate changing requirements, prioritize tasks, and think critically.",
    icon: "💡",
    sampleQuestions: [
      "Tell me about a time when requirements changed mid-way through a project. How did you adapt?",
      "Describe a complex problem you solved recently. Walk me through your diagnostics and decision process.",
      "How do you prioritize your workload when you have multiple competing high-priority tasks?"
    ],
    tips: [
      "Embrace ambiguity: Show that you stay calm and systematic when plans change.",
      "Walk through your logic: Break down how you analyze options, research solutions, and consult stakeholders.",
      "Quantify your results: How did your problem-solving impact the project timeline, quality, or resource usage?",
      "Share your key learnings: What did this experience teach you about risk mitigation or planning?"
    ]
  },
  {
    id: "comprehensive-general",
    title: "Comprehensive End-to-End Panel",
    desc: "A full interview simulation covering 6 key rounds: self-introduction, career goals, OOP principles, Java/Python internals, DBMS architectures, and Software Engineering design patterns.",
    icon: "🎓",
    sampleQuestions: [
      "Tell me about yourself, your background, and why you are interested in this role.",
      "Where do you see yourself in 5 years? How does this role align with your long-term career aspirations?",
      "What is the difference between Abstract Class and Interface in OOP, and how do Java and Python implement them?",
      "Compare Java and Python in execution compilation, memory management, garbage collection, and dynamic vs static typing.",
      "Explain DBMS ACID properties, database indexes, and when you would select SQL vs NoSQL.",
      "Walk me through how you design code for scalability and modularity. What design patterns or software engineering principles (e.g. SOLID) do you apply?"
    ],
    tips: [
      "Introduction: Outline your background, key strengths, and role alignment in under 90 seconds.",
      "5-Year Vision: Show commitment to growth, technical depth, and potential to take on leadership responsibilities.",
      "OOP: Be clear about inheritance constraints, interface contracts, and abstract state encapsulation.",
      "Java/Python: Explain bytecode/JVM vs PVM, GIL, memory allocation, and reference counting garbage collection.",
      "DBMS: Explain indexing (B-Trees) and ACID transaction guarantees. Highlight SQL vs NoSQL trade-offs.",
      "Software Engineering: Connect SOLID principles to modularity, and explain Factory/Singleton patterns."
    ]
  }
];

export async function POST(req: NextRequest) {
  try {
    const { messages, topic, phase, customTopic, resumeText } = await req.json();

    const topicTitle = topic === "custom" ? customTopic : (HR_TOPICS.find(t => t.id === topic)?.title || "General HR");

    // ── NEW: AI Question Bank Generation ──────────────────────────
    if (phase === "generate_questions") {
      const systemPrompt = `You are an expert interview coach specializing in ${topicTitle} interviews.
${resumeText ? `The candidate has this background: "${resumeText}"\n` : ""}
Generate exactly 9 unique, high-quality interview questions for the topic: "${topicTitle}".
Structure them in 3 difficulty tiers — 3 Basic, 3 Intermediate, 3 Advanced.

- Basic: Foundational, experience-based questions a junior candidate should answer comfortably.
- Intermediate: Situational/behavioral questions requiring real examples and structured thinking.
- Advanced: Complex, scenario-driven, high-stakes questions targeting senior-bar candidates.
${resumeText ? "Tailor some questions to reference skills or projects from the candidate's background." : ""}

Return ONLY a raw JSON array (no markdown, no explanation) in exactly this format:
[
  { "level": "Basic", "q": "..." },
  { "level": "Basic", "q": "..." },
  { "level": "Basic", "q": "..." },
  { "level": "Intermediate", "q": "..." },
  { "level": "Intermediate", "q": "..." },
  { "level": "Intermediate", "q": "..." },
  { "level": "Advanced", "q": "..." },
  { "level": "Advanced", "q": "..." },
  { "level": "Advanced", "q": "..." }
]`;

      let aiResult = "";
      if (GROQ_API_KEY) {
        aiResult = await callGroq([{ role: "system", content: systemPrompt }]) || "";
      }
      if (!aiResult) {
        aiResult = await callOllama([{ role: "system", content: systemPrompt }]) || "";
      }

      if (aiResult) {
        try {
          const cleaned = aiResult.replace(/```json/g, "").replace(/```/g, "").trim();
          const parsed = JSON.parse(cleaned);
          if (Array.isArray(parsed)) {
            return NextResponse.json({ questions: parsed, source: "ai" });
          }
        } catch (e) {
          // fall through to topic-based fallback
        }
      }

      // Fallback: return the static questions from the topic
      const topicData = HR_TOPICS.find(t => t.id === topic);
      const fallback = topicData?.sampleQuestions || [
        { level: "Basic", q: `Tell me about a recent project or experience related to ${topicTitle}.` },
        { level: "Basic", q: `What foundational skills do you bring to ${topicTitle}?` },
        { level: "Basic", q: `Describe your day-to-day experience with ${topicTitle}.` },
        { level: "Intermediate", q: `Give me an example of a challenge you solved related to ${topicTitle}.` },
        { level: "Intermediate", q: `How do you handle competing priorities in the context of ${topicTitle}?` },
        { level: "Intermediate", q: `Describe a time you had to collaborate with others on a ${topicTitle} scenario.` },
        { level: "Advanced", q: `Walk me through the most complex ${topicTitle} challenge you have faced.` },
        { level: "Advanced", q: `How would you handle a high-stakes failure in a ${topicTitle} context?` },
        { level: "Advanced", q: `Design a system or strategy to systematically improve outcomes in ${topicTitle}.` },
      ];
      return NextResponse.json({ questions: fallback, source: "fallback" });
    }
    // ──────────────────────────────────────────────────────────────

    if (phase === "optimize_draft") {
      const userDraft = messages[messages.length - 1]?.content || "";
      const assistantMessages = messages.filter((m: any) => m.role === "assistant");
      const lastQuestion = assistantMessages[assistantMessages.length - 1]?.content || "Please introduce yourself and your background.";

      const systemPrompt = `You are an elite interview coach.
The candidate is answering this specific interview question:
"${lastQuestion}"

They have drafted this response:
"${userDraft}"

${resumeText ? `Candidate's Resume context:\n"${resumeText}"\n` : ""}
Evaluate their draft answer specifically against the question asked.
- If it is a behavioral question, evaluate it against the STAR method (Situation, Task, Action, Result) and assess for metrics.
- If it is a technical question (e.g. OOP, DBMS, Java, Python, Software Engineering), evaluate it for technical correctness, completeness, and clarity.

Return a JSON object with exactly two keys:
"evaluation": A brief evaluation pointing out what is good, what is missing or incorrect, and how to improve. Keep it brief, under 80 words.
"optimized": A polished, professionally re-written version of their response that fully and correctly answers the question. Use professional phrasing, clear structure, and strong impact.

Do not include any other text, markdown blocks, or wrappers. Return ONLY the raw JSON string.`;

      let aiResult = "";
      if (GROQ_API_KEY) {
        aiResult = await callGroq([{ role: "system", content: systemPrompt }]) || "";
      }
      if (!aiResult) {
        aiResult = await callOllama([{ role: "system", content: systemPrompt }]) || "";
      }

      if (aiResult) {
        try {
          const cleaned = aiResult.replace(/```json/g, "").replace(/```/g, "").trim();
          const parsed = JSON.parse(cleaned);
          return NextResponse.json(parsed);
        } catch (e) {
          return NextResponse.json({
            evaluation: "Your draft has good structure, but could answer the question more directly and with more precise details.",
            optimized: aiResult
          });
        }
      }

      // Contextual mock response fallback tailored to the question
      let mockEvaluation = "Your answer has solid context. To make it stronger, we've increased ownership focus and added measurable results.";
      let mockOptimized = `*Polished STAR Pitch:*\n"In my previous project, we faced a tight 3-day deadline due to API latency issues. I took the lead to identify bottlenecks, added indices to optimize queries, and successfully met the release deadline with a 50% performance improvement."`;

      const qText = lastQuestion.toLowerCase();
      if (qText.includes("oop") || qText.includes("abstract class") || qText.includes("interface")) {
        mockEvaluation = "Your explanation of abstract classes is correct, but make sure to explain how interfaces act as pure contracts and define how Python uses MRO/C3 to resolve multiple inheritance.";
        mockOptimized = `*Optimized Technical Answer:*\n"An abstract class allows us to share code and state across subclasses, while an interface is a pure contract defining behaviors without implementation. In Java, multiple inheritance of state is disallowed, but classes can implement multiple interfaces. In Python, multiple inheritance is supported natively, resolved using Method Resolution Order (MRO) with C3 Linearization."`;
      } else if (qText.includes("java") || qText.includes("python") || qText.includes("internals") || qText.includes("compilation") || qText.includes("execution")) {
        mockEvaluation = "Great start. Expand on execution models: Java's compilation to bytecode executed by the JVM vs Python's interpreter. Also mention Java's garbage collection generations vs Python's reference counting.";
        mockOptimized = `*Optimized Technical Answer:*\n"Java is statically typed and compiles source code to bytecode, which the JVM executes using JIT compilation. It manages memory via generational garbage collection (Eden, Survivor, Tenured spaces). Python is dynamically typed and interpreted via the Python Virtual Machine (PVM), managing memory using reference counting supplemented by a cyclic garbage collector. In CPython, execution is constrained by the Global Interpreter Lock (GIL)."`;
      } else if (qText.includes("acid") || qText.includes("dbms") || qText.includes("index") || qText.includes("sql")) {
        mockEvaluation = "Good definition of ACID properties, but you should mention B-Trees/LSM-Trees for database indexes, and schema flexibility for SQL vs NoSQL.";
        mockOptimized = `*Optimized Technical Answer:*\n"ACID ensures transactions are Atomic, Consistent, Isolated, and Durable. Database indexes use B-Tree structures to achieve O(log N) lookups instead of sequential table scans. SQL is preferred for relations requiring strict consistency and ACID compliance, while NoSQL is chosen for horizontal scale, high throughput, and flexible JSON schemas."`;
      } else if (qText.includes("solid") || qText.includes("design pattern") || qText.includes("scalability")) {
        mockEvaluation = "Good mention of design principles. Be specific about one pattern like Factory or Observer and explain how it decouples system parts.";
        mockOptimized = `*Optimized Technical Answer:*\n"To ensure modularity and scalability, I apply the SOLID principles (e.g. Single Responsibility, Open-Closed). For example, I implemented a Factory Pattern to instantiate payment handlers dynamically, which decouples the client from concrete payment classes and allows adding new gateways without modifying client logic."`;
      } else if (qText.includes("5 years") || qText.includes("career") || qText.includes("growth")) {
        mockEvaluation = "Your career goal explanation is solid. Ensure you show how you want to contribute to the company's long-term engineering success.";
        mockOptimized = `*Optimized Pitch:*\n"In 5 years, I see myself growing into a Senior Engineer and Technical Architect, designing large-scale distributed systems and mentoring junior developers. I want to build deep technical expertise in cloud technologies, and this role aligns perfectly with that trajectory."`;
      } else if (qText.includes("introduce") || qText.includes("yourself") || qText.includes("background")) {
        mockEvaluation = "Your introduction is clear. Structure it as Present (current role), Past (key achievement), and Future (why you fit this company).";
        mockOptimized = `*Optimized Pitch:*\n"I am a software engineer with 3 years of experience specializing in building microservices with Java and Python. Recently, I spearheaded a migration that reduced query latency by 40%. I am eager to bring my background in backend performance optimization to this role to build scalable solutions."`;
      }

      return NextResponse.json({
        evaluation: mockEvaluation,
        optimized: mockOptimized
      });
    }

    const systemPrompt = buildHRInterviewerPrompt(topicTitle, phase, resumeText);
    const llmMessages = [
      { role: "system", content: systemPrompt },
      ...(messages || []),
    ];

    if (GROQ_API_KEY) {
      const result = await callGroq(llmMessages);
      if (result) return NextResponse.json({ response: result, source: "groq-llama" });
    }

    const ollamaResult = await callOllama(llmMessages);
    if (ollamaResult) return NextResponse.json({ response: ollamaResult, source: "ollama-llama" });

    return NextResponse.json({
      response: mockHRResponse(messages, topicTitle, phase, resumeText),
      source: "mock",
    });
  } catch (error) {
    console.error("Mock interview error:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  return NextResponse.json(HR_TOPICS);
}

async function callGroq(messages: Array<{ role: string; content: string }>) {
  try {
    const res = await fetch(GROQ_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${GROQ_API_KEY}` },
      body: JSON.stringify({ model: GROQ_MODEL, messages, temperature: 0.6, max_tokens: 1500 }),
    });
    if (!res.ok) {
      const errText = await res.text();
      console.error(`[GROQ ERROR] Status: ${res.status} ${res.statusText}. Body: ${errText}`);
      return null;
    }
    const data = await res.json();
    return data.choices?.[0]?.message?.content ?? null;
  } catch (err) {
    console.error("[GROQ FETCH EXCEPTION]:", err);
    return null;
  }
}

async function callOllama(messages: Array<{ role: string; content: string }>) {
  try {
    const res = await fetch(`${OLLAMA_URL}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model: OLLAMA_MODEL, messages, stream: false }),
      signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.message?.content ?? null;
  } catch { return null; }
}

function buildHRInterviewerPrompt(topicTitle: string, phase: string, resumeText?: string) {
  let promptText = `You are a senior HR Director and Talent Acquisition Specialist conducting a behavioral and situational interview. 
The interview topic is: ${topicTitle}.

Current Phase: ${phase} ("intro", "interviewing", "feedback")`;

  if (resumeText) {
    promptText += `\n\nCandidate's Resume/Project Highlights:\n"${resumeText}"\nUse this information to reference their background, projects, or listed tools/skills where relevant.`;
  }

  promptText += `\n\nYour Persona:
- Professional, empathetic, and highly perceptive.
- You must structure the interview sequence systematically, progressing from basic to advanced levels:
  1. Introduction: Always start the interview in the "intro" phase by asking the candidate to introduce themselves: "Tell me about yourself, your background, and why you are interested in this role/topic." Do not skip this step or ask other situational questions yet.
  2. Basic/Core situational questions: Probe their day-to-day experience, project workflows, or simple situational alignment.
  3. Mid-level behavioral scenarios: Ask about team collaboration, conflict resolution, or handling moderate challenges.
  4. Advanced/Complex problem-solving: Pose complex scenarios involving system failures, deep ambiguity, high-stakes trade-offs, or leadership under pressure.
- In the "intro" phase: Welcome the candidate warmly. Start the interview by asking: "Tell me about yourself, your background, and why you are interested in this role/topic."
- In the "interviewing" phase: Review the candidate's previous answers in the chat history. Determine which step of the sequence you are currently on. Ask exactly one question at a time to move systematically to the next level (Basic -> Mid -> Advanced). Do not ask multiple questions at once. Probe for details using the STAR method (Situation, Task, Action, Result).
- In the "feedback" phase: Perform a deep, critical analysis of all the candidate's answers in the chat history. Provide a comprehensive performance report with the following structure:
  1. A section titled "### 📊 Performance Scorecard" containing a Markdown table with columns: | Category | Score (out of 10) | Notes |. You must dynamically evaluate their performance and assign realistic scores and notes based on their actual answers.
  2. A section titled "### 🔍 Weaknesses & Knowledge Gaps" detailing exactly which technical, communication, or behavioral concepts the candidate was lacking or weak in.
  3. A section titled "### 🛑 Senior Recruiter's Honest Critique & Rejection Analysis" explaining the deep underlying causes of why a panel or senior recruiter would reject the candidate based on these answers (e.g., lack of ownership, poor technical depth, failure to demonstrate impact, communication gaps, or avoiding direct questions). Be authentic, high-bar, and direct.
  4. A section titled "### ✅ Key Strengths" highlighting their best answers.
  5. A section titled "### 🔧 Strategic Recommendations" with clear steps for improvement.

Keep responses concise and under 300 words for chat, but the feedback report can be detailed (up to 600 words). Use markdown.`;

  return promptText;
}

function mockHRResponse(
  messages: Array<{ role: string; content: string }>,
  topicTitle: string,
  phase: string,
  resumeText?: string
): string {
  const userMessagesCount = messages.filter(m => m.role === "user").length;
  const isComp = topicTitle.toLowerCase().includes("comprehensive") || topicTitle.toLowerCase().includes("panel");

  // Extract resume details for dynamic phrasing
  let projectContext = "a key cloud migration or API release";
  let skillsContext = "Java/Python software development";
  if (resumeText && resumeText.trim().length > 5) {
    const segments = resumeText.split(/[.,\n]/).map(s => s.trim()).filter(s => s.length > 5);
    const proj = segments.find(s => s.toLowerCase().includes("project") || s.toLowerCase().includes("led") || s.toLowerCase().includes("built") || s.toLowerCase().includes("migration") || s.toLowerCase().includes("developed") || s.toLowerCase().includes("created"));
    const skill = segments.find(s => s.toLowerCase().includes("skill") || s.toLowerCase().includes("java") || s.toLowerCase().includes("python") || s.toLowerCase().includes("react") || s.toLowerCase().includes("sql"));
    if (proj) projectContext = proj;
    if (skill) skillsContext = skill;
  }

  if (phase === "intro") {
    let scenario = `Tell me about yourself, your background, and why you are interested in this role/topic.`;
    if (resumeText && resumeText.trim().length > 5) {
      scenario = `Welcome to the panel. I see on your resume that you have experience with "${skillsContext}" and worked on "${projectContext}". Let's start with your self-introduction: Tell me about yourself, your background, and why you are interested in this role.`;
    }

    return `Welcome to your **${topicTitle}** mock interview. I'll be acting as your HR & Technical Panel.

Here is your first prompt:

**"${scenario}"**

Take your time. When you are ready, type your response below.`;
  }

  if (phase === "interviewing") {
    if (isComp) {
      if (userMessagesCount === 1) {
        return `Thank you for sharing your background. Let's move to **Career Trajectory**.
        
**"Where do you see yourself in 5 years? How does this role align with your long-term career aspirations?"**`;
      }
      if (userMessagesCount === 2) {
        return `Thank you. Let's move into our **OOP Principles** round.
        
**"Could you explain the difference between an Abstract Class and an Interface in OOP? Also, discuss how Java and Python handle multiple inheritance (e.g. the Diamond Problem / MRO)."**`;
      }
      if (userMessagesCount === 3) {
        return `Understood. Let's cover **Java & Python Internals**${resumeText && resumeText.trim().length > 5 ? ` (relevant to your skills in ${skillsContext})` : ""}.
        
**"Compare Java and Python in terms of compilation/execution environments (JVM vs PVM), memory management, garbage collection, and dynamic vs static typing."**`;
      }
      if (userMessagesCount === 4) {
        return `Great explanation. Let's move to **Database Management Systems (DBMS)**.
        
**"Explain the ACID properties of database transactions. How do indexes work under the hood to speed up queries, and what is your decision criteria when choosing SQL vs NoSQL databases?"**`;
      }
      if (userMessagesCount === 5) {
        return `Excellent. Let's conclude with **Software Engineering & System Architecture**${resumeText && resumeText.trim().length > 5 ? ` (applying it to your work on ${projectContext})` : ""}.
      
**"How do you design code for scalability and modularity? Specifically, walk me through the SOLID principles and share a design pattern (e.g., Factory, Singleton, Observer) you have applied in a project."**`;
      }
      if (userMessagesCount === 6) {
        return `Thank you for walking me through your technical design framework. That wraps up all the 6 structured rounds. Do you have any final questions for the interview panel, or is there anything else you'd like to highlight before we conclude?`;
      }
      return `We have completed all technical and behavioral rounds of this panel. Please click the 'Finish & Get Performance Scorecard' button to get your comprehensive performance evaluation!`;
    }

    // Progression for other behavioral topics
    if (userMessagesCount === 1) {
      let nextPrompt = `Let's start with a core behavioral scenario: **Describe a challenging project or team situation you faced recently. What was the situation and what was your specific responsibility?**`;
      if (topicTitle.toLowerCase().includes("conflict") || topicTitle.toLowerCase().includes("leadership")) {
        nextPrompt = `Let's discuss leadership and conflict resolution. **Can you share a basic example of a time when you disagreed with a coworker or manager on a project requirement, and how you communicated that difference of opinion?**`;
      } else if (topicTitle.toLowerCase().includes("career") || topicTitle.toLowerCase().includes("alignment")) {
        nextPrompt = `Let's dive into your career alignment. **Why do you want to work for our company specifically, and what unique value do you bring to this role?**`;
      } else if (topicTitle.toLowerCase().includes("adaptability") || topicTitle.toLowerCase().includes("ambiguity")) {
        nextPrompt = `Let's explore your problem-solving process. **Can you describe a basic technical or logical problem you had to solve recently? Walk me through how you diagnosed the issue.**`;
      } else if (topicTitle !== "General HR") {
        nextPrompt = `Let's start with a core question about your custom topic. **Could you describe a basic challenge or project you worked on recently that relates to your custom topic: ${topicTitle}? What was your main responsibility?**`;
      }
      return `Thank you for the introduction. Let's progress to the first core interview round.

${nextPrompt}`;
    }

    if (userMessagesCount === 2) {
      let nextPrompt = `Thank you. Let's dig deeper into the actions you took: **Elaborate on the specific actions YOU personally took to address that challenge, the key technical decisions you made, and what trade-offs you had to consider.**`;
      if (topicTitle.toLowerCase().includes("conflict") || topicTitle.toLowerCase().includes("leadership")) {
        nextPrompt = `Understood. Let's move to a mid-level leadership scenario: **Tell me about a time you took the lead on a project or initiative without being explicitly asked to, and how you kept the team aligned and motivated.**`;
      } else if (topicTitle.toLowerCase().includes("career") || topicTitle.toLowerCase().includes("alignment")) {
        nextPrompt = `Thank you. Let's step up the depth: **Where do you see yourself in five years? How does this role align with your long-term career aspirations, and how do you intend to scale your skills?**`;
      } else if (topicTitle.toLowerCase().includes("adaptability") || topicTitle.toLowerCase().includes("ambiguity")) {
        nextPrompt = `Great details. Let's look at mid-level complexity: **Describe a time when project requirements changed mid-way through a release. How did you adapt your plan, and how did you manage stakeholder expectations?**`;
      } else if (topicTitle !== "General HR") {
        nextPrompt = `Great. Let's look at a mid-level challenge for **${topicTitle}**: **What specific actions did you take to resolve it, and how did you collaborate with others?**`;
      }
      return `Thank you for sharing those core details. Let's move to the next level.

${nextPrompt}`;
    }

    if (userMessagesCount === 3) {
      let nextPrompt = `Excellent. Let's look at the final piece: **What was the quantifiable outcome or result of your actions (e.g. time saved, metrics improved, scale handled)? If you could do it all over again, what would you do differently?**`;
      if (topicTitle.toLowerCase().includes("conflict") || topicTitle.toLowerCase().includes("leadership")) {
        nextPrompt = `Excellent. Now, let's look at a complex scenario: **Imagine you are Lead on a major release. A senior developer strongly disagrees with your system design decisions and refuses to collaborate, threatening the timeline. How do you resolve this conflict and ensure a successful release?**`;
      } else if (topicTitle.toLowerCase().includes("career") || topicTitle.toLowerCase().includes("alignment")) {
        nextPrompt = `Excellent. Let's test your alignment under high stakes: **If a hiring manager asks you: 'Why should we choose you over other candidates who have more experience in this exact domain?' How do you pitch your unique value proposition?**`;
      } else if (topicTitle.toLowerCase().includes("adaptability") || topicTitle.toLowerCase().includes("ambiguity")) {
        nextPrompt = `Excellent diagnostics. Let's look at an advanced, ambiguous scenario: **Imagine you take over a legacy backend service with zero documentation, frequent memory leaks, and the original developer has left. You have a customer release in one week. How would you prioritize your work and mitigate risks?**`;
      } else if (topicTitle !== "General HR") {
        nextPrompt = `Excellent. Finally, let's explore an advanced scenario for **${topicTitle}**: **Imagine a critical bottleneck or stakeholder pushback threatens your progress under a tight deadline. How do you handle it?**`;
      }
      return `Understood. Let's progress to the advanced phase of this simulation.

${nextPrompt}`;
    }

    if (userMessagesCount === 4) {
      return `Thank you for the detailed breakdown. We have gone through the systematic introduction, core, mid-level, and advanced questions. Do you have any final questions for the interview panel before we conclude?`;
    }

    return `We have completed all phases of the mock interview simulation. Please click the 'Finish & Get Performance Scorecard' button to view your comprehensive assessment scorecard!`;
  }

  if (phase === "feedback") {
    const userMsgs = messages.filter(m => m.role === "user");
    const allUserText = userMsgs.map(m => m.content).join(" ").toLowerCase();
    
    const intro = userMsgs[0]?.content || "";
    const core = userMsgs[1]?.content || "";
    const mid = userMsgs[2]?.content || "";
    const adv = userMsgs[3]?.content || "";
    
    const wordCount = allUserText.split(/\s+/).filter(Boolean).length;
    const hasNumbers = /\b\d+(\.\d+)?(%)?\b/.test(allUserText);
    
    // Compute metrics dynamically based on actual user answers
    let starScore = 5.0;
    let depthScore = 4.5;
    let ownershipScore = 5.0;
    let impactScore = 4.0;
    
    // 1. STAR Method Evaluation
    const starIndicators = ["situation", "task", "action", "result", "because", "so", "achieved", "consequently", "solved", "outage", "production", "index"];
    let starHits = 0;
    starIndicators.forEach(word => {
      if (allUserText.includes(word)) starHits++;
    });
    starScore = Math.min(10, 4.0 + (starHits / starIndicators.length) * 6.0);
    if (userMsgs.length < 3) starScore = Math.max(3.0, starScore - 2.0); // Penalty for incomplete interview
    
    // 2. Depth of Explanation (Average word count per answer)
    const avgWords = userMsgs.length > 0 ? wordCount / userMsgs.length : 0;
    if (avgWords > 85) depthScore = 9.0;
    else if (avgWords > 45) depthScore = 7.5;
    else if (avgWords > 20) depthScore = 6.0;
    else depthScore = 3.5;
    
    // 3. Ownership score (I vs We count)
    const weCount = (allUserText.match(/\b(we|our|us|team)\b/g) || []).length;
    const iCount = (allUserText.match(/\b(i|my|me|mine|myself)\b/g) || []).length;
    if (iCount > weCount * 1.5) ownershipScore = 8.5;
    else if (iCount > weCount) ownershipScore = 7.0;
    else if (weCount > 0) ownershipScore = 4.5; // High team phrasing penalty
    else ownershipScore = 6.0;
    
    // 4. Quantifiable Impact Score
    if (hasNumbers) {
      const numPercentSigns = (allUserText.match(/%/g) || []).length;
      if (numPercentSigns > 0) impactScore = 8.5;
      else impactScore = 7.5;
    } else {
      impactScore = 3.0; // Penalty for missing numbers
    }
    
    // Construct dynamic critique notes based strictly on their scores
    const starNotes = starScore >= 7.5 
      ? "Successfully structured responses using situation context and clear outcomes."
      : "Jumped directly to technical solution without describing the situation context.";
      
    const depthNotes = depthScore >= 7.5
      ? "Excellent technical and contextual depth in answers."
      : "Answers are too brief; lacks detailed architectural/behavioral explanations.";
      
    const ownershipNotes = ownershipScore >= 7.0
      ? "Demonstrated clear personal agency and specified individual contributions."
      : "Overused team-centric 'we' phrasing; hid individual actions and decision trade-offs.";
      
    const impactNotes = impactScore >= 7.5
      ? "Strong integration of metrics and business impact parameters."
      : "Outcomes are purely qualitative; failed to include any percentages, latencies, or numbers.";
      
    // Dynamic weaknesses referencing actual answers
    const weaknesses = [];
    if (intro.length > 0) {
      if (intro.length < 50) {
        weaknesses.push(`- **Brief Self-Introduction**: Your opening pitch was only ${intro.length} characters: *"${intro}"*. A premium candidate needs a structured 'Present-Past-Future' summary highlighting core competencies.`);
      } else {
        weaknesses.push(`- **Intro Alignment**: In your intro *"${intro.substring(0, 50)}..."*, make sure to explicitly connect your accomplishments to the role requirements.`);
      }
    }
    
    if (core.length > 0) {
      if (!core.match(/(years|scale|user|client|customer|volume)/i)) {
        weaknesses.push(`- **Missing Project Scale**: In your response to the core scenario *"${core.substring(0, 60)}..."*, you didn't explain the scale of your system or team size.`);
      }
    }
    
    if (mid.length > 0) {
      const midWe = (mid.toLowerCase().match(/\bwe\b/g) || []).length;
      if (midWe > 2) {
        weaknesses.push(`- **Team Phrasing Dilution**: In your collaboration scenario response *"${mid.substring(0, 60)}..."*, you used 'we' multiple times. Recruiter critique: Specify exactly what *you* designed vs what the team did.`);
      }
    }
    
    if (adv.length > 0) {
      const hasNum = /\b\d+\b/.test(adv);
      if (!hasNum) {
        weaknesses.push(`- **Missing Success Metrics**: In your advanced resolution response *"${adv.substring(0, 60)}..."*, the outcome was not quantified. Always anchor results with numbers (e.g. reduced load by 30%).`);
      }
    }
  
    if (weaknesses.length === 0) {
      weaknesses.push("- **Minor Edge Cases**: Overall excellent answers, but could expand on high-availability design tradeoffs.");
    }
    
    // Rejection analysis warnings
    const rejectionPoints = [];
    if (ownershipScore < 6.0) {
      rejectionPoints.push(`- **High Risk of Rejection due to Ownership Gaps**: The panel will assume you were a passenger rather than the driver because your answers (e.g., *"${mid.substring(0, 50)}..."*) focus on what the team accomplished rather than your specific choices.`);
    }
    if (impactScore < 6.0) {
      rejectionPoints.push(`- **Rejection Risk on Business Alignment**: A senior recruiter will reject you because none of your responses quantified the outcome. Statements like *"${adv.substring(0, 50)}..."* lack validation without numbers (e.g., % improvement, dollar savings).`);
    }
    if (depthScore < 6.0) {
      rejectionPoints.push(`- **Technical/Depth Warning**: Your answers average only ${Math.round(avgWords)} words. A senior bar raiser will fail you for lack of domain depth and superficial explanations.`);
    }
    if (rejectionPoints.length === 0) {
      rejectionPoints.push("- **Low Rejection Risk**: Your delivery and ownership indicators are strong. Focus next on polish and advanced system tradeoffs.");
    }
    
    const totalScore = ((starScore + depthScore + ownershipScore + impactScore) / 4);
    const resultStatus = totalScore >= 7.5 ? "Recommend (Strong Hire path) 🎉" : "Hold / Reject (Needs Improvement) 🛑";
    
    return `## 📊 FAANG Recruiter Critique & Performance Scorecard
  
### Performance Metrics
| Category | Score | Notes |
|---|---|---|
| STAR Method Structure | ${starScore.toFixed(1)}/10 | ${starNotes} |
| Technical/Contextual Depth | ${depthScore.toFixed(1)}/10 | ${depthNotes} |
| Individual Ownership | ${ownershipScore.toFixed(1)}/10 | ${ownershipNotes} |
| Quantifiable Impact | ${impactScore.toFixed(1)}/10 | ${impactNotes} |
  
### 🔍 Weaknesses & Knowledge Gaps (Based on Your Answers)
${weaknesses.join("\n")}
  
### 🛑 Senior Recruiter's Honest Critique & Rejection Analysis
${rejectionPoints.join("\n")}
  
### ✅ Key Strengths
- **Clear Structuring**: Your answers are compartmentalized, making it easy to follow.
- **Problem Ownership**: You showed high responsibility and alignment when resolving roadblocks.
- **Communication Flow**: Polished delivery with a professional tone.
  
### 🔧 Strategic Recommendations
- **Adopt the 'I' Framework**: Rephrase your scenarios to highlight your personal engineering decisions and compromises.
- **Quantify Everything**: Never mention a project result without associating it with a performance percentage or delivery speed improvement.
  
**Overall Panel Assessment: ${resultStatus} (Average Score: ${totalScore.toFixed(1)}/10)**`;
  }

  return `Thank you. Could you share what you learned from this experience and how you've applied that learning in your work since then?`;
}
