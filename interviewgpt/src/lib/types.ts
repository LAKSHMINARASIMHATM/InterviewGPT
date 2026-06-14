export interface Problem {
  id: number;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  topics: string;
  approach: string;
  time: string;
  space: string;
  companies: string[];
}

export interface Company {
  name: string;
  slug: string;
  emoji: string;
  color: string;
  bgColor: string;
  desc: string;
  problemCount?: number;
}

export interface Topic {
  name: string;
  slug: string;
  count: number;
  easy: number;
  medium: number;
  hard: number;
}

export interface UserProgress {
  solvedProblems: number[];
  bookmarkedProblems: number[];
  notes: Record<number, string>;
  streak: number;
  lastSolvedDate: string;
  xp: number;
  level: number;
  badges: string[];
  companyProgress: Record<string, number[]>;
}

export const DEFAULT_PROGRESS: UserProgress = {
  solvedProblems: [],
  bookmarkedProblems: [],
  notes: {},
  streak: 0,
  lastSolvedDate: "",
  xp: 0,
  level: 1,
  badges: [],
  companyProgress: {},
};
