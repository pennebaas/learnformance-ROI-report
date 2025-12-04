// src/pages/Level1Page.jsx

const Level1Page = ({ data }) => {
  const {
    title,
    respondents,
    avgEvaluation,
    npsScore,
    npsSplit,
    kpiAverages,
    summaryHtml,
  } = data;

  return (
    <div className="page level1">
      <h1>{title}</h1>

      <div className="kpi-grid">
        <div className="kpi-card">
          <h3>Number of respondents</h3>
          <p>{respondents}</p>
        </div>
        <div className="kpi-card">
          <h3>Average evaluation score</h3>
          <p>{avgEvaluation.toFixed(2)} / 5</p>
        </div>
        <div className="kpi-card">
          <h3>NPS score</h3>
          <p>{npsScore}</p>
          <small>
            Promoters: {npsSplit.promoters}, Passives: {npsSplit.passives}, Detractors:{' '}
            {npsSplit.detractors}
          </small>
        </div>
      </div>

      <h3>KPI averages</h3>
      <ul>
        <li>Content Relevance: {kpiAverages['Content Relevance'].toFixed(2)}</li>
        <li>Practical Application: {kpiAverages['Practical Application'].toFixed(2)}</li>
        <li>Trainer Quality: {kpiAverages['Trainer Quality'].toFixed(2)}</li>
        <li>Learning Experience: {kpiAverages['Learning Experience'].toFixed(2)}</li>
      </ul>

      <div
        className="summary-html"
        dangerouslySetInnerHTML={{ __html: summaryHtml }}
      />
    </div>
  );
};

export default Level1Page;
