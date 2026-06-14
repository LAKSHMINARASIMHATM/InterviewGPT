// Data conversion script: converts existing backend JS data to TypeScript-compatible JSON
const fs = require('fs');
const path = require('path');

// Read the existing backend data
const PROBLEMS = require('./backend/data/problems');
const COMPANIES = require('./backend/data/companies');

// Write problems as JSON
fs.writeFileSync(
  path.join(__dirname, 'interviewgpt/src/lib/data/problems.json'),
  JSON.stringify(PROBLEMS, null, 0)
);

// Write companies as JSON  
fs.writeFileSync(
  path.join(__dirname, 'interviewgpt/src/lib/data/companies.json'),
  JSON.stringify(COMPANIES, null, 0)
);

console.log(`✅ Exported ${PROBLEMS.length} problems`);
console.log(`✅ Exported ${COMPANIES.length} companies`);

// Extract unique topics
const allTopics = [...new Set(PROBLEMS.flatMap(p => 
  p.topics.split(', ').map(t => t.trim())
))].filter(t => 
  !t.toLowerCase().includes('aptitude') && 
  !t.toLowerCase().includes('reasoning')
).sort();

const topicData = allTopics.map(topic => {
  const problems = PROBLEMS.filter(p => p.topics.includes(topic));
  const easy = problems.filter(p => p.difficulty === 'Easy').length;
  const medium = problems.filter(p => p.difficulty === 'Medium').length;
  const hard = problems.filter(p => p.difficulty === 'Hard').length;
  return {
    name: topic,
    slug: topic.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    count: problems.length,
    easy,
    medium,
    hard,
  };
});

fs.writeFileSync(
  path.join(__dirname, 'interviewgpt/src/lib/data/topics.json'),
  JSON.stringify(topicData, null, 0)
);

console.log(`✅ Exported ${topicData.length} topics`);
