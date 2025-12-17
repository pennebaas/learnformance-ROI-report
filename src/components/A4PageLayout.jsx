cat > src/components/A4PageLayout.jsx << 'EOF'
// src/components/A4PageLayout.jsx
import React from 'react';

const A4PageLayout = ({ children, pageNumber, totalPages }) => {
  return (
    <div
      style={{
        width: '210mm',
        minHeight: '297mm',
        margin: '0 auto',
        padding: '0',
        background: '#ffffff',
        boxSizing: 'border-box',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <div
        style={{
          borderBottom: '2px solid #1F3A93',
          padding: '20mm 20mm 10mm 20mm',
          background: '#ffffff',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '8px' }}>
          <div style={{ flex: 1 }}>
            <h1
              style={{
                margin: 0,
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#1F3A93',
                letterSpacing: '0.5px',
              }}
            >
              LEARNFORMANCE
            </h1>
            <p
              style={{
                margin: '4px 0 0 0',
                fontSize: '14px',
                color: '#7F8C8D',
              }}
            >
              Training Impact Intelligence
            </p>
          </div>
        </div>
        <div style={{ fontSize: '11px', color: '#7F8C8D', marginTop: '8px' }}>
          <span>Confidential Report</span>
          <span style={{ margin: '0 8px' }}>|</span>
          <span>Generated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: '10mm 20mm' }}>
        {children}
      </div>

      {/* Footer */}
      <div
        style={{
          background: '#F5F7FA',
          padding: '10mm 20mm',
          fontSize: '11px',
          color: '#7F8C8D',
          borderTop: '1px solid #E0E0E0',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            {pageNumber && totalPages && (
              <span style={{ fontWeight: 'bold' }}>Page {pageNumber} of {totalPages}</span>
            )}
          </div>
          <div style={{ textAlign: 'right' }}>
            <div>www.learnformance.com</div>
            <div style={{ marginTop: '4px' }}>
              © 2025 Learnformance | Turning Training Data into Business Results
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default A4PageLayout;
EOF