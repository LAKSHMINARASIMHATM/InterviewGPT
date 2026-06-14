import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export function getDifficultyColor(difficulty: string): string {
  switch (difficulty) {
    case "Easy":
      return "text-emerald-400";
    case "Medium":
      return "text-amber-400";
    case "Hard":
      return "text-rose-400";
    default:
      return "text-gray-400";
  }
}

export function getDifficultyBg(difficulty: string): string {
  switch (difficulty) {
    case "Easy":
      return "bg-emerald-500/10 border-emerald-500/20 text-emerald-400";
    case "Medium":
      return "bg-amber-500/10 border-amber-500/20 text-amber-400";
    case "Hard":
      return "bg-rose-500/10 border-rose-500/20 text-rose-400";
    default:
      return "bg-gray-500/10 border-gray-500/20 text-gray-400";
  }
}

export function formatNumber(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
  if (num >= 1000) return (num / 1000).toFixed(1) + "K";
  return num.toString();
}

export function getTopicIcon(topic: string): string {
  const icons: Record<string, string> = {
    "Array": "📊",
    "String": "📝",
    "Hash Map": "🗂️",
    "Hash Set": "🗂️",
    "Sliding Window": "🪟",
    "Two Pointers": "👆",
    "Linked List": "🔗",
    "Stack": "📚",
    "Queue": "📋",
    "Heap": "⛰️",
    "Binary Search": "🔍",
    "Recursion": "🔄",
    "Backtracking": "↩️",
    "Tree": "🌳",
    "BST": "🌲",
    "Graph": "🕸️",
    "DFS": "🏊",
    "BFS": "🌊",
    "DP": "💎",
    "Dynamic Programming": "💎",
    "Greedy": "🤑",
    "Bit Manipulation": "⚡",
    "Trie": "🔤",
    "Math": "🔢",
    "Sorting": "📈",
    "Design": "🏗️",
    "Union Find": "🤝",
    "Segment Tree": "🌿",
    "Topological Sort": "📐",
  };
  return icons[topic] || "💻";
}
