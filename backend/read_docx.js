const mammoth = require('mammoth');
mammoth.extractRawText({path: '../leetcode_platform_prd.docx'})
    .then(result => console.log(result.value))
    .done();
