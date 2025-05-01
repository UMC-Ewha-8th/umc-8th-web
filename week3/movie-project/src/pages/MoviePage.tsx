import React from 'react';
import { useEffect, useState } from 'react'
import axios from 'axios'
import MovieCard from '../components/MovieCard';
import { Movie, MovieResponse } from '../types/Movie';

export default function MoviePage(): React.ReactElement {
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect((): void => {
        const fetchMovies = async () : Promise<void> => {
            const { data } = await axios.get<MovieResponse>(
                'https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1',
                {
                    headers: {
                        Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
                    }
                }
            );
            setMovies(data.results);
        }

        

        fetchMovies()
       }, []);

       return (
        <div className='p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl: grid-cols-6'>
         {/* {movies.map((movie) => (
            <div key={movie.id}>
                <h1>{movie.title}</h1>
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                <p>{movie.overview}</p>
            </div> 
        ))} */}

        {movies && movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
        </div>
       )
      


} 
