import Link from "next/link";
import { connectDB } from "@/util/db";
import { NextResponse } from "next/server";

export default async function Home() {
  const client = await connectDB();
  if (!connectDB)
    return NextResponse.json({ error: "DB connection failed" }, { status: 500 });

  const [rows] = await client.execute("SELECT * FROM `post`");
  await client.end();
  console.log(rows);

  return (
    <div className="flex flex-col items-center py-16 space-y-6">
      <h1 className="text-4xl font-bold">게시판</h1>

      <div className="h-10" />

      <Link
        href="/write"
        className="flex items-center gap-2 px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
      >
        <span>✏️</span> 글쓰기
      </Link>
    </div>
  );
}
