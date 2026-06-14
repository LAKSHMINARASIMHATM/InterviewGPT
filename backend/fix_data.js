const fs = require('fs');

['descriptions.js', 'solutions.js'].forEach(f => {
    let t = fs.readFileSync('./data/' + f, 'utf8');
    
    // Find the broken object closing brace before 4001
    // It might look like: "  },\n};\n\n"4001":" or something similar.
    t = t.replace(/\};\s*"4001":/, ',\n  "4001":');
    
    fs.writeFileSync('./data/' + f, t);
});
