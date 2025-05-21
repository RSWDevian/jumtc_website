import pool from "../../../lib/db";

export async function GET() {
  try {
    const result = await pool.query("SELECT NOW()");
    return Response.json({ time: result.rows[0], message: "Connected to db" });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
