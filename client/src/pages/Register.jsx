// client/src/pages/Register.jsx
import { useState, useContext } from 'react';
import API from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/register', { username, email, password });
      localStorage.setItem('token', res.data.token);
      setUser(res.data.user);
      navigate('/');
    } catch {
      alert('Registration failed');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '40px auto', padding: '20px', background: '#f8f9fc', borderRadius: '8px' }}>
      <h1 style={{ color: '#4e73df', marginBottom: '20px' }}>Register</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
        <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} style={{ marginBottom: '10px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} required />
        <input placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} style={{ marginBottom: '10px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} required />
        <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} style={{ marginBottom: '15px', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} required />
        <button type="submit" style={{ padding: '10px', borderRadius: '5px', background: '#36b9cc', color: '#fff', fontWeight: 'bold', cursor: 'pointer', border: 'none' }}>Register</button>
      </form>
    </div>
  );
};

export default Register;
