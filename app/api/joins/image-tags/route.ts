import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const result = await sql`CREATE TABLE image_tags (
        image_id INTEGER REFERENCES images(id),
        tag_id INTEGER REFERENCES tags(id),
        PRIMARY KEY (image_id, tag_id)
    );`;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
