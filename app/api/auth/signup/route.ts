import pool from "@/lib/db";
import { RowDataPacket } from "mysql2";
import { NextRequest } from "next/server";
import bcrypt from "bcrypt";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    if (!name || !name.trim() || !email || !email.trim() || !password) {
      return Response.json(
        { error: "All fields are required." },
        { status: 400 },
      );
    }

    if (name.length > 45) {
      return Response.json(
        { error: "Username must be no more than 45 characters." },
        { status: 400 },
      );
    }

    if (email.length > 100) {
      return Response.json(
        { error: "Email must be no more than 100 characters." },
        { status: 400 },
      );
    }

    if (!EMAIL_REGEX.test(email)) {
      return Response.json(
        { error: "Please enter a valid email address." },
        { status: 400 },
      );
    }

    if (password.length < 8 || password.length > 100) {
      return Response.json(
        {
          error:
            "Password must contain at least 8 characters and no more than 100 characters.",
        },
        { status: 400 },
      );
    }

    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT * FROM users WHERE email = ?",
      [email],
    );

    if (rows.length > 0) {
      return Response.json(
        {
          error: "A user with this email already exists.",
        },
        { status: 409 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword],
    );

    return Response.json({ message: "Sign up successful" }, { status: 201 });
  } catch (error: any) {
    return Response.json(
      { error: "Failed to sign up: " + error.message },
      { status: 500 },
    );
  }
}
