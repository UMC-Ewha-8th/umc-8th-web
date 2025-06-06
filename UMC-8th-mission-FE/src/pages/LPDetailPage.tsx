import React from "react";

interface LPDetailPageProps {
  lpId: string;
}

const LPDetailPage: React.FC<LPDetailPageProps> = ({ lpId }) => {
  return <div className="pt-16">{lpId}의 상세페이지입니다!</div>;
};

export default LPDetailPage;
