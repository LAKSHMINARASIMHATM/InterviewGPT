import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API = '/api';
const DIFF_CLASS = { Easy: 'badge-easy', Medium: 'badge-medium', Hard: 'badge-hard' };
const COMPANIES_LIST = ['All', 'Google', 'Amazon', 'Microsoft', 'Meta', 'Apple', 'Bloomberg', 'Uber', 'Adobe', 'Airbnb', 'Samsung'];

export default function Problems() {
    const [problems, setProblems] = useState([]);
    const [total, setTotal] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [topics, setTopics] = useState([]);
    const [solved, setSolved] = useState(() => {
        try { return JSON.parse(localStorage.getItem('solved') || '{}'); } catch { return {}; }
    });

    const [search, setSearch] = useState('');
    const [diffFilter, setDiff] = useState('All');
    const [topicFilter, setTopic] = useState('All');
    const [compFilter, setComp] = useState('All');
    const PER_PAGE = 30;

    // Debounce search
    const timer = useRef(null);
    const handleSearch = (v) => {
        setSearch(v);
        clearTimeout(timer.current);
        timer.current = setTimeout(() => setPage(1), 300);
    };

    useEffect(() => {
        axios.get(`${API}/topics`).then(r => setTopics(['All', ...r.data])).catch(() => { });
    }, []);

    useEffect(() => {
        setLoading(true);
        const params = { page, limit: PER_PAGE };
        if (diffFilter !== 'All') params.difficulty = diffFilter;
        if (topicFilter !== 'All') params.topic = topicFilter;
        if (compFilter !== 'All') params.company = compFilter;
        if (search) params.search = search;

        axios.get(`${API}/problems`, { params })
            .then(r => {
                setProblems(r.data.problems);
                setTotal(r.data.total);
                setTotalPages(r.data.totalPages);
            })
            .finally(() => setLoading(false));
    }, [page, diffFilter, topicFilter, compFilter, search]);

    useEffect(() => { setPage(1); }, [diffFilter, topicFilter, compFilter]);

    // Removed toggleSolved to enforce solving the problem

    return (
        <div className="page" style={{ padding: '88px 24px 60px' }}>
            <div className="container">
                {/* Header */}
                <div style={{ marginBottom: 32 }}>
                    <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 8 }}>
                        <Link to="/" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Home</Link> › Problems
                    </div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, flexWrap: 'wrap' }}>
                        <h1 style={{ fontSize: 36, fontWeight: 800 }}>All Problems</h1>
                        <span style={{ fontSize: 14, color: 'var(--muted)' }}>{total} results</span>
                    </div>
                </div>

                {/* Filters */}
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 24 }}>
                    <input
                        className="input"
                        placeholder="🔍  Search by title, id, topic..."
                        value={search}
                        onChange={e => handleSearch(e.target.value)}
                        style={{ flex: '1 1 260px', maxWidth: 360 }}
                    />

                    {/* Difficulty */}
                    <div style={{ display: 'flex', gap: 5 }}>
                        {['All', 'Easy', 'Medium', 'Hard'].map(d => (
                            <button
                                key={d}
                                onClick={() => setDiff(d)}
                                className={`btn btn-sm ${diffFilter === d ? 'btn-primary' : ''}`}
                                style={diffFilter !== d ? { background: 'var(--bg3)', border: '1px solid var(--border)', color: 'var(--muted)' } : {}}
                            >{d}</button>
                        ))}
                    </div>

                    <select className="input" style={{ flex: '0 0 180px' }} value={topicFilter} onChange={e => setTopic(e.target.value)}>
                        {topics.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>

                    <select className="input" style={{ flex: '0 0 160px' }} value={compFilter} onChange={e => setComp(e.target.value)}>
                        {COMPANIES_LIST.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>

                {/* Table */}
                <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden' }}>
                    {/* Header */}
                    <div style={{
                        display: 'grid', gridTemplateColumns: '40px 64px 1fr 120px 200px 100px',
                        padding: '12px 20px', borderBottom: '1px solid var(--border)',
                        fontSize: 11, color: 'var(--faint)', fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase',
                    }}>
                        <div>✓</div><div>#</div><div>Problem</div><div>Difficulty</div><div>Topics</div><div>Solution</div>
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
                        <div style={{ padding: '60px 20px', textAlign: 'center', color: 'var(--muted)' }}>No problems found.</div>
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
                                    width: 20, height: 20, borderRadius: 5, fontFamily: 'inherit',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    background: solved[p.id] ? 'var(--easy)' : 'var(--surface)',
                                    border: solved[p.id] ? '2px solid var(--easy)' : '2px solid var(--border)',
                                    color: solved[p.id] ? '#fff' : 'transparent', fontSize: 11, transition: 'all 0.2s',
                                }}
                            >{solved[p.id] ? '✓' : ''}</div>

                            <div style={{ fontSize: 12, color: 'var(--faint)', fontFamily: 'JetBrains Mono,monospace' }}>#{p.id}</div>

                            <div>
                                <Link
                                    to={`/problems/${p.id}`}
                                    style={{ fontSize: 14, fontWeight: 500, color: solved[p.id] ? 'var(--muted)' : 'var(--text)', textDecoration: 'none', display: 'block' }}
                                    onMouseEnter={e => e.target.style.color = 'var(--accent)'}
                                    onMouseLeave={e => e.target.style.color = solved[p.id] ? 'var(--muted)' : 'var(--text)'}
                                >{p.title}</Link>
                                <div style={{ fontSize: 11, color: 'var(--faint)', marginTop: 4, fontFamily: 'JetBrains Mono,monospace', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                    // {p.approach}
                                </div>
                            </div>

                            <div><span className={`badge ${DIFF_CLASS[p.difficulty]}`}>{p.difficulty}</span></div>

                            <div style={{ fontSize: 11, color: 'var(--faint)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
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
                        <button className="btn btn-ghost btn-sm" onClick={() => setPage(1)} disabled={page === 1}>«</button>
                        <button className="btn btn-ghost btn-sm" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>‹</button>
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                            const p = Math.max(1, Math.min(totalPages - 4, page - 2)) + i;
                            return (
                                <button
                                    key={p}
                                    className={`btn btn-sm ${p === page ? 'btn-primary' : 'btn-ghost'}`}
                                    onClick={() => setPage(p)}
                                >{p}</button>
                            );
                        })}
                        <button className="btn btn-ghost btn-sm" onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>›</button>
                        <button className="btn btn-ghost btn-sm" onClick={() => setPage(totalPages)} disabled={page === totalPages}>»</button>
                        <span style={{ color: 'var(--muted)', fontSize: 13, marginLeft: 8 }}>Page {page} of {totalPages}</span>
                    </div>
                )}
            </div>
        </div>
    );
}
