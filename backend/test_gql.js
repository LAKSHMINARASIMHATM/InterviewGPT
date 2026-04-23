async function test() {
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
            variables: { titleSlug: "two-sum" }
        })
    });
    const data = await res.json();
    console.log(data);
}
test();
