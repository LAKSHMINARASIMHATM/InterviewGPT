const fs = require('fs');
const path = require('path');

const problems = require('./data/problems.js');
let descriptions = require('./data/descriptions.js');
const allData = require('./leetcode_problems.json');

const missing = problems.filter(x => !descriptions[x.id]);

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
    console.log(`Found ${missing.length} missing problems.`);
    
    for (let i = 0; i < missing.length; i++) {
        const m = missing[i];
        let leetcodeProblem = allData.find(x => x.id === m.id);
        if (!leetcodeProblem || m.id === 426) {
             leetcodeProblem = allData.find(x => x.title === m.title);
        }
        
        const titleSlug = leetcodeProblem ? leetcodeProblem.slug : m.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        console.log(`Fetching ${m.id}: ${m.title} (slug: ${titleSlug})...`);
        
        try {
            const questionData = await fetchQuestion(titleSlug);
            if (questionData && questionData.content) {
                descriptions[m.id] = {
                    content: questionData.content,
                    testcase: questionData.exampleTestcases || "1\n2"
                };
            } else {
                console.log(`  -> Content not found for ${m.id} (might be premium/locked). Adding placeholder.`);
                descriptions[m.id] = {
                    content: `<p><b>${m.title}</b> is a premium problem. The problem statement is not available.</p>`,
                    testcase: "1\n2"
                };
            }
        } catch (err) {
            console.error(`  -> Error fetching ${m.id}:`, err.message);
            descriptions[m.id] = {
                content: `<p>Error loading statement for ${m.title}.</p>`,
                testcase: "1\n2"
            };
        }
        
        // Wait a bit to avoid rate limiting
        await new Promise(r => setTimeout(r, 1500));
    }
    
    const output = `const DESCRIPTIONS = ${JSON.stringify(descriptions, null, 2)};\n\nmodule.exports = DESCRIPTIONS;\n`;
    fs.writeFileSync(path.join(__dirname, 'data', 'descriptions.js'), output);
    console.log('Successfully updated data/descriptions.js!');
}

run();
