import React, { useState, useEffect } from 'react';

function OrdersSection({ user }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError('');
      
      const token = localStorage.getItem('token');
      const response = await fetch('http://127.0.0.1:8000/api/orders/', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setError('Failed to load orders. Please try again.');
      // Fallback to mock data for development
      setOrders([
        {
          id: 'ORD-001',
          order_number: 'ORD20240115001',
          items: [
            { sweet_name: 'Gulab Jamun', quantity: 2, unit_price: 280, total_price: 560 },
            { sweet_name: 'Rasgulla', quantity: 1, unit_price: 320, total_price: 320 }
          ],
          total_amount: 880,
          status: 'delivered',
          created_at: '2024-01-15T14:30:00Z'
        },
        {
          id: 'ORD-002',
          order_number: 'ORD20240114001',
          items: [
            { sweet_name: 'Kaju Katli', quantity: 0.5, unit_price: 450, total_price: 225 },
            { sweet_name: 'Barfi', quantity: 1, unit_price: 380, total_price: 380 }
          ],
          total_amount: 605,
          status: 'preparing',
          created_at: '2024-01-14T13:45:00Z'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered': return 'green';
      case 'ready': return 'blue';
      case 'preparing': return 'orange';
      case 'confirmed': return 'purple';
      case 'pending': return 'yellow';
      case 'cancelled': return 'red';
      default: return 'gray';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'delivered': return 'Delivered';
      case 'ready': return 'Ready for Pickup';
      case 'preparing': return 'Preparing';
      case 'confirmed': return 'Confirmed';
      case 'pending': return 'Pending';
      case 'cancelled': return 'Cancelled';
      default: return 'Unknown';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="orders-section">
        <div className="loading">Loading orders...</div>
      </div>
    );
  }

  return (
    <div className="orders-section">
      <h2>My Orders</h2>
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      
      <div className="order-list">
        {orders.map((order) => (
          <div key={order.id} className="order">
            <div className="order-header">
              <h3>{order.order_number}</h3>
              <span className={`order-status ${getStatusColor(order.status)}`}>
                {getStatusText(order.status)}
              </span>
            </div>
            
            <div className="order-items">
              {order.items && order.items.map((item, index) => (
                <div key={index} className="order-item">
                  <div className="item-info">
                    <span className="item-name">{item.sweet_name}</span>
                    <span className="item-quantity">x{item.quantity}</span>
                  </div>
                  <div className="item-price">
                    <span className="unit-price">₹{item.unit_price}</span>
                    <span className="total-price">₹{item.total_price}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="order-footer">
              <div className="order-date">
                <span>{formatDate(order.created_at)}</span>
              </div>
              <div className="order-total">
                <span>Total: ₹{order.total_amount}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {orders.length === 0 && (
        <div className="no-orders">
          <h3>No Orders Yet</h3>
          <p>Start shopping to see your orders here!</p>
        </div>
      )}
    </div>
  );
}

export default OrdersSection; 