// client/src/components/Comment.jsx
const Comment = ({ comment }) => {
  return (
    <div style={{
      marginBottom: '10px',
      padding: '10px',
      background: '#f8f9fc',
      borderRadius: '5px',
      borderLeft: '4px solid #4e73df'
    }}>
      <strong>{comment.user?.username || 'Anonymous'}:</strong> {comment.body}
    </div>
  );
};

export default Comment;
