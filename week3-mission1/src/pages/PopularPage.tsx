import { useEffect, useState } from "react";
import axios from "axios";
import { Movie } from "../types/movie";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";

export default function PopularPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const limit = 20;

  useEffect((): void => {
    const fetchMovies = async (): Promise<void> => {
      try {
        const { data } = await axios(
          `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
          }
        );

        setMovies(data.results);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.error("Error fetching popular movies:", error);
      }
    };

    fetchMovies();
  }, [page]);

  return (
    <>
      <div className="p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <Pagination
        page={page}
        setPage={setPage}
        total={totalPages}
        limit={limit}
      />
    </>
  );
}
