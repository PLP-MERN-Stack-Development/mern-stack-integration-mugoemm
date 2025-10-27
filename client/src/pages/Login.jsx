// client/src/pages/Login.jsx
import { useState, useContext } from 'react';
import API from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      setUser(res.data.user);
      navigate('/');
    } catch {
      alert('Invalid credentials');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '40px auto', padding: '20px', background: '#f8f9fc', borderRadius: '8px' }}>
      <h1 style={{ color: '#4e73df', marginBottom: '20px' }}>Login</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} style={{ marginBottom: '10px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} required />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} style={{ marginBottom: '15px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} required />
        <button type="submit" style={{ padding: '10px', borderRadius: '5px', background: '#1cc88a', color: '#fff', fontWeight: 'bold', cursor: 'pointer', border: 'none' }}>Login</button>
      </form>
    </div>
  );
};

export default Login;
