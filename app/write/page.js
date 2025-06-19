'use client'

export default function Write() {
  return (
    <div className="min-h-screen flex justify-center items-start bg-white px-6 pt-24">
      <form
        action="/api/post/new"
        method="POST"
        className="w-full max-w-3xl space-y-8"
      >
        <h2 className="text-2xl font-bold text-gray-800">글 작성</h2>

        {/* 제목 */}
        <input
          type="text"
          name="title"
          placeholder="제목을 입력하세요"
          className="w-full text-3xl font-semibold placeholder-gray-400 focus:outline-none border-b border-gray-300 focus:border-black transition"
        />

        {/* 내용 */}
        <textarea
          name="content"
          rows={10}
          placeholder="내용을 입력하세요"
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
