import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    setUserEmail('authenticated user');
  }, [navigate]);

  function handleLogout() {
    localStorage.removeItem('token');
    navigate('/login');
  }

  return (
    <div>
      <h1>Dashboard</h1>
      {userEmail && (
        <>
          <p>Welcome, {userEmail}!</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </div>
  );
}