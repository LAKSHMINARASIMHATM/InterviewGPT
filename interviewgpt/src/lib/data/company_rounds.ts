export interface InterviewRound {
  name: string;
  type: string;
  duration: string;
  icon: string;
  desc: string;
  topics: string[];
  questions?: string[];
  expectations?: string[];
  guidance?: string;
  concepts?: string[];
}

export const COMPANY_ROUNDS: Record<string, InterviewRound[]> = {
  google: [
    {
      name: "Online Assessment (OA) / Phone Screen",
      type: "Coding",
      duration: "45-60 mins",
      icon: "💻",
      desc: "Initial screening with 1-2 coding problems. Tests basic data structures, speed, and coding hygiene.",
      topics: ["Arrays", "Strings", "Hash Maps", "Simulation"],
      questions: [
        "Longest Substring Without Repeating Characters (LeetCode 3)",
        "Valid Parentheses with Wildcards (LeetCode 678)",
        "Group Anagrams (LeetCode 49)"
      ],
      expectations: [
        "Write correct, bug-free syntax quickly.",
        "Dry-run code manually with custom test cases.",
        "Clearly state time and space complexity upfront."
      ],
      guidance: "Expect a shared coding editor without compilation. Practice writing clean code without auto-complete and run dry tests with trace tables."
    },
    {
      name: "Technical Onsite: Algorithmic Depth",
      type: "Coding & DSA",
      duration: "45 mins",
      icon: "🌲",
      desc: "Focuses on deep algorithmic knowledge, scaling, and optimization. Be ready for advanced graphs, trees, or recursion.",
      topics: ["Trees & Graphs", "Heaps", "DFS/BFS", "Binary Search"],
      questions: [
        "Shortest Path in a Grid with Obstacles Elimination (LeetCode 1293)",
        "Serialize and Deserialize N-ary Tree (LeetCode 428)",
        "Course Schedule II (LeetCode 210)"
      ],
      expectations: [
        "Ability to represent custom states in graph algorithms.",
        "Optimization of worst-case search algorithms from exponential to polynomial.",
        "Strong understanding of search space reduction."
      ],
      guidance: "Google onsite interviewers love trees, graphs, and search algorithms. Think aloud as you search for optimal complexity. Do not start coding until your algorithm is approved."
    },
    {
      name: "Technical Onsite: Problem Solving",
      type: "Coding & DSA",
      duration: "45 mins",
      icon: "🧩",
      desc: "Focuses on logic, mathematical reasoning, and optimization. Commonly features backtracking or dynamic programming.",
      topics: ["Dynamic Programming", "Backtracking", "Two Pointers", "Math"],
      questions: [
        "Regular Expression Matching (LeetCode 10)",
        "Sudoku Solver (LeetCode 37)",
        "Edit Distance (LeetCode 72)"
      ],
      expectations: [
        "Identify overlapping subproblems and state transitions clearly.",
        "Define base cases precisely to avoid recursion stack overflows.",
        "Optimize space complexity from O(N*M) to O(Min(N,M)) if applicable."
      ],
      guidance: "Dynamic programming is frequent in Google onsite rounds. Start by explaining a simple recursive relationship, then show how a 1D or 2D memoization table solves redundant calculations."
    },
    {
      name: "Technical Onsite: System Design",
      type: "System Design",
      duration: "45 mins",
      icon: "🏗️",
      desc: "Assess ability to design scalable distributed systems, define clean APIs, database schemas, and identify bottlenecks (for L4+).",
      topics: ["API Design", "Caching", "Load Balancing", "Sharding"],
      questions: [
        "Design Google Drive (Collaborative Document Syncing)",
        "Design a Global Rate Limiter (Token Bucket / Leaky Bucket)",
        "Design a Proximity Server like Google Maps (Spatial Indexes)"
      ],
      concepts: [
        "Consistent Hashing & Partitioning",
        "Spatial Indexing (Geohashes, Quadtrees)",
        "CDN edge caching and cache eviction policies",
        "API Gateway, rate limiting, and circuit breaker patterns"
      ],
      expectations: [
        "Outline database schema, read/write volume estimates, and network bandwidth constraints.",
        "Address hardware failures, partitioning strategies, and database replication constraints.",
        "Identify single points of failure and bottleneck mitigations."
      ],
      guidance: "Begin with clarifying requirements (functional & non-functional) and estimating scale. Draw the system layout before detailing individual API designs, cache layers, or database configurations."
    },
    {
      name: "Googliness & Leadership",
      type: "Behavioral",
      duration: "45 mins",
      icon: "🌟",
      desc: "Evaluating cultural alignment, response to ambiguity, feedback receipt, ethical behavior, and team collaboration.",
      topics: ["Ambiguity", "Conflict Resolution", "Teamwork", "Ownership"],
      questions: [
        "Describe a time you worked on a project with highly ambiguous requirements. How did you proceed?",
        "Tell me about a time you disagreed with a manager or teammate. How did you resolve the conflict?",
        "Give an example of when you took ownership of a task outside your immediate responsibilities."
      ],
      expectations: [
        "Demonstrate high emotional intelligence (EQ) and active listening skills.",
        "Show adaptability, focus on collaborative consensus, and feedback reception.",
        "Focus on metrics, learning outcomes, and ethical teamwork."
      ],
      guidance: "Use the STAR method (Situation, Task, Action, Result). Highlight your specific contribution, what you learned, and how you ensured team alignment."
    }
  ],
  amazon: [
    {
      name: "Online Assessment (OA)",
      type: "Coding & Work Style",
      duration: "90 mins",
      icon: "📝",
      desc: "2 coding questions focused on debugging/DSA, followed by a simulated work scenario and work style assessment.",
      topics: ["Data Structures", "Simulation", "Logical Reasoning"],
      questions: [
        "K Closest Points to Origin (LeetCode 973)",
        "Reorder Data in Log Files (LeetCode 937)",
        "Subtree of Another Tree (LeetCode 572)"
      ],
      expectations: [
        "Pass all hidden performance test cases within the limit.",
        "Exhibit professional and customer-oriented judgment in work scenarios.",
        "Solve algorithmic tasks in under 30 minutes each."
      ],
      guidance: "Expect standard Amazon LeetCode questions. Allocate 50 minutes to coding and 40 minutes to the work simulation. Focus on customer obsession and bias for action."
    },
    {
      name: "Technical Loop: Coding & LP",
      type: "Coding & DSA",
      duration: "60 mins",
      icon: "💻",
      desc: "Data structures & algorithms (e.g. Arrays, Trees, Hash Maps) combined with 15-20 minutes of Behavioral questions based on Amazon's Leadership Principles.",
      topics: ["Arrays/Strings", "Hash Maps", "Leadership Principles"],
      questions: [
        "Merge Nodes in Between Zeros (LeetCode 2181)",
        "Lowest Common Ancestor of a Binary Tree (LeetCode 236)",
        "Behavioral: Tell me about a time you had to deliver a feature under a tight deadline (Deliver Results)."
      ],
      expectations: [
        "Write modular code with readable variable names.",
        "Demonstrate deep knowledge of Amazon Leadership Principles (LPs).",
        "Evaluate time/space complexity accurately."
      ],
      guidance: "Spend the first 15 minutes of this round telling stories showing LPs (e.g., Customer Obsession, Ownership). Then, transition into a structured coding walkthrough."
    },
    {
      name: "Technical Loop: OOP & System Design",
      type: "Design & LP",
      duration: "60 mins",
      icon: "📐",
      desc: "Object-oriented design, class relationships, design patterns, or high-level system design, plus heavy focus on Leadership Principles.",
      topics: ["OOD / Class Design", "System Architecture", "Leadership Principles"],
      questions: [
        "Design an Amazon Locker Service (OOD)",
        "Design a Parking Lot (Class relationships & encapsulation)",
        "Behavioral: Describe a time you made a decision without consulting your manager (Bias for Action)."
      ],
      concepts: [
        "SOLID Design Principles",
        "Design Patterns (Singleton, Factory, Strategy, Observer)",
        "Interface and Class encapsulation rules"
      ],
      expectations: [
        "Represent relationships (inheritance vs composition) accurately.",
        "Use design patterns appropriately to make code extensible.",
        "Explain design choices regarding memory footprint and scale."
      ],
      guidance: "Focus on OOP rules. Write class signatures, define interfaces, map out inheritance hierarchies, and explain how the design adheres to SOLID design principles."
    },
    {
      name: "Bar Raiser Round",
      type: "Deep Tech & LP",
      duration: "60 mins",
      icon: "🚀",
      desc: "Led by an independent 'Bar Raiser' interviewer. Focuses on architectural trade-offs, deep system design, and rigorous validation of core Leadership Principles.",
      topics: ["Distributed Systems", "Scaling", "Leadership Principles"],
      questions: [
        "Design Amazon.com's Shopping Cart Service (Distributed)",
        "Design a Notification System at Scale (SMS, Email, Push Notifications)",
        "Behavioral: Tell me about a time you failed in a project. What did you do next? (Earn Trust)"
      ],
      concepts: [
        "Eventual consistency vs strong consistency",
        "Message queues (Kafka, SQS) and pub-sub architectures",
        "Distributed database partitioning and transactions"
      ],
      expectations: [
        "Argue architectural choices (SQL vs DynamoDB) with data.",
        "Deeply reflect on failure points and scalability limitations.",
        "Answer behavioral queries to a high standard, demonstrating self-critical reflection."
      ],
      guidance: "The Bar Raiser ensures you are better than 50% of current employees in your level. Focus on showing self-critique (Earn Trust), inventiveness (Invent & Simplify), and customer-first thinking."
    }
  ],
  microsoft: [
    {
      name: "Codility OA / Phone Screen",
      type: "Coding Screen",
      duration: "60-90 mins",
      icon: "💻",
      desc: "2-3 coding problems on the Codility platform. Tests basic algorithms, edge cases, and code correctness.",
      topics: ["Arrays", "Strings", "Stacks/Queues", "Greedy"],
      questions: [
        "Min Deletions to Make Character Frequencies Unique (LeetCode 1647)",
        "Largest Alphabetic Character (Codility Standard)",
        "String Without 3 Identical Consecutive Letters"
      ],
      expectations: [
        "Fix syntax bugs on first run.",
        "Handle edge cases such as empty input, null pointer states, and array overflows.",
        "Provide time-optimal implementations."
      ],
      guidance: "Microsoft's Codility screen requires optimal space-time trade-offs. Test your solutions with boundary inputs (e.g. 0, 1, max range) before submitting."
    },
    {
      name: "Technical Onsite: Core CS",
      type: "Coding & DSA",
      duration: "45 mins",
      icon: "🧩",
      desc: "Focuses on core computer science fundamentals. Coding questions on pointers, lists, recursion, or binary trees.",
      topics: ["Linked Lists", "Trees", "Recursion", "Binary Search"],
      questions: [
        "Reverse Nodes in k-Group (LeetCode 25)",
        "Binary Tree Zigzag Level Order Traversal (LeetCode 103)",
        "Search in Rotated Sorted Array (LeetCode 33)"
      ],
      expectations: [
        "Excellent control over pointer manipulation without leaks.",
        "Recursive call graph analysis and space estimation.",
        "Correct handling of cyclic references or loops."
      ],
      guidance: "Prepare for classic list and tree problems. Write code cleanly, explain pointer movements, and perform a line-by-line dry-run simulation of your logic."
    },
    {
      name: "Technical Onsite: OOP & Code Quality",
      type: "Coding & Design",
      duration: "45 mins",
      icon: "🏛️",
      desc: "Object-Oriented Design (OOD), class relationships, code design patterns, readability, and write-once correctness.",
      topics: ["Class Design", "Design Patterns", "Clean Code"],
      questions: [
        "Design a Movie Ticket Booking System (OOD)",
        "Implement a Vending Machine (State Pattern)",
        "Design an In-Memory File System (Composite Pattern)"
      ],
      concepts: [
        "Composition over inheritance",
        "Design patterns like State, Strategy, and Composite",
        "Thread-safe implementations"
      ],
      expectations: [
        "Write clean, readable classes that are easy to extend.",
        "Avoid tightly-coupled components.",
        "Explain design choices clearly."
      ],
      guidance: "Focus on clean class boundaries. Structure your data structures first, declare interfaces clearly, and implement the operations showing polymorphism."
    },
    {
      name: "Technical Onsite: System Architecture",
      type: "System Design",
      duration: "45 mins",
      icon: "🏗️",
      desc: "Designing large-scale distributed systems, database choices (SQL vs NoSQL), load balancing, caching, and recovery.",
      topics: ["Distributed Databases", "Caching", "CDN", "Message Queues"],
      questions: [
        "Design Microsoft Teams (Real-time Messaging & Presence)",
        "Design OneDrive (File syncing, chunking, deduplication)",
        "Design Xbox Leaderboard (Redis sorted sets, write-heavy caching)"
      ],
      concepts: [
        "WebSockets and long polling for presence tracking",
        "Data deduplication mechanisms",
        "Write-through vs write-back cache policies",
        "Distributed database replication and consistency trade-offs"
      ],
      expectations: [
        "Structure clear boundaries between services.",
        "Design scalable data streams for write-heavy services.",
        "Explain fault-recovery strategies."
      ],
      guidance: "Clarify system requirements. Outline components: Client, Load Balancer, Gateway, Services, Cache, and DB. Explain read vs write scaling."
    },
    {
      name: "Behavioral & Fit",
      type: "Behavioral",
      duration: "45 mins",
      icon: "🤝",
      desc: "General fit, passion for technology, career growth, team dynamics, and conflict resolution.",
      topics: ["Teamwork", "Career Goals", "Conflict Management"],
      questions: [
        "Why Microsoft? What technical product of ours excites you the most?",
        "Tell me about a time you helped a peer who was falling behind in their work.",
        "How do you handle shifting project priorities from leadership?"
      ],
      expectations: [
        "Show passion for growth, technology, and mentorship.",
        "Demonstrate collaborative nature and conflict resolution.",
        "Align with Microsoft's mission to empower every person."
      ],
      guidance: "Highlight curiosity, empathy, and collaborative mindset. Express how your career goals align with Microsoft's values."
    }
  ],
  meta: [
    {
      name: "Technical Phone Screen",
      type: "Fast-Paced Coding",
      duration: "45 mins",
      icon: "📞",
      desc: "2 coding questions (usually sourced from high frequency Meta tag). Requires rapid coding and optimal solution development.",
      topics: ["Arrays/Strings", "Two Pointers", "Sliding Window"],
      questions: [
        "Binary Tree Right Side View (LeetCode 199)",
        "Kth Largest Element in an Array (LeetCode 215)",
        "Valid Palindrome II (LeetCode 680)"
      ],
      expectations: [
        "Implement optimal solutions to both questions in 35-40 minutes.",
        "Dry-run code with a test trace quickly.",
        "Avoid syntactic errors and logical edge bugs."
      ],
      guidance: "Meta screens require speed. Solve the first problem in 15 minutes and the second in 20 minutes. Keep explanations brief and write code cleanly."
    },
    {
      name: "Onsite Coding 1",
      type: "Coding & DSA",
      duration: "45 mins",
      icon: "💻",
      desc: "High-efficiency algorithmic design. Heavy focus on graphs, trees, and tree traversals.",
      topics: ["Graphs", "Trees", "BFS/DFS", "Heaps"],
      questions: [
        "Lowest Common Ancestor of a Binary Tree III (LeetCode 1650)",
        "Word Search II (LeetCode 212)",
        "Range Sum Query 2D - Mutable (LeetCode 308)"
      ],
      expectations: [
        "Navigate trees and graphs with optimal O(N) traversals.",
        "Write modular functions for nested recursive search logic.",
        "Demonstrate precise resource scaling calculations."
      ],
      guidance: "Graph algorithms and tree traversals are very common in Meta loops. Be prepared to handle recursion constraints, recursive loops, and back-tracking."
    },
    {
      name: "Onsite Coding 2",
      type: "Coding & DSA",
      duration: "45 mins",
      icon: "⚡",
      desc: "Solving complex structures, space-time optimization, and backtracking.",
      topics: ["Dynamic Programming", "Backtracking", "Tries", "Design Questions"],
      questions: [
        "Minimum Window Substring (LeetCode 76)",
        "Design Add and Search Words Data Structure (LeetCode 211)",
        "Construct Binary Tree from String (LeetCode 536)"
      ],
      expectations: [
        "Optimize search operations with Trie prefix matches.",
        "Implement optimal O(N) two-pointer/sliding window algorithms.",
        "Explain complex parser logic clearly."
      ],
      guidance: "Write clean, robust code for complex parsing and custom structures. Verify array bounds and index configurations on every step."
    },
    {
      name: "Onsite System Design / Product Design",
      type: "System Design",
      duration: "45 mins",
      icon: "🌐",
      desc: "Designing a large-scale system or app features (e.g. Instagram Feed, Messenger, WhatsApp). Focus on API, database schema, and horizontal scaling.",
      topics: ["API Design", "DB Schema", "Scaling", "Caching"],
      questions: [
        "Design Instagram News Feed (Write fan-out vs read fan-out)",
        "Design WhatsApp Messenger (Handling millions of active WebSocket connections)",
        "Design a Distributed Web Crawler (Caching, indexing, scheduling)"
      ],
      concepts: [
        "Push vs pull models for feed generation",
        "Connection managers and session gateways",
        "Consistent hashing and database partitioning schemas",
        "Caching patterns (Redis, Memcached)"
      ],
      expectations: [
        "Draw clear data schemas for database queries.",
        "Optimize write path latency (e.g., hybrid feed delivery).",
        "Calculate estimates for active queries per second (QPS) and bandwidth."
      ],
      guidance: "Focus on end-to-end design. Define the API, outline DB tables, and identify horizontal scaling bottlenecks. Address cache and feed delivery details."
    },
    {
      name: "Behavioral (Jedi) Round",
      type: "Behavioral",
      duration: "45 mins",
      icon: "🧘",
      desc: "Collaboration, resolving conflicts, empathy, learning from mistakes, and driving cross-functional impact.",
      topics: ["Collaboration", "Conflict Resolution", "Growth Mindset"],
      questions: [
        "Tell me about a project where you drove cross-functional collaboration. What was the impact?",
        "Describe a situation where a conflict threatened a deadline. How did you handle it?",
        "Give an example of a mistake you made in a technical architecture decision. What did you learn?"
      ],
      expectations: [
        "Focus on personal responsibility and self-improvement.",
        "Demonstrate impact through data and collaboration.",
        "Align with Meta's core values: Move Fast, Focus on Long-Term Impact."
      ],
      guidance: "Frame answers around teamwork, learning from failure, and moving fast with quality. Use the STAR structure."
    }
  ],
  apple: [
    {
      name: "Technical Phone Screen",
      type: "Coding & Fundamentals",
      duration: "45-60 mins",
      icon: "📞",
      desc: "Low-level programming fundamentals (concurrency, memory management, OS threads) + a medium coding question.",
      topics: ["Concurrency", "OS Concepts", "Bit Manipulation", "Arrays"],
      questions: [
        "Implement a Thread-Safe Queue (OS Concurrency)",
        "Power of Two (Bitwise operation - LeetCode 231)",
        "LRU Cache (LeetCode 146)"
      ],
      expectations: [
        "Address race conditions and deadlock hazards.",
        "Optimize performance with bit manipulation.",
        "Understand OS threads and mutex locks."
      ],
      guidance: "Be ready for questions on multithreading, mutexes, condition variables, and binary arithmetic alongside standard coding."
    },
    {
      name: "Onsite Coding: Algorithmic DSA",
      type: "Coding & DSA",
      duration: "45 mins",
      icon: "🍎",
      desc: "Algorithmic problem-solving with high standards for clean code, readability, testing, and edge case handling.",
      topics: ["Trees", "Hash Maps", "Two Pointers", "Sorting"],
      questions: [
        "Merge k Sorted Lists (LeetCode 23)",
        "Longest Repeating Character Replacement (LeetCode 424)",
        "Validate Binary Search Tree (LeetCode 98)"
      ],
      expectations: [
        "Write highly organized, dry-run-tested code.",
        "Perform runtime complexity analysis.",
        "Cover edge cases like negative indexes, array boundaries, and integer limits."
      ],
      guidance: "Apple interviewers expect robust coding. Write test cases explicitly and step through your code to verify correctness before finishing."
    },
    {
      name: "Onsite: Language & Runtime Internals",
      type: "Language Deep Dive",
      duration: "45 mins",
      icon: "⚙️",
      desc: "Deep dive into language runtime (e.g. C++ compiler internals, Java JVM, Swift memory management) and low-level detail.",
      topics: ["Language Internals", "Memory Management", "Multithreading"],
      questions: [
        "Explain C++ Virtual Tables (vtable) and Polymorphism implementation.",
        "Explain Java Garbage Collection algorithms or Swift ARC (Automatic Reference Counting) mechanics.",
        "Discuss memory alignment and cache locality effects in performance."
      ],
      expectations: [
        "Detailed explanation of memory layout (Heap vs Stack, vtables).",
        "Understanding compiler optimizations.",
        "Explain memory barriers and thread synchronization."
      ],
      guidance: "Focus on your primary language's internals. Explain compiler details, reference types, allocation mechanics, and CPU caching behavior."
    },
    {
      name: "Onsite System Design",
      type: "Architecture",
      duration: "45 mins",
      icon: "📐",
      desc: "System architecture, distributed databases, hardware integration, or low-level design constraints.",
      topics: ["Distributed Systems", "Hardware/Software Co-design", "Caching"],
      questions: [
        "Design iCloud Backup Service (Client-side sync, block level dedup)",
        "Design an Apple Watch telemetry processing system (Stream ingestion)",
        "Design Apple Pay Backend (Transaction processing with zero-trust tokenization)"
      ],
      concepts: [
        "Client-side caching and state storage",
        "Stream processing engines (Flink, Spark Streaming)",
        "Database choice for high transactions vs analytical reports",
        "Tokenization schemas for payment security"
      ],
      expectations: [
        "Design scalable, secure cloud-local architectures.",
        "Calculate hardware resource trade-offs.",
        "Demonstrate end-to-end security design."
      ],
      guidance: "Highlight efficiency, client-server coordination, security, and edge performance, keeping Apple's hardware-software integration in mind."
    },
    {
      name: "Behavioral & Apple Culture Fit",
      type: "Behavioral",
      duration: "45 mins",
      icon: "✨",
      desc: "Alignment with Apple values, attention to detail, passion for user experience, and cross-functional communication.",
      topics: ["Apple Values", "Detail Orientation", "Collaboration"],
      questions: [
        "Tell me about a time you refused to compromise on code quality.",
        "How do you maintain a balance between UI elegance and technical feasibility?",
        "Describe a time you collaborated with cross-functional design teams."
      ],
      expectations: [
        "Commitment to quality and user experience.",
        "Constructive collaboration with designers and product managers.",
        "Show passion for building great products."
      ],
      guidance: "Demonstrate pride in your work, attention to detail, and a user-first mindset."
    }
  ],
  netflix: [
    {
      name: "Initial Technical Screen",
      type: "Coding & Architecture",
      duration: "60 mins",
      icon: "🎬",
      desc: "Practical coding problem followed by a high-level system design discussion.",
      topics: ["Real-world coding", "System Overview"],
      questions: [
        "Design and implement a Rate Limiter class (Token bucket)",
        "Design a Content metadata ingestion queue layout"
      ],
      expectations: [
        "Write compilable, thread-safe code.",
        "Analyze design trade-offs clearly."
      ],
      guidance: "Prepare for OOP systems. Ensure your solutions are thread-safe and handle exceptions robustly."
    },
    {
      name: "Onsite Tech: DSA",
      type: "Coding & DSA",
      duration: "45 mins",
      icon: "🍿",
      desc: "Algorithmic problem solving focusing on clean parsing, string processing, and basic graph/search logic.",
      topics: ["Strings", "Graphs", "Sorting/Searching"],
      questions: [
        "IP Address Validation (LeetCode 468)",
        "Search in Rotated Sorted Array II (LeetCode 81)",
        "Reconstruct Itinerary (LeetCode 332)"
      ],
      expectations: [
        "Write clean parser algorithms.",
        "Handle edge cases and invalid inputs robustly.",
        "Optimize algorithms to be space-time efficient."
      ],
      guidance: "Focus on input cleaning and parsing. Write clean, modular, and readable validation logic."
    },
    {
      name: "Onsite Tech: System Design & Scalability",
      type: "System Design",
      duration: "45 mins",
      icon: "📡",
      desc: "Designing streaming video delivery, content delivery networks (CDNs), high traffic caching, and fault-tolerant microservices.",
      topics: ["CDN", "Microservices", "Fault Tolerance", "Caching"],
      questions: [
        "Design Netflix Video Streaming Pipeline & CDN (Open Connect)",
        "Design a Distributed Key-Value Store with high availability",
        "Design a system like Netflix Movie Recommendation Engine (Data stream)"
      ],
      concepts: [
        "Geo-routing and CDN topologies",
        "Circuit breakers, retries, backoff, and fallbacks",
        "Cassandra database replication model",
        "Cache warm-up strategies"
      ],
      expectations: [
        "Design fault-tolerant architectures (Chaos engineering).",
        "Address replication latency and consistency issues.",
        "Optimize microservice communication."
      ],
      guidance: "Focus on horizontal scaling, fallback options, and caching strategies to design a reliable, scalable system."
    },
    {
      name: "Culture & Values 1",
      type: "Cultural Interview",
      duration: "45 mins",
      icon: "📕",
      desc: "Deep exploration of the Netflix Freedom & Responsibility culture memo. Alignment with Keeper Test.",
      topics: ["Freedom & Responsibility", "Keeper Test", "Decision Making"],
      questions: [
        "How do you define 'Freedom and Responsibility' in your day-to-day software development work?",
        "If you were a manager, how would you apply the Keeper Test to your team?",
        "Tell me about a time you made a difficult decision that prioritised business efficiency over team comfort."
      ],
      expectations: [
        "Candid, clear reasoning about corporate culture and trade-offs.",
        "Direct alignment with Netflix's Core Values memo.",
        "Accountability for results."
      ],
      guidance: "Read the Netflix Culture Memo. Understand the Keeper Test and the concept of context, not control."
    },
    {
      name: "Culture & Values 2 / Hiring Manager",
      type: "Leadership & Fit",
      duration: "45 mins",
      icon: "🏆",
      desc: "Leadership alignment, giving/receiving direct feedback, handling feedback, and organizational impact.",
      topics: ["Feedback Culture", "Prioritization", "Growth"],
      questions: [
        "Describe a time you gave critical feedback to a senior colleague. How did they react?",
        "Tell me about a time you received feedback that you disagreed with. What did you do?",
        "How do you decide what task to prioritize when everything is high impact?"
      ],
      expectations: [
        "Deliver and receive feedback constructively.",
        "Demonstrate ownership and self-improvement.",
        "Prioritize projects based on business impact."
      ],
      guidance: "Highlight accountability, learning from feedback, and prioritization decisions. Show direct, respectful communication."
    }
  ],
  bloomberg: [
    {
      name: "Phone Screen",
      type: "Coding & Fundamentals",
      duration: "45-60 mins",
      icon: "📞",
      desc: "Coding questions on strings, linked lists, or maps + basic questions on OOP, multithreading, or language features.",
      topics: ["Strings", "Linked Lists", "OOP Principles"],
      questions: [
        "Reverse Words in a String (LeetCode 151)",
        "Two Sum (LeetCode 1)",
        "Explain Object-Oriented Programming (OOP) concepts (Inheritance, Polymorphism)"
      ],
      expectations: [
        "Provide correct coding logic quickly.",
        "Explain language fundamentals (pointers, references, heap vs stack).",
        "Dry-run code with clear explanations."
      ],
      guidance: "Expect coding followed by questions on language concepts (like C++ or Java memory structures)."
    },
    {
      name: "Onsite Coding: Custom Data Structures",
      type: "Coding & Design",
      duration: "60 mins",
      icon: "📊",
      desc: "Implementing custom data structures under time constraints (e.g. designing stock tickers, custom order books, or LRU cache).",
      topics: ["LRU Cache", "Custom OOP Design", "Hash Maps", "Stacks"],
      questions: [
        "Design Leaderboard (LeetCode 1244)",
        "Design Stock Ticker / Custom Order Book",
        "Insert Delete GetRandom O(1) (LeetCode 380)"
      ],
      expectations: [
        "Select the correct combination of data structures (e.g., Doubly Linked List + Hash Map).",
        "Write thread-safe class designs.",
        "Explain time and space complexity trade-offs."
      ],
      guidance: "Design questions are common at Bloomberg. Combine data structures (like maps, lists, and trees) to implement efficient lookup and update operations."
    },
    {
      name: "Onsite System Design",
      type: "System Design",
      duration: "60 mins",
      icon: "🌐",
      desc: "Designing real-time message streams, low-latency publish-subscribe systems, and database replication.",
      topics: ["Pub-Sub Systems", "Low Latency", "WebSockets"],
      questions: [
        "Design a Real-Time Stock Price Feed (Publish-Subscribe Architecture)",
        "Design a Chat Application (WebSockets, message storage, status indicators)",
        "Design a Distributed Job Scheduler (Locking, reliability)"
      ],
      concepts: [
        "Publish-Subscribe pattern, message brokers (Kafka, RabbitMQ)",
        "Low-latency connection management (TCP, WebSockets)",
        "Database replication models and caching patterns"
      ],
      expectations: [
        "Design low-latency architectures.",
        "Manage connection state and message ordering.",
        "Implement fault-tolerant designs."
      ],
      guidance: "Focus on latency, message ordering, and high-frequency updates. Address system architecture and message delivery strategies."
    },
    {
      name: "HR & Hiring Manager Round",
      type: "Behavioral",
      duration: "45 mins",
      icon: "🤝",
      desc: "Interest in financial software, adaptability, teamwork, project deep-dive, and cultural fit.",
      topics: ["Interest in Bloomberg", "Teamwork", "Work Ethic"],
      questions: [
        "Why Bloomberg? How does our work interest you?",
        "Tell me about a project where you solved a complex technical issue.",
        "How do you handle team disagreements regarding technical choices?"
      ],
      expectations: [
        "Show interest in financial software systems.",
        "Explain past technical projects clearly.",
        "Demonstrate collaborative conflict resolution."
      ],
      guidance: "Understand Bloomberg's product line. Highlight interest in real-time systems, data analysis, and collaboration."
    }
  ],
  uber: [
    {
      name: "Online Assessment / Phone Screen",
      type: "Coding / Algorithmic",
      duration: "60-90 mins",
      icon: "🚗",
      desc: "Solve 2 hard algorithmic questions. Heavy emphasis on spatial geometry, grids, or graphs.",
      topics: ["Graphs", "Matrix / 2D Arrays", "Geometry"],
      questions: [
        "Minesweeper (LeetCode 529)",
        "Robot Room Cleaner (LeetCode 489)",
        "Alien Dictionary (LeetCode 269)"
      ],
      expectations: [
        "Correct implementation of hard graph and grid search algorithms.",
        "Optimal time complexity solution design.",
        "Handle edge cases and coordinate logic cleanly."
      ],
      guidance: "Prepare for graph search, topological sort, and matrix traversal algorithms."
    },
    {
      name: "Onsite Coding 1: Algorithms & Graphs",
      type: "Coding & DSA",
      duration: "60 mins",
      icon: "🗺️",
      desc: "Solving advanced graph algorithms (e.g. shortest path) and interval management.",
      topics: ["Dijkstra / BFS", "Topological Sort", "Intervals"],
      questions: [
        "Network Delay Time (LeetCode 743)",
        "Employee Free Time (LeetCode 759)",
        "Shortest Path in a Grid (LeetCode 1293)"
      ],
      expectations: [
        "Write clean graph algorithms under time constraints.",
        "Explain data structure choices (e.g. Priority Queue vs Heap).",
        "Formulate time complexity constraints."
      ],
      guidance: "Focus on shortest path, topological sorting, and interval algorithms. Optimize complexity using heaps or queue tracking."
    },
    {
      name: "Onsite Coding 2: Concurrency",
      type: "System Coding",
      duration: "60 mins",
      icon: "🧵",
      desc: "Designing thread-safe classes, rate limiters, concurrent workers, or in-memory lock managers.",
      topics: ["Multithreading", "Thread Safety", "Rate Limiter Design"],
      questions: [
        "Design a Distributed Rate Limiter (Token bucket, thread safety)",
        "Implement a Thread-Safe In-Memory Cache with eviction",
        "Design a task execution queue with thread pool execution"
      ],
      expectations: [
        "Write compilable, thread-safe concurrency primitives.",
        "Prevent race conditions and deadlock hazards.",
        "Understand mutex locks, condition variables, and thread communication."
      ],
      guidance: "Write clean concurrency code. Ensure proper lock management, atomic operations, and exception handling."
    },
    {
      name: "Onsite System Design",
      type: "System Design",
      duration: "60 mins",
      icon: "🌍",
      desc: "Designing highly dynamic, location-aware systems (e.g. real-time ride matching, geofencing, payment settlement).",
      topics: ["Geofencing / Spatial DB", "Kafka / Messaging", "Cache Layer"],
      questions: [
        "Design a Real-Time Ride Matching Service (Uber Ride Hailing)",
        "Design a Location Tracking Service for drivers (Ingestion, spatial databases)",
        "Design a Distributed Payment Gateway (Reliable ledger, transactional safety)"
      ],
      concepts: [
        "Spatial indexing (S2 library, H3 hexagonal grid, R-trees)",
        "Kafka for real-time location streaming",
        "Redis for location caching",
        "Distributed transactions and consistency models"
      ],
      expectations: [
        "Design scalable, low-latency location tracking systems.",
        "Choose correct database engines (e.g., PostGIS, Redis).",
        "Ensure transaction safety for payments."
      ],
      guidance: "Focus on location tracking, real-time matching, and scaling write-heavy ingestion services. Understand spatial indexing tools."
    },
    {
      name: "Behavioral: Go-Getter",
      type: "Behavioral",
      duration: "45 mins",
      icon: "💪",
      desc: "Handling high levels of ownership, speed-to-market trade-offs, and customer-obsessed execution.",
      topics: ["Ownership", "Speed vs Quality", "Customer Focus"],
      questions: [
        "Tell me about a project where you balanced code quality and a tight deadline.",
        "Describe a time you solved a customer-facing technical issue.",
        "How do you handle project challenges or roadblocks?"
      ],
      expectations: [
        "Focus on ownership and initiative.",
        "Make balanced decisions regarding speed vs code quality.",
        "Prioritize customer experience."
      ],
      guidance: "Highlight ownership, bias for action, and customer focus. Use the STAR structure."
    }
  ],
  adobe: [
    {
      name: "Online Assessment (OA)",
      type: "Coding & Aptitude",
      duration: "120 mins",
      icon: "📝",
      desc: "Aptitude and core CS multiple choice questions + 2 coding questions on arrays or dynamic programming.",
      topics: ["Aptitude", "Dynamic Programming", "Sorting/Searching"],
      questions: [
        "House Robber (LeetCode 198)",
        "Sort Colors (LeetCode 75)",
        "Explain Virtual Memory or Page Eviction Policies"
      ],
      expectations: [
        "Solve algorithmic tasks under time constraints.",
        "Demonstrate core CS knowledge (OS, DBMS, OOP).",
        "Pass hidden performance test cases."
      ],
      guidance: "Practice core CS multiple choice questions alongside algorithms. Allocate time to ensure you complete the coding section."
    },
    {
      name: "Technical Interview 1: DSA",
      type: "Coding & DSA",
      duration: "45-60 mins",
      icon: "💻",
      desc: "Focuses on writing clean, compilable, and modular code on trees, recursion, stacks, or linked lists.",
      topics: ["Trees", "Recursion", "Stacks/Queues", "Linked Lists"],
      questions: [
        "Path Sum II (LeetCode 113)",
        "Implement Queue using Stacks (LeetCode 225)",
        "Reverse Linked List (LeetCode 206)"
      ],
      expectations: [
        "Write clean, modular code with descriptive variable names.",
        "Analyze time and space complexity.",
        "Step through the code logic."
      ],
      guidance: "Write clean, modular code for recursive structures. Test your logic with boundary conditions."
    },
    {
      name: "Technical Interview 2: System & OOP",
      type: "OOD & OS Concepts",
      duration: "45-60 mins",
      icon: "⚙️",
      desc: "Deep dive into operating system concepts (concurrency, threads, memory) and Low-Level / Object-Oriented Design.",
      topics: ["OS Concurrency", "Class Design", "Design Patterns"],
      questions: [
        "Design a Document Editor with undo/redo capabilities (Command Pattern)",
        "Explain Operating System Mutexes vs Semaphores",
        "Design an Online Book Reader (Class models, encapsulation)"
      ],
      concepts: [
        "SOLID Design Principles",
        "OOD patterns (Command, Observer, Singleton)",
        "Thread synchronization, processes vs threads, deadlock"
      ],
      expectations: [
        "Apply SOLID principles and design patterns.",
        "Explain OS concurrency and synchronization concepts.",
        "Draw class relationships clearly."
      ],
      guidance: "Use OOD patterns to implement flexible structures. Be prepared to answer questions on thread synchronization, processes, and memory management."
    },
    {
      name: "Managerial Round",
      type: "Behavioral & Fit",
      duration: "45 mins",
      icon: "👔",
      desc: "Prior project architecture discussion, situational leadership questions, and product alignment.",
      topics: ["Prior Projects", "Leadership Scenarios", "Culture Fit"],
      questions: [
        "Discuss the architecture of a past project. What were the key trade-offs?",
        "How do you handle changing product requirements from management?",
        "Tell me about a time you mentored a junior engineer."
      ],
      expectations: [
        "Explain past project architecture and trade-offs.",
        "Demonstrate adaptability and leadership skills.",
        "Align with Adobe's values."
      ],
      guidance: "Prepare to discuss past project architectures and trade-offs. Highlight collaboration, mentoring, and alignment with company goals."
    }
  ],
  airbnb: [
    {
      name: "Coding Screen",
      type: "Coding & DSA",
      duration: "60 mins",
      icon: "🏡",
      desc: "1-2 coding problems, usually recursion or graph search (e.g. autocomplete, Boggle, tree matching).",
      topics: ["Recursion/DFS", "Tries", "Hash Maps"],
      questions: [
        "Word Search (LeetCode 79)",
        "Boggle Game Solver (Backtracking)",
        "Design Search Autocomplete System (Trie structures)"
      ],
      expectations: [
        "Correct implementation of backtracking algorithms.",
        "Perform runtime complexity analysis.",
        "Handle edge cases and coordinate logic cleanly."
      ],
      guidance: "Prepare for backtracking, DFS, and Trie search algorithms. Ensure your recursive logic is clean."
    },
    {
      name: "Onsite Coding 1: Algorithmic",
      type: "Coding & DSA",
      duration: "45 mins",
      icon: "💻",
      desc: "Algorithmic design focusing on backtracking, dynamic programming, or custom data structures.",
      topics: ["Backtracking", "Dynamic Programming", "Design"],
      questions: [
        "Palindrome Partitioning (LeetCode 131)",
        "House Robber II (LeetCode 213)",
        "Design a Hit Counter (LeetCode 362)"
      ],
      expectations: [
        "Select the correct algorithmic approach (e.g. DP vs sliding window).",
        "Write clean, modular code.",
        "Explain trade-offs clearly."
      ],
      guidance: "Focus on optimization, dynamic programming, and custom structures. Verify base cases in recursion."
    },
    {
      name: "Onsite Coding 2: Concurrency/Systems",
      type: "Practical System Code",
      duration: "60 mins",
      icon: "🧵",
      desc: "Write fully functioning system-level code (e.g. thread-safe caching library, rate limiter, task scheduler).",
      topics: ["Thread Safety", "Object Oriented Code", "Exception Handling"],
      questions: [
        "Implement a Thread-Safe Rate Limiter (Token bucket)",
        "Design and implement a Concurrent Task Scheduler with retry policies",
        "Write a Thread-Safe In-Memory Key-Value store with TTL"
      ],
      expectations: [
        "Write thread-safe, compilable class code.",
        "Prevent race conditions and deadlock issues.",
        "Implement exception handling."
      ],
      guidance: "Focus on writing clean concurrent systems. Ensure proper synchronization, atomic structures, and exception handling."
    },
    {
      name: "Onsite System Design",
      type: "System Design",
      duration: "60 mins",
      icon: "🌍",
      desc: "Design a booking system, check-in scheduler, inventory tracker, or search ranking infra.",
      topics: ["Booking Architecture", "Inventory Locking", "Scale & Latency"],
      questions: [
        "Design Airbnb Booking & Reservation Engine (Transactional safety, concurrent locking)",
        "Design a Search & Pricing Engine (Geofencing, search query indexing)",
        "Design a system like Airbnb Photo Upload & Storage pipeline"
      ],
      concepts: [
        "Distributed lock mechanisms (Redis, ZooKeeper)",
        "Spatial search indexing (Elasticsearch, Geohash indices)",
        "Consistent database transactions and isolation levels",
        "Object storage and CDN delivery"
      ],
      expectations: [
        "Design transactional reservation systems with inventory locks.",
        "Choose correct database storage solutions.",
        "Scale search query response time."
      ],
      guidance: "Address concurrency, locking, and spatial search indexing. Explain data schemas and database choices."
    },
    {
      name: "Core Values Round",
      type: "Behavioral",
      duration: "45 mins",
      icon: "❤️",
      desc: "Extremely rigorous check for Airbnb core values (Be a Host, Champion the Mission, Be a Cereal Entrepreneur).",
      topics: ["Core Values", "Host Mindset", "Entrepreneurship"],
      questions: [
        "How do you align with Airbnb's mission of creating a world where anyone can belong anywhere?",
        "Describe a time you solved a customer problem using an unconventional approach (Be a Cereal Entrepreneur).",
        "Tell me about a time you helped someone feel welcomed and hosted in a professional setting."
      ],
      expectations: [
        "Align with Airbnb values.",
        "Show adaptability and initiative.",
        "Explain stories with clear impact."
      ],
      guidance: "Understand Airbnb's core values memo. Emphasize teamwork, user empathy, and passion for the product."
    }
  ]
};

export const GENERIC_FALLBACK_ROUNDS: InterviewRound[] = [
  {
    name: "Online Assessment (OA) / Technical Screen",
    type: "Coding Screen",
    duration: "45-60 mins",
    icon: "💻",
    desc: "Initial screening loop testing core syntax, basic data structures (Arrays, Strings), and time-space analysis.",
    topics: ["Arrays", "Strings", "Hash Maps"],
    questions: [
      "Two Sum (LeetCode 1)",
      "Valid Parentheses (LeetCode 20)",
      "Group Anagrams (LeetCode 49)"
    ],
    expectations: [
      "Write correct syntax quickly.",
      "Analyze time and space complexity.",
      "Dry-run code manually."
    ],
    guidance: "Focus on syntax, write trace tables, and ensure you cover edge cases."
  },
  {
    name: "Technical Onsite: Algorithms & DSA",
    type: "Coding & DSA",
    duration: "45-60 mins",
    icon: "🧩",
    desc: "Solving standard algorithmic problems on trees, graphs, sorting/searching, or recursion.",
    topics: ["Trees", "BFS/DFS", "Recursion", "Binary Search"],
    questions: [
      "Lowest Common Ancestor of a Binary Tree (LeetCode 236)",
      "Clone Graph (LeetCode 133)",
      "Search in Rotated Sorted Array (LeetCode 33)"
    ],
    expectations: [
      "Navigate data structures using optimal searches.",
      "Write clean recursion base cases.",
      "Understand space-time trade-offs."
    ],
    guidance: "Clarify input bounds before coding. Explain your approach and outline base cases."
  },
  {
    name: "Technical Onsite: System / Low-Level Design",
    type: "Design & OOP",
    duration: "45-60 mins",
    icon: "📐",
    desc: "Design database schemas, class relationships, object models, or high-level architecture diagrams.",
    topics: ["Class Design", "DB Schema", "API Design"],
    questions: [
      "Design a Parking Lot (OOD)",
      "Design a URL Shortener (System Design)",
      "Design a Rate Limiter"
    ],
    concepts: [
      "SOLID principles",
      "Database design rules",
      "API signatures"
    ],
    expectations: [
      "Apply SOLID principles and design patterns.",
      "Outline database structures.",
      "Explain scaling trade-offs."
    ],
    guidance: "Identify requirements first. Outline classes or components before explaining schemas."
  },
  {
    name: "Behavioral & Fit Round",
    type: "Behavioral",
    duration: "30-45 mins",
    icon: "🤝",
    desc: "Past project deep dive, team collaboration scenarios, conflict resolution, and general corporate fit.",
    topics: ["Prior Experience", "Teamwork", "Career Alignment"],
    questions: [
      "Tell me about a project you led. What were the challenges?",
      "Describe a technical conflict you resolved.",
      "Why are you interested in this role?"
    ],
    expectations: [
      "Demonstrate teamwork and collaboration skills.",
      "Explain past technical projects clearly.",
      "Explain career goals."
    ],
    guidance: "Use the STAR method. Focus on teamwork, ownership, and learning."
  }
];

export function getCompanyRounds(slug: string): InterviewRound[] {
  const key = String(slug).toLowerCase().trim();
  if (COMPANY_ROUNDS[key]) {
    return COMPANY_ROUNDS[key];
  }
  return GENERIC_FALLBACK_ROUNDS;
}
