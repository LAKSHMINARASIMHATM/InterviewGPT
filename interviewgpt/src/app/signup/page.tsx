"use client";
import "../login/auth.css";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Lock, User, ArrowRight, Code2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const [error, setError] = useState<string | null>(null);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "signup", name, email, password })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        localStorage.setItem("isLoggedIn", "true");
        router.push("/dashboard");
      } else {
        setError(data.error || "Signup failed");
      }
    } catch (err) {
      setError("An error occurred during registration.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-branding">
        <div>
          <Link href="/" className="auth-brand-logo">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-black">
              <Code2 className="w-6 h-6" />
            </div>
            InterviewGPT
          </Link>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="auth-brand-quote">
            "The roadmap feature and AI feedback helped me land my dream role at Meta. It's the ultimate prep tool."
          </h2>
          <div className="auth-brand-author">
            <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold">
              SJ
            </div>
            <div>
              <div className="font-bold text-white">Sarah J.</div>
              <div className="text-sm">Frontend Engineer @ Meta</div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="auth-content">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="auth-form-card"
        >
          <div className="auth-header-mobile">
            <Link href="/" className="auth-brand-logo">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-black">
                <Code2 className="w-5 h-5" />
              </div>
              InterviewGPT
            </Link>
          </div>

          <h1 className="auth-title">Create an account</h1>
          <p className="auth-subtitle">Start your journey to cracking the coding interview.</p>

          <button className="auth-social-btn">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            Sign up with GitHub
          </button>

          <div className="auth-divider">
            <span>or sign up with email</span>
          </div>

          <form onSubmit={handleSignup}>
            {error && (
              <div className="mb-4 p-3 bg-red-950/20 border border-red-500/30 text-rose-400 text-sm rounded-lg" style={{ marginBottom: "16px", padding: "12px", border: "1px solid rgba(239, 68, 68, 0.3)", borderRadius: "8px", color: "#f43f5e", fontSize: "14px", backgroundColor: "rgba(254, 226, 226, 0.05)" }}>
                {error}
              </div>
            )}
            <div className="auth-form-group">
              <label className="auth-label">Full Name</label>
              <div className="auth-input-wrapper">
                <User className="auth-input-icon" />
                <input 
                  type="text" 
                  className="auth-input" 
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required 
                />
              </div>
            </div>

            <div className="auth-form-group">
              <label className="auth-label">Email address</label>
              <div className="auth-input-wrapper">
                <Mail className="auth-input-icon" />
                <input 
                  type="email" 
                  className="auth-input" 
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>
            </div>

            <div className="auth-form-group">
              <label className="auth-label">Password</label>
              <div className="auth-input-wrapper">
                <Lock className="auth-input-icon" />
                <input 
                  type="password" 
                  className="auth-input" 
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
              </div>
            </div>

            <button type="submit" className="auth-submit">
              Sign Up <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="auth-footer">
            Already have an account? <Link href="/login" className="auth-link">Sign in</Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
