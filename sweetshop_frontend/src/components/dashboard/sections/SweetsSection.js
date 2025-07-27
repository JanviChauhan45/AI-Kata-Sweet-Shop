import React, { useState, useEffect } from 'react';

/**
 * Simple SweetsSection Component
 * 
 * A clean and simple component to display sweets from the API.
 */
function SweetsSection() {
  const [sweets, setSweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // API base URL for constructing image URLs
  const API_BASE_URL = 'http://127.0.0.1:8000';

  // Function to get the correct image URL
  const getImageUrl = (sweet) => {
    if (sweet.image_url) {
      // If it's already a full URL, use it as is
      if (sweet.image_url.startsWith('http')) {
        return sweet.image_url;
      }
      // If it's a relative URL from backend, construct the full URL
      return `${API_BASE_URL}${sweet.image_url}`;
    }
    return null;
  };

  // Load sweets data
  useEffect(() => {
    const loadSweets = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/sweets/`);
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data)) {
            setSweets(data);
          } else {
            setSweets([]);
          }
        } else {
          setSweets([]);
        }
      } catch (error) {
        setSweets([]);
      } finally {
        setLoading(false);
      }
    };

    loadSweets();
  }, []);

  // Filter sweets based on search
  const filteredSweets = sweets.filter(sweet =>
    sweet.name && sweet.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Simple add to cart function
  const addToCart = (sweet) => {
    alert(`Added ${sweet.name} to cart!`);
  };

  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h3>Loading sweets...</h3>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      {/* Header */}
      <div style={{ marginBottom: '20px' }}>
        <h2>🍬 Our Sweet Collection</h2>
        <p>Discover delicious Indian sweets</p>
      </div>

      {/* Search */}
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search sweets..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '10px',
            width: '300px',
            border: '1px solid #ddd',
            borderRadius: '4px'
          }}
        />
      </div>

      {/* Sweets Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '20px'
      }}>
        {filteredSweets.map(sweet => {
          const imageUrl = getImageUrl(sweet);
          return (
            <div key={sweet.id} style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '0',
              backgroundColor: 'white',
              overflow: 'hidden',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              {/* Image */}
              <div style={{
                height: '200px',
                backgroundColor: '#f8f9fa',
                position: 'relative',
                overflow: 'hidden'
              }}>
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={sweet.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div style={{
                  display: imageUrl ? 'none' : 'flex',
                  width: '100%',
                  height: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#e9ecef',
                  color: '#6c757d',
                  fontSize: '48px'
                }}>
                  🍬
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: '15px' }}>
                <h3 style={{ margin: '0 0 10px 0', fontSize: '18px' }}>{sweet.name}</h3>
                <p style={{ 
                  color: '#666', 
                  margin: '0 0 15px 0', 
                  fontSize: '14px',
                  lineHeight: '1.4'
                }}>
                  {sweet.description}
                </p>
                <div style={{ marginBottom: '15px' }}>
                  <span style={{ 
                    fontWeight: 'bold', 
                    color: '#28a745',
                    fontSize: '18px'
                  }}>
                    ₹{sweet.price}
                  </span>
                  <span style={{ 
                    marginLeft: '10px', 
                    fontSize: '14px', 
                    color: '#666',
                    backgroundColor: '#f8f9fa',
                    padding: '4px 8px',
                    borderRadius: '4px'
                  }}>
                    Stock: {sweet.stock}
                  </span>
                </div>
                <button
                  onClick={() => addToCart(sweet)}
                  disabled={sweet.stock <= 0}
                  style={{
                    backgroundColor: sweet.stock > 0 ? '#007bff' : '#ccc',
                    color: 'white',
                    border: 'none',
                    padding: '10px 16px',
                    borderRadius: '4px',
                    cursor: sweet.stock > 0 ? 'pointer' : 'not-allowed',
                    width: '100%',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    if (sweet.stock > 0) {
                      e.target.style.backgroundColor = '#0056b3';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (sweet.stock > 0) {
                      e.target.style.backgroundColor = '#007bff';
                    }
                  }}
                >
                  {sweet.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* No results message */}
      {filteredSweets.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <h3>No sweets found</h3>
          <p>Try a different search term</p>
        </div>
      )}
    </div>
  );
}

export default SweetsSection; 