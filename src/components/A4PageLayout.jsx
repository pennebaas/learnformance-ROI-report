// src/components/A4PageLayout.jsx
import React from 'react';
import logo from '../assets/Learnformance-logo.png';

const A4PageLayout = ({
  title,
  subtitle,
  reportMode = false,
  multiPage = false,   // ✅ kept for API compatibility (pagination handled in CSS now)
  isLastPage = false,  // ✅ kept for API compatibility (pagination handled in CSS now)
  children,
}) => {
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
        margin: '0 auto',
        backgroundColor: '#FFFFFF',

        // ✅ IMPORTANT:
        // Pagination is controlled ONLY via CSS (.page in index.css).
        // Do NOT set break/page-break inline.
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          boxSizing: 'border-box',
          padding: '10mm 8mm 10mm',
          backgroundColor: '#FFFFFF',

          // ✅ Remove the grey frame in report mode / PDFShift mode
          border: isReportMode ? 'none' : '1px solid #E0E0E0',

          // ✅ KEY FIX:
          // Never hard-clip one-pagers with height:297mm + overflow:hidden.
          // That combination can create an extra “blank” physical page in print pipelines.
          // Let the browser paginate via CSS break-after on the outer .page.
          minHeight: '297mm',
          height: 'auto',
          overflow: 'visible',
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
              style={{ width: '26px', height: 'auto', objectFit: 'contain' }}
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

            {/* ✅ Subtitle should ALWAYS show (normal + report mode) */}
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

        {/* BODY */}
        <div style={{ flex: 1, maxWidth: '100%', overflow: 'visible' }}>
          {children}
        </div>

        {/* FOOTER (hidden in report mode; PDFShift injects its own footer) */}
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
