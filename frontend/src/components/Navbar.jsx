import { Link, NavLink, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const NAV_LINKS = [
    { to: '/', label: 'Home' },
    { to: '/companies', label: 'Companies' },
    { to: '/problems', label: 'Problems' },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 10);
        window.addEventListener('scroll', fn);
        return () => window.removeEventListener('scroll', fn);
    }, []);

    return (
        <nav style={{
            position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
            height: 64,
            background: scrolled ? 'rgba(10,14,26,0.92)' : 'transparent',
            backdropFilter: scrolled ? 'blur(12px)' : 'none',
            borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
            transition: 'all 0.3s',
            display: 'flex', alignItems: 'center', padding: '0 32px',
        }}>
            {/* Logo */}
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{
                    width: 34, height: 34, borderRadius: 8,
                    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 16, fontWeight: 800, color: '#fff', boxShadow: '0 0 16px rgba(99,102,241,0.4)'
                }}>LC</div>
                <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', lineHeight: 1 }}>LeetCode</div>
                    <div style={{ fontSize: 10, color: 'var(--muted)', lineHeight: 1 }}>Company Platform</div>
                </div>
            </Link>

            {/* Links */}
            <div style={{ display: 'flex', gap: 4, marginLeft: 40 }}>
                {NAV_LINKS.map(({ to, label }) => (
                    <NavLink
                        key={to} to={to}
                        style={({ isActive }) => ({
                            textDecoration: 'none',
                            padding: '6px 14px',
                            borderRadius: 8,
                            fontSize: 14,
                            fontWeight: 500,
                            color: isActive ? '#fff' : 'var(--muted)',
                            background: isActive ? 'var(--surface)' : 'transparent',
                            transition: 'all 0.2s',
                        })}
                    >{label}</NavLink>
                ))}
            </div>

            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                    padding: '4px 12px', borderRadius: 20,
                    background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)',
                    fontSize: 12, color: 'var(--accent)', fontWeight: 500,
                }}>500 Problems</div>
                <Link to="/problems" className="btn btn-primary btn-sm" style={{ textDecoration: 'none', padding: '7px 16px' }}>
                    Start Solving →
                </Link>
            </div>
        </nav>
    );
}
