// client/src/components/Navbar.jsx
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, setUser } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '15px 30px',
      background: '#4e73df',
      color: '#fff',
      borderBottom: '2px solid #2e59d9'
    }}>
      <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
        <Link to="/" style={{ color: '#fff', textDecoration: 'none', marginRight: '20px' }}>BlogApp</Link>
        {user && <Link to="/create" style={{ color: '#fff', textDecoration: 'none' }}>Create Post</Link>}
      </div>
      <div>
        {user ? (
          <>
            <span style={{ marginRight: '15px' }}>Hello, {user.username}</span>
            <button onClick={handleLogout} style={{ padding: '5px 10px', borderRadius: '5px', cursor: 'pointer', border: 'none', background: '#f6c23e' }}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ color: '#fff', textDecoration: 'none', marginRight: '15px' }}>Login</Link>
            <Link to="/register" style={{ color: '#fff', textDecoration: 'none' }}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
