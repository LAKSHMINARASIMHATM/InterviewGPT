const COMPANY_ROUNDS = {
    google: [
        {
            name: "Online Assessment (OA) / Phone Screen",
            type: "Coding",
            duration: "45-60 mins",
            icon: "💻",
            desc: "Initial screening with 1-2 coding problems. Tests basic data structures, speed, and coding hygiene.",
            topics: ["Arrays", "Strings", "Hash Maps", "Simulation"]
        },
        {
            name: "Technical Onsite: Algorithmic Depth",
            type: "Coding & DSA",
            duration: "45 mins",
            icon: "🌲",
            desc: "Focuses on deep algorithmic knowledge, scaling, and optimization. Be ready for advanced graphs, trees, or recursion.",
            topics: ["Trees & Graphs", "Heaps", "DFS/BFS", "Binary Search"]
        },
        {
            name: "Technical Onsite: Problem Solving",
            type: "Coding & DSA",
            duration: "45 mins",
            icon: "🧩",
            desc: "Focuses on logic, mathematical reasoning, and optimization. Commonly features backtracking or dynamic programming.",
            topics: ["Dynamic Programming", "Backtracking", "Two Pointers", "Math"]
        },
        {
            name: "Technical Onsite: System Design",
            type: "System Design",
            duration: "45 mins",
            icon: "🏗️",
            desc: "Assess ability to design scalable distributed systems, define clean APIs, database schemas, and identify bottlenecks (for L4+).",
            topics: ["API Design", "Caching", "Load Balancing", "Sharding"]
        },
        {
            name: "Googliness & Leadership",
            type: "Behavioral",
            duration: "45 mins",
            icon: "🌟",
            desc: "Evaluating cultural alignment, response to ambiguity, feedback receipt, ethical behavior, and team collaboration.",
            topics: ["Ambiguity", "Conflict Resolution", "Teamwork", "Ownership"]
        }
    ],
    amazon: [
        {
            name: "Online Assessment (OA)",
            type: "Coding & Work Style",
            duration: "90 mins",
            icon: "📝",
            desc: "2 coding questions focused on debugging/DSA, followed by a simulated work scenario and work style assessment.",
            topics: ["Data Structures", "Simulation", "Logical Reasoning"]
        },
        {
            name: "Technical Loop: Coding & LP",
            type: "Coding & DSA",
            duration: "60 mins",
            icon: "💻",
            desc: "Data structures & algorithms (e.g. Arrays, Trees, Hash Maps) combined with 15-20 minutes of Behavioral questions based on Amazon's Leadership Principles.",
            topics: ["Arrays/Strings", "Hash Maps", "Leadership Principles"]
        },
        {
            name: "Technical Loop: OOP & System Design",
            type: "Design & LP",
            duration: "60 mins",
            icon: "📐",
            desc: "Object-oriented design, class relationships, design patterns, or high-level system design, plus heavy focus on Leadership Principles.",
            topics: ["OOD / Class Design", "System Architecture", "Leadership Principles"]
        },
        {
            name: "Bar Raiser Round",
            type: "Deep Tech & LP",
            duration: "60 mins",
            icon: "🚀",
            desc: "Led by an independent 'Bar Raiser' interviewer. Focuses on architectural trade-offs, deep system design, and rigorous validation of core Leadership Principles.",
            topics: ["Distributed Systems", "Scaling", "Leadership Principles"]
        }
    ],
    microsoft: [
        {
            name: "Codility OA / Phone Screen",
            type: "Coding Screen",
            duration: "60-90 mins",
            icon: "💻",
            desc: "2-3 coding problems on the Codility platform. Tests basic algorithms, edge cases, and code correctness.",
            topics: ["Arrays", "Strings", "Stacks/Queues", "Greedy"]
        },
        {
            name: "Technical Onsite: Core CS",
            type: "Coding & DSA",
            duration: "45 mins",
            icon: "🧩",
            desc: "Focuses on core computer science fundamentals. Coding questions on pointers, lists, recursion, or binary trees.",
            topics: ["Linked Lists", "Trees", "Recursion", "Binary Search"]
        },
        {
            name: "Technical Onsite: OOP & Code Quality",
            type: "Coding & Design",
            duration: "45 mins",
            icon: "🏛️",
            desc: "Object-Oriented Design (OOD), class relationships, code design patterns, readability, and write-once correctness.",
            topics: ["Class Design", "Design Patterns", "Clean Code"]
        },
        {
            name: "Technical Onsite: System Architecture",
            type: "System Design",
            duration: "45 mins",
            icon: "🏗️",
            desc: "Designing large-scale distributed systems, database choices (SQL vs NoSQL), load balancing, caching, and recovery.",
            topics: ["Distributed Databases", "Caching", "CDN", "Message Queues"]
        },
        {
            name: "Behavioral & Fit",
            type: "Behavioral",
            duration: "45 mins",
            icon: "🤝",
            desc: "General fit, passion for technology, career growth, team dynamics, and conflict resolution.",
            topics: ["Teamwork", "Career Goals", "Conflict Management"]
        }
    ],
    meta: [
        {
            name: "Technical Phone Screen",
            type: "Fast-Paced Coding",
            duration: "45 mins",
            icon: "📞",
            desc: "2 coding questions (usually sourced from high frequency Meta tag). Requires rapid coding and optimal solution development.",
            topics: ["Arrays/Strings", "Two Pointers", "Sliding Window"]
        },
        {
            name: "Onsite Coding 1",
            type: "Coding & DSA",
            duration: "45 mins",
            icon: "💻",
            desc: "High-efficiency algorithmic design. Heavy focus on graphs, trees, and tree traversals.",
            topics: ["Graphs", "Trees", "BFS/DFS", "Heaps"]
        },
        {
            name: "Onsite Coding 2",
            type: "Coding & DSA",
            duration: "45 mins",
            icon: "⚡",
            desc: "Solving complex structures, space-time optimization, and backtracking.",
            topics: ["Dynamic Programming", "Backtracking", "Tries", "Design Questions"]
        },
        {
            name: "Onsite System Design / Product Design",
            type: "System Design",
            duration: "45 mins",
            icon: "🌐",
            desc: "Designing a large-scale system or app features (e.g. Instagram Feed, Messenger, WhatsApp). Focus on API, database schema, and horizontal scaling.",
            topics: ["API Design", "DB Schema", "Scaling", "Caching"]
        },
        {
            name: "Behavioral (Jedi) Round",
            type: "Behavioral",
            duration: "45 mins",
            icon: "🧘",
            desc: "Collaboration, resolving conflicts, empathy, learning from mistakes, and driving cross-functional impact.",
            topics: ["Collaboration", "Conflict Resolution", "Growth Mindset"]
        }
    ],
    apple: [
        {
            name: "Technical Phone Screen",
            type: "Coding & Fundamentals",
            duration: "45-60 mins",
            icon: "📞",
            desc: "Low-level programming fundamentals (concurrency, memory management, OS threads) + a medium coding question.",
            topics: ["Concurrency", "OS Concepts", "Bit Manipulation", "Arrays"]
        },
        {
            name: "Onsite Coding: Algorithmic DSA",
            type: "Coding & DSA",
            duration: "45 mins",
            icon: "🍎",
            desc: "Algorithmic problem-solving with high standards for clean code, readability, testing, and edge case handling.",
            topics: ["Trees", "Hash Maps", "Two Pointers", "Sorting"]
        },
        {
            name: "Onsite: Language & Runtime Internals",
            type: "Language Deep Dive",
            duration: "45 mins",
            icon: "⚙️",
            desc: "Deep dive into language runtime (e.g. C++ compiler internals, Java JVM, Swift memory management) and low-level detail.",
            topics: ["Language Internals", "Memory Management", "Multithreading"]
        },
        {
            name: "Onsite System Design",
            type: "Architecture",
            duration: "45 mins",
            icon: "📐",
            desc: "System architecture, distributed databases, hardware integration, or low-level design constraints.",
            topics: ["Distributed Systems", "Hardware/Software Co-design", "Caching"]
        },
        {
            name: "Behavioral & Apple Culture Fit",
            type: "Behavioral",
            duration: "45 mins",
            icon: "✨",
            desc: "Alignment with Apple values, attention to detail, passion for user experience, and cross-functional communication.",
            topics: ["Apple Values", "Detail Orientation", "Collaboration"]
        }
    ],
    netflix: [
        {
            name: "Initial Technical Screen",
            type: "Coding & Architecture",
            duration: "60 mins",
            icon: "🎬",
            desc: "Practical coding problem followed by a high-level system design discussion.",
            topics: ["Real-world coding", "System Overview"]
        },
        {
            name: "Onsite Tech: DSA",
            type: "Coding & DSA",
            duration: "45 mins",
            icon: "🍿",
            desc: "Algorithmic problem solving focusing on clean parsing, string processing, and basic graph/search logic.",
            topics: ["Strings", "Graphs", "Sorting/Searching"]
        },
        {
            name: "Onsite Tech: System Design & Scalability",
            type: "System Design",
            duration: "45 mins",
            icon: "📡",
            desc: "Designing streaming video delivery, content delivery networks (CDNs), high traffic caching, and fault-tolerant microservices.",
            topics: ["CDN", "Microservices", "Fault Tolerance", "Caching"]
        },
        {
            name: "Culture & Values 1",
            type: "Cultural Interview",
            duration: "45 mins",
            icon: "📕",
            desc: "Deep exploration of the Netflix Freedom & Responsibility culture memo. Alignment with Keeper Test.",
            topics: ["Freedom & Responsibility", "Keeper Test", "Decision Making"]
        },
        {
            name: "Culture & Values 2 / Hiring Manager",
            type: "Leadership & Fit",
            duration: "45 mins",
            icon: "🏆",
            desc: "Leadership alignment, giving/receiving direct feedback, handling feedback, and organizational impact.",
            topics: ["Feedback Culture", "Prioritization", "Growth"]
        }
    ],
    bloomberg: [
        {
            name: "Phone Screen",
            type: "Coding & Fundamentals",
            duration: "45-60 mins",
            icon: "📞",
            desc: "Coding questions on strings, linked lists, or maps + basic questions on OOP, multithreading, or language features.",
            topics: ["Strings", "Linked Lists", "OOP Principles"]
        },
        {
            name: "Onsite Coding: Custom Data Structures",
            type: "Coding & Design",
            duration: "60 mins",
            icon: "📊",
            desc: "Implementing custom data structures under time constraints (e.g. designing stock tickers, custom order books, or LRU cache).",
            topics: ["LRU Cache", "Custom OOP Design", "Hash Maps", "Stacks"]
        },
        {
            name: "Onsite System Design",
            type: "System Design",
            duration: "60 mins",
            icon: "🌐",
            desc: "Designing real-time message streams, low-latency publish-subscribe systems, and database replication.",
            topics: ["Pub-Sub Systems", "Low Latency", "WebSockets"]
        },
        {
            name: "HR & Hiring Manager Round",
            type: "Behavioral",
            duration: "45 mins",
            icon: "🤝",
            desc: "Interest in financial software, adaptability, teamwork, project deep-dive, and cultural fit.",
            topics: ["Interest in Bloomberg", "Teamwork", "Work Ethic"]
        }
    ],
    uber: [
        {
            name: "Online Assessment / Phone Screen",
            type: "Coding / Algorithmic",
            duration: "60-90 mins",
            icon: "🚗",
            desc: "Solve 2 hard algorithmic questions. Heavy emphasis on spatial geometry, grids, or graphs.",
            topics: ["Graphs", "Matrix / 2D Arrays", "Geometry"]
        },
        {
            name: "Onsite Coding 1: Algorithms & Graphs",
            type: "Coding & DSA",
            duration: "60 mins",
            icon: "🗺️",
            desc: "Solving advanced graph algorithms (e.g. shortest path) and interval management.",
            topics: ["Dijkstra / BFS", "Topological Sort", "Intervals"]
        },
        {
            name: "Onsite Coding 2: Concurrency",
            type: "System Coding",
            duration: "60 mins",
            icon: "🧵",
            desc: "Designing thread-safe classes, rate limiters, concurrent workers, or in-memory lock managers.",
            topics: ["Multithreading", "Thread Safety", "Rate Limiter Design"]
        },
        {
            name: "Onsite System Design",
            type: "System Design",
            duration: "60 mins",
            icon: "🌍",
            desc: "Designing highly dynamic, location-aware systems (e.g. real-time ride matching, geofencing, payment settlement).",
            topics: ["Geofencing / Spatial DB", "Kafka / Messaging", "Cache Layer"]
        },
        {
            name: "Behavioral: Go-Getter",
            type: "Behavioral",
            duration: "45 mins",
            icon: "💪",
            desc: "Handling high levels of ownership, speed-to-market trade-offs, and customer-obsessed execution.",
            topics: ["Ownership", "Speed vs Quality", "Customer Focus"]
        }
    ],
    adobe: [
        {
            name: "Online Assessment (OA)",
            type: "Coding & Aptitude",
            duration: "120 mins",
            icon: "📝",
            desc: "Aptitude and core CS multiple choice questions + 2 coding questions on arrays or dynamic programming.",
            topics: ["Aptitude", "Dynamic Programming", "Sorting/Searching"]
        },
        {
            name: "Technical Interview 1: DSA",
            type: "Coding & DSA",
            duration: "45-60 mins",
            icon: "💻",
            desc: "Focuses on writing clean, compilable, and modular code on trees, recursion, stacks, or linked lists.",
            topics: ["Trees", "Recursion", "Stacks/Queues", "Linked Lists"]
        },
        {
            name: "Technical Interview 2: System & OOP",
            type: "OOD & OS Concepts",
            duration: "45-60 mins",
            icon: "⚙️",
            desc: "Deep dive into operating system concepts (concurrency, threads, memory) and Low-Level / Object-Oriented Design.",
            topics: ["OS Concurrency", "Class Design", "Design Patterns"]
        },
        {
            name: "Managerial Round",
            type: "Behavioral & Fit",
            duration: "45 mins",
            icon: "👔",
            desc: "Prior project architecture discussion, situational leadership questions, and product alignment.",
            topics: ["Prior Projects", "Leadership Scenarios", "Culture Fit"]
        }
    ],
    airbnb: [
        {
            name: "Coding Screen",
            type: "Coding & DSA",
            duration: "60 mins",
            icon: "🏡",
            desc: "1-2 coding problems, usually recursion or graph search (e.g. autocomplete, Boggle, tree matching).",
            topics: ["Recursion/DFS", "Tries", "Hash Maps"]
        },
        {
            name: "Onsite Coding 1: Algorithmic",
            type: "Coding & DSA",
            duration: "45 mins",
            icon: "💻",
            desc: "Algorithmic design focusing on backtracking, dynamic programming, or custom data structures.",
            topics: ["Backtracking", "Dynamic Programming", "Design"]
        },
        {
            name: "Onsite Coding 2: Concurrency/Systems",
            type: "Practical System Code",
            duration: "60 mins",
            icon: "🧵",
            desc: "Write fully functioning system-level code (e.g. thread-safe caching library, rate limiter, task scheduler).",
            topics: ["Thread Safety", "Object Oriented Code", "Exception Handling"]
        },
        {
            name: "Onsite System Design",
            type: "System Design",
            duration: "60 mins",
            icon: "🌍",
            desc: "Design a booking system, check-in scheduler, inventory tracker, or search ranking infra.",
            topics: ["Booking Architecture", "Inventory Locking", "Scale & Latency"]
        },
        {
            name: "Core Values Round",
            type: "Behavioral",
            duration: "45 mins",
            icon: "❤️",
            desc: "Extremely rigorous check for Airbnb core values (Be a Host, Champion the Mission, Be a Cereal Entrepreneur).",
            topics: ["Core Values", "Host Mindset", "Entrepreneurship"]
        }
    ]
};

const GENERIC_FALLBACK_ROUNDS = [
    {
        name: "Online Assessment (OA) / Technical Screen",
        type: "Coding Screen",
        duration: "45-60 mins",
        icon: "💻",
        desc: "Initial screening loop testing core syntax, basic data structures (Arrays, Strings), and time-space analysis.",
        topics: ["Arrays", "Strings", "Hash Maps"]
    },
    {
        name: "Technical Onsite: Algorithms & DSA",
        type: "Coding & DSA",
        duration: "45-60 mins",
        icon: "🧩",
        desc: "Solving standard algorithmic problems on trees, graphs, sorting/searching, or recursion.",
        topics: ["Trees", "BFS/DFS", "Recursion", "Binary Search"]
    },
    {
        name: "Technical Onsite: System / Low-Level Design",
        type: "Design & OOP",
        duration: "45-60 mins",
        icon: "📐",
        desc: "Design database schemas, class relationships, object models, or high-level architecture diagrams.",
        topics: ["Class Design", "DB Schema", "API Design"]
    },
    {
        name: "Behavioral & Fit Round",
        type: "Behavioral",
        duration: "30-45 mins",
        icon: "🤝",
        desc: "Past project deep dive, team collaboration scenarios, conflict resolution, and general corporate fit.",
        topics: ["Prior Experience", "Teamwork", "Career Alignment"]
    }
];

function getCompanyRounds(slug) {
    const key = String(slug).toLowerCase().trim();
    if (COMPANY_ROUNDS[key]) {
        return COMPANY_ROUNDS[key];
    }
    return GENERIC_FALLBACK_ROUNDS;
}

module.exports = {
    COMPANY_ROUNDS,
    GENERIC_FALLBACK_ROUNDS,
    getCompanyRounds
};
