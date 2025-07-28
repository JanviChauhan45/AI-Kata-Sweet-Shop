import React, { useState } from 'react';
import { authAPI } from '../../../utils/api';

/**
 * AuthDebug Component
 * 
 * A simple component to debug authentication issues
 */
function AuthDebug() {
  const [debugInfo, setDebugInfo] = useState('');
  const [loading, setLoading] = useState(false);

  const checkAuth = async () => {
    setLoading(true);
    setDebugInfo('');
    
    try {
      // Check localStorage
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');
      
      let info = `=== Authentication Debug Info ===\n\n`;
      info += `Token in localStorage: ${token ? 'Present' : 'Missing'}\n`;
      info += `User in localStorage: ${user ? 'Present' : 'Missing'}\n`;
      
      if (token) {
        info += `Token length: ${token.length}\n`;
        info += `Token preview: ${token.substring(0, 20)}...\n\n`;
      }
      
      // Test profile API
      try {
        const profileData = await authAPI.getProfile();
        info += `✅ Profile API: Success\n`;
        info += `User: ${JSON.stringify(profileData, null, 2)}\n\n`;
      } catch (error) {
        info += `❌ Profile API: Failed\n`;
        info += `Error: ${error.message}\n\n`;
      }
      
      setDebugInfo(info);
    } catch (error) {
      setDebugInfo(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const clearAuth = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setDebugInfo('Auth data cleared from localStorage');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Authentication Debug</h2>
      <p>Use this to troubleshoot authentication issues</p>
      
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={checkAuth}
          disabled={loading}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            marginRight: '10px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Checking...' : 'Check Authentication'}
        </button>
        
        <button 
          onClick={clearAuth}
          style={{
            padding: '10px 20px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Clear Auth Data
        </button>
      </div>
      
      {debugInfo && (
        <div style={{
          backgroundColor: '#f8f9fa',
          border: '1px solid #dee2e6',
          borderRadius: '4px',
          padding: '15px',
          fontFamily: 'monospace',
          whiteSpace: 'pre-wrap',
          fontSize: '14px'
        }}>
          {debugInfo}
        </div>
      )}
    </div>
  );
}

export default AuthDebug; 