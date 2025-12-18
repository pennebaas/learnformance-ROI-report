// src/components/A4PageLayout.jsx
import React from 'react';
import logo from '../assets/Learnformance-logo.png';

const A4PageLayout = ({ title, subtitle, reportMode = false, children }) => {
  // Auto-detect report mode via URL param: ?mode=report
  const urlReportMode =
    typeof window !== 'undefined' &&
    new URLSearchParams(window.location.search).get('mode') === 'report';

  const isReportMode = reportMode || urlReportMode;

  return (
    <div
      className="page"
      style={{
        fontFamily:
          'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        width: '210mm',
        maxWidth: '210mm',

        // ✅ Update A: don’t center in report/PDF mode
        margin: isReportMode ? 0 : '0 auto',

        backgroundColor: '#FFFFFF',

        // Print pagination control (safe defaults)
        pageBreakAfter: 'always',
        breakAfter: 'page',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          boxSizing: 'border-box',

          // Keep all spacing INSIDE the A4 height
          padding: '10mm 8mm 10mm',

          // ✅ Optional: remove visible frame in report mode
          border: isReportMode ? 'none' : '1px solid #E0E0E0',

          backgroundColor: '#FFFFFF',

          // ✅ Prevent “extra blank page” spill-over
          height: '297mm',
          overflow: 'hidden',
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

            {/* Subtitle should NOT show in report mode */}
            {subtitle && !isReportMode && (
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

        {/* BODY */}
        <div style={{ flex: 1, maxWidth: '100%' }}>{children}</div>

        {/* FOOTER (hidden in report mode; PDFShift will inject its own footer) */}
        {!isReportMode && (
          <div
            className="report-footer"
            style={{
              padding: '6px 24px 8px',
              borderTop: '1px solid #E0E0E0',
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#FFFFFF',
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
              <span style={{ fontWeight: 600 }}>Learnformance</span> – Turning
              your learning data into measurable impact
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default A4PageLayout;
