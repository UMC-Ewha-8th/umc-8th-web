import { useParams } from "react-router-dom";

const PremiumWebtoonPage = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div style={{ padding: "20px" }}>
      <h1>프리미엄 웹툰 #{id}</h1>
      <p>이 웹툰은 프리미엄 유저만 볼 수 있습니다.</p>
      <img
        src={`https://placehold.co/800x400?text=Webtoon+${id}`}
        alt={`Webtoon ${id}`}
        style={{ width: "100%", borderRadius: "8px", marginTop: "20px" }}
      />
    </div>
  );
};

export default PremiumWebtoonPage;
