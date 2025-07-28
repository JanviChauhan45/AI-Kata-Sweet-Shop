import React, { useState, useEffect } from 'react';

function SweetsSection() {
  const [sweets, setSweets] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [purchasing, setPurchasing] = useState(false);

  useEffect(() => {
    fetchSweets();
    fetchCategories();
  }, []);

  const fetchSweets = async () => {
    try {
      setLoading(true);
      setError('');
      
      const token = localStorage.getItem('token');
      const response = await fetch('http://127.0.0.1:8000/api/sweets/', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setSweets(data);
    } catch (error) {
      console.error('Error fetching sweets:', error);
      setError('Failed to load sweets. Please make sure the backend server is running.');
      // Fallback to mock data for development
      setSweets([
        {
          id: 1,
          name: 'Gulab Jamun',
          category: { id: 1, name: 'Milk Based' },
          price: 280,
          stock: 15,
          unit: 'kg',
          description: 'Soft milk dumplings in sugar syrup',
          image_url: null
        },
        {
          id: 2,
          name: 'Rasgulla',
          category: { id: 1, name: 'Milk Based' },
          price: 320,
          stock: 12,
          unit: 'kg',
          description: 'Spongy cottage cheese balls in syrup',
          image_url: null
        },
        {
          id: 3,
          name: 'Kaju Katli',
          category: { id: 2, name: 'Dry Fruits' },
          price: 450,
          stock: 8,
          unit: 'kg',
          description: 'Diamond-shaped cashew fudge, rich and creamy',
          image_url: null
        },
        {
          id: 4,
          name: 'Barfi',
          category: { id: 3, name: 'Traditional' },
          price: 380,
          stock: 10,
          unit: 'kg',
          description: 'Traditional milk fudge with cardamom flavor',
          image_url: null
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://127.0.0.1:8000/api/categories/', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      // Fallback to mock categories
      setCategories([
        { id: 1, name: 'Milk Based' },
        { id: 2, name: 'Dry Fruits' },
        { id: 3, name: 'Traditional' },
        { id: 4, name: 'Modern' },
        { id: 5, name: 'Diabetic Friendly' }
      ]);
    }
  };

  const filteredSweets = sweets.filter(sweet => {
    const matchesCategory = selectedCategory === 'all' || 
                           (sweet.category && (
                             sweet.category.id === selectedCategory ||
                             sweet.category.name?.toLowerCase().includes(selectedCategory.toLowerCase())
                           ));
    const matchesSearch = sweet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sweet.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (sweet) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === sweet.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === sweet.id
            ? { ...item, quantity: Math.min(item.quantity + 1, sweet.stock) }
            : item
        );
      } else {
        return [...prevCart, { ...sweet, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (sweetId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== sweetId));
  };

  const updateQuantity = (sweetId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(sweetId);
      return;
    }
    
    setCart(prevCart => prevCart.map(item => {
      if (item.id === sweetId) {
        const sweet = sweets.find(s => s.id === sweetId);
        return { ...item, quantity: Math.min(newQuantity, sweet.stock) };
      }
      return item;
    }));
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handlePurchase = async () => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    setPurchasing(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://127.0.0.1:8000/api/orders/create/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          items: cart.map(item => ({
            sweet_id: item.id,
            quantity: item.quantity
          }))
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create order');
      }

      const orderData = await response.json();
      alert(`Order placed successfully! Order number: ${orderData.order_number}`);
      setCart([]);
      setShowCart(false);
      fetchSweets(); // Refresh sweets to update stock
    } catch (error) {
      console.error('Error creating order:', error);
      alert(`Failed to place order: ${error.message}`);
    } finally {
      setPurchasing(false);
    }
  };

  if (loading) {
    return (
      <div className="sweets-section">
        <div className="loading">Loading sweets...</div>
      </div>
    );
  }

  return (
    <div className="sweets-section">
      <div className="sweets-header">
        <h2>Our Sweet Collection</h2>
        <p>Discover our delicious range of Indian sweets</p>
        <div className="cart-button">
          <button 
            className="btn-primary"
            onClick={() => setShowCart(!showCart)}
          >
            🛒 Cart ({cart.length})
          </button>
        </div>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {showCart && (
        <div className="cart-modal">
          <div className="cart-content">
            <h3>Shopping Cart</h3>
            {cart.length === 0 ? (
              <p>Your cart is empty</p>
            ) : (
              <>
                {cart.map(item => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-info">
                      <h4>{item.name}</h4>
                      <p>₹{item.price}/{item.unit}</p>
                    </div>
                    <div className="cart-item-actions">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="quantity-btn"
                      >
                        -
                      </button>
                      <span className="quantity">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="quantity-btn"
                        disabled={item.quantity >= item.stock}
                      >
                        +
                      </button>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="remove-btn"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="cart-item-total">
                      ₹{item.price * item.quantity}
                    </div>
                  </div>
                ))}
                <div className="cart-total">
                  <h4>Total: ₹{getCartTotal()}</h4>
                  <button 
                    className="btn-primary"
                    onClick={handlePurchase}
                    disabled={purchasing}
                  >
                    {purchasing ? 'Processing...' : 'Place Order'}
                  </button>
                </div>
              </>
            )}
            <button 
              className="btn-secondary"
              onClick={() => setShowCart(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

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
          <button
            className={selectedCategory === 'all' ? 'active' : ''}
            onClick={() => setSelectedCategory('all')}
          >
            All Sweets
          </button>
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
              <img 
                src={sweet.image_url} 
                alt={sweet.name}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              <div className="image-placeholder" style={{ display: 'none' }}>
                {sweet.name.charAt(0)}
              </div>
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
              <button 
                className="btn-primary"
                onClick={() => addToCart(sweet)}
                disabled={sweet.stock === 0}
              >
                {sweet.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>
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
}

export default SweetsSection; 