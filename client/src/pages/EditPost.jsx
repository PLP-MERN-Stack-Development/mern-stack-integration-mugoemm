// client/src/pages/EditPost.jsx
import { useState, useEffect, useContext } from 'react';
import API from '../services/api';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const EditPost = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      const res = await API.get(`/posts/${id}`);
      setTitle(res.data.title);
      setContent(res.data.content);
      setCategory(res.data.category?._id || '');
    };
    const fetchCategories = async () => {
      const res = await API.get('/categories');
      setCategories(res.data);
    };
    fetchPost();
    fetchCategories();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert('You must be logged in');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('category', category);
    if (image) formData.append('image', image);

    try {
      await API.put(`/posts/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      navigate(`/post/${id}`);
    } catch {
      alert('Failed to update post');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '20px auto', padding: '20px', background: '#f8f9fc', borderRadius: '8px' }}>
      <h1 style={{ color: '#4e73df', marginBottom: '15px' }}>Edit Post</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
        <input value={title} onChange={e => setTitle(e.target.value)} style={{ marginBottom: '10px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} required />
        <textarea value={content} onChange={e => setContent(e.target.value)} style={{ marginBottom: '10px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', minHeight: '120px' }} required />
        <select value={category} onChange={e => setCategory(e.target.value)} style={{ marginBottom: '10px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} required>
          <option value="">Select Category</option>
          {categories.map(cat => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
        </select>
        <input type="file" onChange={e => setImage(e.target.files[0])} style={{ marginBottom: '15px' }} />
        <button type="submit" style={{ padding: '10px', borderRadius: '5px', background: '#36b9cc', color: '#fff', fontWeight: 'bold', cursor: 'pointer', border: 'none' }}>Update</button>
      </form>
    </div>
  );
};

export default EditPost;
