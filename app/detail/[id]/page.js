'use client'

import { useState, useEffect } from "react";

function DetailClient({ params }) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // 게시글과 댓글 초기 로딩
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        // 게시글 데이터 로딩
        const postRes = await fetch(`/api/post/${params.id}`);
        if (!postRes.ok) throw new Error('게시글을 불러올 수 없습니다');
        const postData = await postRes.json();
        setPost(postData);
        
        // 댓글 데이터 로딩
        const commentsRes = await fetch(`/api/comment/list?postId=${params.id}`);
        const commentsData = await commentsRes.json();
        setComments(commentsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [params.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    try {
      const res = await fetch("/api/comment/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId: params.id, content: comment, author: "익명" }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || '댓글 작성에 실패했습니다');
      }

      setComment("");
      // 댓글 목록 갱신
      const updated = await fetch(`/api/comment/list?postId=${params.id}`);
      if (updated.ok) {
        const updatedData = await updated.json();
        setComments(updatedData);
      }
    } catch (err) {
      alert(`오류: ${err.message}`);
    }
  };

  if (loading) return <div className="p-4">로딩 중...</div>;
  if (error) return <div className="p-4 text-red-500">오류: {error}</div>;
  if (!post) return <div className="p-4">게시글을 찾을 수 없습니다.</div>;

  return (
    <div className="p-4">
      <h4 className="text-xl font-bold mb-2">상세 페이지</h4>
      <h4 className="text-lg font-semibold">글 제목: {post.title}</h4>
      <p className="mb-4">글 내용: {post.content}</p>

      <form onSubmit={handleSubmit} className="mb-4">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="border w-full p-2 rounded mb-2"
          placeholder="댓글을 입력하세요"
        />
        <button
          type="submit"
          className="bg-black-500 text-white px-4 py-2 rounded hover:bg-black-600"
        >
          댓글 작성
        </button>
      </form>

      <div>
        <h5 className="font-semibold mb-2">댓글 목록</h5>
        {comments.map((c, i) => (
          <div key={i} className="border-b py-2 text-sm text-gray-800">
            <div>{c.content}</div>
            {c.created_at && (
              <div className="text-xs text-gray-500 mt-1">
                {new Date(c.created_at).toLocaleString('ko-KR')}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default DetailClient;
