import { connectDB } from "@/util/db";
import { NextResponse } from 'next/server';

export default async function handler(request, response) {
    if (request.method == 'POST') {
        const { id, title, content } = request.body;
        try {
            const client = await connectDB();        
            await client.execute('UPDATE `post` SET title = ?, content = ? WHERE id = ?', [title, content, id]);
            return response.status(302).redirect('/list')
        }

        catch (error) {
            return NextResponse.json({ error: error }, { status: 500 });
        }
    }
}