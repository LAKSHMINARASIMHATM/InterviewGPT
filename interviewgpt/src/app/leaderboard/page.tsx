import { redirect } from "next/navigation";

// Leaderboard has been moved into the Profile page
export default function LeaderboardPage() {
  redirect("/profile");
}
