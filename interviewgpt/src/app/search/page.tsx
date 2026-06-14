"use client";
import "./search.css";
import { Search as SearchIcon, FileText, Code2, Play, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

const mockResults = [
  {
    id: 1,
    title: "Understanding Topological Sort",
    type: "concept",
    snippet: "Topological sorting for Directed Acyclic Graph (DAG) is a linear ordering of vertices such that for every directed edge u v, vertex u comes before v in the ordering. <mark>Algorithm</mark> commonly used is Kahn's algorithm...",
    citations: [{ source: "Algorithm Handbook", url: "#" }, { source: "Problem: Course Schedule", url: "/problems/10" }]
  },
  {
    id: 2,
    title: "Kahn's Algorithm Implementation",
    type: "code",
    snippet: "def topologicalSort(adj): \n    in_degree = [0]*V \n    for i in range(V): \n        for j in adj[i]: \n            in_degree[j] += 1 \n    <mark>queue</mark> = [] ...",
    citations: [{ source: "NeetCode Video", url: "#" }]
  }
];

export default function SearchPage() {
  const [query, setQuery] = useState("");

  return (
    <div className="sr-page">
      <div className="sr-container">
        <div className="sr-header">
          <h1 className="sr-title">
            <SearchIcon className="w-8 h-8 text-purple-400" />
            AI Knowledge Search
          </h1>
          <p className="text-gray-400">Search across problems, patterns, and contextual explanations.</p>
        </div>

        <div className="sr-search-box">
          <SearchIcon className="sr-search-icon" />
          <input
            type="text"
            className="sr-input"
            placeholder="Search 'Dynamic Programming', 'Two Sum', etc..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
        </div>

        {query && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="sr-results-count">Found {mockResults.length} RAG context results</div>
            
            <div className="space-y-4">
              {mockResults.map((result) => (
                <div key={result.id} className="sr-card">
                  <div className="flex items-center gap-2 mb-2">
                    {result.type === 'code' ? <Code2 className="w-4 h-4 text-emerald-400" /> : <FileText className="w-4 h-4 text-blue-400" />}
                    <h2 className="sr-card-title !mb-0">{result.title}</h2>
                  </div>
                  <p className="sr-snippet" dangerouslySetInnerHTML={{ __html: result.snippet }}></p>
                  
                  <div className="sr-citation-row">
                    <span className="text-xs text-gray-500 font-semibold uppercase mr-1 flex items-center">Sources:</span>
                    {result.citations.map((cit, i) => (
                      <Link key={i} href={cit.url} className="sr-citation">
                        {cit.source.includes("Video") ? <Play className="w-3 h-3" /> : <BookOpen className="w-3 h-3" />}
                        {cit.source}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
