export default function Register() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form
        method="POST"
        action="/api/auth/signup"
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">회원가입</h2>

        <div>
          <label className="block text-sm text-gray-600 mb-1"></label>
          <input
            name="name"
            type="text"
            placeholder="이름"
            className="w-full px-4 py-2 border border-gray-300 rounded bg-gray-50 focus:outline-none focus:ring focus:border-blue-400"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1"></label>
          <input
            name="email"
            type="text"
            placeholder="이메일"
            className="w-full px-4 py-2 border border-gray-300 rounded bg-gray-50 focus:outline-none focus:ring focus:border-blue-400"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1"></label>
          <input
            name="password"
            type="password"
            placeholder="비밀번호"
            className="w-full px-4 py-2 border border-gray-300 rounded bg-gray-50 focus:outline-none focus:ring focus:border-blue-400"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-600 transition"
        >
          가입 요청
        </button>
      </form>
    </div>
  );
}
