import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';
import { connectDB } from '../../../util/db';

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: 'Ov23liNdH8WrzYTSHNX2',
      clientSecret: 'a6819f241c05b9b6013fc7610ba0601677d13d71',
      name: '깃헙',
    }),

    CredentialsProvider({
      //1. 로그인페이지 폼 자동생성 
      name: "이메일",
        credentials: {
          email: { label: "이메일", type: "text" },
          password: { label: "비밀번호", type: "password" },
      },

      //2. 로그인 요청 처리
      //직접 DB에서 아이디,비번 비교하고 
      //아이디,비번 맞으면 return 결과, 틀리면 return null 해야함
      async authorize(credentials) {
        try {
          const client = await connectDB();        
          const [rows] = await client.execute('SELECT * FROM `user` WHERE email = ?', [credentials.email]);
          // 이메일로 유저가 조회되는지 확인
          if (rows.length === 0) {
            console.log("존재하지 않는 이메일입니다.");
            return null;
          }
          const user = rows[0];
          
          // 패스워드가 일치하는지 비교
          const isMatch = await bcrypt.compare(credentials.password, user.password);
          if (!isMatch) {
            console.log("비밀번호가 일치하지 않습니다.");
            return null;
          }
          return {
            id: user.id,
            email: user.email,
            name: user.name || null
          }
        }
        catch (err) {
          console.error("authorize() error:", err);
          return null;
        }
      }
    })
  ],

  //3. jwt 만료일설정
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60 // 30일
  },

  callbacks: {
    //4. jwt 생성
    //user변수는 DB의 유저정보담겨있고 token.user에 뭐 저장하면 jwt에 들어갑니다.
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = {};
        token.user.name = user.name
        token.user.email = user.email
      }
      return token;
    },
    //5. 유저 세션 조회
    session: async ({ session, token }) => {
      session.user = token.user;  
      return session;
    },
  },

  pages: {
    signIn: "/signin",
  },

  secret: 'asdjfeiojfdjbsaf12341askjfAF32fan4Ssadf1saWS43'  
};
export default NextAuth(authOptions);