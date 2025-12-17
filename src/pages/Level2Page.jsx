// src/pages/Level2Page.jsx
import React, { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from 'recharts';
import A4PageLayout from '../components/A4PageLayout.jsx';

const N8N_ENDPOINT =
  'https://smartorange.app.n8n.cloud/webhook/d6df2854-5663-4dfa-bd76-01c5a75aa40c';

const Level2Page = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(N8N_ENDPOINT);
        if (!res.ok) {
          throw new Error(`HTTP error ${res.status}`);
        }
        const json = await res.json();
        console.log('Received from n8n:', json);
        setData(json); // n8n returns a single object
      } catch (e) {
        console.error('Failed to load data', e);
        setError('Could not load evaluation data.');
      }
    };

    load();
  }, []);

  if (error) {
    return (
      <A4PageLayout
        title="Level 2 – Learning Outcomes"
        subtitle="GenAI Skills Training Evaluation"
      >
        <p style={{ color: '#C0392B' }}>{error}</p>
      </A4PageLayout>
    );
  }

  if (!data) {
    return (
      <A4PageLayout
        title="Level 2 – Learning Outcomes"
        subtitle="GenAI Skills Training Evaluation"
      >
        <p>Loading evaluation data…</p>
      </A4PageLayout>
    );
  }

  const overallData = [
    { name: 'Pre', score: data.overall.avg_pre },
    { name: 'Post', score: data.overall.avg_post },
  ];

  const CustomLabel = (props) => {
    const { x, y, width, value } = props;
    return (
      <text
        x={x + width / 2}
        y={y - 5}
        fill="#2C3E50"
        textAnchor="middle"
        fontSize="12"
        fontWeight="600"
        fontFamily="Inter, sans-serif"
      >
        {value.toFixed(1)}
      </text>
    );
  };

  const competencyQuestions = (data.questions || []).slice(0, 5);

  return (
    <A4PageLayout
      title={data.title || 'Level 2 – Learning Outcomes'}
      subtitle="GenAI Skills Training Evaluation"
    >
      {/* TOP ROW: Overall + Key insights */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '3fr 2fr',
          gap: '10px',
          marginBottom: '12px',
        }}
      >
        {/* Overall Performance card */}
        <div
          style={{
            padding: '8px',
            borderRadius: '10px',
            backgroundColor: '#F5F7FA',
            boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
          }}
        >
          <h2
            style={{
              margin: 0,
              marginBottom: '6px',
              fontSize: '12px',
              fontWeight: 600,
              fontFamily: 'Manrope, sans-serif',
              color: '#2C3E50',
            }}
          >
            Overall Performance
          </h2>
          <div style={{ width: '100%', height: 150 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={overallData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
                <XAxis
                  dataKey="name"
                  tick={{
                    fill: '#2C3E50',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 10,
                  }}
                />
                <YAxis
                  domain={[0, 5]}
                  ticks={[0, 1, 2, 3, 4, 5]}
                  tick={{
                    fill: '#2C3E50',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 10,
                  }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#F5F7FA',
                    border: '1px solid #1F3A93',
                    borderRadius: '8px',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '11px',
                  }}
                />
                <Bar dataKey="score" fill="#1F3A93">
                  <LabelList content={CustomLabel} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Key Insights card */}
        <div
          style={{
            padding: '8px',
            borderRadius: '10px',
            backgroundColor: '#F5F7FA',
            boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
          }}
        >
          <h2
            style={{
              margin: 0,
              marginBottom: '6px',
              fontSize: '12px',
              fontWeight: 600,
              fontFamily: 'Manrope, sans-serif',
              color: '#2C3E50',
            }}
          >
            Key Insights
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div
              style={{
                background: '#FFFFFF',
                padding: '6px 8px',
                borderRadius: '6px',
                borderLeft: '4px solid #27AE60',
              }}
            >
              <div
                style={{
                  fontSize: '18px',
                  fontWeight: 700,
                  color: '#27AE60',
                }}
              >
                {data.overall.gain_pct}%
              </div>
              <div
                style={{
                  fontSize: '10px',
                  color: '#2C3E50',
                  opacity: 0.7,
                }}
              >
                Overall Improvement
              </div>
            </div>
            <div
              style={{
                background: '#FFFFFF',
                padding: '6px 8px',
                borderRadius: '6px',
                borderLeft: '4px solid #3FA9F5',
              }}
            >
              <div
                style={{
                  fontSize: '18px',
                  fontWeight: 700,
                  color: '#3FA9F5',
                }}
              >
                {data.n_overlap}
              </div>
              <div
                style={{
                  fontSize: '10px',
                  color: '#2C3E50',
                  opacity: 0.7,
                }}
              >
                Respondents (matched pre &amp; post)
              </div>
            </div>
            <div
              style={{
                background: '#FFFFFF',
                padding: '6px 8px',
                borderRadius: '6px',
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: '10px',
                  fontStyle: 'italic',
                  color: '#2C3E50',
                }}
              >
                {data.narrative}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Performance by Competency */}
      <div style={{ marginBottom: '6px' }}>
        <h2
          style={{
            margin: 0,
            marginBottom: '4px',
            fontSize: '13px',
            fontWeight: 600,
            fontFamily: 'Manrope, sans-serif',
            color: '#2C3E50',
          }}
        >
          Performance by Competency
        </h2>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
          gap: '6px',
          marginBottom: '10px',
        }}
      >
        {competencyQuestions.map((q) => {
          const chartData = [
            { name: 'Pre', score: q.pre },
            { name: 'Post', score: q.post },
          ];

          return (
            <div
              key={q.id}
              style={{
                padding: '6px',
                borderRadius: '8px',
                backgroundColor: '#F5F7FA',
                boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
              }}
            >
              <h3
                style={{
                  margin: 0,
                  marginBottom: '4px',
                  fontSize: '10px',
                  fontWeight: 600,
                  color: '#2C3E50',
                  lineHeight: 1.2,
                  maxHeight: '28px',
                  overflow: 'hidden',
                }}
              >
                {q.label}
              </h3>
              <div style={{ width: '100%', height: 110 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
                    <XAxis
                      dataKey="name"
                      tick={{
                        fill: '#2C3E50',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: 9,
                      }}
                    />
                    <YAxis
                      domain={[0, 5]}
                      ticks={[0, 1, 2, 3, 4, 5]}
                      tick={{
                        fill: '#2C3E50',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: 9,
                      }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#F5F7FA',
                        border: '1px solid #00B894',
                        borderRadius: '8px',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '10px',
                      }}
                    />
                    <Bar dataKey="score" fill="#00B894">
                      <LabelList content={CustomLabel} />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div style={{ marginTop: '4px', textAlign: 'center' }}>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    color: q.gain_pct > 0 ? '#27AE60' : '#2C3E50',
                  }}
                >
                  {q.gain_pct > 0 ? '+' : ''}
                  {q.gain_pct}%
                </span>
                <span
                  style={{
                    fontSize: '10px',
                    marginLeft: '3px',
                    color: '#2C3E50',
                    opacity: 0.7,
                  }}
                >
                  gain
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </A4PageLayout>
  );
};

export default Level2Page;
