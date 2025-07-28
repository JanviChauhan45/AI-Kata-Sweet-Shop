import React, { useState, useEffect } from 'react';

function ProfileSection({ user }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError('');
      
      const token = localStorage.getItem('token');
      const response = await fetch('http://127.0.0.1:8000/api/profile/', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setProfile(data);
      setEditData({
        name: data.name,
        email: data.email,
        phone: data.phone || '',
        address: data.address || ''
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
      setError('Failed to load profile. Please try again.');
      // Fallback to user data
      const fallbackProfile = {
        name: user.name,
        email: user.email,
        phone: '+91 98765 43210',
        address: '123 Sweet Street, Mumbai, Maharashtra 400001',
        role: user.role
      };
      setProfile(fallbackProfile);
      setEditData({
        name: user.name,
        email: user.email,
        phone: '+91 98765 43210',
        address: '123 Sweet Street, Mumbai, Maharashtra 400001'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setError('');
      
      const token = localStorage.getItem('token');
      const response = await fetch('http://127.0.0.1:8000/api/profile/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(editData)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setProfile(data);
      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile. Please try again.');
    }
  };

  const handleCancel = () => {
    setEditData({
      name: profile.name,
      email: profile.email,
      phone: profile.phone || '',
      address: profile.address || ''
    });
    setIsEditing(false);
    setError('');
  };

  if (loading) {
    return (
      <div className="profile-section">
        <div className="loading">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="profile-section">
      <h2>My Profile</h2>
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      
      <div className="profile-info">
        <div className="profile-field">
          <label>Name:</label>
          {isEditing ? (
            <input
              type="text"
              value={editData.name}
              onChange={(e) => setEditData({...editData, name: e.target.value})}
            />
          ) : (
            <span>{profile.name}</span>
          )}
        </div>

        <div className="profile-field">
          <label>Email:</label>
          {isEditing ? (
            <input
              type="email"
              value={editData.email}
              onChange={(e) => setEditData({...editData, email: e.target.value})}
            />
          ) : (
            <span>{profile.email}</span>
          )}
        </div>

        <div className="profile-field">
          <label>Phone:</label>
          {isEditing ? (
            <input
              type="tel"
              value={editData.phone}
              onChange={(e) => setEditData({...editData, phone: e.target.value})}
            />
          ) : (
            <span>{profile.phone || 'Not provided'}</span>
          )}
        </div>

        <div className="profile-field">
          <label>Address:</label>
          {isEditing ? (
            <textarea
              value={editData.address}
              onChange={(e) => setEditData({...editData, address: e.target.value})}
            />
          ) : (
            <span>{profile.address || 'Not provided'}</span>
          )}
        </div>

        <div className="profile-field">
          <label>Role:</label>
          <span>{profile.role}</span>
        </div>

        <div className="profile-actions">
          {!isEditing ? (
            <button 
              className="btn-primary"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </button>
          ) : (
            <div className="edit-actions">
              <button 
                className="btn-primary"
                onClick={handleSave}
              >
                Save Changes
              </button>
              <button 
                className="btn-secondary"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfileSection; 