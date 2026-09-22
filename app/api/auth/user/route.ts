import { createSessionToken, getCurrentUser } from "@/lib/auth";
import pool from "@/lib/db";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const session = await getCurrentUser();
    if (!session) {
      return Response.json({ error: "Not logged in." }, { status: 401 });
    }

    const { name } = await req.json();

    if (!name || !name.trim()) {
      return Response.json(
        { error: "Please enter your name." },
        { status: 400 },
      );
    }

    if (name.length > 45) {
      return Response.json(
        {
          error: "Name must be no more than 45 characters!",
        },
        { status: 400 },
      );
    }

    const [rows]: any = await pool.query(
      "UPDATE users SET name = ? WHERE id = ?",
      [name, session.userId],
    );

    if (rows.affectedRows === 0) {
      return Response.json({ error: "User not found." }, { status: 404 });
    }

    const newToken = await createSessionToken({
      userId: session.userId,
      email: session.email,
      name,
    });
    const cookieStore = await cookies();
    cookieStore.set("session", newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return Response.json(
      { message: "User updated successfully" },
      { status: 200 },
    );
  } catch (error: any) {
    return Response.json(
      { error: "Failed to update profile: " + error.message },
      { status: 500 },
    );
  }
}

export async function DELETE() {
  try {
    const session = await getCurrentUser();
    if (!session) {
      return Response.json({ error: "Not logged in." }, { status: 401 });
    }

    const [rows]: any = await pool.query("DELETE FROM users WHERE id = ?", [
      session.userId,
    ]);
    if (rows.affectedRows === 0) {
      return Response.json({ error: "User not found." }, { status: 404 });
    }

    const cookieStore = await cookies();
    cookieStore.delete("session");

    return Response.json(
      { message: "User deleted successfully" },
      { status: 200 },
    );
  } catch (error: any) {
    return Response.json(
      { error: "Failed to delete user: " + error.message },
      { status: 500 },
    );
  }
}
