'use client'

import { signIn } from 'next-auth/react'
import { useState } from 'react'

export default function SignInPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        {/* GitHub 로그인 버튼 */}
        <button
          onClick={() => signIn('github', { callbackUrl: '/' })}
          className="w-full flex items-center justify-center gap-2 bg-black text-white py-2 rounded hover:bg-gray-800 transition"
        >
          <svg
            className="w-5 h-5"
            fill="white"
            viewBox="0 0 24 24"
          >
            <path d="M12 .3a12 12 0 00-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.6-4-1.6-.5-1.2-1.2-1.6-1.2-1.6-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 .1 1.5-.8 1.5-.8.5-.8.8-1.2.8-1.2-2.6-.3-5.3-1.2-5.3-5.6 0-1.3.4-2.3 1.2-3.1-.1-.3-.5-1.4.1-2.9 0 0 1-.3 3.3 1.2a11.5 11.5 0 016 0c2.2-1.5 3.3-1.2 3.3-1.2.6 1.5.2 2.6.1 2.9.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.3-5.3 5.6.4.3.8.9.8 1.8v2.7c0 .3.2.7.8.6A12 12 0 0012 .3" />
          </svg>
          <span className="font-medium">깃헙으로 로그인</span>
        </button>

        {/* 구분선 */}
        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-600" />
        </div>

        {/* 이메일/비밀번호 로그인 */}
        <form method="post" action="/api/signin" className="space-y-4">
          <div>
            <label className="text-sm font-medium block mb-1">이메일</label>
            <input
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
            />
          </div>
          <div>
            <label className="text-sm font-medium block mb-1">비밀번호</label>
            <input
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gray-100 border border-gray-300 text-gray-700 py-2 rounded hover:bg-gray-200 transition"
          >
            이메일로 로그인
          </button>
        </form>
      </div>
    </div>
  )
}