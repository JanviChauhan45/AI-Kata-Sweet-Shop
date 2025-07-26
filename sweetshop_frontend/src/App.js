import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Register from './Register';

const API_URL = 'http://127.0.0.1:8000/api/auth';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [loggedInEmail, setLoggedInEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch(`${API_URL}/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok && data.access) {
        setToken(data.access);
        localStorage.setItem('token', data.access);
        setLoggedInEmail(data.user ? data.user.email : email);
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Network error');
    }
  };

  const handleLogout = () => {
    setToken('');
    setLoggedInEmail('');
    localStorage.removeItem('token');
  };

  React.useEffect(() => {
    if (token && !loggedInEmail) {
      fetch(`${API_URL}/profile/`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => res.ok ? res.json() : null)
        .then(data => {
          if (data && data.email) setLoggedInEmail(data.email);
        });
    }
  }, [token, loggedInEmail]);

  if (token && loggedInEmail) {
    return (
      <div style={{ maxWidth: 320, margin: '2rem auto', textAlign: 'center' }}>
        <h2>Logged in as:</h2>
        <div style={{ margin: '1rem 0', fontWeight: 'bold' }}>{loggedInEmail}</div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 320, margin: '2rem auto' }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: 8 }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: 8 }}
          />
        </div>
        <div style={{ marginBottom: 8 }}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: 8 }}
          />
        </div>
        <button type="submit" style={{ width: '100%', padding: 8 }}>
          Login
        </button>
      </form>
      <div style={{ marginTop: 12 }}>
        <a href="/register" onClick={e => { e.preventDefault(); navigate('/register'); }}>Register</a>
      </div>
      {error && <div style={{ color: 'red', marginTop: 12 }}>{error}</div>}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
