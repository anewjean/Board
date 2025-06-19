// import { connectDB } from "@/util/db";

// export default async function handler(req, res) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const postId = searchParams.get("postId");

//     if (!postId) {
//       return new Response(JSON.stringify({ error: "postId is required" }), {
//         status: 400,
//       });
//     }

//     const client = await connectDB();
//     const [rows] = await client.execute(
//       "SELECT content, created_at FROM comment WHERE post_id = ? ORDER BY created_at DESC",
//       [postId]
//     );

//     return new Response(JSON.stringify(rows), {
//       status: 200,
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (err) {
//     console.error("Error fetching comments:", err);
//     return new Response(JSON.stringify({ error: "Internal Server Error" }), {
//       status: 500,
//     });
//   }
// }

import { connectDB } from "@/util/db";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const postId = req.query.postId;

    if (!postId) {
      return res.status(400).json({ error: "postId is required" });
    }

    const client = await connectDB();
    const [rows] = await client.execute(
      "SELECT content, created_at FROM comment WHERE post_id = ? ORDER BY created_at DESC",
      [postId]
    );

    return res.status(200).json(rows);
  } catch (err) {
    console.error("Error fetching comments:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}