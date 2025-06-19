import { connectDB } from "@/util/db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { author, postId, content } = req.body;
    if (!postId || !content) return res.status(400).json({ error: "내용 없음" });

    const client = await connectDB();
    await client.execute(
      "INSERT INTO comment (author, post_id, content) VALUES (?, ?, ?)", [author, postId, content]
    );
    return res.status(200).json({ message: "댓글 저장됨" });
  }
}
