import { getCurrentUser } from "@/lib/auth";
import pool from "@/lib/db";

export async function GET() {
  const session = await getCurrentUser();
  if (!session) {
    return Response.json({ error: "Not logged in." }, { status: 401 });
  }

  const [rows]: any = await pool.query(
    "SELECT id, name, email FROM users WHERE id = ?",
    [session.userId],
  );

  if (rows.length === 0) {
    return Response.json({ error: "User not found." }, { status: 404 });
  }

  return Response.json(rows[0]);
}
