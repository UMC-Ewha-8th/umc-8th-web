import { useParams } from "react-router-dom";
import useCustomFetch from "../hooks/useCustomFetch";
import { MovieDetailResponse } from "../types/movie";

const MovieDetailPage = () => {
  const params = useParams();
  const url = `https://api.themoviedb.org/3/movie/${params.movieId}`

  const {isPending, isError, data: movie} = useCustomFetch<MovieDetailResponse>(url, "ko-kr");
  
  const creditUrl = `https://api.themoviedb.org/3/movie/${params.movieId}/credits`;
  const { data: credits } = useCustomFetch<any>(creditUrl, "ko-kr");


  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return (
      <div>
        <span className="text-red-500 text-2xl">에러가 발생했습니다.</span>
      </div>
    );
  }

  return (
    <div className="text-white min-h-screen bg-black">
      {/* 상단 배경: backdrop_path 사용 */}
      <div className="relative w-full h-[500px]">
        <img
          src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
          alt={movie?.title}
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent p-6 flex flex-col justify-end">
          <h1 className="text-4xl font-bold mb-2">{movie?.title}</h1>
          <p className="text-lg text-gray-300">평균 평점: {movie?.vote_average}</p>
          <p className="text-lg text-gray-300">상영 시간: {movie?.runtime}분</p>
          <p className="mt-4 text-sm text-gray-200">{movie?.overview}</p>
        </div>
      </div>
  
      {/* 상세 정보 */}
      <div className="p-6">
        <p className="text-xl font-semibold mb-2">장르</p>
        <ul className="list-disc list-inside text-gray-300 mb-6">
          {movie?.genres.map((genre) => (
            <li key={genre.id}>{genre.name}</li>
          ))}
        </ul>
  
        <p className="text-xl font-semibold mb-2">제작사</p>
        <ul className="list-disc list-inside text-gray-300 mb-6">
          {movie?.production_companies.map((company) => (
            <li key={company.id}>{company.name}</li>
          ))}
        </ul>
  
        {/* 감독 및 출연진 */}
        {credits && (
          <>
            <p className="text-xl font-semibold mb-4">감독</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-6 mb-10">
              {credits.crew
                .filter((person: any) => person.job === "Director")
                .map((director: any) => (
                  <div key={director.id} className="text-center">
                    <img
                      src={
                        director.profile_path
                          ? `https://image.tmdb.org/t/p/w185${director.profile_path}`
                          : "https://via.placeholder.com/185x278?text=No+Image"
                      }
                      alt={director.name}
                      className="rounded-full w-24 h-24 object-cover mx-auto mb-2"
                    />
                    <p className="text-sm font-medium">{director.name}</p>
                    <p className="text-xs text-gray-400">Director</p>
                  </div>
                ))}
            </div>
  
            <p className="text-xl font-semibold mb-4">출연</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-6">
              {credits.cast.slice(0, 12).map((actor: any) => (
                <div key={actor.id} className="text-center">
                  <img
                    src={
                      actor.profile_path
                        ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                        : "https://via.placeholder.com/185x278?text=No+Image"
                    }
                    alt={actor.name}
                    className="rounded-full w-24 h-24 object-cover mx-auto mb-2"
                  />
                  <p className="text-sm font-medium">{actor.name}</p>
                  <p className="text-xs text-gray-400">{actor.character}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );  
};

export default MovieDetailPage;