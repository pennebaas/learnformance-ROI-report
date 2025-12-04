// src/App.jsx
import { useEffect, useState } from 'react';
import ReportPage from './pages/ReportPage';

function App() {
  const [level1Data, setLevel1Data] = useState(null);
  const [level2Data, setLevel2Data] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // For now: dummy data just to get the structure working.
    // Later you replace this with real fetch calls to n8n.

    const dummyLevel1 = {
      page: 2,
      title: 'Level 1 - Reaction (Course Evaluation)',
      respondents: 6,
      avgEvaluation: 3.37,
      npsScore: 0,
      npsSplit: { promoters: 2, passives: 2, detractors: 2 },
      kpiAverages: {
        'Content Relevance': 3.0,
        'Practical Application': 3.33,
        'Trainer Quality': 3.17,
        'Learning Experience': 3.67,
      },
      summaryHtml:
        '<p>This is dummy Level 1 HTML. Later this will come from your n8n + OpenAI pipeline.</p>',
    };

    const dummyLevel2 = {}; // we don’t need real props yet for Level 2

    setLevel1Data(dummyLevel1);
    setLevel2Data(dummyLevel2);
    setLoading(false);
  }, []);

  if (loading || !level1Data || !level2Data) {
    return <div>Loading report…</div>;
  }

  return <ReportPage level1Data={level1Data} level2Data={level2Data} />;
}

export default App;
