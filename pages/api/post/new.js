import { connectDB } from "@/util/db";
import { NextResponse } from 'next/server';

export default async function handler(request, response) {
    if (request.method == 'POST') {
        const { title, content } = request.body;
        if (!title || !content ) {
            return response.status(500).json("내용을 채워주세요")
        } 
        try {
            const client = await connectDB();        
            await client.execute('INSERT INTO `post` (title, content) VALUES (?, ?)', [title, content]);
            return response.status(302).redirect('/list')
        }

        catch (error) {
            return NextResponse.json({ error: error }, { status: 500 });
        }
    }
}
