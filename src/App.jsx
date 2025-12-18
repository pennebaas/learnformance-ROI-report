// src/App.jsx
import { useEffect, useState } from 'react';
import Level1Page from './pages/Level1Page';
import Level2Page from './pages/Level2Page';
import Level3Page from './pages/Level3Page';
import Level4And5Page from './pages/Level4And5Page';

function App() {
  // Always read URL live
  const params = new URLSearchParams(window.location.search);
  const mode = params.get('mode'); // ?mode=report
  const pageParam = params.get('page'); // ?page=level1, level2, level3, level4and5

  // Derived flags
  const reportMode = mode === 'report';
  const singlePageMode =
    reportMode ||
    pageParam === 'level1' ||
    pageParam === 'level2' ||
    pageParam === 'level3' ||
    pageParam === 'level4and5';

  const [activePage, setActivePage] = useState('level1');

  // Dummy data (replace later with n8n fetch)
  const [level1Data, setLevel1Data] = useState(null);
  const [level2Data, setLevel2Data] = useState(null);
  const [level3Data, setLevel3Data] = useState(null);
  const [level4And5Data, setLevel4And5Data] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sync active page from URL (only outside report mode)
  useEffect(() => {
    if (!reportMode) {
      if (
        pageParam === 'level1' ||
        pageParam === 'level2' ||
        pageParam === 'level3' ||
        pageParam === 'level4and5'
      ) {
        setActivePage(pageParam);
      } else {
        setActivePage('level1');
      }
    }
  }, [reportMode, pageParam]);

  // Toggle report-mode class (for print/PDF CSS if needed)
  useEffect(() => {
    document.documentElement.classList.toggle('report-mode', reportMode);
    document.body.classList.toggle('report-mode', reportMode);

    return () => {
      document.documentElement.classList.remove('report-mode');
      document.body.classList.remove('report-mode');
    };
  }, [reportMode]);

  // Dummy data init
  useEffect(() => {
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
        '<p>This is dummy Level 1 summary HTML. Later it will come from your n8n + OpenAI pipeline.</p>',
    };

    const dummyLevel2 = {};
    const dummyLevel3 = { title: 'Level 3 - Behaviour & Application' };
    const dummyLevel4And5 = { title: 'Level 4 & 5 - Results & ROI' };

    setLevel1Data(dummyLevel1);
    setLevel2Data(dummyLevel2);
    setLevel3Data(dummyLevel3);
    setLevel4And5Data(dummyLevel4And5);
    setLoading(false);
  }, []);

  if (loading || !level1Data || !level2Data || !level3Data || !level4And5Data) {
    return <div style={{ padding: 24 }}>Loading report…</div>;
  }

  const renderPage = () => {
    if (activePage === 'level1') return <Level1Page data={level1Data} />;
    if (activePage === 'level2') return <Level2Page data={level2Data} />;
    if (activePage === 'level3') return <Level3Page data={level3Data} />;
    if (activePage === 'level4and5')
      return <Level4And5Page data={level4And5Data} />;
    return <div>Unknown page</div>;
  };

  const navBtnStyle = (key) => ({
    border: 'none',
    borderBottom: activePage === key ? '2px solid #1976d2' : '2px solid transparent',
    background: 'none',
    padding: '8px 4px',
    cursor: 'pointer',
    fontWeight: activePage === key ? 600 : 400,
  });

  return (
    <div
      className="app-container"
      style={{
        fontFamily:
          'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      {/* Navigation (normal mode only) */}
      {!singlePageMode && (
        <nav
          className="no-print"
          style={{
            display: 'flex',
            gap: '12px',
            borderBottom: '1px solid #ddd',
            padding: '12px 24px',
            marginBottom: 16,
          }}
        >
          <button onClick={() => setActivePage('level1')} style={navBtnStyle('level1')}>
            Level 1 – Reaction
          </button>
          <button onClick={() => setActivePage('level2')} style={navBtnStyle('level2')}>
            Level 2 – Learning Outcomes
          </button>
          <button onClick={() => setActivePage('level3')} style={navBtnStyle('level3')}>
            Level 3 – Behaviour
          </button>
          <button
            onClick={() => setActivePage('level4and5')}
            style={navBtnStyle('level4and5')}
          >
            Level 4&5 – Results & ROI
          </button>
        </nav>
      )}

      {/* Report vs normal rendering */}
      {reportMode ? (
        <div style={{ padding: 0 }}>
          <Level1Page data={level1Data} reportMode />
          <Level2Page data={level2Data} reportMode />
          <Level3Page data={level3Data} reportMode />
          <Level4And5Page data={level4And5Data} reportMode isLastPage />
        </div>
      ) : (
        <div style={{ padding: '24px' }}>{renderPage()}</div>
      )}
    </div>
  );
}

export default App;
