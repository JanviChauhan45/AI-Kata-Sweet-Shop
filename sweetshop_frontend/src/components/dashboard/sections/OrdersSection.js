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
          items: [
            { name: 'Gulab Jamun', quantity: 2, unit: 'kg' },
            { name: 'Rasgulla', quantity: 1, unit: 'kg' }
          ],
          total: 880,
          status: 'delivered',
          date: '2024-01-15',
          time: '2:30 PM'
        },
        {
          id: 'ORD-002',
          items: [
            { name: 'Kaju Katli', quantity: 0.5, unit: 'kg' },
            { name: 'Barfi', quantity: 1, unit: 'kg' }
          ],
          total: 1550,
          status: 'preparing',
          date: '2024-01-14',
          time: '1:45 PM'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered': return 'green';
      case 'preparing': return 'orange';
      case 'pending': return 'red';
      default: return 'gray';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'delivered': return 'Delivered';
      case 'preparing': return 'Preparing';
      case 'pending': return 'Pending';
      default: return 'Unknown';
    }
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
              <h3>{order.id}</h3>
              <span className={`order-status ${getStatusColor(order.status)}`}>
                {getStatusText(order.status)}
              </span>
            </div>
            
            <div className="order-items">
              <p>{order.items.map(item => 
                `${item.name} (${item.quantity}${item.unit})`
              ).join(', ')}</p>
            </div>
            
            <div className="order-footer">
              <div className="order-date">
                <span>{order.date} at {order.time}</span>
              </div>
              <div className="order-total">
                <span>Total: ₹{order.total}</span>
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