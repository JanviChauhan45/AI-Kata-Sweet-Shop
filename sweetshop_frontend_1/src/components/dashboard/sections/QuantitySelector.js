import React, { useState } from 'react';

/**
 * QuantitySelector Component
 * 
 * A modal component for selecting quantity when adding items to cart
 */
function QuantitySelector({ 
  sweet, 
  isOpen, 
  onClose, 
  onAddToCart, 
  maxStock 
}) {
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState('');

  // Get step value based on unit
  const getStepValue = () => {
    switch (sweet.unit) {
      case 'g':
        return 0.001; // 1 gram = 0.001 kg
      case 'kg':
        return 0.1;
      case 'pieces':
      case 'packets':
      case 'boxes':
        return 1;
      default:
        return 0.1;
    }
  };

  // Get min value based on unit
  const getMinValue = () => {
    switch (sweet.unit) {
      case 'g':
        return 0.001;
      case 'kg':
        return 0.1;
      case 'pieces':
      case 'packets':
      case 'boxes':
        return 1;
      default:
        return 0.1;
    }
  };

  // Format quantity for display
  const formatQuantity = (qty) => {
    if (sweet.unit === 'g' && qty < 1) {
      return (qty * 1000).toFixed(0); // Show as grams
    }
    return qty;
  };

  // Parse quantity from input
  const parseQuantity = (value) => {
    if (sweet.unit === 'g' && value >= 1) {
      return value / 1000; // Convert grams to kg for storage
    }
    return parseFloat(value);
  };

  const handleQuantityChange = (e) => {
    const value = parseQuantity(e.target.value);
    setQuantity(value);
    setError('');
  };

  const handleAddToCart = () => {
    if (quantity <= 0) {
      setError('Quantity must be greater than 0');
      return;
    }
    
    if (quantity > maxStock) {
      setError(`Maximum available stock is ${maxStock} ${sweet.unit}`);
      return;
    }

    onAddToCart(sweet, quantity);
    onClose();
    setQuantity(getMinValue());
    setError('');
  };

  const handleClose = () => {
    onClose();
    setQuantity(getMinValue());
    setError('');
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '8px',
        maxWidth: '400px',
        width: '90%',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        <h3 style={{ margin: '0 0 20px 0', textAlign: 'center' }}>
          Add to Cart
        </h3>
        
        <div style={{ marginBottom: '20px' }}>
          <h4 style={{ margin: '0 0 10px 0' }}>{sweet.name}</h4>
          <p style={{ 
            margin: '0 0 15px 0', 
            color: '#666',
            fontSize: '14px'
          }}>
            {sweet.description}
          </p>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '15px'
          }}>
            <span style={{ 
              fontWeight: 'bold', 
              color: '#28a745',
              fontSize: '18px'
            }}>
              ₹{sweet.price} per {sweet.unit}
            </span>
            <span style={{ 
              fontSize: '14px', 
              color: '#666',
              backgroundColor: '#f8f9fa',
              padding: '4px 8px',
              borderRadius: '4px'
            }}>
              Stock: {maxStock} {sweet.unit}
            </span>
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '8px', 
            fontWeight: 'bold',
            fontSize: '14px'
          }}>
            Quantity ({sweet.unit}):
          </label>
          <input
            type="number"
            min={getMinValue()}
            max={maxStock}
            step={getStepValue()}
            value={formatQuantity(quantity)}
            onChange={handleQuantityChange}
            style={{
              padding: '10px',
              width: '100%',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '16px'
            }}
          />
          {error && (
            <p style={{ 
              color: '#dc3545', 
              fontSize: '14px', 
              margin: '5px 0 0 0' 
            }}>
              {error}
            </p>
          )}
          <p style={{ 
            color: '#666', 
            fontSize: '12px', 
            margin: '5px 0 0 0',
            fontStyle: 'italic'
          }}>
            {sweet.unit === 'g' ? 'Enter quantity in grams (e.g., 250 for 250g)' : 
             sweet.unit === 'kg' ? 'Enter quantity in kilograms (e.g., 0.5 for 500g)' :
             `Enter quantity in ${sweet.unit}`}
          </p>
        </div>

        <div style={{ 
          display: 'flex', 
          gap: '10px',
          justifyContent: 'flex-end'
        }}>
          <button
            onClick={handleClose}
            style={{
              padding: '10px 20px',
              border: '1px solid #ddd',
              backgroundColor: 'white',
              color: '#666',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleAddToCart}
            style={{
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 'bold'
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuantitySelector; 