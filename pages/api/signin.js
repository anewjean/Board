import bcrypt from 'bcrypt';
import { connectDB } from '@/util/db';

export default async function handler(request, response) {
    if (request.method == 'POST') {
        const { email, password } = request.body;
        if (!email || !password ) {
            return response.status(500).json("내용을 채워주세요")
        }
        const client = await connectDB();        
        const [rows] = await client.execute('SELECT * FROM `user` WHERE email = ?', [email]);
        // 이메일로 유저가 조회되는지 확인
        if (rows.length === 0) {
        return response.status(400).json("존재하지 않는 이메일입니다.");
        }
        const user = rows[0];

        // 패스워드가 일치하는지 비교
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
        return response.status(409).json("존재하지 않는 이메일입니다.");
        }
        return response.status(302).redirect('/');
    }
}
