import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API = '/api';
const DIFF_CLASS = { Easy: 'badge-easy', Medium: 'badge-medium', Hard: 'badge-hard' };
const DIFF_ORDER = { Hard: 0, Medium: 1, Easy: 2 };

export default function CompanyDetail() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [diffFilter, setDiff] = useState('All');
    const [topicFilter, setTopic] = useState('All');
    const [search, setSearch] = useState('');
    const [solved, setSolved] = useState(() => {
        try { return JSON.parse(localStorage.getItem('solved') || '{}'); } catch { return {}; }
    });
    const [activeTab, setActiveTab] = useState('problems');

    useEffect(() => {
        setLoading(true);
        axios.get(`${API}/companies/${slug}`)
            .then(r => setData(r.data))
            .catch(() => navigate('/companies'))
            .finally(() => setLoading(false));
    }, [slug]);

    // Removed toggleSolved to enforce solving the problem

    if (loading) return (
        <div className="page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 36, animation: 'spin 1s linear infinite', display: 'inline-block' }}>⟳</div>
                <div style={{ marginTop: 16, color: 'var(--muted)' }}>Loading...</div>
            </div>
        </div>
    );
    if (!data) return null;

    const allTopics = ['All', ...new Set(data.problems.flatMap(p => p.topics.split(', ')))].sort();

    const filtered = data.problems
        .filter(p => diffFilter === 'All' || p.difficulty === diffFilter)
        .filter(p => topicFilter === 'All' || p.topics.includes(topicFilter))
        .filter(p => !search || p.title.toLowerCase().includes(search.toLowerCase()) || String(p.id).includes(search));

    const solvedCount = data.problems.filter(p => solved[p.id]).length;
    const pct = Math.round((solvedCount / data.problems.length) * 100);

    return (
        <div className="page" style={{ padding: '88px 24px 60px' }}>
            <div className="container">
                {/* Breadcrumb */}
                <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 24 }}>
                    <Link to="/" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Home</Link>
                    {' › '}
                    <Link to="/companies" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Companies</Link>
                    {' › '}{data.name}
                </div>

                {/* Company Hero */}
                <div style={{
                    background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 16,
                    padding: '28px 32px', marginBottom: 32,
                    backgroundImage: `radial-gradient(ellipse at top right, ${data.color}12, transparent 60%)`,
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
                        <div style={{
                            width: 64, height: 64, borderRadius: 16, fontSize: 32,
                            background: `linear-gradient(135deg, ${data.color}25, ${data.color}10)`,
                            border: `1px solid ${data.color}35`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>{data.emoji}</div>
                        <div style={{ flex: 1 }}>
                            <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 4 }}>{data.name} Problems</h1>
                            <p style={{ color: 'var(--muted)', fontSize: 14 }}>{data.desc}</p>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: 32, fontWeight: 800, color: data.color }}>{data.problemCount}</div>
                            <div style={{ fontSize: 12, color: 'var(--muted)' }}>Total Problems</div>
                        </div>
                    </div>

                    {/* Progress */}
                    <div style={{ marginTop: 24 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6 }}>
                            <span style={{ color: 'var(--muted)' }}>Your Progress</span>
                            <span style={{ color: 'var(--accent)', fontWeight: 600 }}>{solvedCount}/{data.problemCount} solved ({pct}%)</span>
                        </div>
                        <div className="progress-bar">
                            <div className="progress-fill" style={{ width: `${pct}%` }} />
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div style={{ display: 'flex', gap: 4, borderBottom: '1px solid var(--border)', marginBottom: 28 }}>
                    <button
                        onClick={() => setActiveTab('problems')}
                        style={{
                            padding: '12px 24px',
                            background: 'none',
                            border: 'none',
                            borderBottom: activeTab === 'problems' ? '2px solid var(--accent)' : '2px solid transparent',
                            color: activeTab === 'problems' ? 'var(--text)' : 'var(--muted)',
                            fontWeight: 600,
                            cursor: 'pointer',
                            fontSize: 15,
                            transition: 'all 0.2s',
                        }}
                    >
                        📂 Coding Problems
                    </button>
                    <button
                        onClick={() => setActiveTab('rounds')}
                        style={{
                            padding: '12px 24px',
                            background: 'none',
                            border: 'none',
                            borderBottom: activeTab === 'rounds' ? '2px solid var(--accent)' : '2px solid transparent',
                            color: activeTab === 'rounds' ? 'var(--text)' : 'var(--muted)',
                            fontWeight: 600,
                            cursor: 'pointer',
                            fontSize: 15,
                            transition: 'all 0.2s',
                        }}
                    >
                        🔄 Interview Rounds & Process
                    </button>
                </div>

                {activeTab === 'problems' ? (
                    <>
                        {/* Filters */}
                        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 24 }}>
                            <input
                                className="input"
                                placeholder="Search problems..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                style={{ flex: '0 0 240px' }}
                            />
                            <div style={{ display: 'flex', gap: 6 }}>
                                {['All', 'Easy', 'Medium', 'Hard'].map(d => (
                                    <button
                                        key={d}
                                        onClick={() => setDiff(d)}
                                        className={`btn btn-sm ${diffFilter === d ? 'btn-primary' : 'btn-ghost'}`}
                                        style={diffFilter === d ? {} : { opacity: 0.7 }}
                                    >{d}</button>
                                ))}
                            </div>
                            <select
                                className="input"
                                value={topicFilter}
                                onChange={e => setTopic(e.target.value)}
                                style={{ flex: '0 0 200px' }}
                            >
                                {allTopics.map(t => <option key={t} value={t}>{t}</option>)}
                            </select>
                            <span style={{ color: 'var(--muted)', fontSize: 13, alignSelf: 'center' }}>
                                {filtered.length} problems
                            </span>
                        </div>

                        {/* Problems Table */}
                        <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden' }}>
                            {/* Table Header */}
                            <div style={{
                                display: 'grid', gridTemplateColumns: '40px 60px 1fr 120px 140px 80px',
                                padding: '12px 20px', borderBottom: '1px solid var(--border)',
                                fontSize: 11, color: 'var(--faint)', fontWeight: 600, letterSpacing: 1,
                                textTransform: 'uppercase',
                            }}>
                                <div>✓</div><div>#</div><div>Problem</div><div>Difficulty</div><div>Topics</div><div>Solution</div>
                            </div>

                            {filtered.map((p, i) => (
                                <div
                                    key={p.id}
                                    style={{
                                        display: 'grid', gridTemplateColumns: '40px 60px 1fr 120px 140px 80px',
                                        padding: '13px 20px',
                                        borderBottom: i < filtered.length - 1 ? '1px solid rgba(36,48,96,0.5)' : 'none',
                                        alignItems: 'center',
                                        background: solved[p.id] ? 'rgba(34,197,94,0.04)' : 'transparent',
                                        transition: 'background 0.2s',
                                    }}
                                    onMouseEnter={e => e.currentTarget.style.background = solved[p.id] ? 'rgba(34,197,94,0.08)' : 'var(--bg3)'}
                                    onMouseLeave={e => e.currentTarget.style.background = solved[p.id] ? 'rgba(34,197,94,0.04)' : 'transparent'}
                                >
                                    <div>
                                        <div
                                            style={{
                                                width: 20, height: 20, borderRadius: 5,
                                                background: solved[p.id] ? 'var(--easy)' : 'var(--surface)',
                                                border: solved[p.id] ? '2px solid var(--easy)' : '2px solid var(--border)',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                fontSize: 11, transition: 'all 0.2s',
                                            }}
                                        >{solved[p.id] ? '✓' : ''}</div>
                                    </div>

                                    {/* ID */}
                                    <div style={{ fontSize: 12, color: 'var(--faint)', fontFamily: 'JetBrains Mono,monospace' }}>
                                        #{p.id}
                                    </div>

                                    {/* Title */}
                                    <div>
                                        <Link
                                            to={`/problems/${p.id}`}
                                            style={{ color: solved[p.id] ? 'var(--muted)' : 'var(--text)', textDecoration: 'none', fontSize: 14, fontWeight: 500, display: 'block' }}
                                            onMouseEnter={e => e.target.style.color = 'var(--accent)'}
                                            onMouseLeave={e => e.target.style.color = solved[p.id] ? 'var(--muted)' : 'var(--text)'}
                                        >{p.title}</Link>
                                        <div style={{ fontSize: 11, color: 'var(--faint)', marginTop: 4, fontFamily: 'JetBrains Mono,monospace', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            // {p.approach}
                                        </div>
                                    </div>

                                    {/* Difficulty */}
                                    <div><span className={`badge ${DIFF_CLASS[p.difficulty]}`}>{p.difficulty}</span></div>

                                    {/* Topics */}
                                    <div style={{ fontSize: 11, color: 'var(--faint)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                        {p.topics}
                                    </div>

                                    {/* Solution link */}
                                    <div>
                                        <Link
                                            to={`/problems/${p.id}`}
                                            className="btn btn-ghost btn-sm"
                                            style={{ textDecoration: 'none', padding: '4px 10px', fontSize: 11 }}
                                        >View →</Link>
                                    </div>
                                </div>
                            ))}

                            {filtered.length === 0 && (
                                <div style={{ padding: '60px 20px', textAlign: 'center', color: 'var(--muted)', fontSize: 14 }}>
                                    No problems match your filters.
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    <div className="fade-up" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                        <div style={{
                            background: 'var(--bg2)',
                            border: '1px solid var(--border)',
                            borderRadius: 12,
                            padding: '20px 24px',
                            lineHeight: 1.5,
                            fontSize: 14,
                            color: 'var(--muted)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 16
                        }}>
                            <span style={{ fontSize: 24 }}>💡</span>
                            <span>
                                Below is the typical software engineering interview structure for <strong>{data.name}</strong>. 
                                Click on any recommended topic tag to immediately filter the question bank and start preparing.
                            </span>
                        </div>

                        <div style={{
                            position: 'relative',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 20
                        }}>
                            {/* Timeline Vertical Line */}
                            <div style={{
                                position: 'absolute',
                                left: 31,
                                top: 24,
                                bottom: 24,
                                width: 2,
                                background: 'linear-gradient(180deg, var(--accent) 0%, var(--border) 100%)',
                                zIndex: 0
                            }} />

                            {data.rounds && data.rounds.map((r, index) => (
                                <div key={index} style={{
                                    display: 'flex',
                                    gap: 24,
                                    position: 'relative',
                                    zIndex: 1
                                }}>
                                    {/* Timeline Node */}
                                    <div style={{
                                        width: 64,
                                        height: 64,
                                        borderRadius: 16,
                                        background: 'var(--bg2)',
                                        border: '2px solid var(--border)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: 24,
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                                        flexShrink: 0
                                    }}>
                                        {r.icon || '📝'}
                                    </div>

                                    {/* Content Card */}
                                    <div className="card" style={{
                                        flex: 1,
                                        padding: '24px',
                                        background: 'var(--bg2)',
                                        border: '1px solid var(--border)',
                                        borderRadius: 14,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 14
                                    }}>
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            flexWrap: 'wrap',
                                            gap: 12
                                        }}>
                                            <div>
                                                <span style={{
                                                    fontSize: 12,
                                                    fontWeight: 700,
                                                    color: 'var(--accent)',
                                                    textTransform: 'uppercase',
                                                    letterSpacing: 1,
                                                    display: 'block',
                                                    marginBottom: 4
                                                }}>
                                                    Round {index + 1}
                                                </span>
                                                <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)' }}>
                                                    {r.name}
                                                </h3>
                                            </div>
                                            <div style={{ display: 'flex', gap: 8 }}>
                                                <span style={{
                                                    fontSize: 11,
                                                    fontWeight: 600,
                                                    background: 'var(--surface)',
                                                    color: 'var(--text)',
                                                    padding: '4px 10px',
                                                    borderRadius: 20,
                                                    border: '1px solid var(--border)'
                                                }}>
                                                    ⏱️ {r.duration}
                                                </span>
                                                <span style={{
                                                    fontSize: 11,
                                                    fontWeight: 600,
                                                    background: 'rgba(99, 102, 241, 0.15)',
                                                    color: 'var(--accent)',
                                                    padding: '4px 10px',
                                                    borderRadius: 20,
                                                    border: '1px solid rgba(99, 102, 241, 0.3)'
                                                }}>
                                                    🛡️ {r.type}
                                                </span>
                                            </div>
                                        </div>

                                        <p style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.6 }}>
                                            {r.desc}
                                        </p>

                                        {r.topics && r.topics.length > 0 && (
                                            <div style={{
                                                display: 'flex',
                                                flexWrap: 'wrap',
                                                gap: 8,
                                                borderTop: '1px solid var(--border)',
                                                paddingTop: 14,
                                                marginTop: 6,
                                                alignItems: 'center'
                                            }}>
                                                <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--faint)', marginRight: 4 }}>
                                                    Recommended Topics:
                                                </span>
                                                {r.topics.map((topic, tIdx) => (
                                                    <button
                                                        key={tIdx}
                                                        onClick={() => {
                                                            setTopic(topic);
                                                            setActiveTab('problems');
                                                        }}
                                                        className="tag"
                                                        style={{
                                                            cursor: 'pointer',
                                                            transition: 'all 0.2s',
                                                            border: '1px solid var(--border)',
                                                            background: 'var(--surface)'
                                                        }}
                                                    >
                                                        🔍 {topic}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
