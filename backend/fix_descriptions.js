const fs = require('fs');
const path = require('path');

const problems = require('./data/problems.js');
let descriptions = require('./data/descriptions.js');
const allData = require('./leetcode_problems.json');

// Exact or partial matches
const customMappings = {
    "Find the Index of the First Occurrence": "find-the-index-of-the-first-occurrence-in-a-string",
    "Find First and Last Position of Element": "find-first-and-last-position-of-element-in-sorted-array",
    "Range Sum Query 2D — Immutable": "range-sum-query-2d-immutable",
    "Range Sum Query — Immutable": "range-sum-query-immutable",
    "Range Sum Query — Mutable": "range-sum-query-mutable",
    "Two Sum II — Input Array Is Sorted": "two-sum-ii-input-array-is-sorted",
    "Two Sum IV — Input is a BST": "two-sum-iv-input-is-a-bst"
};

const toFetch = [];

for (const p of problems) {
    let slug = customMappings[p.title];
    if (!slug) {
        // Try exact title match
        const exact = allData.find(x => x.title === p.title);
        if (exact) {
            slug = exact.slug;
        } else {
            // Try title match ignoring case/spaces
            const normalizedP = p.title.toLowerCase().replace(/[^a-z0-9]/g, '');
            const fuzzy = allData.find(x => x.title.toLowerCase().replace(/[^a-z0-9]/g, '') === normalizedP);
            if (fuzzy) {
                slug = fuzzy.slug;
            } else {
                // Fallback to basic slugifier
                slug = p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
            }
        }
    }
    
    // Check if current description seems wrong
    // A simple check: if the problem ID mismatch is one of the 74, it's definitely wrong if we fetched it by ID.
    // Let's just re-fetch for ALL 74 known mismatches, PLUS any where we suspect the current content is wrong.
    
    // We will just re-fetch if it's one of the known 74 mismatches.
    const foundById = allData.find(x => x.id === p.id);
    const isMismatch = foundById && foundById.title !== p.title;
    
    // Or if the content contains the wrong title
    const content = descriptions[p.id] ? descriptions[p.id].content : "";
    
    if (isMismatch || !descriptions[p.id] || content.includes("Error loading") || content.includes("not available")) {
        toFetch.push({ id: p.id, title: p.title, slug });
    }
}

async function fetchQuestion(titleSlug) {
    const res = await fetch('https://leetcode.com/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'User-Agent': 'Mozilla/5.0' },
        body: JSON.stringify({
            query: `
            query questionData($titleSlug: String!) {
              question(titleSlug: $titleSlug) {
                content
                exampleTestcases
              }
            }`,
            variables: { titleSlug }
        })
    });
    const data = await res.json();
    return data.data.question;
}

async function run() {
    console.log(`Need to fetch/fix ${toFetch.length} problems...`);
    
    for (let i = 0; i < toFetch.length; i++) {
        const m = toFetch[i];
        console.log(`Fetching ${m.id}: ${m.title} (slug: ${m.slug})...`);
        
        try {
            const questionData = await fetchQuestion(m.slug);
            if (questionData && questionData.content) {
                descriptions[m.id] = {
                    content: questionData.content,
                    testcase: questionData.exampleTestcases || "1\n2"
                };
            } else {
                console.log(`  -> Content not found (premium/locked).`);
                descriptions[m.id] = {
                    content: `<p><b>${m.title}</b> is a premium problem. The problem statement is not available.</p>`,
                    testcase: "1\n2"
                };
            }
        } catch (err) {
            console.error(`  -> Error fetching ${m.id}:`, err.message);
        }
        
        await new Promise(r => setTimeout(r, 1000));
    }
    
    const output = `const DESCRIPTIONS = ${JSON.stringify(descriptions, null, 2)};\n\nmodule.exports = DESCRIPTIONS;\n`;
    fs.writeFileSync(path.join(__dirname, 'data', 'descriptions.js'), output);
    console.log('Successfully fixed descriptions.js!');
}

run();
