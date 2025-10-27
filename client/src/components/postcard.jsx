// client/src/components/PostCard.jsx
import { Link } from 'react-router-dom';

const PostCard = ({ post }) => {
  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '15px',
      marginBottom: '15px',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
      transition: 'transform 0.2s',
      background: '#fff'
    }}>
      <h2 style={{ color: '#4e73df' }}>{post.title}</h2>
      <p style={{ fontSize: '0.9rem', color: '#555' }}>By: {post.author?.username || 'Unknown'}</p>
      <p style={{ fontSize: '0.9rem', color: '#888' }}>Category: {post.category?.name || 'Uncategorized'}</p>
      <Link to={`/post/${post._id}`} style={{ color: '#1cc88a', textDecoration: 'none', fontWeight: 'bold' }}>Read More</Link>
    </div>
  );
};

export default PostCard;
