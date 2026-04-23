import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Editor from '@monaco-editor/react';

const API = '/api';
const DIFF_CLASS = { Easy: 'badge-easy', Medium: 'badge-medium', Hard: 'badge-hard' };

const LANG_TABS = [
    { key: 'python', label: '🐍  Python', monaco: 'python' },
    { key: 'java', label: '☕  Java', monaco: 'java' },
    { key: 'cpp', label: '⚡  C++', monaco: 'cpp' },
];

const LANG_MAP = {
    python: { lang: 'python', version: '3.10.0', default: '# Write your Python code here\n# Use print() to output results\n' },
    java: { lang: 'java', version: '15.0.2', default: '// Write your Java code here\nclass Main {\n    public static void main(String[] args) {\n        // System.out.println("Result");\n    }\n}' },
    cpp: { lang: 'cpp', version: '10.2.0', default: '// Write your C++ code here\n#include <iostream>\nusing namespace std;\n\nint main() {\n    // cout << "Result" << endl;\n    return 0;\n}' }
};

export default function ProblemDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [lang, setLang] = useState('python');
    const [showSolution, setShow] = useState(false);
    const [copied, setCopied] = useState(false);
    const [solved, setSolved] = useState(() => {
        try { return JSON.parse(localStorage.getItem('solved') || '{}'); } catch { return {}; }
    });

    const [userCode, setUserCode] = useState({
        python: LANG_MAP.python.default,
        java: LANG_MAP.java.default,
        cpp: LANG_MAP.cpp.default
    });
    const [customInput, setCustomInput] = useState('');
    const [runOutput, setRunOutput] = useState('');
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        setLoading(true); setShow(false); setCopied(false);
        setRunOutput('');
        axios.get(`${API}/problems/${id}`)
            .then(r => {
                setData(r.data);
                if (solved[id]) setShow(true);
                if (r.data.testcases) {
                    setCustomInput(r.data.testcases);
                } else if (r.data.examples && r.data.examples.length > 0) {
                    setCustomInput(r.data.examples[0].input);
                }
            })
            .catch(() => navigate('/problems'))
            .finally(() => setLoading(false));
    }, [id]);

    const handleCodeChange = (val) => {
        setUserCode(prev => ({ ...prev, [lang]: val }));
    };

    const handleRunCode = async (isSubmit) => {
        setIsRunning(true);
        setRunOutput('Compiling and running...');
        try {
            const res = await axios.post(`${API}/execute`, {
                language: LANG_MAP[lang].lang,
                version: LANG_MAP[lang].version,
                files: [{ content: userCode[lang] }],
                stdin: customInput,
                args: [],
                compile_timeout: 10000,
                run_timeout: 3000,
                compile_memory_limit: -1,
                run_memory_limit: -1
            });
            
            const out = res.data.run?.output || '';
            const exitCode = res.data.run?.code;
            const compileErr = res.data.compile?.stderr;
            
            let resultText = compileErr ? `Compilation Error:\n${compileErr}\n\n` : '';
            resultText += out || (exitCode === 0 && !compileErr ? 'Success! (No output)' : '');
            
            setRunOutput(resultText);

            if (isSubmit && exitCode === 0 && !compileErr) {
                if (!solved[id]) {
                    const next = { ...solved, [id]: true };
                    setSolved(next);
                    localStorage.setItem('solved', JSON.stringify(next));
                }
                setShow(true);
            } else if (isSubmit && exitCode !== 0) {
                setRunOutput(prev => prev + '\n\n❌ Tests Failed. Please fix the errors and try again.');
            }
        } catch (err) {
            setRunOutput('Error connecting to execution server: ' + err.message);
        }
        setIsRunning(false);
    };

    const copyCode = () => {
        const code = data?.solution?.[lang] || '';
        navigator.clipboard?.writeText(code).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    if (loading) return (
        <div className="page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 40, animation: 'spin 1s linear infinite', display: 'inline-block', color: 'var(--accent)' }}>⟳</div>
                <div style={{ marginTop: 16, color: 'var(--muted)' }}>Loading problem...</div>
            </div>
        </div>
    );
    if (!data) return null;

    const isSolved = solved[id];

    return (
        <div className="page" style={{ padding: '88px 24px 60px' }}>
            <div className="container" style={{ maxWidth: 1400 }}>
                {/* Breadcrumb */}
                <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 24 }}>
                    <Link to="/" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Home</Link>
                    {' › '}
                    <Link to="/problems" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Problems</Link>
                    {' › '}#{data.id} {data.title}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(400px, 1fr) minmax(500px, 1.2fr)', gap: 24, alignItems: 'start' }}>
                    
                    {/* Left Column: Problem Description & Solution */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                        {/* Problem Header Card */}
                        <div style={{
                            background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 16, padding: '28px 32px',
                        }}>
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, flexWrap: 'wrap' }}>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10, flexWrap: 'wrap' }}>
                                        <span style={{ fontSize: 13, color: 'var(--faint)', fontFamily: 'JetBrains Mono,monospace' }}>#{data.id}</span>
                                        <h1 style={{ fontSize: 24, fontWeight: 800, margin: 0 }}>{data.title}</h1>
                                        <span className={`badge ${DIFF_CLASS[data.difficulty]}`}>{data.difficulty}</span>
                                        {isSolved && (
                                            <span className="badge" style={{ color: 'var(--easy)', background: 'var(--easy-bg)', border: '1px solid rgba(34,197,94,0.3)' }}>
                                                ✓ Solved
                                            </span>
                                        )}
                                    </div>
                                    {/* Topics */}
                                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                                        {data.topics.split(', ').map(t => (
                                            <span key={t} className="tag">{t}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Meta info grid */}
                            <div style={{
                                display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px,1fr))',
                                gap: 16, marginTop: 24, paddingTop: 20, borderTop: '1px solid var(--border)',
                            }}>
                                {[
                                    { icon: '💡', label: 'Approach', value: data.approach },
                                    { icon: '⏱', label: 'Time', value: data.time },
                                    { icon: '📦', label: 'Space', value: data.space },
                                ].map(m => (
                                    <div key={m.label}>
                                        <div style={{ fontSize: 11, color: 'var(--faint)', marginBottom: 4, display: 'flex', gap: 6, alignItems: 'center' }}>
                                            <span>{m.icon}</span>{m.label}
                                        </div>
                                        <div style={{ fontSize: 13, color: 'var(--text)', fontWeight: 500 }}>{m.value}</div>
                                    </div>
                                ))}
                            </div>
                            <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--border)' }}>
                                <div style={{ fontSize: 11, color: 'var(--faint)', marginBottom: 4, display: 'flex', gap: 6, alignItems: 'center' }}>
                                    <span>🏢</span>Asked by
                                </div>
                                <div style={{ fontSize: 13, color: 'var(--text)', fontWeight: 500 }}>{data.companies?.join(', ') || '—'}</div>
                            </div>
                        </div>

                        {/* Problem Statement Card */}
                        <div style={{
                            background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 16, padding: '28px 32px',
                        }}>
                            <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 16px 0' }}>Problem Statement</h2>
                            {data.description && (
                                <div className="problem-description" style={{ marginBottom: '24px', lineHeight: '1.6', fontSize: 15 }} dangerouslySetInnerHTML={{ __html: data.description }}></div>
                            )}

                            {data.examples && data.examples.length > 0 && (
                                <div className="examples-section" style={{ marginBottom: '24px' }}>
                                    {data.examples.map((ex, i) => (
                                        <div key={i} className="example-block" style={{ background: 'var(--bg)', padding: '16px', borderRadius: '12px', marginBottom: '16px', border: '1px solid var(--border)' }}>
                                            <h4 style={{ margin: '0 0 12px 0', color: 'var(--text)', fontSize: 15 }}>Example {i + 1}:</h4>
                                            <pre style={{ margin: 0, fontFamily: 'JetBrains Mono, monospace', fontSize: '14px', whiteSpace: 'pre-wrap', lineHeight: '1.5' }}>
                                                <strong>Input:</strong> {ex.input}
                                                <br/>
                                                <strong>Output:</strong> {ex.output}
                                                {ex.explanation && (
                                                    <><br/><strong>Explanation:</strong> {ex.explanation}</>
                                                )}
                                            </pre>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {data.constraints && data.constraints.length > 0 && (
                                <div className="constraints-section">
                                    <h3 style={{ fontSize: 16, fontWeight: 600, margin: '0 0 12px 0' }}>Constraints:</h3>
                                    <ul style={{ margin: 0, paddingLeft: '24px', background: 'var(--bg)', padding: '16px 16px 16px 40px', borderRadius: '12px', border: '1px solid var(--border)', color: 'var(--faint)' }}>
                                        {data.constraints.map((c, i) => (
                                            <li key={i} style={{ marginBottom: '8px' }}><code style={{ color: 'var(--text)', background: 'transparent', padding: 0 }}>{c}</code></li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* Solution Section */}
                        <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden' }}>
                            <div style={{
                                padding: '18px 28px', borderBottom: '1px solid var(--border)',
                                display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12,
                            }}>
                                <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>Optimal Solution</h2>
                                {isSolved && (
                                    <button
                                        onClick={() => setShow(!showSolution)}
                                        className={`btn ${showSolution ? 'btn-ghost' : 'btn-primary'} btn-sm`}
                                    >{showSolution ? '🙈 Hide Solution' : '👁 Show Solution'}</button>
                                )}
                            </div>

                            {showSolution && isSolved ? (
                                <>
                                    <div style={{ padding: '20px 28px', borderBottom: '1px solid var(--border)', background: 'rgba(99,102,241,0.05)' }}>
                                        <div style={{ fontSize: 12, color: 'var(--accent)', fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 10 }}>
                                            Explanation
                                        </div>
                                        <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.8 }}>
                                            {data.solution?.explanation || 'See approach description above.'}
                                        </p>
                                    </div>
                                    <div style={{ borderBottom: '1px solid var(--border)', display: 'flex' }}>
                                        {LANG_TABS.map(({ key, label }) => (
                                            <button
                                                key={key}
                                                onClick={() => setLang(key)}
                                                style={{
                                                    padding: '12px 22px', border: 'none', background: 'transparent',
                                                    cursor: 'pointer', fontFamily: 'inherit', fontSize: 13, fontWeight: 500,
                                                    color: lang === key ? 'var(--text)' : 'var(--muted)',
                                                    borderBottom: lang === key ? '2px solid var(--accent)' : '2px solid transparent',
                                                    transition: 'all 0.2s',
                                                }}
                                            >{label}</button>
                                        ))}
                                        <div style={{ flex: 1 }} />
                                        <button
                                            onClick={copyCode}
                                            className="btn btn-ghost btn-sm"
                                            style={{ margin: '8px 16px' }}
                                        >{copied ? '✓ Copied!' : '📋 Copy'}</button>
                                    </div>
                                    <div style={{ position: 'relative' }}>
                                        <pre className="code-block" style={{ borderRadius: 0, border: 'none', margin: 0, minHeight: 200, fontSize: 13 }}>
                                            <code>{data.solution?.[lang] || '// Not available for this language'}</code>
                                        </pre>
                                    </div>
                                </>
                            ) : (
                                <div style={{ padding: '48px', textAlign: 'center', color: 'var(--muted)' }}>
                                    <div style={{ fontSize: 40, marginBottom: 16 }}>🔒</div>
                                    <div style={{ fontSize: 15, marginBottom: 8, fontWeight: 500 }}>Solution hidden</div>
                                    <p style={{ fontSize: 13, color: 'var(--faint)', maxWidth: 320, margin: '0 auto 20px' }}>
                                        You must solve the problem first by writing code and submitting it successfully to unlock the optimal solution.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column: Code Editor */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, height: 'calc(100vh - 180px)', position: 'sticky', top: 100 }}>
                        <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', display: 'flex', flexDirection: 'column', flex: 1, boxShadow: '0 8px 30px rgba(0,0,0,0.2)' }}>
                            {/* Editor Header */}
                            <div style={{
                                padding: '10px 20px', borderBottom: '1px solid var(--border)',
                                display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--bg3)'
                            }}>
                                <div style={{ display: 'flex', gap: 10 }}>
                                    {LANG_TABS.map(({ key, label }) => (
                                        <button
                                            key={key}
                                            onClick={() => setLang(key)}
                                            className={`btn btn-sm ${lang === key ? 'btn-primary' : 'btn-ghost'}`}
                                            style={{ padding: '6px 12px', fontSize: 12 }}
                                        >{label}</button>
                                    ))}
                                </div>
                                <div style={{ display: 'flex', gap: 10 }}>
                                    <button 
                                        onClick={() => handleRunCode(false)} 
                                        className="btn btn-ghost btn-sm"
                                        disabled={isRunning}
                                    >
                                        ▶ Run Code
                                    </button>
                                    <button 
                                        onClick={() => handleRunCode(true)} 
                                        className="btn btn-primary btn-sm"
                                        disabled={isRunning}
                                        style={{ background: 'var(--easy)', color: '#fff', border: 'none', padding: '6px 16px' }}
                                    >
                                        {isRunning ? '⏳ Running...' : '↑ Submit'}
                                    </button>
                                </div>
                            </div>

                            {/* Monaco Editor */}
                            <div style={{ flex: 1, position: 'relative', background: '#1e1e1e' }}>
                                <Editor
                                    height="100%"
                                    language={LANG_TABS.find(t => t.key === lang)?.monaco}
                                    theme="vs-dark"
                                    value={userCode[lang]}
                                    onChange={handleCodeChange}
                                    options={{
                                        minimap: { enabled: false },
                                        fontSize: 14,
                                        fontFamily: 'JetBrains Mono, monospace',
                                        padding: { top: 16 },
                                        scrollBeyondLastLine: false,
                                        roundedSelection: false,
                                    }}
                                />
                            </div>

                            {/* Test Cases & Output */}
                            <div style={{ height: '35%', borderTop: '1px solid var(--border)', display: 'flex', flexDirection: 'column', background: 'var(--bg3)' }}>
                                <div style={{ padding: '10px 16px', borderBottom: '1px solid var(--border)', fontSize: 12, fontWeight: 600, color: 'var(--muted)', display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                                    <span>Test Cases (stdin)</span>
                                    <span>Console Output</span>
                                </div>
                                <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
                                    <textarea
                                        value={customInput}
                                        onChange={e => setCustomInput(e.target.value)}
                                        placeholder="Enter custom input for your program here..."
                                        style={{
                                            flex: 1, background: 'var(--bg2)', border: 'none', borderRight: '1px solid var(--border)',
                                            padding: 16, color: 'var(--text)', fontFamily: 'JetBrains Mono, monospace', fontSize: 13,
                                            resize: 'none', outline: 'none'
                                        }}
                                    />
                                    <div style={{ flex: 1, padding: 16, overflowY: 'auto', background: 'rgba(0,0,0,0.2)', fontFamily: 'JetBrains Mono, monospace', fontSize: 13, color: runOutput.includes('Error') ? 'var(--hard)' : 'var(--easy)', whiteSpace: 'pre-wrap' }}>
                                        {runOutput || <span style={{ color: 'var(--faint)' }}>Output will appear here after running...</span>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 32 }}>
                    <button
                        className="btn btn-ghost"
                        onClick={() => navigate(`/problems/${Math.max(1, parseInt(id) - 1)}`)}
                    >← Previous</button>
                    <Link to="/problems" className="btn btn-ghost">All Problems</Link>
                    <button
                        className="btn btn-ghost"
                        onClick={() => navigate(`/problems/${parseInt(id) + 1}`)}
                    >Next →</button>
                </div>
            </div>
        </div>
    );
}
