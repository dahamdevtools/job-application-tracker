import { getCurrentUser } from "@/lib/auth";
import pool from "@/lib/db";
import { NextRequest } from "next/server";

export async function GET() {
  try {
    const session = await getCurrentUser();
    if (!session) {
      return Response.json({ error: "Not logged in." }, { status: 401 });
    }

    const [rows] = await pool.query(
      "SELECT * FROM applications WHERE user_id = ?",
      [session.userId],
    );

    return Response.json(rows);
  } catch (error: any) {
    return Response.json(
      { error: "Failed to load applications: " + error.message },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getCurrentUser();
    if (!session) {
      return Response.json({ error: "Not logged in." }, { status: 401 });
    }

    const {
      company,
      position,
      location,
      salary,
      applied_at,
      notes,
      url,
      status_id,
    } = await req.json();

    if (!company || !company.trim()) {
      return Response.json(
        { error: "Company name is required." },
        { status: 400 },
      );
    }

    if (!position || !position.trim()) {
      return Response.json({ error: "Position is required." }, { status: 400 });
    }

    if (!location || !location.trim()) {
      return Response.json({ error: "Location is required." }, { status: 400 });
    }

    if (!salary || !salary.trim()) {
      return Response.json({ error: "Salary is required." }, { status: 400 });
    }

    if (!status_id) {
      return Response.json({ error: "Status is required." }, { status: 400 });
    }

    await pool.query(
      "INSERT INTO applications (company, position, location, salary, applied_at, notes, url, user_id, status_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        company,
        position,
        location,
        salary,
        applied_at,
        notes,
        url,
        session.userId,
        status_id,
      ],
    );

    return Response.json(
      { message: "Application created successfully" },
      { status: 201 },
    );
  } catch (error: any) {
    return Response.json(
      { error: "Failed to create application: " + error.message },
      { status: 500 },
    );
  }
}
