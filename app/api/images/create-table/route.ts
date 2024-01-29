import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    // const res = await sql`DROP TABLE IF EXISTS Images;`;
    const result =
      await sql`CREATE TABLE images ( id SERIAL PRIMARY KEY, title varchar(255), src varchar(255), isPublic bool );`;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
