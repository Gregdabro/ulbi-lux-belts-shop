import React from 'react';
import { useStore } from '../../entities/model/useStore';

export const StoreDebug = () => {
  const { user, isAuth } = useStore();
  
  return (
    <div style={{ 
      position: 'fixed', 
      bottom: '10px', 
      right: '10px', 
      padding: '10px', 
      background: '#f0f0f0', 
      border: '1px solid #ccc',
      borderRadius: '4px',
      zIndex: 9999,
      maxWidth: '300px',
      fontSize: '12px'
    }}>
      <h4 style={{ margin: '0 0 5px 0' }}>Store Debug</h4>
      <div>
        <strong>isAuth:</strong> {isAuth ? 'true' : 'false'}
      </div>
      <div>
        <strong>User:</strong> {JSON.stringify(user, null, 2)}
      </div>
    </div>
  );
};
