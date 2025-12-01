import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from 'recharts';
import logo from './assets/learnformance-logo.png';

const OnePager = () => {
  const data = {
    overall: {
      avg_pre: 2.9,
      avg_post: 3.3,
      gain_pct: 14.5
    },
    questions: [
      {
        id: "Q1",
        label: "Formulating effective GenAI prompts",
        pre: 2.8,
        post: 2.8,
        gain_pct: 0
      },
      {
        id: "Q2",
        label: "Knowing which GenAI tools to use when",
        pre: 2.7,
        post: 3.4,
        gain_pct: 29.2
      },
      {
        id: "Q3",
        label: "Using advanced GenAI features",
        pre: 2.7,
        post: 3.4,
        gain_pct: 29.2
      },
      {
        id: "Q4",
        label: "Using GenAI safely and responsibly",
        pre: 3.1,
        post: 3.2,
        gain_pct: 3.6
      },
      {
        id: "Q5",
        label: "Creating GenAI images",
        pre: 3.3,
        post: 3.8,
        gain_pct: 13.3
      }
    ],
    n_respondents: 9,
    narrative: "Participants show a 14.5% overall improvement across the five GenAI skills."
  };

  const overallData = [
    { name: 'Pre', score: data.overall.avg_pre },
    { name: 'Post', score: data.overall.avg_post }
  ];

  const CustomLabel = (props) => {
    const { x, y, width, value } = props;
    return (
      <text 
        x={x + width / 2} 
        y={y - 5} 
        fill="#2C3E50" 
        textAnchor="middle" 
        fontSize="14"
        fontWeight="600"
        fontFamily="Inter"
      >
        {value.toFixed(1)}
      </text>
    );
  };

  return (
    <div className="w-full bg-white p-6" style={{ fontFamily: 'Inter, sans-serif', maxWidth: '210mm', margin: '0 auto', position: 'relative', minHeight: '297mm' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@600;700&family=Inter:wght@400;500;600&display=swap');
        @media print {
          body { margin: 0; }
          @page { size: A4 portrait; margin: 0; }
        }
      `}</style>
      
      <div className="max-w-full mx-auto" style={{ paddingBottom: '60px' }}>
        <div className="flex items-start mb-4">
          <div className="flex-shrink-0 mr-4">
            <img
              src={logo}
              alt="Learnformance Logo"
              className="w-12 h-12 object-contain"
            />
          </div>
          <div className="flex-grow text-center">
            <h1 className="text-xl font-bold mb-1" style={{ fontFamily: 'Manrope, sans-serif', color: '#2C3E50' }}>
              Level 2 – Learning Outcomes
            </h1>
            <p className="text-sm" style={{ color: '#2C3E50', opacity: 0.8 }}>
              GenAI Skills Training Evaluation
            </p>
          </div>
          <div className="flex-shrink-0 w-12"></div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="p-3 rounded-lg shadow" style={{ backgroundColor: '#F5F7FA' }}>
            <h2 className="text-sm font-semibold mb-2" style={{ fontFamily: 'Manrope, sans-serif', color: '#2C3E50' }}>
              Overall Performance
            </h2>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={overallData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fill: '#2C3E50', fontFamily: 'Inter', fontSize: 10 }}
                />
                <YAxis 
                  domain={[0, 5]} 
                  ticks={[0, 1, 2, 3, 4, 5]}
                  tick={{ fill: '#2C3E50', fontFamily: 'Inter', fontSize: 10 }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#F5F7FA', 
                    border: '1px solid #1F3A93',
                    borderRadius: '8px',
                    fontFamily: 'Inter',
                    fontSize: '11px'
                  }}
                />
                <Bar dataKey="score" fill="#1F3A93">
                  <LabelList content={CustomLabel} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="p-3 rounded-lg shadow" style={{ backgroundColor: '#F5F7FA' }}>
            <h2 className="text-sm font-semibold mb-2" style={{ fontFamily: 'Manrope, sans-serif', color: '#2C3E50' }}>
              Key Insights
            </h2>
            <div className="space-y-2">
              <div className="bg-white p-2 rounded border-l-4" style={{ borderColor: '#27AE60' }}>
                <div className="text-xl font-bold" style={{ color: '#27AE60' }}>
                  {data.overall.gain_pct}%
                </div>
                <div className="text-xs" style={{ color: '#2C3E50', opacity: 0.7 }}>
                  Overall Improvement
                </div>
              </div>
              <div className="bg-white p-2 rounded border-l-4" style={{ borderColor: '#3FA9F5' }}>
                <div className="text-xl font-bold" style={{ color: '#3FA9F5' }}>
                  {data.n_respondents}
                </div>
                <div className="text-xs" style={{ color: '#2C3E50', opacity: 0.7 }}>
                  Respondents
                </div>
              </div>
              <div className="bg-white p-2 rounded">
                <p className="text-xs italic" style={{ color: '#2C3E50' }}>
                  {data.narrative}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-2">
          <h2 className="text-base font-semibold mb-2" style={{ fontFamily: 'Manrope, sans-serif', color: '#2C3E50' }}>
            Performance by Competency
          </h2>
        </div>
        
        <div className="grid grid-cols-3 gap-2 mb-4">
          {data.questions.map((q) => {
            const chartData = [
              { name: 'Pre', score: q.pre },
              { name: 'Post', score: q.post }
            ];
            
            return (
              <div key={q.id} className="p-2 rounded-lg shadow" style={{ backgroundColor: '#F5F7FA' }}>
                <h3 className="text-xs font-semibold mb-1 h-8 overflow-hidden" style={{ color: '#2C3E50', lineHeight: '1.2' }}>
                  {q.label}
                </h3>
                <ResponsiveContainer width="100%" height={120}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
                    <XAxis 
                      dataKey="name" 
                      tick={{ fill: '#2C3E50', fontFamily: 'Inter', fontSize: 9 }}
                    />
                    <YAxis 
                      domain={[0, 5]} 
                      ticks={[0, 1, 2, 3, 4, 5]}
                      tick={{ fill: '#2C3E50', fontFamily: 'Inter', fontSize: 9 }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#F5F7FA', 
                        border: '1px solid #00B894',
                        borderRadius: '8px',
                        fontFamily: 'Inter',
                        fontSize: '10px'
                      }}
                    />
                    <Bar dataKey="score" fill="#00B894">
                      <LabelList content={CustomLabel} />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
                <div className="mt-1 text-center">
                  <span 
                    className="text-sm font-bold" 
                    style={{ color: q.gain_pct > 0 ? '#27AE60' : '#2C3E50' }}
                  >
                    {q.gain_pct > 0 ? '+' : ''}{q.gain_pct}%
                  </span>
                  <span className="text-xs ml-1" style={{ color: '#2C3E50', opacity: 0.7 }}>
                    gain
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div 
          className="pt-3 border-t flex items-center" 
          style={{ 
            borderColor: '#E0E0E0',
            position: 'absolute',
            bottom: '20mm',
            left: '6px',
            right: '6px',
            backgroundColor: 'white'
          }}
        >
          <img
            src={logo}
            alt="Learnformance Logo"
            className="w-8 h-8 mr-2 object-contain"
          />
          <p className="text-xs" style={{ color: '#1F3A93', fontFamily: 'Inter' }}>
            <span className="font-semibold">Learnformance</span> - Turning your learning data into measurable impact
          </p>
        </div>
      </div>
    </div>
  );
};

export default OnePager;