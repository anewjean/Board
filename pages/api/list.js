import { connectDB } from "@/util/db";
import { NextResponse } from 'next/server';

export default async function handler(request, response) {
    if (request.method == 'POST') {
        return response.status(200).json('처리완료')
    }

    const client = await connectDB();
    if (!connectDB) return NextResponse.json({ error: 'DB connection failed' }, { status: 500 });
    
    const [rows] = await client.execute('SELECT * FROM `post`');
    await client.end();

    return (
        response.status(200).json(rows)
    )
}
