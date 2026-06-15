import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { action, name, email, password } = await req.json();

    if (action === "login") {
      let user = await prisma.user.findUnique({
        where: { email }
      });

      // Seeding helper to ensure user@example.com is always available
      if (!user && email === "user@example.com") {
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
          }
        });
      }

      if (!user) {
        return NextResponse.json({ error: "User not found. Try signing up!" }, { status: 404 });
      }

      if (user.password !== password) {
        return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
      }

      return NextResponse.json({
        success: true,
        user: { name: user.name, email: user.email }
      });
    }

    if (action === "signup") {
      const existing = await prisma.user.findUnique({
        where: { email }
      });

      if (existing) {
        return NextResponse.json({ error: "Email already exists" }, { status: 400 });
      }

      const user = await prisma.user.create({
        data: {
          name: name || "New User",
          email,
          password,
          level: 1,
          xp: 0,
          streak: 0,
          solved: 0,
          avatar: name ? name.charAt(0).toUpperCase() : "U",
        }
      });

      return NextResponse.json({
        success: true,
        user: { name: user.name, email: user.email }
      });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    console.error("Auth API Error:", error);
    return NextResponse.json({ error: error.message || "Failed to authenticate" }, { status: 500 });
  }
}
