import { useParams } from "react-router-dom";

const MovieDetailPage = () : JSX.Element => {
  const params = useParams();

  console.log(params);
  return <div>MovieDetailPage{params.movieId}</div>;
};

export default MovieDetailPage; 
// MoviePage.tsx 코드 활용해서 영화 상세 페이지 만들기