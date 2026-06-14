"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  Building2,
  BookOpen,
  BarChart3,
  Bot,
  Map,
  Sparkles,
  Menu,
  X,
  Zap,
  Search,
  Trophy,
  Award,
  Home,
} from "lucide-react";

const navItems = [
  { href: "/problems",  label: "Problems",  icon: Code2     },
  { href: "/topics",    label: "Topics",    icon: BookOpen  },
  { href: "/companies", label: "Companies", icon: Building2 },
  { href: "/prep",      label: "Prep Guide",icon: Award     },
  { href: "/search",    label: "Search",    icon: Search    },
  { href: "/ai-coach",  label: "AI Coach",  icon: Bot       },
  { href: "/mock-interview", label: "Mock Interview", icon: Trophy },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/roadmap",   label: "Roadmap",   icon: Map       },
  { href: "/revision",  label: "Revision",  icon: Sparkles  },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
  }, [pathname]);

  const companySlugMatch = pathname?.match(/^\/companies\/([^/]+)/);
  const companySlug = companySlugMatch ? companySlugMatch[1] : null;

  const dynamicNavItems = [...navItems];
  if (companySlug && companySlug !== "prep") {
    dynamicNavItems.push({
      href: `/companies/${companySlug}/prep`,
      label: "Round Prep",
      icon: Award
    });
  }

  return (
    <nav 
      className="navbar-blur fixed top-0 left-0 right-0 z-50"
      style={{
        background: "#050505",
        borderBottom: "1px solid rgba(255, 255, 255, 0.08)"
      }}
    >
      <div className="w-full px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/40 transition-shadow">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight">
              Interview<span className="gradient-text">GPT</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="flex items-center gap-1">
              {dynamicNavItems.map((item) => {
                const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-white/10 text-white shadow-lg shadow-white/5"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
            <div className="flex items-center gap-2 border-l border-white/10 pl-4">
              {mounted && isLoggedIn ? (
                <Link href="/profile" className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 transition-colors border border-white/10">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-black font-bold text-xs">
                    AL
                  </div>
                  <span className="text-sm font-medium text-gray-200">Alex</span>
                </Link>
              ) : (
                <>
                  <Link href="/login" className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors">Log in</Link>
                  <Link href="/signup" className="px-4 py-2 text-sm font-medium bg-white text-black hover:bg-gray-100 rounded-xl transition-colors">Sign up</Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-xl hover:bg-white/5 transition-colors"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-white/5 bg-[#0a0d14]/95 backdrop-blur-xl"
          >
            <div className="container-app py-4 space-y-1">
              {dynamicNavItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? "bg-white/10 text-white"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <Icon className="w-4.5 h-4.5" />
                    {item.label}
                  </Link>
                );
              })}
              <div className="pt-4 mt-2 border-t border-white/10 flex flex-col gap-2">
                {mounted && isLoggedIn ? (
                  <Link
                    href="/profile"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-white bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-black font-bold text-xs">
                      AL
                    </div>
                    View Profile
                  </Link>
                ) : (
                  <>
                    <Link
                      href="/login"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-center w-full px-4 py-3 rounded-xl text-sm font-medium text-white bg-white/5 hover:bg-white/10 transition-colors"
                    >
                      Log in
                    </Link>
                    <Link
                      href="/signup"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-center w-full px-4 py-3 rounded-xl text-sm font-medium text-black bg-white hover:bg-gray-100 transition-colors"
                    >
                      Sign up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
