import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API = '/api';

const DIFF_COLOR = { Easy: 'var(--easy)', Medium: 'var(--medium)', Hard: 'var(--hard)' };

export default function Home() {
    const [stats, setStats] = useState(null);
    const [companies, setCompanies] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        axios.get(`${API}/stats`).then(r => setStats(r.data)).catch(() => { });
        axios.get(`${API}/companies`).then(r => setCompanies(r.data)).catch(() => { });
    }, []);

    const filtered = companies.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="page">
            {/* ── Hero ── */}
            <section style={{
                minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center',
                justifyContent: 'center', textAlign: 'center', padding: '80px 24px 60px',
                background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(99,102,241,0.15) 0%, transparent 70%)',
                position: 'relative', overflow: 'hidden',
            }}>
                {/* Decorative orbs */}
                <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: 'rgba(99,102,241,0.06)', top: -100, left: -100, filter: 'blur(60px)', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%', background: 'rgba(139,92,246,0.06)', bottom: 0, right: -80, filter: 'blur(60px)', pointerEvents: 'none' }} />

                <div className="fade-up" style={{ maxWidth: 740, position: 'relative' }}>
                    <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 24,
                        padding: '6px 16px', borderRadius: 20,
                        background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.3)',
                        fontSize: 13, color: 'var(--accent)', fontWeight: 500,
                    }}>
                        <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block', animation: 'pulse 2s infinite' }} />
                        500 Problems · 10 Companies · 3 Languages
                    </div>

                    <h1 style={{ fontSize: 'clamp(38px,6vw,72px)', fontWeight: 800, lineHeight: 1.1, marginBottom: 24 }}>
                        Ace Your Next
                        <span style={{
                            background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #a78bfa)',
                            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                        }}> Interview</span>
                        <br />by Company
                    </h1>

                    <p style={{ fontSize: 18, color: 'var(--muted)', marginBottom: 40, maxWidth: 560, margin: '0 auto 40px', lineHeight: 1.8 }}>
                        Curated LeetCode problems grouped by company — Google, Amazon, Meta and more.
                        Study smart, not hard. Full solutions in Python, Java & C++.
                    </p>

                    <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link to="/companies" className="btn btn-primary" style={{ fontSize: 15, padding: '12px 28px' }}>
                            Browse by Company
                        </Link>
                        <Link to="/problems" className="btn btn-ghost" style={{ fontSize: 15, padding: '12px 28px' }}>
                            All 500 Problems
                        </Link>
                    </div>
                </div>

                {/* Stats strip */}
                {stats && (
                    <div style={{
                        marginTop: 64, display: 'flex', gap: 0, flexWrap: 'wrap', justifyContent: 'center',
                        background: 'var(--bg2)', border: '1px solid var(--border)',
                        borderRadius: 14, overflow: 'hidden',
                    }}>
                        {[
                            { label: 'Total Problems', value: stats.total, color: 'var(--text)' },
                            { label: 'Easy', value: stats.easy, color: 'var(--easy)' },
                            { label: 'Medium', value: stats.medium, color: 'var(--medium)' },
                            { label: 'Hard', value: stats.hard, color: 'var(--hard)' },
                            { label: 'Companies', value: stats.companies, color: 'var(--accent)' },
                            { label: 'Topics', value: stats.topics, color: 'var(--accent2)' },
                        ].map((s, i) => (
                            <div key={i} style={{
                                padding: '20px 28px', textAlign: 'center',
                                borderRight: i < 5 ? '1px solid var(--border)' : 'none',
                            }}>
                                <div style={{ fontSize: 28, fontWeight: 800, color: s.color }}>{s.value}</div>
                                <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>{s.label}</div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* ── Companies Grid ── */}
            <section style={{ padding: '80px 0' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: 48 }}>
                        <h2 style={{ fontSize: 36, fontWeight: 800, marginBottom: 12 }}>Study by Company</h2>
                        <p style={{ color: 'var(--muted)', fontSize: 16 }}>Click any company to see their most-asked interview problems</p>
                    </div>

                    {/* Search */}
                    <div style={{ maxWidth: 380, margin: '0 auto 40px' }}>
                        <input
                            className="input"
                            placeholder="🔍  Search companies..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                        gap: 20,
                    }}>
                        {filtered.map(company => (
                            <Link
                                key={company.slug}
                                to={`/companies/${company.slug}`}
                                style={{ textDecoration: 'none' }}
                            >
                                <div className="card" style={{ padding: 24, cursor: 'pointer' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
                                        <div style={{
                                            width: 48, height: 48, borderRadius: 12,
                                            background: `linear-gradient(135deg, ${company.color}22, ${company.color}11)`,
                                            border: `1px solid ${company.color}33`,
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            fontSize: 24,
                                        }}>{company.emoji}</div>
                                        <div>
                                            <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)' }}>{company.name}</div>
                                            <div style={{ fontSize: 12, color: 'var(--muted)' }}>{company.problemCount} problems</div>
                                        </div>
                                    </div>

                                    <p style={{ fontSize: 12, color: 'var(--faint)', lineHeight: 1.5, marginBottom: 14 }}>{company.desc}</p>

                                    {/* Mini difficulty bar */}
                                    <div style={{ display: 'flex', gap: 4, height: 4 }}>
                                        {['Easy', 'Medium', 'Hard'].map(d => {
                                            // rough 40/40/20 split visual
                                            const w = d === 'Easy' ? '40%' : d === 'Medium' ? '40%' : '20%';
                                            return <div key={d} style={{ flex: 1, borderRadius: 2, background: DIFF_COLOR[d], opacity: 0.7 }} />;
                                        })}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── How It Works ── */}
            <section style={{ padding: '80px 0', background: 'var(--bg2)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <h2 style={{ fontSize: 36, fontWeight: 800, marginBottom: 48 }}>How It Works</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 32 }}>
                        {[
                            { icon: '🏢', step: '01', title: 'Pick a Company', desc: 'Choose from 10 top tech companies. See their most-asked problems.' },
                            { icon: '🎯', step: '02', title: 'Filter by Difficulty', desc: 'Tackle Easy, Medium, or Hard problems at your own pace.' },
                            { icon: '💡', step: '03', title: 'Study Solutions', desc: 'Read detailed explanations and production-quality code in 3 languages.' },
                            { icon: '✅', step: '04', title: 'Track Progress', desc: 'Mark problems solved and watch your readiness grow.' },
                        ].map(item => (
                            <div key={item.step} style={{
                                padding: 28, borderRadius: 14, background: 'var(--surface)',
                                border: '1px solid var(--border)',
                            }}>
                                <div style={{ fontSize: 36, marginBottom: 12 }}>{item.icon}</div>
                                <div style={{ fontSize: 11, color: 'var(--accent)', fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>STEP {item.step}</div>
                                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>{item.title}</h3>
                                <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.6 }}>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Footer ── */}
            <footer style={{ padding: '32px 24px', textAlign: 'center', color: 'var(--faint)', fontSize: 13 }}>
                <p>Built for interview prep · 500 curated problems · Python · Java · C++</p>
            </footer>
        </div>
    );
}
