"use client";
import "./profile.css";
import { User, Settings, Award, Shield, Flame, Trophy, Medal, Crown } from "lucide-react";
import { motion } from "framer-motion";

const earnedBadges = [
  { icon: "🔥", name: "7-Day Streak" },
  { icon: "⚡", name: "Fast Solver"  },
  { icon: "🧠", name: "DP Master"    },
  { icon: "🌳", name: "Tree Hugger"  },
  { icon: "🎯", name: "First Try"    },
  { icon: "⭐", name: "Top 10%"      },
];

const leaderboardData = [
  { rank: 1, name: "Simha.",     level: 42, xp: "124,500", solved: 450, avatar: "AS" },
  { rank: 2, name: "Sarah J.",   level: 38, xp: "98,200",  solved: 382, avatar: "SJ" },
  { rank: 3, name: "Michael K.", level: 35, xp: "85,400",  solved: 310, avatar: "MK" },
  { rank: 4, name: "Emily R.",   level: 31, xp: "72,100",  solved: 275, avatar: "ER" },
  { rank: 5, name: "David L.",   level: 28, xp: "65,300",  solved: 240, avatar: "DL" },
  { rank: 6, name: "You",        level: 8,  xp: "4,250",   solved: 45,  avatar: "U"  },
];

export default function ProfilePage() {
  return (
    <div className="prof-page">
      <div className="prof-container">

        {/* ── Profile header ── */}
        <motion.div
          className="prof-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="prof-avatar">AL</div>
          <div className="prof-info">
            <h1 className="prof-name">Alex Lee</h1>
            <p className="prof-handle">@alex_codes · Joined April 2026</p>
            <div className="prof-badges-mini">
              <span className="prof-badge-pill text-emerald-400 border-emerald-400/30 bg-emerald-400/10">
                <Shield className="w-3 h-3" /> Pro Member
              </span>
              <span className="prof-badge-pill text-amber-400 border-amber-400/30 bg-amber-400/10">
                <Flame className="w-3 h-3" /> Lv 8
              </span>
            </div>
          </div>
        </motion.div>

        {/* ── Settings + Badges ── */}
        <div className="prof-grid">
          <motion.div
            className="prof-card"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="prof-card-title">
              <Settings className="w-5 h-5 text-blue-400" />
              Account Settings
            </h2>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="prof-form-group">
                <label className="prof-label">Display Name</label>
                <input type="text" className="prof-input" defaultValue="Alex Lee" />
              </div>
              <div className="prof-form-group">
                <label className="prof-label">Email Address</label>
                <input type="email" className="prof-input" defaultValue="alex@example.com" />
              </div>
              <div className="prof-form-group">
                <label className="prof-label">Target Company</label>
                <input type="text" className="prof-input" defaultValue="Google" />
              </div>
              <div className="flex items-center gap-4 mt-8">
                <button className="prof-save-btn !mt-0">Save Changes</button>
                <button
                  type="button"
                  onClick={() => { localStorage.removeItem("isLoggedIn"); window.location.href = "/"; }}
                  className="px-4 py-3 bg-red-500/10 border border-red-500/20 text-red-400 font-semibold rounded-lg hover:bg-red-500/20 transition-all text-sm"
                >
                  Sign Out
                </button>
              </div>
            </form>
          </motion.div>

          <motion.div
            className="prof-card"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="prof-card-title">
              <Award className="w-5 h-5 text-amber-400" />
              Earned Badges
            </h2>
            <div className="prof-badge-grid">
              {earnedBadges.map((badge, i) => (
                <div key={i} className="prof-badge-item">
                  <div className="prof-badge-icon">{badge.icon}</div>
                  <div className="prof-badge-name">{badge.name}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Leaderboard section ── */}
        <motion.div
          className="prof-leaderboard"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="prof-ld-header">
            <Crown className="w-6 h-6 text-amber-500" />
            <div>
              <h2 className="prof-ld-title">Global Leaderboard</h2>
              <p className="prof-ld-sub">See how you rank against the community</p>
            </div>
          </div>

          <div className="prof-ld-card">
            <table className="ld-table">
              <thead>
                <tr>
                  <th className="ld-th">Rank</th>
                  <th className="ld-th">User</th>
                  <th className="ld-th">Level</th>
                  <th className="ld-th">Total XP</th>
                  <th className="ld-th">Problems Solved</th>
                </tr>
              </thead>
              <tbody>
                {leaderboardData.map((user, i) => (
                  <motion.tr
                    key={user.rank}
                    className="ld-tr"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 + i * 0.05 }}
                    style={user.name === "You"
                      ? { background: "rgba(59,130,246,0.08)", borderLeft: "3px solid #3b82f6" }
                      : {}}
                  >
                    <td className="ld-td">
                      <div className={`ld-rank ${user.rank <= 3 ? `ld-rank-${user.rank}` : ""}`}>
                        {user.rank === 1 && <Trophy className="w-4 h-4 inline mr-1" />}
                        {user.rank === 2 && <Medal  className="w-4 h-4 inline mr-1" />}
                        {user.rank === 3 && <Medal  className="w-4 h-4 inline mr-1" />}
                        #{user.rank}
                      </div>
                    </td>
                    <td className="ld-td">
                      <div className="ld-user">
                        <div className="ld-avatar"
                          style={user.name === "You"
                            ? { background: "linear-gradient(135deg,#10b981,#3b82f6)", color: "#fff" }
                            : {}}>
                          {user.avatar}
                        </div>
                        <span style={user.name === "You" ? { color: "#60a5fa", fontWeight: 700 } : {}}>
                          {user.name}
                        </span>
                      </div>
                    </td>
                    <td className="ld-td"><span className="ld-level">Lv {user.level}</span></td>
                    <td className="ld-td"><span className="ld-xp">{user.xp} XP</span></td>
                    <td className="ld-td"><span className="ld-solved">{user.solved}</span></td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
