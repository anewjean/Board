import { connectDB } from "@/util/db";

export default async function Edit({ params }) {
  const client = await connectDB();
  const [rows] = await client.execute("SELECT * FROM `post` WHERE id = ?", [
    Number(params.id),
  ]);
  const title = rows[0].title;
  const content = rows[0].content;

  return (
    <div className="min-h-screen flex justify-center items-start bg-white px-6 pt-24">
      <form
        method="POST"
        action="/api/post/edit"
        className="w-full max-w-3xl space-y-8"
      >
        <input type="hidden" name="id" value={params.id} />

        {/* 제목 input */}
        <input
          name="title"
          defaultValue={title}
          placeholder="제목을 입력하세요"
          className="w-full text-3xl font-semibold placeholder-gray-400 focus:outline-none border-b border-gray-300 focus:border-black transition"
        />

        {/* 본문 textarea */}
        <textarea
          name="content"
          defaultValue={content}
          placeholder="내용을 입력하세요"
          rows={10}
          className="w-full resize-none text-lg placeholder-gray-400 focus:outline-none border-b border-gray-200 focus:border-black transition"
        />

        {/* 저장 버튼 */}
        <div className="pt-2">
          <button
            type="submit"
            className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
          >
            저장
          </button>
        </div>
      </form>
    </div>
  );
}
