// src/components/A4PageLayout.jsx
import React from 'react';
import logo from '../assets/Learnformance-logo.png';

const A4PageLayout = ({
  title,
  subtitle,
  reportMode = false,
  multiPage = false,   // ✅ allow content to flow across multiple PDF pages (Level 3)
  isLastPage = false,  // ✅ prevents a trailing blank page at the end of the report
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

        // ✅ Page separation between Level pages
        // ✅ But no forced blank page after the final page
        breakAfter: isLastPage ? 'auto' : 'page',
        pageBreakAfter: isLastPage ? 'auto' : 'always',
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

          // ✅ CRITICAL: multiPage must NOT clip content after a page-break
          ...(multiPage
            ? { minHeight: '297mm', height: 'auto', overflow: 'visible' }
            : { height: '297mm', overflow: 'hidden' }),
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
