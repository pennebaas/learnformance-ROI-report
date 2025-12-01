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

  return (
    <div className="w-full h-screen bg-white p-8 overflow-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Level 2 – Learning Outcomes</h1>
        <p className="text-lg text-gray-600">GenAI Skills Training Evaluation</p>
      </div>

      {/* Top Section */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        {/* Left: Overall Performance Chart */}
        <div className="bg-gray-50 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Overall Performance</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={overallData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 4]} ticks={[0, 1, 2, 3, 4]} />
              <Tooltip />
              <Bar dataKey="score" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Right: Key Metrics */}
        <div className="bg-gray-50 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Key Insights</h2>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg border-l-4 border-green-500">
              <div className="text-3xl font-bold text-green-600">{data.overall.gain_pct}%</div>
              <div className="text-sm text-gray-600">Overall Improvement</div>
            </div>
            <div className="bg-white p-4 rounded-lg border-l-4 border-blue-500">
              <div className="text-3xl font-bold text-blue-600">{data.n_respondents}</div>
              <div className="text-sm text-gray-600">Respondents</div>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <p className="text-sm text-gray-700 italic">{data.narrative}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Individual Competencies */}
      <div className="mb-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Performance by Competency</h2>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        {data.questions.map((q) => {
          const chartData = [
            { name: 'Pre', score: q.pre },
            { name: 'Post', score: q.post }
          ];
          
          return (
            <div key={q.id} className="bg-gray-50 p-4 rounded-lg shadow">
              <h3 className="text-sm font-semibold text-gray-800 mb-2 h-10 overflow-hidden">
                {q.label}
              </h3>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis domain={[0, 4]} ticks={[0, 1, 2, 3, 4]} tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="score" fill="#8b5cf6" />
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-2 text-center">
                <span className={`text-lg font-bold ${q.gain_pct > 0 ? 'text-green-600' : 'text-gray-500'}`}>
                  {q.gain_pct > 0 ? '+' : ''}{q.gain_pct}%
                </span>
                <span className="text-xs text-gray-600 ml-1">gain</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OnePager;
