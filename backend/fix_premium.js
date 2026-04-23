const fs = require('fs');
const path = require('path');

const problems = require('./data/problems.js');
let descriptions = require('./data/descriptions.js');

// Manually map problem IDs to correct LeetCode slugs for all 47 that failed
const slugMap = {
    3: "longest-substring-without-repeating-characters",
    103: "binary-tree-zigzag-level-order-traversal",
    105: "construct-binary-tree-from-preorder-and-inorder-traversal",
    106: "construct-binary-tree-from-inorder-and-postorder-traversal",
    108: "convert-sorted-array-to-binary-search-tree",
    109: "convert-sorted-list-to-binary-search-tree",
    116: "populating-next-right-pointers-in-each-node",
    117: "populating-next-right-pointers-in-each-node-ii",
    163: "missing-ranges",
    211: "design-add-and-search-words-data-structure",
    235: "lowest-common-ancestor-of-a-binary-search-tree",
    236: "lowest-common-ancestor-of-a-binary-tree",
    269: "alien-dictionary",
    270: "closest-binary-search-tree-value",
    271: "encode-and-decode-strings",
    280: "wiggle-sort",
    285: "inorder-successor-in-bst",
    286: "walls-and-gates",
    305: "number-of-islands-ii",
    323: "number-of-connected-components-in-an-undirected-graph",
    325: "maximum-size-subarray-sum-equals-k",
    339: "nested-list-weight-sum",
    340: "longest-substring-with-at-most-k-distinct-characters",
    348: "design-tic-tac-toe",
    360: "sort-transformed-array",
    362: "design-hit-counter",
    366: "find-leaves-of-binary-tree",
    381: "insert-delete-getrandom-o1-duplicates-allowed",
    395: "longest-substring-with-at-least-k-repeating-characters",
    408: "valid-word-abbreviation",
    418: "sentence-screen-fitting",
    426: "convert-binary-search-tree-to-sorted-doubly-linked-list",
    428: "serialize-and-deserialize-n-ary-tree",
    432: "all-oone-data-structure",
    490: "the-maze",
    499: "the-maze-iii",
    505: "the-maze-ii",
    536: "construct-binary-tree-from-string",
    562: "longest-line-of-consecutive-one-in-matrix",
    588: "design-in-memory-file-system",
    604: "design-compressed-string-iterator",
    616: "add-bold-tag-in-string",
    681: "next-closest-time",
    708: "insert-into-a-sorted-circular-linked-list",
    716: "max-stack",
    750: "number-of-corner-rectangles",
    772: "basic-calculator-iii"
};

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
    const ids = Object.keys(slugMap).map(Number);
    console.log(`Fixing ${ids.length} problems with correct slugs...`);
    
    let fixed = 0, stillPremium = 0;
    
    for (const id of ids) {
        const slug = slugMap[id];
        const prob = problems.find(p => p.id === id);
        console.log(`[${id}] ${prob.title} -> ${slug}`);
        
        try {
            const q = await fetchQuestion(slug);
            if (q && q.content) {
                descriptions[id] = {
                    content: q.content,
                    testcase: q.exampleTestcases || "1\n2"
                };
                fixed++;
                console.log(`  ✓ Got real content`);
            } else {
                stillPremium++;
                console.log(`  ✗ Still premium/locked`);
            }
        } catch (err) {
            console.error(`  ✗ Error:`, err.message);
        }
        
        await new Promise(r => setTimeout(r, 1200));
    }
    
    const output = `const DESCRIPTIONS = ${JSON.stringify(descriptions, null, 2)};\n\nmodule.exports = DESCRIPTIONS;\n`;
    fs.writeFileSync(path.join(__dirname, 'data', 'descriptions.js'), output);
    console.log(`\nDone! Fixed: ${fixed}, Still premium: ${stillPremium}`);
}

run();
