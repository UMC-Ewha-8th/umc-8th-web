import { useEffect, useState } from "react";
import axios from "axios";
import { Movie } from "../types/movie";
import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";

export default function UpComingPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const limit = 20;

  useEffect((): void => {
    const fetchMovies = async (): Promise<void> => {
      const { data } = await axios(
        "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
          },
        }
      );

      setMovies(data.results);
      setTotalPages(data.total_pages);
    };

    fetchMovies();
  }, [page]);

  console.log(movies[0]?.adult);

  return (
    <>
      <div className="p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 bg-black">
        {movies &&
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>
      <Pagination
        page={page}
        setPage={setPage}
        total={totalPages * limit}
        limit={limit}
      />
    </>
  );
}
