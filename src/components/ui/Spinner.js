import React from 'react';

const Spinner = ({ size = 40, fullPage = false }) => {
  const spinner = (
    <div style={{
      width: size, height: size,
      border: '3px solid var(--lavender-light)',
      borderTopColor: 'var(--lavender)',
      borderRadius: '50%',
      animation: 'spin 0.8s linear infinite',
    }} />
  );

  if (fullPage) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        {spinner}
      </div>
    );
  }
  return spinner;
};

export default Spinner;