async function testWandbox() {
    try {
        const res = await fetch('https://wandbox.org/api/compile.json', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                compiler: 'gcc-head',
                code: '#include <iostream>\nint main() { std::cout << "hello\\n"; return 0; }',
                save: false
            })
        });
        const data = await res.json();
        console.log("C++:", data);
    } catch (e) {
        console.error(e);
    }

    try {
        const res2 = await fetch('https://wandbox.org/api/compile.json', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                compiler: 'openjdk-head',
                code: 'public class Main { public static void main(String[] args) { System.out.println("hello java"); } }',
                save: false
            })
        });
        const data2 = await res2.json();
        console.log("Java:", data2);
    } catch (e) {
        console.error(e);
    }
}

testWandbox();
