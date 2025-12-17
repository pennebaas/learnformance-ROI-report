// src/App.jsx
import { useEffect, useState } from 'react';
import Level1Page from './pages/Level1Page';
import Level2Page from './pages/Level2Page';
import Level3Page from './pages/Level3Page';
import Level4And5Page from './pages/Level4And5Page';

function App() {
  const [activePage, setActivePage] = useState('level1');
  const [singlePageMode, setSinglePageMode] = useState(false);

  // Dummy data for now – replace with real fetch from n8n later
  const [level1Data, setLevel1Data] = useState(null);
  const [level2Data, setLevel2Data] = useState(null);
  const [level3Data, setLevel3Data] = useState(null);
  const [level4And5Data, setLevel4And5Data] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const pageParam = params.get('page');        // e.g. ?page=level1, level2, level3, level4and5
    const trainingId = params.get('trainingId'); // will be used for n8n fetch later

    if (pageParam === 'level1' || pageParam === 'level2' || pageParam === 'level3' || pageParam === 'level4and5') {
      setActivePage(pageParam);
      setSinglePageMode(true);  // no menu in PDF mode
    } else {
      setActivePage('level1');  // default tab
      setSinglePageMode(false); // show menu in normal mode
    }

    // TODO later: fetch real data from n8n using trainingId.
    // For now: hard-coded dummy data so you can see the structure.

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

    const dummyLevel2 = {
      // Add fields later if Level2Page expects props
    };

    const dummyLevel3 = {
      // Add fields later if Level3Page expects props
      title: 'Level 3 - Behaviour & Application',
    };

    const dummyLevel4And5 = {
      title: 'Level 4 & 5 - Results & ROI',
      // Add your Level 4&5 specific fields here
    };

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
    if (activePage === 'level1') {
      return <Level1Page data={level1Data} />;
    }
    if (activePage === 'level2') {
      return <Level2Page data={level2Data} />;
    }
    if (activePage === 'level3') {
      return <Level3Page data={level3Data} />;
    }
    if (activePage === 'level4and5') {
      return <Level4And5Page data={level4And5Data} />;
    }
    return <div>Unknown page</div>;
  };

  return (
    <div
      className="app-container"
      style={{
        fontFamily:
          'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      {/* Show menu only in normal mode (no ?page=...) */}
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
          <button
            onClick={() => setActivePage('level1')}
            style={{
              border: 'none',
              borderBottom:
                activePage === 'level1'
                  ? '2px solid #1976d2'
                  : '2px solid transparent',
              background: 'none',
              padding: '8px 4px',
              cursor: 'pointer',
              fontWeight: activePage === 'level1' ? 600 : 400,
            }}
          >
            Level 1 – Reaction
          </button>
          <button
            onClick={() => setActivePage('level2')}
            style={{
              border: 'none',
              borderBottom:
                activePage === 'level2'
                  ? '2px solid #1976d2'
                  : '2px solid transparent',
              background: 'none',
              padding: '8px 4px',
              cursor: 'pointer',
              fontWeight: activePage === 'level2' ? 600 : 400,
            }}
          >
            Level 2 – Learning Outcomes
          </button>
          <button
            onClick={() => setActivePage('level3')}
            style={{
              border: 'none',
              borderBottom:
                activePage === 'level3'
                  ? '2px solid #1976d2'
                  : '2px solid transparent',
              background: 'none',
              padding: '8px 4px',
              cursor: 'pointer',
              fontWeight: activePage === 'level3' ? 600 : 400,
            }}
          >
            Level 3 – Behaviour
          </button>
          <button
            onClick={() => setActivePage('level4and5')}
            style={{
              border: 'none',
              borderBottom:
                activePage === 'level4and5'
                  ? '2px solid #1976d2'
                  : '2px solid transparent',
              background: 'none',
              padding: '8px 4px',
              cursor: 'pointer',
              fontWeight: activePage === 'level4and5' ? 600 : 400,
            }}
          >
            Level 4&5 – Results & ROI
          </button>
        </nav>
      )}

      <div style={{ padding: '24px' }}>{renderPage()}</div>
    </div>
  );
}

export default App;