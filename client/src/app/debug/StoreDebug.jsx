import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../../entities/model/useAuthStore';
import { STORAGE_TOKEN_KEY } from '../../shared/config/api.config';

export const StoreDebug = () => {
  const { user, isAuth, isLoading } = useAuthStore();
  const [renderCount, setRenderCount] = useState(0);
  
  // Отслеживаем количество рендеров
  useEffect(() => {
    setRenderCount(prev => prev + 1);
  }, [user, isAuth, isLoading]);
  
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
      fontSize: '12px',
      maxHeight: '300px',
      overflow: 'auto'
    }}>
      <h4 style={{ margin: '0 0 5px 0' }}>Store Debug</h4>
      <div>
        <strong>Renders:</strong> {renderCount}
      </div>
      <div>
        <strong>isAuth:</strong> {isAuth ? 'true' : 'false'}
      </div>
      <div>
        <strong>isLoading:</strong> {isLoading ? 'true' : 'false'}
      </div>
      <div>
        <strong>User:</strong>
        <pre style={{ 
          fontSize: '10px', 
          background: '#eee', 
          padding: '5px', 
          borderRadius: '3px',
          maxHeight: '150px',
          overflow: 'auto'
        }}>
          {JSON.stringify(user, null, 2)}
        </pre>
      </div>
      <div>
        <strong>Token:</strong> {localStorage.getItem(STORAGE_TOKEN_KEY) ? 'Exists' : 'None'}
      </div>
      <button 
        onClick={() => console.log('Current store state:', { user, isAuth, isLoading })}
        style={{ 
          padding: '3px 6px', 
          fontSize: '10px', 
          marginTop: '5px' 
        }}
      >
        Log State
      </button>
    </div>
  );
};
