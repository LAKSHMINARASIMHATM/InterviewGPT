import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";

export const metadata: Metadata = {
  title: "InterviewGPT — AI-Powered Coding Interview Preparation",
  description:
    "Master coding interviews with AI-powered hints, company-specific problem sets, personalized roadmaps, and an intelligent interview coach. Practice 1800+ problems from 470+ companies.",
  keywords: [
    "coding interview",
    "leetcode",
    "data structures",
    "algorithms",
    "AI interview prep",
    "FAANG",
    "tech interview",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#07080d]">
        <Navbar />
        <main style={{ paddingTop: "64px" }}>{children}</main>
      </body>
    </html>
  );
}
