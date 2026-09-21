import { getCurrentUser } from "@/lib/auth";
import pool from "@/lib/db";

export async function GET() {
  try {
    const session = await getCurrentUser();
    if (!session) {
      return Response.json({ error: "Not logged in." }, { status: 401 });
    }

    const [rows] = await pool.query("SELECT * FROM statuses");

    return Response.json(rows);
  } catch (error: any) {
    return Response.json(
      { error: "Failed to load categories: " + error.message },
      { status: 500 },
    );
  }
}
