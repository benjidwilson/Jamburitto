import firebase_app from "@/firebase/config";
import { sql } from "@vercel/postgres";
import { getAuth } from "firebase/auth";
import { NextResponse } from "next/server";
// import { v4 as uuidv4 } from "uuid";

export async function GET(request: Request) {
  const auth = getAuth(firebase_app);
  if (auth.currentUser === null) {
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  }
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title");
  //   const id = uuidv4();

  try {
    if (!title) throw new Error("Title required");
    await sql`INSERT INTO tags (title) VALUES (${title});`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  const tags = await sql`SELECT * FROM Tags;`;
  return NextResponse.json({ tags }, { status: 200 });
}
