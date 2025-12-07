// src/pages/ReportPage.jsx
import Level1Page from './Level1Page';
import Level2Page from './Level2Page';

const ReportPage = ({ level1Data, level2Data }) => {
  return (
    <div className="report">
      <Level1Page data={level1Data} />
      <div className="page-break" />
      <Level2Page data={level2Data} />
    </div>
  );
};

export default ReportPage;
