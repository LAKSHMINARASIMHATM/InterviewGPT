const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'data', 'solutions.js');
const content = fs.readFileSync(filePath, 'utf8');

console.log('File size:', content.length, 'bytes');
console.log('Total lines:', content.split('\n').length);

// The problem: Line 5002 has \\` sequences (backslash + backtick)
// In the raw file, \\` inside a JS template literal means an escaped backslash followed by a
// backtick that CLOSES the template literal - this is a syntax error.
// We need to replace \\` (backslash + backtick) with just ` or with a safer character.

// Check how many \\` sequences exist
let raw = content;
// Count occurrences
let count = 0;
let idx = 0;
while ((idx = raw.indexOf('\\`', idx)) !== -1) {
  count++;
  idx += 2;
}
console.log('Total \\` sequences in file:', count);

// Strategy: Replace \\` with \` (single escaped backtick, valid inside template literals)
// But we need to be careful - ONLY replace \\` (double-backslash + backtick) not \` (single backslash + backtick)
// In the actual file bytes: the sequences we saw were \\\\` which means 2 actual backslashes + backtick

// Let's check what the actual bytes are around line 5002
const lines = raw.split('\n');
const line5002 = lines[5001]; // 0-indexed
console.log('\nLine 5002 raw JSON:', JSON.stringify(line5002.substring(0, 150)));

// Count occurrences of double-backslash + backtick (\\`)
// In JS string: \\\\ is two backslashes, so \\\\` is two backslashes + backtick
const doubleBackslashBacktick = /\\\\\`/g;
let matches = line5002.match(doubleBackslashBacktick);
console.log('Double-backslash-backtick occurrences on line 5002:', matches ? matches.length : 0);

// The fix: replace \\` (2 backslashes + backtick) with ` 
// This makes inline code notation like \`\`\`p+q\`\`\` into ```p+q``` 
// which also needs fixing (backticks within template literals)
// So let's replace \\`\\`\\`text\\`\\`\\` -> "text" (just strip the markdown)

// Fix double-backslash backtick sequences
// Pattern: \\`\\`\\`...\\`\\`\\` -> "..."  (triple backtick code spans)
let fixed = raw.replace(/\\\\`\\\\`\\\\`([^`\n]*?)\\\\`\\\\`\\\\`/g, '"$1"');
let tripleFixed = (raw.match(/\\\\`\\\\`\\\\`([^`\n]*?)\\\\`\\\\`\\\\`/g) || []).length;
console.log('\nTriple \\\\` sequences fixed:', tripleFixed);

// Fix remaining double-backslash backticks (inline code: \`code\` -> "code")
fixed = fixed.replace(/\\\\`([^`\n]*?)\\\\`/g, '"$1"');
let doubleFixed = (raw.replace(/\\\\`\\\\`\\\\`([^`\n]*?)\\\\`\\\\`\\\\`/g, '"$1"')
  .match(/\\\\`([^`\n]*?)\\\\`/g) || []).length;
console.log('Single \\\\` pairs fixed:', doubleFixed);

// Fix orphaned remaining \\` sequences  
fixed = fixed.replace(/\\\\`/g, "'");
let orphanFixed = (raw.replace(/\\\\`\\\\`\\\\`([^`\n]*?)\\\\`\\\\`\\\\`/g, '"$1"')
  .replace(/\\\\`([^`\n]*?)\\\\`/g, '"$1"')
  .match(/\\\\`/g) || []).length;
console.log('Orphaned \\\\` fixed:', orphanFixed);

// Now validate
const tempPath = path.join(__dirname, 'data', 'solutions_test.js');
fs.writeFileSync(tempPath, fixed, 'utf8');
try {
  delete require.cache[require.resolve(tempPath)];
  require(tempPath);
  console.log('\n✓ Fixed file parses successfully!');
  fs.unlinkSync(tempPath);
  // Write final fix
  fs.writeFileSync(filePath, fixed, 'utf8');
  console.log('✓ Saved fixed solutions.js');
} catch(e) {
  console.log('\n✗ Still has parse error:', e.message);
  // Find the error line
  const errLines = fixed.split('\n');
  const match = e.message.match(/solutions_test\.js:(\d+)/);
  if (match) {
    const errLine = parseInt(match[1]);
    console.log('Error near line', errLine);
    for(let i = Math.max(0, errLine-3); i <= Math.min(errLines.length-1, errLine+2); i++) {
      console.log(`  Line ${i+1}: ${JSON.stringify(errLines[i].substring(0,100))}`);
    }
  }
  fs.unlinkSync(tempPath);
}
