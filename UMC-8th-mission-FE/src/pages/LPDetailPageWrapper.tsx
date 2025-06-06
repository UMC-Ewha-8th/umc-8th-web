import React from "react";
import { useParams } from "react-router-dom";
import LPDetailPage from "./LPDetailPage";

const LPDetailPageWrapper: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  console.log("받은 id:", id);

  return <LPDetailPage lpId={id ?? "알 수 없음"} />;
};

export default LPDetailPageWrapper;
