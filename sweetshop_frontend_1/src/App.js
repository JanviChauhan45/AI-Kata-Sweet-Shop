import React, { useState, useEffect } from 'react';
import SimpleLogin from './components/SimpleLogin';
import SimpleRegister from './components/SimpleRegister';
import Dashboard from './components/dashboard/Dashboard';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    setShowLogin(false);
  };

  const handleRegister = (userData) => {
    setUser(userData);
    setShowRegister(false);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  // If user is logged in, show dashboard
  if (user) {
    return <Dashboard user={user} />;
  }

  // Otherwise show landing page
  return (
    <div className="App">
      <nav className="navbar">
        <div className="nav-brand">Sweet Shop</div>
        <ul className="nav-menu">
          <li><a href="#home">Home</a></li>
          <li><a href="#shop">Shop</a></li>
          <li><a href="#contact">Contact</a></li>
          <li><button onClick={() => setShowLogin(true)} className="nav-btn">Login</button></li>
          <li><button onClick={() => setShowRegister(true)} className="nav-btn">Register</button></li>
        </ul>
      </nav>
      
      <main className="main-content">
        <div>
          <h1>Welcome to Sweet Shop</h1>
          <p>Please login or register to access your dashboard.</p>
        </div>
      </main>

      {showLogin && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-btn" onClick={() => setShowLogin(false)}>×</button>
            <SimpleLogin onLogin={handleLogin} />
          </div>
        </div>
      )}

      {showRegister && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-btn" onClick={() => setShowRegister(false)}>×</button>
            <SimpleRegister onRegister={handleRegister} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
