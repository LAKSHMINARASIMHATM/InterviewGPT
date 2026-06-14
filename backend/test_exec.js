fetch('http://localhost:5000/api/execute', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        language: 'javascript',
        files: [{ content: 'console.log("Hello from JS!");' }]
    })
})
.then(r => r.json())
.then(console.log)
.catch(console.error);
