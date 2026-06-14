import { redirect } from "next/navigation";

// Dashboard has been merged into Analytics
export default function DashboardPage() {
  redirect("/analytics");
}
