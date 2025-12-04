// src/pages/ReportPage.jsx
//import Level1Page from './Level1Page';
import Level2Page from './Level2Page';

const ReportPage = ({ level1Data, level2Data }) => {
  return (
    <div className="report">
      {/* Page 1: Level 1 */}
      <Level1Page data={level1Data} />

      {/* Page break */}
      <div className="page-break" />

      {/* Page 2: Level 2 (your existing report) */}
      <Level2Page data={level2Data} />
    </div>
  );
};

export default ReportPage;
