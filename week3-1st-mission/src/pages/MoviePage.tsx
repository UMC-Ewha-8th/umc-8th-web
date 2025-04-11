import { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "./components/MovieCard";

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  adult: boolean;
};

function MoviePage(): JSX.Element {
  console.log("🔑 확인용 토큰:", import.meta.env.VITE_TMDB_KEY);


  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_TMDB_V3_KEY}&language=en-US&page=1`
        );
        setMovies(res.data.results);
      } catch (err) {
        console.error("❌ 영화 불러오기 실패 (v3):", err);
      }
    };
  
    fetchMovies();
  }, []);
  return (
    <div className="p-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

// ✅ 이거 없으면 import 못함!
export default MoviePage;
