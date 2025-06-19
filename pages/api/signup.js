import { connectDB } from "@/util/db";
import { NextResponse } from 'next/server';
import { v7 as uuidv7 } from "uuid";

export default async function handler(request, response) {
    if (request.method == 'POST') {
        const id = uuidv7();
        const { user_id, password } = request.body;
        if (!user_id || !password ) {
            return response.status(500).json("내용을 채워주세요")
        }
        try {
            const client = await connectDB();        
            await client.execute('INSERT INTO `user` (id, user_id, password) VALUES (UNHEX(REPLACE(?, "-", "")), ?, ?)', [id, user_id, password]);
            return response.status(302).redirect('/')
        }

        catch (error) {
            console.log(error)
            return NextResponse.json({ error: error }, { status: 500 });
        }
    }
}
