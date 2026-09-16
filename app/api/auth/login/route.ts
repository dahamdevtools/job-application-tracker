import pool from "@/lib/db";
import { RowDataPacket } from "mysql2";
import { NextRequest } from "next/server";
import bcrypt from "bcrypt";
import { createSessionToken } from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !email.trim() || !password || !password.trim()) {
      return Response.json(
        { error: "All fields are required." },
        { status: 400 },
      );
    }

    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT * FROM users WHERE email = ?",
      [email],
    );

    if (rows.length === 0) {
      return Response.json(
        { error: "Invalid email or password." },
        { status: 401 },
      );
    }

    const user = rows[0];
    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
      return Response.json(
        { error: "Invalid email or password." },
        { status: 401 },
      );
    }

    const token = await createSessionToken({
      userId: user.id,
      email: user.email,
      name: user.name,
    });

    const cookieStore = await cookies();
    cookieStore.set("session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    const { password: _pw, ...safeUser } = user;

    return Response.json({ message: "Login successful", user: safeUser });
  } catch (error: any) {
    return Response.json(
      { error: "Failed to login: " + error.message },
      { status: 500 },
    );
  }
}
