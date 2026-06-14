import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API = '/api';

export default function Companies() {
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        axios.get(`${API}/companies`)
            .then(r => setCompanies(r.data))
            .finally(() => setLoading(false));
    }, []);

    const filtered = companies.filter(c =>
        c && c.name && c.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="page" style={{ padding: '96px 24px 60px' }}>
            <div className="container">
                {/* Header */}
                <div style={{ marginBottom: 48 }}>
                    <div style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 8 }}>
                        <Link to="/" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Home</Link>
                        {' › '}Companies
                    </div>
                    <h1 style={{ fontSize: 40, fontWeight: 800, marginBottom: 12 }}>Companies</h1>
                    <p style={{ color: 'var(--muted)', fontSize: 16 }}>
                        Select a company to explore their most-frequently asked LeetCode problems.
                    </p>
                </div>

                {/* Search */}
                <div style={{ maxWidth: 420, marginBottom: 40 }}>
                    <input
                        className="input"
                        placeholder="🔍  Search companies..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>

                {/* Grid */}
                {loading ? (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px,1fr))', gap: 20 }}>
                        {Array.from({ length: 8 }).map((_, i) => (
                            <div key={i} className="skeleton" style={{ height: 160, borderRadius: 14 }} />
                        ))}
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px,1fr))', gap: 20 }}>
                        {filtered.map(company => (
                            <Link
                                key={company.slug}
                                to={`/companies/${company.slug}`}
                                style={{ textDecoration: 'none' }}
                            >
                                <div className="card" style={{ padding: 28, height: '100%' }}>
                                    {/* Header row */}
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
                                        <div style={{
                                            width: 56, height: 56, borderRadius: 14,
                                            background: `linear-gradient(135deg, ${company.color}22, ${company.color}11)`,
                                            border: `1px solid ${company.color}33`,
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            fontSize: 28,
                                        }}>{company.emoji}</div>
                                        <div>
                                            <div style={{ fontSize: 18, fontWeight: 700 }}>{company.name}</div>
                                            <div style={{
                                                fontSize: 12, marginTop: 2,
                                                color: company.color, opacity: 0.9,
                                            }}>{company.problemCount} problems</div>
                                        </div>
                                        <div style={{ marginLeft: 'auto', fontSize: 18, color: 'var(--faint)' }}>→</div>
                                    </div>

                                    <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.6, marginBottom: 18 }}>
                                        {company.desc}
                                    </p>

                                    {/* Progress hint */}
                                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                                        {['Easy', 'Medium', 'Hard'].map(d => (
                                            <span key={d} className={`badge badge-${d.toLowerCase()}`}>{d}</span>
                                        ))}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}

                {filtered.length === 0 && !loading && (
                    <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--muted)' }}>
                        <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
                        <div>No companies found for "{search}"</div>
                    </div>
                )}
            </div>
        </div>
    );
}
