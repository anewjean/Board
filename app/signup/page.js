export default function SignUp() {
  return (
    <div>
        <h4>회원 가입</h4>
        <form action="/api/signup" method="POST">
            아이디: <input type="text" name="user_id" placeholder="사용할 아이디를 입력해주세요"/>
            비밀번호: <input type="text" name="password" placeholder="사용할 비밀번호를 입력해주세요"/>
            <br />
            <br />
            <button type="submit">저장</button>
        </form>
    </div>
  )
}