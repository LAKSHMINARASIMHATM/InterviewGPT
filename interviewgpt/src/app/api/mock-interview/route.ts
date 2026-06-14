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
    if (!res.ok) return null;
    const data = await res.json();
    return data.choices?.[0]?.message?.content ?? null;
  } catch { return null; }
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
- In the "intro" phase: Welcome the candidate. Then, generate a unique, realistic, real-world workplace scenario question for the topic "${topicTitle}" (e.g. involving production bugs, stakeholder conflicts, system failures, prioritization constraints). Ask the candidate how they would respond or handle it, prompting them to use the STAR method.
- In the "interviewing" phase: You ask one behavioral follow-up or clarifying question at a time. Do not ask multiple questions at once. Probe for specifics using the STAR method (Situation, Task, Action, Result). If the candidate gives a vague answer, ask them to elaborate on what actions THEY personally took and what the outcome was.
- In the "feedback" phase: Provide a comprehensive performance report. You MUST include a dedicated section titled "### 🔍 Knowledge Gaps & Areas Lacking Improvement" detailing exactly which technical or behavioral concepts the candidate was lacking or weak in based on their responses. Then, provide strategic recommendations and scorecard.

Keep responses concise and under 200 words. Use markdown.`;

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
    let scenario = `Imagine you are leading a critical API integration project. Two days before the release, the third-party API provider makes an unannounced change that breaks your payment flow. How would you handle this situation, and what actions would you take to ensure the launch remains on track?`;
    
    if (isComp) {
      if (resumeText && resumeText.trim().length > 5) {
        scenario = `Welcome to the panel. I see on your resume that you have experience with "${skillsContext}" and worked on "${projectContext}". Let's start with your self-introduction: Tell me about yourself, your background, and why you are interested in this role.`;
      } else {
        scenario = `Tell me about yourself, your background, and why you are interested in this role.`;
      }
    } else if (topicTitle.toLowerCase().includes("conflict") || topicTitle.toLowerCase().includes("leadership")) {
      scenario = `Imagine you are a Technical Lead on a new cloud migration. Your senior backend developer strongly disagrees with your database technology selection and threatens to refuse to work on the migration. How would you handle this disagreement and guide the team forward?`;
    } else if (topicTitle.toLowerCase().includes("career") || topicTitle.toLowerCase().includes("alignment")) {
      scenario = `Imagine a hiring manager asks: "Why do you want to join our team specifically, when there are several other companies offering similar compensation, and how does this role fit your 5-year growth trajectory?"`;
    } else if (topicTitle.toLowerCase().includes("adaptability") || topicTitle.toLowerCase().includes("ambiguity")) {
      scenario = `Imagine you are assigned to take over a legacy service that has no documentation, frequent memory leaks, and the original developer has left the company. You have a customer launch in one week. How would you prioritize your tasks and navigate this ambiguity?`;
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

    if (userMessagesCount === 1) {
      return `Thank you for sharing that experience. It gives me a good start. 

To help me understand your role better, could you elaborate on the **specific actions you personally took**? Sometimes it's easy to describe what 'the team' did, but I want to hear about:
1. Your individual contribution and decisions.
2. The key trade-offs you had to consider.
3. How you communicated these decisions to stakeholders.

Could you share more detail on those actions?`;
    }
    if (userMessagesCount === 2) {
      return `Excellent detail. That really highlights your hands-on involvement. 

Let's talk about the **Results**. How did you measure success in this situation? 
- Did you achieve a specific metric, speedup, or savings?
- What was the long-term impact on the team or project?
- If you had to do it all over again, what is one thing you would do differently?`;
    }
    if (userMessagesCount === 3) {
      return `Thank you for the detailed breakdown. We have thoroughly evaluated the Situation, Task, Action, and Results. Do you have any final questions for me about the team or the company before we conclude?`;
    }
    return `We have completed all phases of the mock interview simulation. Please click the 'Finish & Get Performance Scorecard' button to view your comprehensive assessment scorecard!`;
  }

  if (phase === "feedback") {
    if (isComp) {
      const answers = messages.filter(m => m.role === "user").map(m => m.content.toLowerCase());
      const lacking = [];
      
      if (!answers[0] || answers[0].length < 30) lacking.push("- **Introduction Hook**: Your self-introduction was too brief. Add a strong 'Present-Past-Future' hook highlighting core expertise.");
      if (!answers[1] || !answers[1].match(/(years|trajectory|goal|lead|senior)/)) lacking.push("- **5-Year Trajectory**: Missing clear articulation of technical leadership goals or domain specialization plans.");
      if (!answers[2] || (!answers[2].includes("mro") && !answers[2].includes("diamond"))) lacking.push("- **OOP & Multiple Inheritance**: Lacking description of Method Resolution Order (MRO) in Python or Diamond Problem resolution.");
      if (!answers[3] || !answers[3].match(/(gil|jvm|memory|garbage|gc)/)) lacking.push("- **Language Internals (Java/Python)**: Missing details on execution environments (JVM vs Python VM), Memory Allocation, GIL (Global Interpreter Lock), or Garbage Collection mechanisms.");
      if (!answers[4] || !answers[4].match(/(acid|index|nosql|schema|b-tree)/)) lacking.push("- **DBMS & Storage**: Lacking deep explanations of B-Tree indexing mechanisms, ACID isolation levels, or SQL vs NoSQL schema design trade-offs.");
      if (!answers[5] || !answers[5].match(/(solid|single|open|factory|singleton|pattern)/)) lacking.push("- **Software Architecture**: Lacking details on SOLID implementation or design patterns (like Factory, Singleton) to prevent code regression.");

      if (resumeText && resumeText.trim().length > 5) {
        const firstWord = projectContext.split(" ")[0].toLowerCase();
        const hasProjectMention = answers.some(ans => ans.includes(firstWord));
        if (!hasProjectMention) {
          lacking.push(`- **Resume Integration**: You did not explicitly reference your experience with **${projectContext}** when answering the technical rounds. Connecting core OOP and system concepts directly to your projects listed on your resume is vital for high-level technical panels.`);
        }
      }

      if (lacking.length === 0) {
        lacking.push("- **Minor Edge Cases**: Technical fundamentals are outstanding. Focus next on high-level system design constraints (e.g. database sharding, caching strategies).");
      }

      return `## 📊 FAANG End-to-End Panel Scorecard

### Performance Metrics
| Category | Score | Notes |
|---|---|---|
| Behavioral & Culture Fit | 8.5/10 | Natural delivery, aligned with corporate values. |
| OOP & Lang Fundamentals | 7.5/10 | Good core concepts, could expand on VM internals. |
| DBMS & System Storage | 8.0/10 | Solid transaction knowledge, needs more index details. |
| Software Architecture | 7.5/10 | Clear understanding of SOLID, could show more pattern experience. |

### 🔍 Knowledge Gaps & Areas Lacking Improvement (AI Critique)
${lacking.join("\n")}

### ✅ Key Strengths
- **Clear Structuring**: Answers are compartmentalized, making it easy for the panel to follow.
- **Pragmatic Choices**: Showing strong technical pragmatism when choosing between SQL and NoSQL.
- **Clean Code Mindset**: Evident alignment with decoupled architectures and SOLID principles.

### 🔧 Strategic Recommendations
- **Deepen VM Understanding**: Brush up on JVM garbage collection states (Eden, Survivor, Tenured) and Python's garbage collector reference counting.
- **Illustrate with Real Projects**: Rather than definitions, explain abstract classes/SOLID using code snippets or legacy project refactors you've handled.

**Overall Result: Recommend (Strong Hire path). You demonstrate excellent technical foundations and career motivation! 🚀**`;
    }

    return `## 📊 HR Interview Scorecard

### Performance Metrics
| Category | Score | Notes |
|---|---|---|
| STAR Method Structure | 8/10 | Excellent situation context; could emphasize Action phase more. |
| Communication Clarity | 9/10 | Very natural delivery, professional tone, and structured layout. |
| Emotional Intelligence (EQ) | 8/10 | Shows high self-awareness, empathy, and strong conflict resolution skills. |
| Quantifiable Impact | 7/10 | Good mention of results; try to highlight more direct metrics (e.g. % or time saved). |

### 🔍 Knowledge Gaps & Areas Lacking Improvement (AI Critique)
- **Quantifiable Results**: Your answers lacked explicit percentages, dollar values, or duration reductions to measure outcomes.
- **Action Phase Ownership**: Too many references to 'we' (the team) instead of detailing your personal decisions, trade-offs, and communication strategies.

### ✅ Key Strengths
- **Structured Framework**: You set the context very well, making it easy to follow.
- **Ownership Mentality**: You clearly detailed your personal decisions and actions.
- **Reflective Thinker**: You showed a clear ability to learn from challenges.

### 🔧 Strategic Recommendations
- **Lead with Actions**: Spend 50% of your time explaining the exact actions YOU took, using strong action verbs (e.g., 'orchestrated', 'streamlined', 'resolved').
- **Anchor with Metrics**: Always conclude with a measurable result. Instead of 'we finished it on time', say 'we delivered the project 4 days ahead of schedule, reducing operational friction by 15%'.

### 💡 Example Model Answer Pitch
*"In my previous role, we were hit with a sudden shift in APIs just 2 weeks before launch (Situation). As lead engineer, it was my task to migrate the data pipeline without delaying the release (Task). I immediately convened a stand-up, isolated the impacted models, and split the work into three parallel sprints while setting up fallback logs (Action). As a result, we successfully shipped on the original date, maintained 100% data integrity, and our migration minimized future API update times by 30% (Result)."*

**Overall Result: Highly Recommend. You demonstrate strong leadership potential and communication skills! 🎉**`;
  }

  return `Thank you. Could you share what you learned from this experience and how you've applied that learning in your work since then?`;
}
