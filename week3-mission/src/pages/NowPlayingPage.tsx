import { useEffect, useState } from "react";
import axios from "axios";
import { Movie } from "../types/movie";
import MovieCard from "../components/MovieCard";
import LoadingSpinner from "../components/LoadingSpineer";

export default function NowPlayingPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // 에러 상태 추가

  useEffect((): void => {
    const fetchMovies = async (): Promise<void> => {
      try {
        const { data } = await axios(
          "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=",
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
          }
        );

        setMovies(data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setError("에러가 발생했습니다. 다시 시도해주세요.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error)
    return (
      <div className="text-green-500 text-center items-center h-screen bg-black">
        {error}
      </div>
    );

  return (
    <div className="p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 bg-black">
      {movies &&
        movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
    </div>
  );
}
