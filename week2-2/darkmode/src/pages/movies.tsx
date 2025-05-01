
import { Movie, MovieResponse } from '../types/movie'
import { useState, useEffect } from 'react'

import axios from 'axios'

const MoviePage = () => {
    const [movies, setMovies] = useState<Movie[]>([])

    useEffect(() => {
        const fetchMovies = async() => {
            // 응답에 대한 타입 정의
            const { data } = await axios.get<MovieResponse>(
            `https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1`,
            {
                headers: {
                    Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
                }
            }
            )
            setMovies(data.results)
        }

        fetchMovies();
    }, [])
    return (
        <ul>
            {movies?.map((movie) => (
                <li key={movie.id}>
                    <h2>{movie.title}</h2>
                    <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.original_title} />
                    
                </li>
            ))}
        </ul>
    )
}

export default MoviePage