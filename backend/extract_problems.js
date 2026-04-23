const xlsx = require('xlsx');
const fs = require('fs');

const workbook = xlsx.readFile('../leetcode_500_problems.xlsx');
const problemsMap = new Map();

for (let name of workbook.SheetNames) {
    if (name.includes("By Topic")) continue; // avoid duplicates if there's a by-topic sheet
    
    const sheet = workbook.Sheets[name];
    const data = xlsx.utils.sheet_to_json(sheet, {header: 1});
    
    for (let row of data) {
        // Look for rows that have at least enough columns and start with a number (the '#' column or 'LC #' column)
        // Actually, the headers are: '#', 'LC #', 'Title', 'Difficulty', 'Topics', 'Approach', 'Time', 'Space', 'Companies'
        // 'LC #' is the 2nd column (index 1)
        if (row.length >= 8 && typeof row[1] === 'number') {
            const id = row[1];
            const title = row[2] || "";
            const difficulty = row[3] || "";
            const topics = row[4] || "";
            const approach = row[5] || "";
            const time = row[6] || "";
            const space = row[7] || "";
            const company = typeof row[8] === 'string' ? row[8] : "";
            
            if (!problemsMap.has(id)) {
                problemsMap.set(id, {
                    id: id,
                    title: title,
                    difficulty: difficulty,
                    topics: topics,
                    approach: approach,
                    time: time,
                    space: space,
                    companies: new Set()
                });
            }
            
            // Add company based on sheet name or the company column
            let sheetCompany = name.replace(/[^\w\s-]/g, '').trim(); // Remove emojis
            if (sheetCompany && sheetCompany !== 'All 500 Problems' && !sheetCompany.includes('Topic')) {
                problemsMap.get(id).companies.add(sheetCompany);
            }
            if (company) {
                // sometimes the 'Companies' column has comma separated
                company.split(',').forEach(c => {
                    if(c.trim()) problemsMap.get(id).companies.add(c.trim());
                });
            }
        }
    }
}

// Check the "All 500 Problems" sheet or the "By Topic" sheet to get any missing
const allTopicsSheet = workbook.SheetNames.find(n => n.includes("By Topic"));
if (allTopicsSheet) {
    const data = xlsx.utils.sheet_to_json(workbook.Sheets[allTopicsSheet], {header: 1});
    for (let row of data) {
        if (row.length >= 8 && typeof row[1] === 'number') {
            const id = row[1];
            if (!problemsMap.has(id)) {
                problemsMap.set(id, {
                    id: id,
                    title: row[2] || "",
                    difficulty: row[3] || "",
                    topics: row[4] || "",
                    approach: row[5] || "",
                    time: row[6] || "",
                    space: row[7] || "",
                    companies: new Set()
                });
            }
            if (row[8]) {
                row[8].split(',').forEach(c => {
                    if(c.trim()) problemsMap.get(id).companies.add(c.trim());
                });
            }
        }
    }
}

const finalProblems = Array.from(problemsMap.values()).map(p => {
    return {
        id: p.id,
        title: p.title,
        difficulty: p.difficulty,
        topics: p.topics,
        approach: p.approach,
        time: p.time,
        space: p.space,
        companies: Array.from(p.companies).join(',')
    };
}).sort((a, b) => a.id - b.id);

console.log("Total unique problems found:", finalProblems.length);

fs.writeFileSync('generated_problems.json', JSON.stringify(finalProblems, null, 2));
