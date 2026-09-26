import { getCurrentUser } from "@/lib/auth";
import pool from "@/lib/db";
import { format } from "date-fns";
import { NextRequest } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await getCurrentUser();
    if (!session) {
      return Response.json({ error: "Not logged in." }, { status: 400 });
    }

    const { id } = await params;

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

    const formattedDate = format(new Date(applied_at), "yyyy-MM-dd HH:mm:ss");

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

    const [rows]: any = await pool.query(
      "UPDATE applications SET company = ?, position = ?, location = ?, salary = ?, applied_at = ?, notes = ?, url = ?, status_id = ? WHERE id = ? AND user_id = ?",
      [
        company,
        position,
        location,
        salary,
        formattedDate,
        notes,
        url,
        status_id,
        id,
        session.userId,
      ],
    );

    if (rows.affectedRows === 0) {
      return Response.json(
        { error: "Application not found." },
        { status: 404 },
      );
    }

    return Response.json(
      { message: "Application updated successfully" },
      { status: 200 },
    );
  } catch (error: any) {
    return Response.json(
      { error: "Failed to update application: " + error.message },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await getCurrentUser();
    if (!session) {
      return Response.json({ error: "Not logged in." }, { status: 401 });
    }

    const { id } = await params;

    const [rows]: any = await pool.query(
      "DELETE FROM applications WHERE id = ? AND user_id = ?",
      [id, session.userId],
    );

    if (rows.affectedRows === 0) {
      return Response.json(
        { error: "Application not found." },
        { status: 404 },
      );
    }

    return Response.json(
      { message: "Application deleted successfully" },
      { status: 200 },
    );
  } catch (error: any) {
    return Response.json(
      {
        error: "Failed to delete application: " + error.message,
      },
      { status: 500 },
    );
  }
}
