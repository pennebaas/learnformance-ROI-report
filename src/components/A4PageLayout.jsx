// src/components/A4PageLayout.jsx
import React from 'react';

const A4PageLayout = ({ children }) => {
  return (
    <div
      style={{
        width: '210mm',
        minHeight: '297mm',
        margin: '0 auto',
        padding: '20mm',
        background: '#ffffff',
        boxSizing: 'border-box',
      }}
    >
      {children}
    </div>
  );
};

export default A4PageLayout;
