// client/src/pages/Post.jsx
import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../services/api';
import { AuthContext } from '../context/AuthContext';
import Comment from '../components/Comment';

const Post = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        if (!id) throw new Error("No post ID provided");
        const res = await API.get(`/posts/${id}`);
        setPost(res.data);
      } catch (err) {
        console.warn("API fetch failed, using fallback post:", err.message);
        setPost({
          title: "Sample Post",
          author: { username: "TestUser", _id: "1" },
          category: { name: "Uncategorized" },
          content: "This is a fallback post. Your API may not be running or post ID is missing.",
          comments: [
            { _id: "c1", user: { username: "Alice" }, body: "Great post!" },
            { _id: "c2", user: { username: "Bob" }, body: "Thanks for sharing." },
          ],
        });
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await API.delete(`/posts/${id}`);
        navigate('/');
      } catch {
        alert('Failed to delete post');
      }
    }
  };

  if (loading) return <p>Loading post...</p>;
  if (!post) return <p>Post not found</p>;

  return (
    <div style={{ padding: '20px', background: '#f8f9fc', borderRadius: '8px', marginBottom: '20px' }}>
      <h1 style={{ color: '#4e73df' }}>{post.title}</h1>
      <p style={{ fontSize: '0.9rem', color: '#555' }}>By: {post.author?.username}</p>
      <p style={{ fontSize: '0.9rem', color: '#888' }}>Category: {post.category?.name || 'Uncategorized'}</p>
      {post.image && <img src={`http://localhost:5000/uploads/${post.image}`} alt={post.title} style={{ width: '100%', margin: '15px 0', borderRadius: '8px' }} />}
      <p style={{ lineHeight: '1.6', marginBottom: '15px' }}>{post.content}</p>

      {user && post.author?._id === user?.id && (
        <div style={{ marginBottom: '20px' }}>
          <button onClick={() => navigate(`/edit/${id}`)} style={{ marginRight: '10px', padding: '5px 10px', cursor: 'pointer' }}>Edit</button>
          <button onClick={handleDelete} style={{ padding: '5px 10px', cursor: 'pointer', background: '#e74a3b', color: '#fff', border: 'none', borderRadius: '5px' }}>Delete</button>
        </div>
      )}

      <h3 style={{ marginTop: '20px', color: '#1cc88a' }}>Comments</h3>
      {post.comments?.length > 0 ? (
        post.comments.map(c => <Comment key={c._id} comment={c} />)
      ) : (
        <p>No comments yet.</p>
      )}
    </div>
  );
};

export default Post;
