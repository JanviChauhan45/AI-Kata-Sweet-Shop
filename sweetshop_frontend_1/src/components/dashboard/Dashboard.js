import React, { useState } from 'react';
import './Dashboard.css';
import SweetsSection from './sections/SweetsSection';
import OrdersSection from './sections/OrdersSection';
import ProfileSection from './sections/ProfileSection';

function Dashboard({ user }) {
  const [activeSection, setActiveSection] = useState('sweets');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.reload();
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'sweets':
        return <SweetsSection />;
      case 'orders':
        return <OrdersSection user={user} />;
      case 'profile':
        return <ProfileSection user={user} />;
      default:
        return <SweetsSection />;
    }
  };

  return (
    <div className="dashboard">
      <div className="header">
        <h1>Sweet Shop</h1>
        <div className="user-info">
          <span>Welcome, {user.name}</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>

      <div className="main">
        <div className="sidebar">
          <button 
            className={activeSection === 'sweets' ? 'active' : ''} 
            onClick={() => setActiveSection('sweets')}
          >
            Browse Sweets
          </button>
          <button 
            className={activeSection === 'orders' ? 'active' : ''} 
            onClick={() => setActiveSection('orders')}
          >
            My Orders
          </button>
          <button 
            className={activeSection === 'profile' ? 'active' : ''} 
            onClick={() => setActiveSection('profile')}
          >
            Profile
          </button>
        </div>

        <div className="content">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default Dashboard; 