import { connectDB } from '../../../util/db';
import bcrypt from "bcrypt";
import { NextResponse } from 'next/server';
import { v7 as uuidv7 } from "uuid";

export default async function handler(request, response) {
  if (request.method === "POST") {
    const id = uuidv7();
    const { name, email, password } = request.body;
    if (!name || !email || !password ) {
        return response.status(500).json("정확히 기입해주세요")
    }
    const hash = await bcrypt.hash(request.body.password, 10);
    try {
        const client = await connectDB();     
        const [rows] = await client.execute('SELECT * FROM `user` WHERE email = ?', [email]);
        if (rows.length !== 0) {
            return response.status(409).json({error: "이미 존재하는 이메일입니다."});
        }
        await client.execute('INSERT INTO `user` (id, name, email, password) VALUES (UNHEX(REPLACE(?, "-", "")), ?, ?, ?)', [id, name, email, hash]);
        return response.status(302).redirect('/');
    }

    catch (error) {
        console.log(error)
        return NextResponse.json({ error: error }, { status: 500 });
    }
  }
};