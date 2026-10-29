import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../api/client';

interface User {
  id: string;
  username: string;
  email: string;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadUser() {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const data = await api.me();
        setUser(data.user);
      } catch (err) {
        localStorage.removeItem('token');
        navigate('/login');
      }
    }

    loadUser();
  }, [navigate]);

  function handleLogout() {
    localStorage.removeItem('token');
    navigate('/login');
  }

  if (error) {
    return <div><p style={{ color: 'red' }}>{error}</p></div>;
  }

  if (!user) {
    return <div><p>Loading...</p></div>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, <strong>{user.username}</strong> ({user.email})!</p>
      <p><Link to="/problems">📝 Browse Problems</Link></p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}