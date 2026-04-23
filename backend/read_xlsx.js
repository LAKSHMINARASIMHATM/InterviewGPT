const xlsx = require('xlsx');
const workbook = xlsx.readFile('../leetcode_500_problems.xlsx');
console.log("Sheet names:", workbook.SheetNames);
for (let name of workbook.SheetNames) {
    console.log("Sheet:", name);
    const sheet = workbook.Sheets[name];
    const data = xlsx.utils.sheet_to_json(sheet, {header: 1});
    console.log("First 10 rows:");
    for (let i = 0; i < Math.min(10, data.length); i++) {
        console.log(data[i]);
    }
}
