import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

interface MovieDetailData {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  runtime: number;
  tagline: string;
}

export default function MovieDetail() {
  const { movieId } = useParams<{ movieId: string }>();
  const [movie, setMovie] = useState<MovieDetailData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get<MovieDetailData>(
          `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
          }
        );
        console.log("Fetched Movie Data:", response.data);
        setMovie(response.data);
      } catch (error) {
        console.error("영화 정보를 불러오지 못했습니다:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [movieId]);

  if (loading) return <div className="p-8 text-white">로딩 중...</div>;
  if (!movie)
    return <div className="p-8 text-white">영화 정보를 찾을 수 없습니다.</div>;

  return (
    <div className="p-8 text-white min-h-screen bg-black">
      <div className="flex gap-6">
        <img
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          alt={movie.title}
          className="rounded-xl shadow-md"
        />
        <div>
          <h1 className="text-4xl font-bold">{movie.title}</h1>
          <p className="text-lg text-gray-300 mt-2">{movie.tagline}</p>
          <p className="mt-4">개봉일: {movie.release_date}</p>
          <p className="mt-1 text-white">
            평점: {movie.vote_average} / 런타임: {movie.runtime}분
          </p>
          <p className="mt-4 text-gray-400">{movie.overview}</p>
        </div>
      </div>
    </div>
  );
}
