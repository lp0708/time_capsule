import React from 'react';

const Alert = ({ type = 'error', message, onClose }) => {
  if (!message) return null;
  return (
    <div className={`alert alert-${type}`} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <span>{message}</span>
      {onClose && (
        <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', marginLeft: '1rem', opacity: 0.6, fontSize: '1.1rem' }}>×</button>
      )}
    </div>
  );
};

export default Alert;