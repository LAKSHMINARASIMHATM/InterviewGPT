import problemsData from "./problems.json";
import companiesData from "./companies.json";
import topicsData from "./topics.json";
import type { Problem, Company, Topic } from "../types";

export const problems: Problem[] = problemsData as Problem[];
export const companies: Company[] = companiesData as Company[];
export const topics: Topic[] = topicsData as Topic[];

// Pre-compute company problem counts
const companyProblemCounts = new Map<string, number>();
problems.forEach((p) => {
  p.companies.forEach((c) => {
    const key = c.toLowerCase();
    companyProblemCounts.set(key, (companyProblemCounts.get(key) || 0) + 1);
  });
});

export const companiesWithCounts: Company[] = companies.map((c) => ({
  ...c,
  problemCount: companyProblemCounts.get(c.name.toLowerCase()) || 0,
}));

// Featured companies (FAANG + top companies)
const featuredSlugs = [
  "google", "amazon", "microsoft", "meta", "apple", "bloomberg",
  "uber", "adobe", "netflix", "atlassian", "salesforce", "oracle",
  "goldman sachs", "flipkart", "linkedin", "bytedance", "tiktok",
  "nvidia", "databricks", "stripe",
];

export const featuredCompanies = companiesWithCounts
  .filter((c) => featuredSlugs.includes(c.slug))
  .sort((a, b) => (b.problemCount || 0) - (a.problemCount || 0));

// Problem lookups
export function getProblemById(id: number): Problem | undefined {
  return problems.find((p) => p.id === id);
}

export function getCompanyBySlug(slug: string): Company | undefined {
  return companiesWithCounts.find((c) => c.slug === slug);
}

export function getProblemsForCompany(companyName: string): Problem[] {
  return problems.filter((p) =>
    p.companies.some((c) => c.toLowerCase() === companyName.toLowerCase())
  );
}

export function getProblemsForTopic(topicName: string): Problem[] {
  return problems.filter((p) =>
    p.topics.toLowerCase().includes(topicName.toLowerCase())
  );
}

// Stats
export function getStats() {
  const coding = problems.filter(
    (p) =>
      !p.companies.includes("General Aptitude") &&
      !p.companies.includes("Reasoning Tests")
  );
  return {
    total: coding.length,
    easy: coding.filter((p) => p.difficulty === "Easy").length,
    medium: coding.filter((p) => p.difficulty === "Medium").length,
    hard: coding.filter((p) => p.difficulty === "Hard").length,
    companies: companies.length,
    topics: topics.length,
  };
}
