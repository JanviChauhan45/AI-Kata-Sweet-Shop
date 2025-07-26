import React, { useState } from 'react';

const API_URL = 'http://127.0.0.1:8000/api/auth/register/';

function Register({ onRegistered }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'customer',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (res.ok && data.access) {
        setSuccess(true);
        if (onRegistered) onRegistered(form.email, form.password);
      } else {
        setError(data.error || 'Registration failed');
      }
    } catch (err) {
      setError('Network error');
    }
  };

  return (
    <div style={{ maxWidth: 320, margin: '2rem auto' }}>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div style={{ marginBottom: 8 }}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: 8 }}
          />
        </div>
        <div style={{ marginBottom: 8 }}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: 8 }}
          />
        </div>
        <div style={{ marginBottom: 8 }}>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: 8 }}
          />
        </div>
        <div style={{ marginBottom: 8 }}>
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            style={{ width: '100%', padding: 8 }}
          >
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit" style={{ width: '100%', padding: 8 }}>
          Register
        </button>
      </form>
      <div style={{ marginTop: 12 }}>
        <a href="/">Back to Login</a>
      </div>
      {error && <div style={{ color: 'red', marginTop: 12 }}>{error}</div>}
      {success && <div style={{ color: 'green', marginTop: 12 }}>Registration successful! You can now log in.</div>}
    </div>
  );
}

export default Register; 