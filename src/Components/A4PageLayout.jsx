// src/components/A4PageLayout.jsx
import React from 'react';
import logo from '../assets/Learnformance-logo.png';

const A4PageLayout = ({ title, subtitle, children }) => {
  return (
    <div
      style={{
        fontFamily:
          'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        maxWidth: '210mm',          // A4 width
        margin: '0 auto',
        backgroundColor: '#FFFFFF',
      }}
    >
      <div
        className="a4-page"
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '10mm 8mm 10mm', // visual margins
          boxSizing: 'border-box',
          minHeight: '297mm',        // A4 height on screen
          border: '1px solid #E0E0E0', // optional: visual outline
        }}
      >
        {/* HEADER */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            marginBottom: '10px',
          }}
        >
          <div style={{ flexShrink: 0, marginRight: '10px' }}>
            <img
              src={logo}
              alt="Learnformance Logo"
              style={{
                width: '26px',
                height: 'auto',
                objectFit: 'contain',
              }}
            />
          </div>

          <div style={{ flexGrow: 1, textAlign: 'center' }}>
            <h1
              style={{
                margin: 0,
                marginBottom: '4px',
                fontSize: '18px',
                fontWeight: 700,
                fontFamily: 'Manrope, sans-serif',
                color: '#2C3E50',
              }}
            >
              {title}
            </h1>
            {subtitle && (
              <p
                style={{
                  margin: 0,
                  fontSize: '12px',
                  color: '#2C3E50',
                  opacity: 0.8,
                }}
              >
                {subtitle}
              </p>
            )}
          </div>

          <div style={{ flexShrink: 0, width: '26px' }} />
        </div>

        {/* BODY / PAGE CONTENT */}
        <div style={{ flex: 1, maxWidth: '100%' }}>
          {children}
        </div>

        {/* FOOTER (pinned to bottom on screen via flex + marginTop: auto) */}
        <div
          style={{
            paddingTop: '6px',
            borderTop: '1px solid #E0E0E0',
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#FFFFFF',
            marginTop: 'auto',
          }}
        >
          <img
            src={logo}
            alt="Learnformance Logo"
            style={{
              width: '18px',
              height: 'auto',
              objectFit: 'contain',
              marginRight: '6px',
            }}
          />
          <p
            style={{
              margin: 0,
              fontSize: '10px',
              color: '#2C3E50',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            <span style={{ fontWeight: 600 }}>Learnformance</span> – Turning your
            learning data into measurable impact
          </p>
        </div>
      </div>
    </div>
  );
};

export default A4PageLayout;
