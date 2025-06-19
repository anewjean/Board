import { connectDB } from "@/util/db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { id } = req.query;
      const client = await connectDB();
      const [rows] = await client.execute("SELECT * FROM `post` WHERE id = ?", [id]);

      if (rows.length === 0) {
        return res.status(404).json({ error: "게시글을 찾을 수 없습니다" });
      }

      return res.status(200).json(rows[0]);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "서버 오류 발생" });
    }
  } else {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}
