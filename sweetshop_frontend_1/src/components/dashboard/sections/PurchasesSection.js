import React, { useState, useEffect } from 'react';
import { purchaseAPI } from '../../../utils/api';

/**
 * PurchasesSection Component
 * 
 * A component to display user's purchase history
 */
function PurchasesSection() {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // API base URL for constructing image URLs
  const API_BASE_URL = 'http://127.0.0.1:8000';

  // Load purchases on component mount
  useEffect(() => {
    loadPurchases();
    // eslint-disable-next-line
  }, []);

  // Load purchases data
  const loadPurchases = async () => {
    try {
      setLoading(true);
      let data;
      try {
        data = await purchaseAPI.getPurchases();
      } catch (err) {
        // Handle non-JSON or HTML error responses
        if (err.message && err.message.includes('Unexpected token')) {
          setError('Server error: Received invalid response. Please try again later.');
        } else {
          setError('Failed to load purchases. Please try again.');
        }
        setPurchases([]);
        return;
      }
      setPurchases(Array.isArray(data) ? data : []);
      setError('');
    } finally {
      setLoading(false);
    }
  };

  // Get image URL
  const getImageUrl = (sweet) => {
    if (sweet.image_url) {
      return sweet.image_url.startsWith('http') 
        ? sweet.image_url 
        : `${API_BASE_URL}${sweet.image_url}`;
    }
    return null;
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return '#ffc107';
      case 'preparing':
        return '#17a2b8';
      case 'ready':
        return '#28a745';
      case 'delivered':
        return '#6c757d';
      case 'cancelled':
        return '#dc3545';
      default:
        return '#6c757d';
    }
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Loading state
  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h3>Loading purchases...</h3>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      {/* Header */}
      <div style={{ marginBottom: '20px' }}>
        <h2>My Purchases</h2>
        <p>View your purchase history</p>
      </div>

      {/* Error Message */}
      {error && (
        <div style={{
          padding: '10px 15px',
          marginBottom: '20px',
          borderRadius: '4px',
          backgroundColor: '#f8d7da',
          color: '#721c24',
          border: '1px solid #f5c6cb',
          textAlign: 'center'
        }}>
          {error}
        </div>
      )}

      {/* Purchases List */}
      {purchases.length === 0 && !error ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <h3>No purchases yet</h3>
          <p>Start shopping to see your purchase history here</p>
        </div>
      ) : null}
      {purchases.length > 0 && !error && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '20px'
        }}>
          {purchases.map(purchase => {
            const imageUrl = getImageUrl(purchase.sweet);
            return (
              <div key={purchase.id} style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '0',
                backgroundColor: 'white',
                overflow: 'hidden',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}>
                {/* Image */}
                <div style={{
                  height: '150px',
                  backgroundColor: '#f8f9fa',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={purchase.sweet_name}
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
                    fontSize: '24px'
                  }}>
                    SWEET
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: '15px' }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '10px'
                  }}>
                    <h3 style={{ margin: '0', fontSize: '16px' }}>
                      {purchase.sweet_name}
                    </h3>
                    <span style={{
                      backgroundColor: getStatusColor(purchase.status),
                      color: 'white',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      textTransform: 'uppercase'
                    }}>
                      {purchase.status}
                    </span>
                  </div>
                  
                  <div style={{ marginBottom: '10px' }}>
                    <p style={{ 
                      margin: '0 0 5px 0', 
                      fontSize: '14px',
                      color: '#666'
                    }}>
                      Quantity: {purchase.quantity} {purchase.sweet_unit}
                    </p>
                    <p style={{ 
                      margin: '0 0 5px 0', 
                      fontSize: '14px',
                      color: '#666'
                    }}>
                      Unit Price: ₹{purchase.unit_price}
                    </p>
                    <p style={{ 
                      margin: '0 0 10px 0', 
                      fontSize: '16px',
                      fontWeight: 'bold',
                      color: '#28a745'
                    }}>
                      Total: ₹{purchase.total_amount}
                    </p>
                  </div>

                  <div style={{
                    fontSize: '12px',
                    color: '#999',
                    borderTop: '1px solid #eee',
                    paddingTop: '10px'
                  }}>
                    Purchased on: {formatDate(purchase.created_at)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default PurchasesSection; 