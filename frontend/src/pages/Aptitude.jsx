import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API = '/api';
const DIFF_CLASS = { Easy: 'badge-easy', Medium: 'badge-medium', Hard: 'badge-hard' };

export default function Aptitude() {
    const [problems, setProblems] = useState([]);
    const [total, setTotal] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [solved, setSolved] = useState(() => {
        try { return JSON.parse(localStorage.getItem('solved') || '{}'); } catch { return {}; }
    });

    const [search, setSearch] = useState('');
    const PER_PAGE = 30;

    // Debounce search
    const timer = useRef(null);
    const handleSearch = (v) => {
        setSearch(v);
        clearTimeout(timer.current);
        timer.current = setTimeout(() => setPage(1), 300);
    };

    useEffect(() => {
        setLoading(true);
        // We'll fetch all problems and filter on client side for multiple categories 
        // OR we can just use the search/params if the backend supported multiple companies.
        // Since the backend currently filters by a single company string, 
        // we'll fetch problems for 'General Aptitude' and 'Reasoning Tests' separately or just filter by topic.
        
        axios.get(`${API}/problems`, { params: { limit: 1000, type: 'aptitude' } })
            .then(r => {
                const all = r.data.problems.filter(p => 
                    p.companies.includes('General Aptitude') || 
                    p.companies.includes('Reasoning Tests') ||
                    p.topics.toLowerCase().includes('aptitude') ||
                    p.topics.toLowerCase().includes('reasoning')
                );
                
                const filtered = all.filter(p => 
                    p.title.toLowerCase().includes(search.toLowerCase()) ||
                    p.topics.toLowerCase().includes(search.toLowerCase())
                );

                setProblems(filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE));
                setTotal(filtered.length);
                setTotalPages(Math.ceil(filtered.length / PER_PAGE));
            })
            .finally(() => setLoading(false));
    }, [page, search]);

    return (
        <div className="page" style={{ padding: '88px 24px 60px' }}>
            <div className="container">
                {/* Header */}
                <div style={{ marginBottom: 32 }}>
                    <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 8 }}>
                        <Link to="/" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Home</Link> › Aptitude
                    </div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, flexWrap: 'wrap' }}>
                        <h1 style={{ fontSize: 36, fontWeight: 800 }}>Aptitude & Reasoning</h1>
                        <span style={{ fontSize: 14, color: 'var(--muted)' }}>{total} quantitative and logic problems</span>
                    </div>
                </div>

                {/* Search */}
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 24 }}>
                    <input
                        className="input"
                        placeholder="🔍  Search aptitude topics (Speed, Interest, Logic...)"
                        value={search}
                        onChange={e => handleSearch(e.target.value)}
                        style={{ flex: '1 1 260px', maxWidth: 460 }}
                    />
                </div>

                {/* Table */}
                <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden' }}>
                    {/* Header */}
                    <div style={{
                        display: 'grid', gridTemplateColumns: '40px 64px 1fr 120px 200px 100px',
                        padding: '12px 20px', borderBottom: '1px solid var(--border)',
                        fontSize: 11, color: 'var(--faint)', fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase',
                    }}>
                        <div>✓</div><div>#</div><div>Problem</div><div>Difficulty</div><div>Category</div><div>Solution</div>
                    </div>

                    {loading ? (
                        <div>
                            {Array.from({ length: 10 }).map((_, i) => (
                                <div key={i} style={{ padding: '14px 20px', borderBottom: '1px solid rgba(36,48,96,0.4)', display: 'flex', gap: 16 }}>
                                    <div className="skeleton" style={{ width: 20, height: 20 }} />
                                    <div className="skeleton" style={{ width: 40, height: 14 }} />
                                    <div className="skeleton" style={{ flex: 1, height: 14 }} />
                                    <div className="skeleton" style={{ width: 64, height: 20 }} />
                                </div>
                            ))}
                        </div>
                    ) : problems.length === 0 ? (
                        <div style={{ padding: '60px 20px', textAlign: 'center', color: 'var(--muted)' }}>No aptitude problems found.</div>
                    ) : problems.map((p, i) => (
                        <div
                            key={p.id}
                            style={{
                                display: 'grid', gridTemplateColumns: '40px 64px 1fr 120px 200px 100px',
                                padding: '12px 20px',
                                borderBottom: i < problems.length - 1 ? '1px solid rgba(36,48,96,0.4)' : 'none',
                                alignItems: 'center',
                                background: solved[p.id] ? 'rgba(34,197,94,0.04)' : 'transparent',
                                transition: 'background 0.15s',
                            }}
                            onMouseEnter={e => e.currentTarget.style.background = solved[p.id] ? 'rgba(34,197,94,0.08)' : 'var(--bg3)'}
                            onMouseLeave={e => e.currentTarget.style.background = solved[p.id] ? 'rgba(34,197,94,0.04)' : 'transparent'}
                        >
                            <div
                                style={{
                                    width: 20, height: 20, borderRadius: 5,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    background: solved[p.id] ? 'var(--easy)' : 'var(--surface)',
                                    border: solved[p.id] ? '2px solid var(--easy)' : '2px solid var(--border)',
                                    color: solved[p.id] ? '#fff' : 'transparent', fontSize: 11,
                                }}
                            >{solved[p.id] ? '✓' : ''}</div>

                            <div style={{ fontSize: 12, color: 'var(--faint)', fontFamily: 'JetBrains Mono,monospace' }}>#{p.id}</div>

                            <div>
                                <Link
                                    to={`/problems/${p.id}`}
                                    style={{ fontSize: 14, fontWeight: 500, color: solved[p.id] ? 'var(--muted)' : 'var(--text)', textDecoration: 'none' }}
                                >{p.title}</Link>
                                <div style={{ fontSize: 11, color: 'var(--faint)', marginTop: 4 }}>
                                    {p.approach}
                                </div>
                            </div>

                            <div><span className={`badge ${DIFF_CLASS[p.difficulty]}`}>{p.difficulty}</span></div>

                            <div style={{ fontSize: 11, color: 'var(--faint)' }}>
                                {p.topics}
                            </div>

                            <div>
                                <Link to={`/problems/${p.id}`} className="btn btn-ghost btn-sm" style={{ textDecoration: 'none', fontSize: 11, padding: '4px 10px' }}>
                                    Solve →
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8, marginTop: 32 }}>
                        <button className="btn btn-ghost btn-sm" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>‹</button>
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i + 1}
                                className={`btn btn-sm ${i + 1 === page ? 'btn-primary' : 'btn-ghost'}`}
                                onClick={() => setPage(i + 1)}
                            >{i + 1}</button>
                        ))}
                        <button className="btn btn-ghost btn-sm" onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>›</button>
                    </div>
                )}
            </div>
        </div>
    );
}
