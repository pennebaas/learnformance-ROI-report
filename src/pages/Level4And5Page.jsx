// src/pages/Level4And5Page.jsx
import React from 'react';
import A4PageLayout from '../components/A4PageLayout.jsx';

/**
 * Level 4 & 5 – Results & ROI
 * - Renders in normal mode, single-page mode (?page=level4and5), and report mode (?mode=report).
 * - IMPORTANT: No "URL pageParam guard" that could hide the page in report mode.
 * - Pass `reportMode` from App.jsx in report mode: <Level4And5Page ... reportMode />
 */

const MOCK_DATA = [
  {
    title: 'Level 4 & 5 - Results & ROI',
    program_name: 'GenAI at Work',
    timestamp: '12/9/2025 21:25:14',
    currency: 'US$',

    // Example KPI inputs (replace with your n8n payload later)
    responses_L4: 5,
    avg_weekly_time_saved_minutes: 12.5,
    attribution_factor: 0.76,
    total_training_cost_direct: 100000,
    number_of_participants: 125,
    avg_hourly_rate_participant: 80,
    training_hours_per_participant: 8,
    working_weeks_per_year: 46,

    // Optional narrative html from pipeline (safe to omit)
    executive_summary_html:
      '<p>This is dummy Level 4/5 summary HTML. Later it will come from your n8n + OpenAI pipeline.</p>',
  },
];

const formatMoney = (value, currency = 'US$') => {
  const v = Number(value || 0);
  return `${currency} ${v.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
};

const formatPercent = (value) => `${Math.round((Number(value || 0) * 100))}%`;

const Level4And5Page = ({ data, reportMode = false }) => {
  // Use provided props first; fallback to mock data for local testing
  const safeData = data || MOCK_DATA[0];

  // Determine report mode robustly (App passes reportMode; URL is a backup)
  const params = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
  const urlReportMode = params.get('mode') === 'report';
  const isReport = reportMode || urlReportMode;

  // --- Basic calculations (simple + readable; adjust to your business logic later) ---
  const participants = Number(safeData.number_of_participants || 0);
  const weeklyMinutesSaved = Number(safeData.avg_weekly_time_saved_minutes || 0);
  const hourlyRate = Number(safeData.avg_hourly_rate_participant || 0);
  const weeksPerYear = Number(safeData.working_weeks_per_year || 46);
  const attribution = Number(safeData.attribution_factor || 0);
  const directCost = Number(safeData.total_training_cost_direct || 0);

  const annualHoursSavedGross = (weeklyMinutesSaved * weeksPerYear * participants) / 60; // hours/year
  const annualHoursSavedAttributed = annualHoursSavedGross * attribution;

  const annualValueGross = annualHoursSavedGross * hourlyRate;
  const annualValueAttributed = annualHoursSavedAttributed * hourlyRate;

  const netBenefit = annualValueAttributed - directCost;
  const roiPercent = directCost > 0 ? (netBenefit / directCost) : 0;
  const paybackMonths =
    annualValueAttributed > 0 ? (directCost / annualValueAttributed) * 12 : null;

  // --- Small UI helpers ---
  const KPICard = ({ label, value, sub }) => (
    <div
      style={{
        background: '#FFFFFF',
        padding: '10px',
        borderRadius: '10px',
        borderTop: '3px solid #1F3A93',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          fontSize: '22px',
          fontWeight: 800,
          color: '#1F3A93',
          fontFamily: 'Manrope, sans-serif',
          marginBottom: '4px',
          lineHeight: 1.1,
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontSize: '9px',
          color: '#2C3E50',
          opacity: 0.7,
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          fontWeight: 700,
        }}
      >
        {label}
      </div>
      {sub && (
        <div style={{ marginTop: '6px', fontSize: '9px', color: '#2C3E50', opacity: 0.75 }}>
          {sub}
        </div>
      )}
    </div>
  );

  const SectionTitle = ({ children }) => (
    <h2
      style={{
        margin: 0,
        marginBottom: '6px',
        fontSize: '13px',
        fontWeight: 700,
        fontFamily: 'Manrope, sans-serif',
        color: '#2C3E50',
      }}
    >
      {children}
    </h2>
  );

  return (
    <A4PageLayout
      title={safeData.title || 'Level 4 & 5 - Results & ROI'}
      subtitle="GenAI Training Program | Follow-up 6 weeks after training"
      reportMode={isReport}
      isLastPage
    >
      <div style={{ width: '100%', overflow: 'visible' }}>
        {/* Top spacing (matches your other pages) */}
        <div style={{ marginBottom: '18px' }} />

        {/* KPI STRIP */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '8px',
            marginBottom: '12px',
          }}
        >
          <KPICard
            label="Annual Value (Attributed)"
            value={formatMoney(annualValueAttributed, safeData.currency)}
            sub={`Attribution: ${formatPercent(attribution)}`}
          />
          <KPICard
            label="Net Benefit (Year 1)"
            value={formatMoney(netBenefit, safeData.currency)}
            sub={`Cost: ${formatMoney(directCost, safeData.currency)}`}
          />
          <KPICard
            label="ROI (Year 1)"
            value={`${Math.round(roiPercent * 100)}%`}
            sub={paybackMonths !== null ? `Payback: ${paybackMonths.toFixed(1)} months` : 'Payback: n/a'}
          />
        </div>

        {/* EXEC SUMMARY */}
        {safeData.executive_summary_html && (
          <div
            style={{
              padding: '10px',
              borderRadius: '10px',
              backgroundColor: '#F5F7FA',
              boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
              marginBottom: '12px',
              borderLeft: '3px solid #1F3A93',
            }}
          >
            <div
              style={{
                fontSize: '10px',
                color: '#2C3E50',
                lineHeight: 1.5,
              }}
              dangerouslySetInnerHTML={{ __html: safeData.executive_summary_html }}
            />
          </div>
        )}

        {/* RESULTS BREAKDOWN */}
        <div style={{ marginBottom: '10px' }}>
          <SectionTitle>Results Breakdown</SectionTitle>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '8px',
            }}
          >
            <div
              style={{
                padding: '10px',
                borderRadius: '10px',
                backgroundColor: '#F5F7FA',
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
              }}
            >
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#2C3E50', marginBottom: '6px' }}>
                Time Saved (Annual)
              </div>
              <div style={{ fontSize: '10px', color: '#2C3E50', opacity: 0.9, lineHeight: 1.5 }}>
                <div>Gross hours saved: <strong>{annualHoursSavedGross.toFixed(0)}h</strong></div>
                <div>Attributed hours saved: <strong>{annualHoursSavedAttributed.toFixed(0)}h</strong></div>
                <div>Participants: <strong>{participants.toLocaleString()}</strong></div>
              </div>
            </div>

            <div
              style={{
                padding: '10px',
                borderRadius: '10px',
                backgroundColor: '#F5F7FA',
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
              }}
            >
              <div style={{ fontSize: '11px', fontWeight: 700, color: '#2C3E50', marginBottom: '6px' }}>
                Value & Assumptions
              </div>
              <div style={{ fontSize: '10px', color: '#2C3E50', opacity: 0.9, lineHeight: 1.5 }}>
                <div>Hourly rate: <strong>{formatMoney(hourlyRate, safeData.currency)}/h</strong></div>
                <div>Weeks/year: <strong>{weeksPerYear}</strong></div>
                <div>Weekly minutes saved: <strong>{weeklyMinutesSaved.toFixed(1)} min</strong></div>
              </div>
            </div>
          </div>
        </div>

        {/* ROI FORMULA BOX */}
        <div
          style={{
            padding: '10px',
            borderRadius: '10px',
            backgroundColor: '#0B1F3A',
            color: '#FFFFFF',
            marginTop: '8px',
          }}
        >
          <div style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '12px', marginBottom: '6px' }}>
            How ROI is calculated (Year 1)
          </div>
          <div style={{ fontSize: '10px', lineHeight: 1.5, opacity: 0.95 }}>
            ROI = (Attributed Value − Training Cost) ÷ Training Cost<br />
            Attributed Value = (Weekly minutes saved × weeks/year × participants ÷ 60) × hourly rate × attribution
          </div>
        </div>
      </div>
    </A4PageLayout>
  );
};

export default Level4And5Page;
