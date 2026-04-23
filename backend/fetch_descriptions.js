const fs = require('fs');
const path = require('path');
const PROBLEMS = require('./data/problems');

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

function toSlug(title) {
    // Custom overrides for known mismatches in our database vs LeetCode
    const overrides = {
        "Longest Substring Without Repeating Chars": "longest-substring-without-repeating-characters",
        "Find the Index of the First Occurrence": "find-the-index-of-the-first-occurrence-in-a-string",
        "Two Sum II — Input Array Is Sorted": "two-sum-ii-input-array-is-sorted",
        "Range Sum Query — Immutable": "range-sum-query-immutable",
        "Range Sum Query 2D — Immutable": "range-sum-query-2d-immutable",
        "Range Sum Query — Mutable": "range-sum-query-mutable",
        "Insert Delete GetRandom O(1) — Duplicates": "insert-delete-getrandom-o1-duplicates",
        "Two Sum IV — Input is a BST": "two-sum-iv-input-is-a-bst"
    };

    if (overrides[title]) return overrides[title];

    return title.toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-');
}

async function fetchLeetCodeData() {
    const descriptions = {};
    const total = PROBLEMS.length;
    let successCount = 0;
    
    console.log(`Starting fetch for ${total} problems...`);

    for (let i = 0; i < total; i++) {
        const p = PROBLEMS[i];
        const slug = toSlug(p.title);
        
        try {
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
                    variables: { titleSlug: slug }
                })
            });
            const data = await res.json();
            
            if (data?.data?.question?.content) {
                const q = data.data.question;
                descriptions[p.id] = {
                    content: q.content,
                    testcase: q.exampleTestcases
                };
                successCount++;
                console.log(`[${i+1}/${total}] Success: ${p.title} (${slug})`);
            } else {
                console.log(`[${i+1}/${total}] Not found: ${p.title} (${slug})`);
            }
        } catch (e) {
            console.log(`[${i+1}/${total}] Error: ${p.title} - ${e.message}`);
        }
        
        // Rate limiting
        await sleep(300);
    }
    
    const fileContent = `const DESCRIPTIONS = ${JSON.stringify(descriptions, null, 2)};\n\nmodule.exports = DESCRIPTIONS;`;
    fs.writeFileSync(path.join(__dirname, 'data', 'descriptions.js'), fileContent);
    
    console.log(`\nFinished! Successfully fetched ${successCount} out of ${total} problems.`);
}

fetchLeetCodeData();
