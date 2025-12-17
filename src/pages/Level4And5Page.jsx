// src/pages/Level4And5Page.jsx
import React from 'react';
import A4PageLayout from '../components/A4PageLayout';

// Hardcoded test JSON (from n8n) for this phase
const MOCK_DATA = [
  {
    program_name: "GenAI at work",
    timestamp: "12/9/2025 21:25:14",
    responses_L4: 5,
    avg_weekly_time_saved_minutes: 12.5,
    attribution_factor: 0.76,
    attribution_percent_display: 76,
    total_training_cost_direct: 100000,
    number_of_participants: 125,
    avg_hourly_rate_participant: 80,
    training_hours_per_participant: 8,
    currency: "US$",
    working_weeks_year: 45,
    avg_weekly_time_saved_hours: 0.21,
    annual_hours_saved_per_person: 9.4,
    annual_hours_saved_total: 1172,
    adj_annual_hours_saved_total: 891,
    participant_time_cost_estimate: 80000,
    total_training_cost_used_for_roi: 100000,
    annual_benefit: 71250,
    net_benefit: -28750,
    roi_pct: -28.7,
    bcr: 0.71,
    payback_months: 16.8,
    data_quality_warning: false,
    narrative_summary:
      "Participants report saving on average 0.21 hours per week by applying the skills from this training. Adjusted for a training attribution of 76%, this results in an estimated annual productivity benefit of US$ 71k for 125 participants. With a total training investment of US$ 100k, this corresponds to an ROI of -29%, a benefit–cost ratio of 0.7 : 1, and a payback period of approximately 16.8 months."
  }
];

const Level4And5Page = () => {
  const data = MOCK_DATA[0];
  const isNegativeROI = data.roi_pct < 0;

  // KPI Cards Component
  const KPICard = ({ label, value }) => (
    <div
      className="kpi-card"
      style={{
        background: '#FFFFFF', // neutral white background
        padding: '12px',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
        borderTop: '3px solid #1F3A93', // dark blue accent, no red
        textAlign: 'center'
      }}
    >
      <div
        style={{
          fontSize: '28px',
          fontWeight: 700,
          color: '#1F3A93', // dark blue text
          fontFamily: 'Manrope, sans-serif',
          marginBottom: '4px'
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
          fontWeight: 600
        }}
      >
        {label}
      </div>
    </div>
  );

  // Format currency
  const formatCurrency = (amount) => {
    if (amount >= 1000000) {
      return `${data.currency} ${(amount / 1000000).toFixed(1)}M`;
    } else if (amount >= 1000) {
      return `${data.currency} ${(amount / 1000).toFixed(0)}k`;
    }
    return `${data.currency} ${amount.toLocaleString()}`;
  };

  return (
    <A4PageLayout
      title="Level 4 – Results & Level 5 – ROI"
      subtitle={`Program: ${data.program_name} | Follow-up Assessment`}
    >
      <div
        style={{
          width: '100%',
          height: 'auto',
          minHeight: 'auto',
          overflow: 'visible'
        }}
      >
        {/* Additional spacing after header - 3 lines total */}
        <div style={{ marginBottom: '36px' }} />

        {/* EXECUTIVE METRICS STRIP */}
        <div
          className="grid-container"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)', // only 3 KPI cards
            gap: '8px',
            marginBottom: '8px'
          }}
        >
          <KPICard
            label="Estimated Annual Benefit"
            value={formatCurrency(data.annual_benefit)}
          />
          <KPICard
            label="ROI (Phillips Level 5)"
            value={`${data.roi_pct.toFixed(0)}%`}
          />
          <KPICard
            label="Payback Period"
            value={`${data.payback_months.toFixed(1)} mo`}
          />
        </div>

        <div
          style={{
            fontSize: '9px',
            color: '#2C3E50',
            opacity: 0.7,
            fontStyle: 'italic',
            marginBottom: '12px'
          }}
        >
          Based on self-reported time savings and agreed cost assumptions.
        </div>

        {/* Extra line before main content */}
        <div style={{ marginBottom: '12px' }} />

        {/* TWO COLUMN LAYOUT */}
        <div
          className="grid-container"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '8px',
            marginBottom: '12px'
          }}
        >
          {/* LEFT: LEVEL 4 RESULTS */}
          <div
            className="section-card"
            style={{
              padding: '12px',
              borderRadius: '8px',
              backgroundColor: '#F5F7FA',
              boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
            }}
          >
            <h2
              style={{
                margin: 0,
                marginBottom: '10px',
                fontSize: '13px',
                fontWeight: 600,
                fontFamily: 'Manrope, sans-serif',
                color: '#2C3E50',
                paddingBottom: '6px',
                borderBottom: '2px solid #e0e0e0'
              }}
            >
              Level 4 – Results: Time Saved per Week
            </h2>

            {/* KPI Description */}
            <div
              style={{
                background: '#fff',
                padding: '10px',
                borderRadius: '6px',
                marginBottom: '12px',
                fontSize: '10px',
                color: '#555',
                border: '1px solid #e0e0e0'
              }}
            >
              <strong>KPI used:</strong> Time saved per week using the skills from this training (self-reported).
            </div>

            {/* Key Numbers */}
            <div style={{ marginBottom: '12px' }}>
              <div
                style={{
                  padding: '6px 0',
                  fontSize: '11px',
                  color: '#333'
                }}
              >
                <strong style={{ color: '#1F3A93', fontWeight: 600 }}>
                  Average time saved per participant:
                </strong>{' '}
                {data.avg_weekly_time_saved_hours.toFixed(2)} hours/week (
                {data.avg_weekly_time_saved_minutes.toFixed(1)} minutes)
              </div>
              <div
                style={{
                  padding: '6px 0',
                  fontSize: '11px',
                  color: '#333'
                }}
              >
                <strong style={{ color: '#1F3A93', fontWeight: 600 }}>
                  Annual hours saved (all participants):
                </strong>{' '}
                {data.annual_hours_saved_total.toLocaleString()} hours
              </div>
              <div
                style={{
                  padding: '6px 0',
                  fontSize: '11px',
                  color: '#333'
                }}
              >
                <strong style={{ color: '#1F3A93', fontWeight: 600 }}>
                  Attribution applied:
                </strong>{' '}
                {data.attribution_percent_display}% of the time savings
                attributed to the training
              </div>
              <div
                style={{
                  padding: '6px 0',
                  fontSize: '11px',
                  color: '#333'
                }}
              >
                <strong style={{ color: '#1F3A93', fontWeight: 600 }}>
                  Adjusted annual hours saved:
                </strong>{' '}
                {data.adj_annual_hours_saved_total.toLocaleString()} hours
              </div>
            </div>

            {/* Visual Chart */}
            <div
              style={{
                margin: '12px 0',
                padding: '12px',
                background: '#fff',
                borderRadius: '6px',
                border: '1px solid #e0e0e0'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'space-around',
                  height: '100px',
                  margin: '10px 0'
                }}
              >
                {/* Before Bar */}
                <div
                  style={{
                    textAlign: 'center',
                    flex: 1
                  }}
                >
                  <div
                    style={{
                      background: 'linear-gradient(to top, #ccc, #e0e0e0)',
                      borderRadius: '4px 4px 0 0',
                      margin: '0 auto 8px',
                      width: '50px',
                      height: '10px'
                    }}
                  />
                  <div
                    style={{
                      fontSize: '10px',
                      color: '#666',
                      marginTop: '4px'
                    }}
                  >
                    Before
                  </div>
                  <div
                    style={{
                      fontWeight: 'bold',
                      color: '#666',
                      fontSize: '12px'
                    }}
                  >
                    0 hrs
                  </div>
                </div>

                {/* After Bar */}
                <div
                  style={{
                    textAlign: 'center',
                    flex: 1
                  }}
                >
                  <div
                    style={{
                      // Green bar, aligned with Level 3 layout colors
                      background: 'linear-gradient(to top, #00B894, #27AE60)',
                      borderRadius: '4px 4px 0 0',
                      margin: '0 auto 8px',
                      width: '50px',
                      height: '75px'
                    }}
                  />
                  <div
                    style={{
                      fontSize: '10px',
                      color: '#666',
                      marginTop: '4px'
                    }}
                  >
                    After
                  </div>
                  <div
                    style={{
                      fontWeight: 'bold',
                      color: '#1F3A93',
                      fontSize: '12px'
                    }}
                  >
                    {data.avg_weekly_time_saved_hours.toFixed(2)} hrs
                  </div>
                </div>
              </div>
            </div>

            {/* Data Quality Note */}
            <div
              style={{
                background: '#e8f4f8',
                padding: '8px',
                borderRadius: '6px',
                fontSize: '10px',
                color: '#555',
                marginTop: '12px'
              }}
            >
              <strong>Data quality:</strong> Based on N = {data.responses_L4}{' '}
              participant responses.
            </div>
          </div>

          {/* RIGHT: COST & ROI */}
          <div
            className="section-card"
            style={{
              padding: '12px',
              borderRadius: '8px',
              backgroundColor: '#F5F7FA',
              boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
            }}
          >
            <h2
              style={{
                margin: 0,
                marginBottom: '10px',
                fontSize: '13px',
                fontWeight: 600,
                fontFamily: 'Manrope, sans-serif',
                color: '#2C3E50',
                paddingBottom: '6px',
                borderBottom: '2px solid #e0e0e0'
              }}
            >
              Training Investment & ROI Calculation
            </h2>

            {/* Cost Breakdown */}
            <h4
              style={{
                color: '#666',
                margin: '12px 0 8px 0',
                fontSize: '11px',
                fontWeight: 600
              }}
            >
              Cost Breakdown
            </h4>
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                marginBottom: '12px',
                fontSize: '11px',
                background: '#fff',
                borderRadius: '6px',
                overflow: 'hidden'
              }}
            >
              <thead>
                <tr style={{ background: '#1F3A93', color: 'white' }}>
                  <th
                    style={{
                      padding: '8px',
                      textAlign: 'left',
                      fontWeight: 600
                    }}
                  >
                    Cost Component
                  </th>
                  <th
                    style={{
                      padding: '8px',
                      textAlign: 'right',
                      fontWeight: 600
                    }}
                  >
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td
                    style={{
                      padding: '8px',
                      borderBottom: '1px solid #e0e0e0'
                    }}
                  >
                    Direct Training Costs
                  </td>
                  <td
                    style={{
                      padding: '8px',
                      textAlign: 'right',
                      borderBottom: '1px solid #e0e0e0'
                    }}
                  >
                    {data.currency}{' '}
                    {data.total_training_cost_direct.toLocaleString()}
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      padding: '8px',
                      fontWeight: 'bold',
                      background: '#f8f9fa',
                      borderTop: '2px solid #1F3A93'
                    }}
                  >
                    Total Investment
                  </td>
                  <td
                    style={{
                      padding: '8px',
                      textAlign: 'right',
                      fontWeight: 'bold',
                      background: '#f8f9fa',
                      borderTop: '2px solid #1F3A93'
                    }}
                  >
                    {data.currency}{' '}
                    {data.total_training_cost_used_for_roi.toLocaleString()}
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Benefit Summary */}
            <div
              style={{
                background: '#e8f4f8',
                padding: '12px',
                borderRadius: '6px',
                marginBottom: '12px'
              }}
            >
              <h4
                style={{
                  color: '#1F3A93',
                  marginBottom: '8px',
                  fontSize: '11px',
                  fontWeight: 600
                }}
              >
                Benefit Summary
              </h4>
              <div style={{ fontSize: '11px', lineHeight: 1.6 }}>
                <div style={{ padding: '4px 0' }}>
                  <strong>Adj. annual hours saved:</strong>{' '}
                  {data.adj_annual_hours_saved_total.toLocaleString()} hours
                </div>
                <div style={{ padding: '4px 0' }}>
                  <strong>Avg. hourly cost:</strong> {data.currency}{' '}
                  {data.avg_hourly_rate_participant}
                </div>
                <div style={{ padding: '4px 0' }}>
                  <strong>Annual Benefit:</strong> {data.currency}{' '}
                  {data.annual_benefit.toLocaleString()}
                </div>
              </div>
            </div>

            {/* ROI Formula */}
            <div
              style={{
                background: '#fff9e6',
                padding: '10px',
                borderLeft: '4px solid #ffc107',
                borderRadius: '4px',
                fontSize: '10px',
                fontFamily: "'Courier New', monospace",
                color: '#555',
                lineHeight: 1.6
              }}
            >
              <div style={{ marginBottom: '6px' }}>
                <strong>ROI Formula:</strong>
              </div>
              <div>
                ROI = (Annual Benefit – Total Investment) ÷ Total Investment
              </div>
              <div>
                ROI = ({data.currency}{' '}
                {data.annual_benefit.toLocaleString()} – {data.currency}{' '}
                {data.total_training_cost_used_for_roi.toLocaleString()}) ÷{' '}
                {data.currency}{' '}
                {data.total_training_cost_used_for_roi.toLocaleString()} ={' '}
                {data.roi_pct.toFixed(0)}%
              </div>
              <div style={{ marginTop: '8px' }}>
                <strong>BCR:</strong> Annual Benefit ÷ Total Investment ={' '}
                {data.bcr.toFixed(2)} : 1
              </div>
            </div>
          </div>
        </div>

        {/* NARRATIVE SUMMARY */}
        <div
          style={{
            background: 'linear-gradient(135deg, #e8f4f8 0%, #d4ebf5 100%)',
            borderLeft: '4px solid #1F3A93', // dark blue accolade
            padding: '12px',
            borderRadius: '8px',
            marginBottom: '12px'
          }}
        >
          <h3
            style={{
              color: '#1F3A93', // dark blue title
              fontSize: '12px',
              marginBottom: '8px',
              fontWeight: 600
            }}
          >
            Summary
          </h3>
          <p
            style={{
              margin: 0,
              color: '#333',
              fontSize: '11px',
              lineHeight: 1.7
            }}
          >
            {data.narrative_summary}
          </p>
        </div>

        {/* ASSUMPTIONS & LIMITATIONS */}
        <div
          style={{
            background: '#f5f5f5',
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '12px',
            marginBottom: '12px'
          }}
        >
          <h3
            style={{
              color: '#666',
              fontSize: '12px',
              marginBottom: '10px',
              fontWeight: 600
            }}
          >
            Assumptions & Limitations
          </h3>
          <ul
            style={{
              listStylePosition: 'inside',
              color: '#555',
              fontSize: '10px',
              lineHeight: 1.8,
              margin: 0,
              paddingLeft: 0
            }}
          >
            <li>Time savings are self-reported by participants.</li>
            <li>Attribution % is based on combined participant and manager estimation.</li>
            <li>
              Time horizon: 12 months, Working weeks: {data.working_weeks_year}.
            </li>
            <li>Results provide an estimate, not an audited financial statement.</li>
            {data.responses_L4 < 10 && (
              <li>
                Based on limited response data (N = {data.responses_L4}), results
                should be interpreted with caution.
              </li>
            )}
          </ul>
        </div>
      </div>
    </A4PageLayout>
  );
};

export default Level4And5Page;
