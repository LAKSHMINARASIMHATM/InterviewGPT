const express = require('express');
const cors = require('cors');
const PROBLEMS = require('./data/problems');
const COMPANIES = require('./data/companies');
const SOLUTIONS = require('./data/solutions');
const DESCRIPTIONS = require('./data/descriptions');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');
const crypto = require('crypto');

const app = express();
app.use(cors());
app.use(express.json());

// ── GET /api/problems ──────────────────────────────────────────────
// Query params: difficulty, topic, company, search, page, limit
app.get('/api/problems', (req, res) => {
    const { difficulty, topic, company, search, page = 1, limit = 30 } = req.query;
    let problems = [...PROBLEMS];

    if (difficulty && difficulty !== 'All') {
        problems = problems.filter(p => p.difficulty === difficulty);
    }
    if (topic && topic !== 'All') {
        problems = problems.filter(p => p.topics.includes(topic));
    }
    if (company && company !== 'All') {
        problems = problems.filter(p =>
            p.companies.some(c => c.toLowerCase() === company.toLowerCase())
        );
    }
    if (search) {
        const q = search.toLowerCase();
        problems = problems.filter(p =>
            p.title.toLowerCase().includes(q) ||
            String(p.id).includes(q) ||
            p.topics.toLowerCase().includes(q)
        );
    }

    const total = problems.length;
    const start = (parseInt(page) - 1) * parseInt(limit);
    const paginated = problems.slice(start, start + parseInt(limit));

    res.json({ problems: paginated, total, page: parseInt(page), totalPages: Math.ceil(total / parseInt(limit)) });
});

// ── GET /api/problems/:id ──────────────────────────────────────────
app.get('/api/problems/:id', (req, res) => {
    const problem = PROBLEMS.find(p => p.id === parseInt(req.params.id));
    if (!problem) return res.status(404).json({ error: 'Problem not found' });

    const solution = SOLUTIONS[problem.id] || {
        explanation: 'Detailed solution coming soon. Review the approach description above as a guide.',
        python: `# ${problem.approach}\n# Time: ${problem.time} | Space: ${problem.space}\n# Solution implementation pending`,
        java: `// ${problem.approach}\n// Time: ${problem.time} | Space: ${problem.space}\n// Solution implementation pending`,
        cpp: `// ${problem.approach}\n// Time: ${problem.time} | Space: ${problem.space}\n// Solution implementation pending`
    };

    const descData = DESCRIPTIONS[problem.id];
    let details = {};

    if (descData && descData.content) {
        details = {
            description: descData.content,
            testcases: descData.testcase
        };
    } else {
        details = {
            description: `<p>Implement the algorithm for <strong>${problem.title}</strong>.</p><p>This problem is typically asked by companies like ${problem.companies.join(', ')}.</p>`,
            examples: [
                { input: "Sample Input", output: "Sample Output", explanation: "Write code that takes the input and produces the correct output." }
            ],
            constraints: [
                "Time Complexity should be " + problem.time,
                "Space Complexity should be " + problem.space
            ]
        };
    }

    res.json({ ...problem, ...details, solution });
});

// ── GET /api/companies ─────────────────────────────────────────────
app.get('/api/companies', (req, res) => {
    const companiesWithCounts = COMPANIES.map(company => {
        const count = PROBLEMS.filter(p =>
            p.companies.some(c => c.toLowerCase() === company.name.toLowerCase())
        ).length;
        return { ...company, problemCount: count };
    });
    res.json(companiesWithCounts);
});

// ── GET /api/companies/:slug ───────────────────────────────────────
app.get('/api/companies/:slug', (req, res) => {
    const company = COMPANIES.find(c => c.slug === req.params.slug);
    if (!company) return res.status(404).json({ error: 'Company not found' });

    const problems = PROBLEMS.filter(p =>
        p.companies.some(c => c.toLowerCase() === company.name.toLowerCase())
    );

    // Sort by difficulty weight then id
    const order = { Hard: 0, Medium: 1, Easy: 2 };
    problems.sort((a, b) => order[a.difficulty] - order[b.difficulty]);

    res.json({ ...company, problems, problemCount: problems.length });
});

// ── GET /api/stats ─────────────────────────────────────────────────
app.get('/api/stats', (req, res) => {
    const easy = PROBLEMS.filter(p => p.difficulty === 'Easy').length;
    const medium = PROBLEMS.filter(p => p.difficulty === 'Medium').length;
    const hard = PROBLEMS.filter(p => p.difficulty === 'Hard').length;
    const allTopics = [...new Set(PROBLEMS.flatMap(p => p.topics.split(', ').map(t => t.trim())))];
    res.json({ total: PROBLEMS.length, easy, medium, hard, companies: COMPANIES.length, topics: allTopics.length });
});

// ── GET /api/topics ────────────────────────────────────────────────
app.get('/api/topics', (req, res) => {
    const topics = [...new Set(PROBLEMS.flatMap(p => p.topics.split(', ').map(t => t.trim())))].sort();
    res.json(topics);
});

// ── POST /api/execute ──────────────────────────────────────────────
app.post('/api/execute', async (req, res) => {
    const { language, files, stdin } = req.body;
    if (!files || files.length === 0) return res.status(400).json({ error: 'No code provided' });
    
    const code = files[0].content;
    const compilerMap = {
        'python': 'cpython-3.14.0',
        'java': 'openjdk-jdk-22+36',
        'cpp': 'gcc-head'
    };
    
    const compiler = compilerMap[language];
    if (!compiler) return res.status(400).json({ error: 'Unsupported language' });

    try {
        const response = await fetch('https://wandbox.org/api/compile.json', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                compiler: compiler,
                code: code,
                stdin: stdin || '',
                save: false
            })
        });
        
        const data = await response.json();
        const isError = data.status !== "0";
        const stderr = data.compiler_error || data.program_error || '';
        const stdout = data.program_output || '';
        const output = (data.compiler_message || '') + (data.program_message || '');
        
        res.json({
            run: {
                output: output || stdout || stderr,
                code: isError ? 1 : 0,
                stderr: stderr
            },
            compile: { stderr: data.compiler_error || '' }
        });
    } catch (err) {
        res.status(500).json({ error: 'Execution failed: ' + err.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅  Backend running on http://localhost:${PORT}`));
