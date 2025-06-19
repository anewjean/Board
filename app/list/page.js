import { connectDB } from "@/util/db"
import Link from "next/link"

export const dynamic = "force-dynamic"

export default async function List() {

    const client = await connectDB();
    const [rows] = await client.execute('SELECT * FROM `post`');

    return (
    <div className="space-y-4 p-6 max-w-xl mx-auto">
        {rows.map((a, i) => (
            <div
            key={i}
            className="bg-white shadow-md rounded-lg p-5 border hover:shadow-lg transition"
            >
            <Link href={`/detail/${a.id}`}>
                <h2 className="text-lg font-bold text-gray-900 hover:text-blue-600 mb-1">
                {a.title}
                </h2>
            </Link>
            <p className="text-gray-700 mb-3">{a.content}</p>
            <Link
                href={`/edit/${a.id}`}
                className="inline-flex items-center text-sm text-red-500 hover:underline"
            >
                🖍 수정
            </Link>
            </div>
        ))}
        </div>
    )
}