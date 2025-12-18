// src/pages/Level3Page.jsx
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import A4PageLayout from '../components/A4PageLayout.jsx';
import './Level3Page.css';

// Hardcoded test JSON (from n8n) for this phase
const MOCK_DATA = [
  {
    page: 4,
    title: 'Level 3 – Behavior Change & On-the-Job Application',
    level3_behavior: {
      kpis: {
        participant_behavior_score: 3.2,
        manager_behavior_score: 2.61,
        participant_attribution_percent: 0.76,
        manager_attribution_percent: 0.63,
        avg_behavior_score: 2.9,
        avg_attribution_percent: 0.7,
        time_saved_minutes_avg: 12.5
      },
      distribution: {
        participant_apply_skills: {
          score_1: 0,
          score_2: 0.6,
          score_3: 0,
          score_4: 0.4,
          score_5: 0
        },
        participant_time_saved_per_week: {
          'About 10-30 minutes a day': 0.5,
          'About 0-10 minutes a day': 0.5
        },
        manager_strong_application_pct: 0.17,
        manager_strong_improvement_pct: 0.5,
        manager_strong_confidence_pct: 0.17,
        participant_strong_application_pct: 0.4,
        participant_strong_improvement_pct: 0.4,
        participant_strong_confidence_pct: 0.4
      },
      behaviors: {
        participant: [
          {
            theme: 'Practical Application of Skills',
            mentions: 5,
            example: 'I use it every day'
          },
          {
            theme: 'Improved Communication',
            mentions: 4,
            example: 'Better emails'
          },
          {
            theme: 'Enhanced Information Retrieval',
            mentions: 3,
            example: 'search information'
          }
        ],
        manager: [
          {
            theme: 'Increased Enthusiasm for AI',
            mentions: 5,
            example: 'He is enthousistic about AI'
          },
          {
            theme: 'Quality of Work Improvement',
            mentions: 3,
            example: 'Better quality'
          },
          {
            theme: 'Frequent Use of AI Tools',
            mentions: 4,
            example: 'He is using it now all the time'
          }
        ]
      },
      barriers: {
        participant: [
          {
            theme: 'Security Concerns',
            mentions: 3
          },
          {
            theme: 'Managerial Resistance',
            mentions: 1
          },
          {
            theme: 'Tool Access Limitations',
            mentions: 1
          }
        ],
        manager: [
          {
            theme: 'IT Department Constraints',
            mentions: 1
          },
          {
            theme: 'Assessment Difficulty',
            mentions: 1
          },
          {
            theme: 'Team Member Engagement',
            mentions: 1
          }
        ]
      },
      support_needs: {
        participant: [
          {
            theme: 'Additional Training Opportunities',
            mentions: 4
          }
        ]
      },
      adoption_attribution_summary_html:
        '<p>This behaviour adoption score indicates strong and frequent adoption in day-to-day work. There is a noticeable perception gap between managers and participants. The attribution score means the training played a major role in the observed improvement.</p>'
    }
  }
];

const Level3Page = () => {
  const data = MOCK_DATA[0];
  const l3 = data.level3_behavior;

  // Global max for mentions across all behavior/barrier/support themes
  const allMentionCounts = [
    ...(l3.behaviors?.participant || []).map((b) => b.mentions || 0),
    ...(l3.behaviors?.manager || []).map((b) => b.mentions || 0),
    ...(l3.barriers?.participant || []).map((b) => b.mentions || 0),
    ...(l3.barriers?.manager || []).map((b) => b.mentions || 0),
    ...(l3.support_needs?.participant || []).map((n) => n.mentions || 0)
  ];
  const globalMaxMentions =
    allMentionCounts.length > 0 ? Math.max(...allMentionCounts) : 0;

  // KPI Cards Component
  const KPICard = ({ label, value, isPercent = false }) => (
    <div
      className="kpi-card"
      style={{
        background: '#FFFFFF',
        padding: '10px',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
        borderTop: '3px solid #1F3A93',
        textAlign: 'center'
      }}
    >
      <div
        style={{
          fontSize: '24px',
          fontWeight: 700,
          color: '#1F3A93',
          fontFamily: 'Manrope, sans-serif',
          marginBottom: '4px'
        }}
      >
        {isPercent
          ? `${Math.round((value || 0) * 100)}%`
          : `${(value || 0).toFixed(1)} / 5`}
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

  // Calculate weekly application percentage (strong application: scores 4–5)
  const applySkills = l3.distribution.participant_apply_skills;
  const weeklyPct = Math.round(
    ((applySkills.score_4 || 0) + (applySkills.score_5 || 0)) * 100
  );

  // Time saved chart data
  const timeSavedData = Object.entries(
    l3.distribution.participant_time_saved_per_week
  ).map(([key, val]) => ({
    name: key,
    value: (val || 0) * 100
  }));

  // Theme bars component
  const ThemeBar = ({ theme, mentions, maxMentions, color = '#1F3A93' }) => {
    const percentage = maxMentions ? (mentions / maxMentions) * 100 : 0;

    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '6px'
        }}
      >
        <div
          style={{
            flex: 1,
            fontSize: '10px',
            color: '#2C3E50'
          }}
        >
          {theme}
        </div>
        <div
          style={{
            flex: '0 0 80px',
            height: '16px',
            background: '#F5F7FA',
            borderRadius: '8px',
            overflow: 'hidden',
            position: 'relative'
          }}
        >
          <div
            style={{
              width: `${percentage}%`,
              height: '100%',
              background: color,
              borderRadius: '8px',
              position: 'absolute',
              top: 0,
              left: 0
            }}
          />
        </div>
        <div
          style={{
            minWidth: '20px',
            fontSize: '11px',
            fontWeight: 700,
            color: '#2C3E50',
            textAlign: 'right'
          }}
        >
          {mentions}
        </div>
      </div>
    );
  };

  // Quote box component
  const QuoteBox = ({ text, author, isManager = false }) => (
    <div
      style={{
        background: isManager
          ? 'linear-gradient(135deg, #E8F4F8 0%, #F0F9FF 100%)'
          : 'linear-gradient(135deg, #FEF3F0 0%, #FEF9F7 100%)',
        borderLeft: `3px solid ${isManager ? '#3FA9F5' : '#1F3A93'}`,
        padding: '8px 10px',
        borderRadius: '4px',
        marginBottom: '6px'
      }}
    >
      <p
        style={{
          margin: 0,
          fontSize: '10px',
          fontStyle: 'italic',
          color: '#2C3E50',
          lineHeight: 1.4
        }}
      >
        "{text}"
      </p>
      <div
        style={{
          fontSize: '8px',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          color: '#2C3E50',
          opacity: 0.6,
          marginTop: '4px',
          fontStyle: 'normal'
        }}
      >
        — {author}
      </div>
    </div>
  );

  return (
  <A4PageLayout
    title={data.title || 'Level 3 – Behavior Change & On-the-Job Application'}
    subtitle="GenAI Training Program | Follow-up 6 weeks after training"
    multiPage
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

        {/* KPI STRIP */}
        <div
          className="grid-container"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '8px',
            marginBottom: '12px'
          }}
        >
          <KPICard
            label="Participant Behavior Adoption"
            value={l3.kpis.participant_behavior_score}
          />
          <KPICard
            label="Manager-Rated Behavior"
            value={l3.kpis.manager_behavior_score}
          />
          <KPICard
            label="Attribution to Training (Avg)"
            value={l3.kpis.avg_attribution_percent}
            isPercent
          />
        </div>

        {/* SUMMARY INSIGHT */}
        {l3.adoption_attribution_summary_html && (
          <div
            style={{
              padding: '8px',
              borderRadius: '8px',
              backgroundColor: '#F5F7FA',
              boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
              marginBottom: '10px',
              borderLeft: '3px solid #1F3A93'
            }}
          >
            <div
              style={{
                fontSize: '10px',
                color: '#2C3E50',
                lineHeight: 1.5
              }}
              dangerouslySetInnerHTML={{
                __html: l3.adoption_attribution_summary_html
              }}
            />
          </div>
        )}

        {/* Extra line before Application Overview */}
        <div style={{ marginBottom: '12px' }} />

        {/* APPLICATION OVERVIEW */}
        <div className="section-header" style={{ marginBottom: '4px' }}>
          <h2
            style={{
              margin: 0,
              marginBottom: '4px',
              fontSize: '13px',
              fontWeight: 600,
              fontFamily: 'Manrope, sans-serif',
              color: '#2C3E50'
            }}
          >
            Application Overview
          </h2>
        </div>

        {/* Strong application highlight */}
        <div
          style={{
            fontSize: '9px',
            color: '#2C3E50',
            opacity: 0.8,
            marginBottom: '6px',
            fontStyle: 'italic'
          }}
        >
          {weeklyPct}% of participants report a strong (4–5) level of applying
          the trained skills in their weekly work.
        </div>

        <div
          className="grid-container"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '8px',
            marginBottom: '0px'
          }}
        >
          {/* Participant Scores - Three Column Charts */}
          <div
            className="chart-card"
            style={{
              padding: '8px',
              borderRadius: '8px',
              backgroundColor: '#F5F7FA',
              boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
            }}
          >
            <h3
              style={{
                margin: 0,
                marginBottom: '6px',
                fontSize: '11px',
                fontWeight: 600,
                color: '#2C3E50'
              }}
            >
              Participant Self-Assessment
            </h3>
            <div style={{ width: '100%', height: 140 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    {
                      name: 'Application',
                      value:
                        (l3.distribution
                          .participant_strong_application_pct || 0) * 100
                    },
                    {
                      name: 'Confidence',
                      value:
                        (l3.distribution
                          .participant_strong_confidence_pct || 0) * 100
                    },
                    {
                      name: 'Improvement',
                      value:
                        (l3.distribution
                          .participant_strong_improvement_pct || 0) * 100
                    }
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
                  <XAxis
                    dataKey="name"
                    tick={{
                      fill: '#2C3E50',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: 9
                    }}
                  />
                  <YAxis
                    domain={[0, 100]}
                    tick={{
                      fill: '#2C3E50',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: 9
                    }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#F5F7FA',
                      border: '1px solid #00B894',
                      borderRadius: '8px',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '10px'
                    }}
                    formatter={(value) => `${value.toFixed(0)}%`}
                  />
                  <Bar
                    dataKey="value"
                    fill="#00B894"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Manager Scores - Three Column Charts */}
          <div
            className="chart-card"
            style={{
              padding: '8px',
              borderRadius: '8px',
              backgroundColor: '#F5F7FA',
              boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
            }}
          >
            <h3
              style={{
                margin: 0,
                marginBottom: '6px',
                fontSize: '11px',
                fontWeight: 600,
                color: '#2C3E50'
              }}
            >
              Manager Assessment
            </h3>
            <div style={{ width: '100%', height: 140 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    {
                      name: 'Application',
                      value:
                        (l3.distribution.manager_strong_application_pct ||
                          0) * 100
                    },
                    {
                      name: 'Confidence',
                      value:
                        (l3.distribution.manager_strong_confidence_pct ||
                          0) * 100
                    },
                    {
                      name: 'Improvement',
                      value:
                        (l3.distribution.manager_strong_improvement_pct ||
                          0) * 100
                    }
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
                  <XAxis
                    dataKey="name"
                    tick={{
                      fill: '#2C3E50',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: 9
                    }}
                  />
                  <YAxis
                    domain={[0, 100]}
                    tick={{
                      fill: '#2C3E50',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: 9
                    }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#F5F7FA',
                      border: '1px solid #00B894',
                      borderRadius: '8px',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '10px'
                    }}
                    formatter={(value) => `${value.toFixed(0)}%`}
                  />
                  <Bar
                    dataKey="value"
                    fill="#00B894"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Explanation text under charts */}
        <div
          style={{
            padding: '4px 12px',
            borderRadius: '6px',
            backgroundColor: '#F5F7FA',
            marginBottom: '10px',
            marginTop: '4px',
            fontSize: '9px',
            color: '#2C3E50',
            fontStyle: 'italic',
            textAlign: 'center',
            lineHeight: 1.4
          }}
        >
          % of respondents that perceives a strong (4-5) application (frequency,
          confidence and skill improvement) of the trained skills.
        </div>

        {/* TIME SAVED PER WEEK */}
        <div
          className="section-break section-header"
          style={{ marginBottom: '6px' }}
        >
          <h2
            style={{
              margin: 0,
              marginBottom: '4px',
              fontSize: '13px',
              fontWeight: 600,
              fontFamily: 'Manrope, sans-serif',
              color: '#2C3E50'
            }}
          >
            Time Saved Per Week
          </h2>
        </div>

        <div
          className="grid-container"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 2fr',
            gap: '8px',
            marginBottom: '10px'
          }}
        >
          {/* Left: Average Time Saved Card */}
          <div
            className="chart-card"
            style={{
              padding: '8px',
              borderRadius: '8px',
              backgroundColor: '#F5F7FA',
              boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              borderTop: '3px solid #1F3A93'
            }}
          >
            <div
              style={{
                fontSize: '36px',
                fontWeight: 700,
                color: '#1F3A93',
                fontFamily: 'Manrope, sans-serif',
                marginBottom: '4px'
              }}
            >
              {l3.kpis.time_saved_minutes_avg.toFixed(1)}
            </div>
            <div
              style={{
                fontSize: '10px',
                color: '#2C3E50',
                opacity: 0.7,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                fontWeight: 600,
                textAlign: 'center'
              }}
            >
              Avg Minutes Saved Per Day
            </div>
          </div>

          {/* Right: Horizontal Bar Chart Distribution */}
          <div
            className="chart-card"
            style={{
              padding: '8px',
              borderRadius: '8px',
              backgroundColor: '#F5F7FA',
              boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
            }}
          >
            <h3
              style={{
                margin: 0,
                marginBottom: '6px',
                fontSize: '11px',
                fontWeight: 600,
                color: '#2C3E50'
              }}
            >
              Distribution
            </h3>
            <div style={{ width: '100%', height: 100 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart layout="vertical" data={timeSavedData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
                  <XAxis
                    type="number"
                    domain={[0, 100]}
                    tick={{
                      fill: '#2C3E50',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: 9
                    }}
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    width={120}
                    tick={{
                      fill: '#2C3E50',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: 9
                    }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#F5F7FA',
                      border: '1px solid #1F3A93',
                      borderRadius: '8px',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '10px'
                    }}
                    formatter={(value) => `${value.toFixed(0)}%`}
                  />
                  <Bar
                    dataKey="value"
                    fill="#1F3A93"
                    radius={[0, 4, 4, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Spacer to push 'Key Applied Behaviors' to next printed page */}
        <div style={{ height: '80px' }} />

        {/* KEY APPLIED BEHAVIORS */}
        <div
          className="section-break section-header"
          style={{ marginBottom: '6px' }}
        >
          <h2
            style={{
              margin: 0,
              marginBottom: '4px',
              fontSize: '13px',
              fontWeight: 600,
              fontFamily: 'Manrope, sans-serif',
              color: '#2C3E50'
            }}
          >
            Key Applied Behaviors
          </h2>
        </div>

        <div
          className="grid-container"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '8px',
            marginBottom: '10px'
          }}
        >
          {/* Participant Behaviors */}
          <div
            className="behavior-card"
            style={{
              padding: '8px',
              borderRadius: '8px',
              backgroundColor: '#F5F7FA',
              boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
            }}
          >
            <h3
              style={{
                margin: 0,
                marginBottom: '8px',
                fontSize: '11px',
                fontWeight: 600,
                color: '#2C3E50'
              }}
            >
              Participant-Reported
            </h3>
            {l3.behaviors.participant.map((behavior) => (
              <ThemeBar
                key={behavior.theme}
                theme={behavior.theme}
                mentions={behavior.mentions}
                maxMentions={globalMaxMentions}
                color="#1F3A93"
              />
            ))}
            <div style={{ marginTop: '8px' }}>
              {l3.behaviors.participant.slice(0, 2).map((behavior) => (
                <QuoteBox
                  key={behavior.example}
                  text={behavior.example}
                  author="Participant"
                  isManager={false}
                />
              ))}
            </div>
          </div>

          {/* Manager Observations */}
          <div
            className="behavior-card"
            style={{
              padding: '8px',
              borderRadius: '8px',
              backgroundColor: '#F5F7FA',
              boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
            }}
          >
            <h3
              style={{
                margin: 0,
                marginBottom: '8px',
                fontSize: '11px',
                fontWeight: 600,
                color: '#2C3E50'
              }}
            >
              Manager-Observed
            </h3>
            {l3.behaviors.manager.map((behavior) => (
              <ThemeBar
                key={behavior.theme}
                theme={behavior.theme}
                mentions={behavior.mentions}
                maxMentions={globalMaxMentions}
                color="#3FA9F5"
              />
            ))}
            <div style={{ marginTop: '8px' }}>
              {l3.behaviors.manager.slice(0, 2).map((behavior) => (
                <QuoteBox
                  key={behavior.example}
                  text={behavior.example}
                  author="Manager"
                  isManager={true}
                />
              ))}
            </div>
          </div>
        </div>

        {/* BARRIERS TO APPLICATION */}
        <div
          className="section-break section-header"
          style={{ marginBottom: '6px' }}
        >
          <h2
            style={{
              margin: 0,
              marginBottom: '4px',
              fontSize: '13px',
              fontWeight: 600,
              fontFamily: 'Manrope, sans-serif',
              color: '#2C3E50'
            }}
          >
            Barriers to Application
          </h2>
        </div>

        <div
          className="grid-container"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '8px',
            marginBottom: '10px'
          }}
        >
          {/* Participant Barriers */}
          <div
            className="barrier-card"
            style={{
              padding: '8px',
              borderRadius: '8px',
              backgroundColor: '#F5F7FA',
              boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
            }}
          >
            <h3
              style={{
                margin: 0,
                marginBottom: '8px',
                fontSize: '11px',
                fontWeight: 600,
                color: '#2C3E50'
              }}
            >
              Participant Barriers
            </h3>
            {l3.barriers.participant.map((barrier) => (
              <ThemeBar
                key={barrier.theme}
                theme={barrier.theme}
                mentions={barrier.mentions}
                maxMentions={globalMaxMentions}
                color="#ED8936"
              />
            ))}
          </div>

          {/* Manager Barriers */}
          <div
            className="barrier-card"
            style={{
              padding: '8px',
              borderRadius: '8px',
              backgroundColor: '#F5F7FA',
              boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
            }}
          >
            <h3
              style={{
                margin: 0,
                marginBottom: '8px',
                fontSize: '11px',
                fontWeight: 600,
                color: '#2C3E50'
              }}
            >
              Manager-Identified Barriers
            </h3>
            {l3.barriers.manager.map((barrier) => (
              <ThemeBar
                key={barrier.theme}
                theme={barrier.theme}
                mentions={barrier.mentions}
                maxMentions={globalMaxMentions}
                color="#ED8936"
              />
            ))}
          </div>
        </div>

        {/* SUPPORT NEEDS */}
        <div
          className="section-break section-header"
          style={{ marginBottom: '6px' }}
        >
          <h2
            style={{
              margin: 0,
              marginBottom: '4px',
              fontSize: '13px',
              fontWeight: 600,
              fontFamily: 'Manrope, sans-serif',
              color: '#2C3E50'
            }}
          >
            Requested Support & Next Steps
          </h2>
        </div>

        <div
          className="support-card"
          style={{
            padding: '8px',
            borderRadius: '8px',
            backgroundColor: '#F5F7FA',
            boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
            marginBottom: '10px'
          }}
        >
          {l3.support_needs.participant.map((need) => (
            <ThemeBar
              key={need.theme}
              theme={need.theme}
              mentions={need.mentions}
              maxMentions={globalMaxMentions}
              color="#00B894"
            />
          ))}
        </div>
      </div>
    </A4PageLayout>
  );
};

export default Level3Page;
