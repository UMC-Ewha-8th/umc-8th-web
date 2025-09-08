import { useState } from "react";
import MovieCard from "../components/MovieCard";
import { useParams } from "react-router-dom";
import useCustomFetch from "../hooks/useCustomFetch";
import type { MovieResponse } from "../types/movies";
import { LoadingSpinner } from "../components/LoadingSpiner";

export default function MoviePage() {
    const [page, setPage] = useState(1);

    const {category} = useParams<{
        category: string;
    }>();
    
    const url = `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=${page}`
    const {data:movies, isPending, isError,} = useCustomFetch<MovieResponse>(url);

    console.log(movies);
    if (isError){
        return (
            <div>
                <span className='text-red-500 text-2xl'>에러가 발생했습니다.</span>
            </div>
        );
    }
    return (
        <>
            {<div className='flex items-center justify-center gap-6 mt-5'>
                <button 
                    className='bg-[#c191f2] text-white px-6 py-3 rounded-lg shadow-md hover:bg-[#6d1ebc] transition-all duration-200 disabled:bg-gray-300 cursor-pointer disabled:cursor-not-allowed'
                    disabled={page===1}
                    onClick={():void => setPage((prev):number => prev-1)}
                >{`<`}
                </button>
                <span className='font-bold text-gray-400'> {page}</span>
                <button 
                    className='bg-[#c191f2] text-white px-6 py-3 rounded-lg shadow-md hover:bg-[#6d1ebc] transition-all duration-200 disabled:bg-gray-300 cursor-pointer disabled:cursor-not-allowed'
                    onClick={():void => setPage((prev):number => prev+1)}
                >{`>`}
                </button>
            </div>}

            {isPending && 
                <div className='flex items-center justify-center h-dvh'>
                    <LoadingSpinner/>
                </div>
            }

            {!isPending &&
                <div className='p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
                    {movies&&movies.results.map((movie) => <MovieCard key={movie.id} movie={movie}/>)}
                </div>

            }
        </>
    );
} 