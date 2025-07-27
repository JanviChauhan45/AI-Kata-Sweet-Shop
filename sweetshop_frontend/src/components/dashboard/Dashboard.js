import React, { useState } from 'react';
import './Dashboard.css';

function Dashboard({ user }) {
  const [activeSection, setActiveSection] = useState('sweets');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.reload();
  };

  // Indian Sweet Categories
  const categories = [
    { id: 'all', name: 'All Sweets' },
    { id: 'milk', name: 'Milk Based' },
    { id: 'dry', name: 'Dry Fruits' },
    { id: 'traditional', name: 'Traditional' },
    { id: 'modern', name: 'Modern' },
    { id: 'diabetic', name: 'Diabetic Friendly' }
  ];

  // Sample Indian Sweets Data
  const sweets = [
    {
      id: 1,
      name: 'Gulab Jamun',
      category: 'milk',
      price: 280,
      stock: 15,
      unit: 'kg',
      description: 'Soft milk dumplings in sugar syrup',
      image: '🍯'
    },
    {
      id: 2,
      name: 'Rasgulla',
      category: 'milk',
      price: 320,
      stock: 12,
      unit: 'kg',
      description: 'Spongy cottage cheese balls in syrup',
      image: '🥛'
    },
    {
      id: 3,
      name: 'Jalebi',
      category: 'traditional',
      price: 180,
      stock: 8,
      unit: 'kg',
      description: 'Crispy spiral sweets in sugar syrup',
      image: '🌀'
    },
    {
      id: 4,
      name: 'Laddu',
      category: 'traditional',
      price: 250,
      stock: 20,
      unit: 'kg',
      description: 'Round sweet balls made with gram flour',
      image: '⚪'
    },
    {
      id: 5,
      name: 'Barfi',
      category: 'milk',
      price: 350,
      stock: 10,
      unit: 'kg',
      description: 'Fudge-like sweet made with condensed milk',
      image: '🍰'
    },
    {
      id: 6,
      name: 'Kaju Katli',
      category: 'dry',
      price: 1200,
      stock: 5,
      unit: 'kg',
      description: 'Cashew-based diamond-shaped sweet',
      image: '💎'
    },
    {
      id: 7,
      name: 'Peda',
      category: 'milk',
      price: 400,
      stock: 18,
      unit: 'kg',
      description: 'Soft milk-based sweet with cardamom',
      image: '🥮'
    },
    {
      id: 8,
      name: 'Soan Papdi',
      category: 'traditional',
      price: 220,
      stock: 14,
      unit: 'kg',
      description: 'Flaky layered sweet with nuts',
      image: '🍪'
    },
    {
      id: 9,
      name: 'Rasmalai',
      category: 'milk',
      price: 380,
      stock: 6,
      unit: 'kg',
      description: 'Soft cheese patties in sweetened milk',
      image: '🥛'
    },
    {
      id: 10,
      name: 'Gajar Ka Halwa',
      category: 'traditional',
      price: 300,
      stock: 9,
      unit: 'kg',
      description: 'Carrot pudding with nuts and milk',
      image: '🥕'
    },
    {
      id: 11,
      name: 'Sugar-Free Barfi',
      category: 'diabetic',
      price: 450,
      stock: 7,
      unit: 'kg',
      description: 'Diabetic-friendly version of barfi',
      image: '🍰'
    },
    {
      id: 12,
      name: 'Chocolate Burfi',
      category: 'modern',
      price: 420,
      stock: 11,
      unit: 'kg',
      description: 'Modern chocolate-flavored burfi',
      image: '🍫'
    }
  ];

  // Filter sweets based on category and search
  const filteredSweets = sweets.filter(sweet => {
    const matchesCategory = selectedCategory === 'all' || sweet.category === selectedCategory;
    const matchesSearch = sweet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sweet.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const renderSweetsSection = () => (
    <div className="sweets-section">
      <div className="sweets-header">
        <h2>Our Sweet Collection</h2>
        <p>Discover our delicious range of Indian sweets</p>
      </div>

      <div className="filters">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search sweets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="category-filters">
          {categories.map(category => (
            <button
              key={category.id}
              className={selectedCategory === category.id ? 'active' : ''}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      <div className="sweets-grid">
        {filteredSweets.map(sweet => (
          <div key={sweet.id} className="sweet-card">
            <div className="sweet-image">
              <span className="emoji">{sweet.image}</span>
            </div>
            <div className="sweet-info">
              <h3>{sweet.name}</h3>
              <p className="description">{sweet.description}</p>
              <div className="price-stock">
                <span className="price">₹{sweet.price}/{sweet.unit}</span>
                <span className={`stock ${sweet.stock < 10 ? 'low' : ''}`}>
                  Stock: {sweet.stock} {sweet.unit}
                </span>
              </div>
            </div>
            <div className="sweet-actions">
              <button className="btn-primary">Add to Cart</button>
              <button className="btn-secondary">View Details</button>
            </div>
          </div>
        ))}
      </div>

      {filteredSweets.length === 0 && (
        <div className="no-sweets">
          <h3>No sweets found</h3>
          <p>Try adjusting your search or category filter</p>
        </div>
      )}
    </div>
  );

  const renderOrdersSection = () => (
    <div className="orders-section">
      <h2>My Orders</h2>
      <div className="order-list">
        <div className="order">
          <h3>Order #123</h3>
          <p>Gulab Jamun (2kg), Rasgulla (1kg)</p>
          <span className="status">Delivered</span>
        </div>
        <div className="order">
          <h3>Order #124</h3>
          <p>Kaju Katli (500g), Barfi (1kg)</p>
          <span className="status">Preparing</span>
        </div>
      </div>
    </div>
  );

  const renderProfileSection = () => (
    <div className="profile-section">
      <h2>My Profile</h2>
      <div className="profile-info">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'sweets':
        return renderSweetsSection();
      case 'orders':
        return renderOrdersSection();
      case 'profile':
        return renderProfileSection();
      default:
        return renderSweetsSection();
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