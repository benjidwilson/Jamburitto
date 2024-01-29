import firebase_app from "@/firebase/config";
import { sql } from "@vercel/postgres";
import { getAuth } from "firebase/auth";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const auth = getAuth(firebase_app);
  if (auth.currentUser === null) {
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  }
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title");
  const url = searchParams.get("url");

  try {
    if (!title || !url) throw new Error("title and url required");
    await sql`INSERT INTO images (title, src, isPublic) VALUES ( ${title}, ${url}, true);`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  const images = await sql`SELECT * FROM Images;`;
  return NextResponse.json({ images }, { status: 200 });
}
