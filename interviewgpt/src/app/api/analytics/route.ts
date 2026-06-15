import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { problems, topics } from "@/lib/data";

export async function GET() {
  try {
    // 1. Check if user exists, else seed default user
    let user = await prisma.user.findFirst();
    if (!user) {
      user = await prisma.user.create({
        data: {
          name: "Lakshmi Narasimha",
          email: "user@example.com",
          password: "hashed_password_123",
          level: 1,
          xp: 0,
          streak: 0,
          solved: 0,
          avatar: "L",
        },
      });
    }

    // 2. Check if problems exist, else seed
    const dbProblemCount = await prisma.problem.count();
    if (dbProblemCount === 0) {
      const problemsToInsert = problems.map((p) => ({
        problemId: p.id,
        title: p.title,
        difficulty: p.difficulty,
        topics: p.topics,
        companies: p.companies.join(", "),
        approach: p.approach,
      }));
      
      // Batch insert problems
      await prisma.problem.createMany({
        data: problemsToInsert,
      });
    }

    // 3. Check if badges exist, else seed
    const dbBadgeCount = await prisma.badge.count();
    if (dbBadgeCount === 0) {
      await prisma.badge.createMany({
        data: [
          { name: "First Blood", icon: "⚔️" },
          { name: "Streak Master", icon: "🔥" },
          { name: "Array Warrior", icon: "📊" },
          { name: "DP Apprentice", icon: "💎" },
          { name: "Graph Explorer", icon: "🕸️" },
          { name: "Speed Demon", icon: "⚡" },
        ],
      });
    }

    // 5. Fetch all stats from database
    const solvedProgress = await prisma.progress.findMany({
      where: { userId: user.id, status: "Solved" },
      include: { problem: true },
    });

    const easySolved = solvedProgress.filter((p) => p.problem.difficulty === "Easy").length;
    const medSolved = solvedProgress.filter((p) => p.problem.difficulty === "Medium").length;
    const hardSolved = solvedProgress.filter((p) => p.problem.difficulty === "Hard").length;
    const totalSolved = solvedProgress.length;

    // Company Readiness calculations
    const companyList = [
      { name: "Amazon", color: "an-prog-orange" },
      { name: "Google", color: "an-prog-blue" },
      { name: "Microsoft", color: "an-prog-blue" },
      { name: "Meta", color: "an-prog-blue" },
      { name: "Apple", color: "an-prog-green" },
    ];

    const companyReadiness = companyList.map((c) => {
      const totalProblems = problems.filter((p) =>
        p.companies.some((comp) => comp.toLowerCase() === c.name.toLowerCase())
      ).length;
      const solvedProblems = solvedProgress.filter((p) =>
        p.problem.companies.toLowerCase().includes(c.name.toLowerCase())
      ).length;
      const score = totalProblems > 0 ? Math.round((solvedProblems / totalProblems) * 100) : 0;
      return {
        company: c.name,
        score: score, // show actual score
        problems: totalProblems,
        color: c.color,
      };
    });

    // Topic mastery calculations
    const topTopics = topics
      .filter((t) => !t.name.includes("Aptitude"))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);

    const topicMastery = topTopics.map((topic) => {
      const totalForTopic = problems.filter((p) =>
        p.topics.toLowerCase().includes(topic.name.toLowerCase())
      ).length;
      const solvedForTopic = solvedProgress.filter((p) =>
        p.problem.topics.toLowerCase().includes(topic.name.toLowerCase())
      ).length;
      const score = totalForTopic > 0 ? Math.round((solvedForTopic / totalForTopic) * 100) : 0;
      return {
        name: topic.name,
        mastery: score, // show actual mastery
      };
    });

    // Achievements check
    const userBadges = await prisma.userBadge.findMany({
      where: { userId: user.id },
      include: { badge: true },
    });
    const unlockedBadgeNames = userBadges.map((ub) => ub.badge.name);

    const dbBadges = await prisma.badge.findMany();
    const achievements = dbBadges.map((b) => ({
      name: b.name,
      desc: b.name === "First Blood" ? "Solve your first problem" :
            b.name === "Streak Master" ? "7-day streak" :
            b.name === "Array Warrior" ? "Solve 10 array problems" :
            b.name === "DP Apprentice" ? "Solve 5 DP problems" :
            b.name === "Graph Explorer" ? "Solve 5 graph problems" :
            "Solve 3 problems in one day",
      icon: b.icon,
      unlocked: unlockedBadgeNames.includes(b.name),
    }));

    // Recent activity list
    const recentActivity = solvedProgress
      .slice(0, 4)
      .map((p, index) => ({
        id: p.id,
        type: "solve",
        title: `Solved '${p.problem.title}' optimally`,
        time: index === 0 ? "2 hours ago" : index === 1 ? "5 hours ago" : index === 2 ? "1 day ago" : "2 days ago",
      }));

    if (recentActivity.length === 0) {
      recentActivity.push({
        id: "default-act",
        type: "solve",
        title: "Started your coding interview preparation journey",
        time: "Just now",
      });
    }

    // Calculate actual weekly/daily activity for heatmap
    const dateLimit = new Date();
    dateLimit.setDate(dateLimit.getDate() - 364);

    const recentProgress = await prisma.progress.findMany({
      where: {
        userId: user.id,
        updatedAt: { gte: dateLimit }
      },
      select: { updatedAt: true }
    });

    const activityArray = Array(364).fill(0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    recentProgress.forEach((p) => {
      const date = new Date(p.updatedAt);
      date.setHours(0, 0, 0, 0);
      
      const diffTime = today.getTime() - date.getTime();
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays >= 0 && diffDays < 364) {
        const index = 363 - diffDays;
        activityArray[index] += 1;
      }
    });

    return NextResponse.json({
      userStats: {
        solved: totalSolved,
        streak: user.streak,
        xp: user.xp,
        level: user.level,
        easy: easySolved,
        medium: medSolved,
        hard: hardSolved,
        weeklyGoal: 15,
        weeklyDone: Math.min(15, Math.round(totalSolved * 0.2)),
      },
      readiness: companyReadiness,
      topicMastery,
      achievements,
      recentActivity,
      activity: activityArray,
      solvedProblemIds: solvedProgress.map(p => p.problem.problemId),
    });
  } catch (error: any) {
    console.error("Analytics API Error:", error);
    return NextResponse.json({ error: error.message || "Failed to load analytics" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { problemId, completed } = await req.json();
    const user = await prisma.user.findFirst();
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const dbProblem = await prisma.problem.findUnique({
      where: { problemId: parseInt(problemId) }
    });

    if (!dbProblem) {
      return NextResponse.json({ error: "Problem not found" }, { status: 404 });
    }

    const status = completed ? "Solved" : "To Do";

    await prisma.progress.upsert({
      where: {
        userId_problemId: {
          userId: user.id,
          problemId: dbProblem.id
        }
      },
      update: { status },
      create: {
        userId: user.id,
        problemId: dbProblem.id,
        status
      }
    });

    // Update user solved count
    const solvedCount = await prisma.progress.count({
      where: { userId: user.id, status: "Solved" }
    });

    await prisma.user.update({
      where: { id: user.id },
      data: { solved: solvedCount }
    });

    return NextResponse.json({ success: true, solvedCount });
  } catch (error: any) {
    console.error("Analytics POST Error:", error);
    return NextResponse.json({ error: error.message || "Failed to update progress" }, { status: 500 });
  }
}
