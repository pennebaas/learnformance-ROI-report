// src/pages/Level1Page.jsx
import React, { useEffect, useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LabelList,
  ComposedChart
} from 'recharts';
import A4PageLayout from '../components/A4PageLayout';

const N8N_ENDPOINT_LEVEL1 =
  'https://smartorange.app.n8n.cloud/webhook/c051874f-45e0-4299-b865-222431eeada1';

const Level1Page = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(N8N_ENDPOINT_LEVEL1);
        if (!res.ok) throw new Error(`HTTP error ${res.status}`);
        const json = await res.json();
        console.log('Level 1 data from n8n:', json);
        const obj = Array.isArray(json) ? json[0] : json;
        setData(obj);
      } catch (e) {
        console.error('Failed to load Level 1 data', e);
        setError('Could not load Level 1 evaluation data.');
      }
    };
    load();
  }, []);

  if (error) {
    return (
      <A4PageLayout
        title="Level 1 – Reaction (Course Evaluation)"
        subtitle="GenAI Skills Training Evaluation"
      >
        <p style={{ color: '#C0392B' }}>{error}</p>
      </A4PageLayout>
    );
  }

  if (!data) {
    return (
      <A4PageLayout
        title="Level 1 – Reaction (Course Evaluation)"
        subtitle="GenAI Skills Training Evaluation"
      >
        <p>Loading Level 1 data…</p>
      </A4PageLayout>
    );
  }

  const {
    title,
    respondents,
    avgEvaluation,
    npsScore,
    npsSplit,
    kpiAverages,
    summaryHtml,
  } = data;

  const safeAvg = typeof avgEvaluation === 'number' ? avgEvaluation : 0;
  const safeNps = typeof npsScore === 'number' ? npsScore : 0;

  // --- Star rating component with proper half-star using SVG approach ---
  const StarRating = ({ rating }) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const fillPercentage = Math.max(0, Math.min(100, (rating - i + 1) * 100));
      stars.push(
        <span key={i} style={{ position: 'relative', display: 'inline-block', width: '1em', height: '1em' }}>
          <span style={{ position: 'absolute', color: '#E0E0E0' }}>★</span>
          <span 
            style={{ 
              position: 'absolute', 
              color: '#FFA726',
              clipPath: `inset(0 ${100 - fillPercentage}% 0 0)`
            }}
          >
            ★
          </span>
        </span>
      );
    }
    return <>{stars}</>;
  };

  // --- NPS gauge color ---
  const gaugeColor =
    safeNps <= 0 ? '#E74C3C' : safeNps <= 20 ? '#F39C12' : '#27AE60';

  // --- Proper semi-circle gauge using PieChart ---
  const normalizedValue = ((safeNps + 100) / 200) * 100; // Convert -100 to +100 into 0 to 100
  const gaugeData = [
    { name: 'Score', value: normalizedValue, fill: gaugeColor },
    { name: 'Empty', value: 100 - normalizedValue, fill: '#E8EEF2' }
  ];

  // --- KPI horizontal bar data ---
  const kpiData = [
    { name: 'Learning Experience', value: kpiAverages?.['Learning Experience'] },
    {
      name: 'Practical Application',
      value: kpiAverages?.['Practical Application'],
    },
    { name: 'Trainer Quality', value: kpiAverages?.['Trainer Quality'] },
    { name: 'Content Relevance', value: kpiAverages?.['Content Relevance'] },
  ].filter((d) => typeof d.value === 'number');

  // --- NPS distribution: ABSOLUTE NUMBERS with percentages ---
  const detractorsCount = npsSplit?.detractors || 0;
  const passivesCount = npsSplit?.passives || 0;
  const promotersCount = npsSplit?.promoters || 0;
  const totalNps = detractorsCount + passivesCount + promotersCount;
  
  const detractorsPct = totalNps > 0 ? (detractorsCount / totalNps) * 100 : 0;
  const passivesPct = totalNps > 0 ? (passivesCount / totalNps) * 100 : 0;
  const promotersPct = totalNps > 0 ? (promotersCount / totalNps) * 100 : 0;

  const stackedNpsData = [
    {
      name: 'NPS',
      detractors: detractorsPct,
      passives: passivesPct,
      promoters: promotersPct,
    }
  ];

  const CustomLabel = ({ x, y, width, value, count, fill }) => {
    if (!value || value < 8) return null;
    return (
      <text
        x={x + width / 2}
        y={y + 14}
        fill="#FFFFFF"
        textAnchor="middle"
        fontSize={11}
        fontWeight="600"
        fontFamily="Inter, sans-serif"
      >
        {count}
      </text>
    );
  };

  return (
    <A4PageLayout
      title={title || 'Level 1 – Reaction (Course Evaluation)'}
      subtitle="GenAI Skills Training Evaluation"
    >
      {/* KEY METRICS STRIP */}
      <div
        style={{
          display: 'flex',
          gap: '12px',
          marginBottom: '16px',
        }}
      >
        {/* Respondents Card */}
        <div
          style={{
            flex: '0 0 auto',
            minWidth: '140px',
            padding: '12px 16px',
            borderRadius: '10px',
            backgroundColor: '#F5F7FA',
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
          }}
        >
          <div
            style={{
              fontSize: '10px',
              color: '#7F8C8D',
              marginBottom: '4px',
              fontWeight: 500,
              letterSpacing: '0.3px',
              textTransform: 'uppercase',
            }}
          >
            Respondents
          </div>
          <div
            style={{
              fontSize: '32px',
              fontWeight: 700,
              color: '#1F3A93',
              lineHeight: 1,
            }}
          >
            {respondents ?? '—'}
          </div>
        </div>

        {/* Overall Score Card */}
        <div
          style={{
            flex: 1,
            padding: '12px 16px',
            borderRadius: '10px',
            backgroundColor: '#F5F7FA',
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
          }}
        >
          <div
            style={{
              fontSize: '10px',
              color: '#7F8C8D',
              marginBottom: '4px',
              fontWeight: 500,
              letterSpacing: '0.3px',
              textTransform: 'uppercase',
            }}
          >
            Overall Satisfaction
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <div
              style={{
                fontSize: '32px',
                fontWeight: 700,
                color: '#2C3E50',
                lineHeight: 1,
              }}
            >
              {safeAvg.toFixed(1)}
            </div>
            <div style={{ fontSize: '22px', lineHeight: 1, display: 'flex', gap: '3px' }}>
              <StarRating rating={safeAvg} />
            </div>
          </div>
          <div
            style={{
              fontSize: '9px',
              color: '#95A5A6',
              marginTop: '4px',
            }}
          >
            Average rating scale: 1 (poor) to 5 (excellent)
          </div>
        </div>
      </div>

      {/* NPS ROW: Gauge + Distribution */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '14px',
          marginBottom: '14px',
        }}
      >
        {/* NPS Gauge - Proper Semi-Circle */}
        <div
          style={{
            padding: '10px 14px 10px',
            borderRadius: '10px',
            backgroundColor: '#F5F7FA',
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
          }}
        >
          <div
            style={{
              fontSize: '13px',
              fontWeight: 600,
              fontFamily: 'Manrope, sans-serif',
              color: '#2C3E50',
              marginBottom: '4px',
            }}
          >
            Net Promoter Score (NPS)
          </div>
          <div style={{ 
            width: '100%', 
            height: '110px',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{ position: 'absolute', top: '-110px', left: 0, right: 0 }}>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={gaugeData}
                    cx="50%"
                    cy="100%"
                    startAngle={180}
                    endAngle={0}
                    innerRadius="70%"
                    outerRadius="100%"
                    paddingAngle={0}
                    dataKey="value"
                    stroke="none"
                  >
                    {gaugeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div style={{ 
              position: 'absolute',
              bottom: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
              textAlign: 'center'
            }}>
              <div
                style={{
                  fontSize: '36px',
                  fontWeight: 700,
                  color: gaugeColor,
                  lineHeight: 1,
                }}
              >
                {safeNps}
              </div>
              <div
                style={{
                  fontSize: '9px',
                  color: '#7F8C8D',
                  marginTop: '3px',
                  whiteSpace: 'nowrap',
                }}
              >
                Range: -100 to +100
              </div>
            </div>
          </div>
        </div>

        {/* NPS Distribution - STACKED Bar with Absolute Numbers */}
        <div
          style={{
            padding: '10px 14px 10px',
            borderRadius: '10px',
            backgroundColor: '#F5F7FA',
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
          }}
        >
          <div
            style={{
              fontSize: '13px',
              fontWeight: 600,
              fontFamily: 'Manrope, sans-serif',
              marginBottom: '6px',
              color: '#2C3E50',
            }}
          >
            NPS Response Distribution
          </div>
          <div style={{ width: '100%', height: 85 }}>
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart 
                data={stackedNpsData}
                layout="vertical"
                margin={{ left: 5, right: 5, top: 5, bottom: 5 }}
              >
                <XAxis
                  type="number"
                  domain={[0, 100]}
                  tick={false}
                  height={5}
                />
                <YAxis type="category" dataKey="name" hide />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #999',
                    borderRadius: '6px',
                    fontSize: '10px',
                  }}
                  formatter={(value, name) => {
                    let count = 0;
                    if (name === 'detractors') count = detractorsCount;
                    if (name === 'passives') count = passivesCount;
                    if (name === 'promoters') count = promotersCount;
                    return [`${count} (${value.toFixed(1)}%)`, name.charAt(0).toUpperCase() + name.slice(1)];
                  }}
                />
                <Bar dataKey="detractors" stackId="a" fill="#E74C3C" barSize={30}>
                  <LabelList content={(props) => <CustomLabel {...props} count={detractorsCount} fill="#E74C3C" />} />
                </Bar>
                <Bar dataKey="passives" stackId="a" fill="#F39C12" barSize={30}>
                  <LabelList content={(props) => <CustomLabel {...props} count={passivesCount} fill="#F39C12" />} />
                </Bar>
                <Bar dataKey="promoters" stackId="a" fill="#27AE60" barSize={30}>
                  <LabelList content={(props) => <CustomLabel {...props} count={promotersCount} fill="#27AE60" />} />
                </Bar>
              </ComposedChart>
            </ResponsiveContainer>
          </div>
          <div
            style={{
              fontSize: '9px',
              color: '#7F8C8D',
              display: 'flex',
              gap: '8px',
              justifyContent: 'center',
              marginTop: '0px',
            }}
          >
            <span>
              <span style={{ color: '#E74C3C', fontWeight: 600 }}>■</span> Detractors (0-6)
            </span>
            <span>
              <span style={{ color: '#F39C12', fontWeight: 600 }}>■</span> Passives (7-8)
            </span>
            <span>
              <span style={{ color: '#27AE60', fontWeight: 600 }}>■</span> Promoters (9-10)
            </span>
          </div>
        </div>
      </div>

      {/* KPI BAR CHART - Full Width */}
      <div
        style={{
          padding: '12px 14px',
          borderRadius: '10px',
          backgroundColor: '#F5F7FA',
          boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
          marginBottom: '14px',
        }}
      >
        <div
          style={{
            fontSize: '13px',
            fontWeight: 600,
            fontFamily: 'Manrope, sans-serif',
            marginBottom: '6px',
            color: '#2C3E50',
          }}
        >
          Performance by Key Indicator
        </div>
        <div style={{ width: '100%', height: 180 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={kpiData}
              layout="vertical"
              margin={{ left: 5, right: 40, top: 5, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" horizontal={false} />
              <XAxis
                type="number"
                domain={[0, 5]}
                ticks={[0, 1, 2, 3, 4, 5]}
                tick={{ fontSize: 10, fill: '#7F8C8D' }}
              />
              <YAxis
                type="category"
                dataKey="name"
                tick={{ fontSize: 11, fill: '#2C3E50', fontWeight: 500 }}
                width={140}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #1F3A93',
                  borderRadius: '6px',
                  fontSize: '11px',
                }}
                formatter={(value) => [value.toFixed(2), 'Score']}
              />
              <Bar dataKey="value" fill="#1F3A93" radius={[0, 4, 4, 0]}>
                <LabelList
                  dataKey="value"
                  position="right"
                  formatter={(v) => v.toFixed(1)}
                  style={{
                    fontSize: 11,
                    fill: '#2C3E50',
                    fontWeight: 600,
                  }}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* SUMMARY SECTION */}
      <div
        style={{
          padding: '14px',
          borderRadius: '10px',
          backgroundColor: '#F5F7FA',
          boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
        }}
      >
        <h3
          style={{
            margin: 0,
            marginBottom: '8px',
            fontSize: '13px',
            fontWeight: 600,
            fontFamily: 'Manrope, sans-serif',
            color: '#2C3E50',
          }}
        >
          Summary of Open Feedback
        </h3>
        <div
          style={{
            fontSize: '11px',
            color: '#2C3E50',
            lineHeight: 1.6,
          }}
          dangerouslySetInnerHTML={{ __html: summaryHtml || '<p style="color: #95A5A6; font-style: italic;">No feedback summary available.</p>' }}
        />
      </div>
    </A4PageLayout>
  );
};

export default Level1Page;