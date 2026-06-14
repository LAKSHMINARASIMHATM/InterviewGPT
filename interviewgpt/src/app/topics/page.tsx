"use client";
import "./topics.css";

import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, ChevronRight } from "lucide-react";
import { topics } from "@/lib/data";
import { getTopicIcon } from "@/lib/utils";

export default function TopicsPage() {
  const dsaTopics = topics
    .filter(t => !t.name.toLowerCase().includes("aptitude") && !t.name.toLowerCase().includes("reasoning"))
    .sort((a, b) => b.count - a.count);

  return (
    <div className="tp-page">
      <div className="tp-container">
        <div className="tp-header">
          <h1 className="tp-title">
            <BookOpen className="tp-title-icon" width={26} height={26} aria-hidden />
            DSA Topics
          </h1>
          <p className="tp-subtitle">{dsaTopics.length} topics covering all data structures and algorithms</p>
        </div>

        <div className="tp-grid">
          {dsaTopics.map((topic, i) => {
            const total = topic.count || 1;
            const easyPct  = ((topic.easy   || 0) / total) * 100;
            const medPct   = ((topic.medium || 0) / total) * 100;
            const hardPct  = ((topic.hard   || 0) / total) * 100;

            return (
              <motion.div
                key={topic.slug}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(i * 0.03, 0.45) }}
              >
                <Link href={`/topics/${topic.slug}`} className="tp-card" data-testid={`topic-card-${topic.slug}`}>
                  <div className="tp-card-top">
                    <div className="tp-card-left">
                      <span className="tp-icon">{getTopicIcon(topic.name)}</span>
                      <h3 className="tp-name">{topic.name}</h3>
                    </div>
                    <ChevronRight className="tp-chevron" width={16} height={16} aria-hidden />
                  </div>

                  <div className="tp-card-meta">
                    <span className="tp-count">{topic.count}</span>
                    <span className="tp-count-lbl">problems</span>
                  </div>

                  <div className="tp-diff-row">
                    <span className="tp-easy">Easy {topic.easy}</span>
                    <span className="tp-medium">Med {topic.medium}</span>
                    <span className="tp-hard">Hard {topic.hard}</span>
                  </div>

                  <div className="tp-bar-track">
                    <div className="tp-bar-easy"   style={{ width: `${easyPct}%` }} />
                    <div className="tp-bar-medium" style={{ width: `${medPct}%` }} />
                    <div className="tp-bar-hard"   style={{ width: `${hardPct}%` }} />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
