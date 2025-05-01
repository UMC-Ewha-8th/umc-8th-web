import { Movie } from "../types/Movie";
import React from 'react';

interface MovieCardProps {
    movie: Movie;   }


export default function MovieCard({movie}: MovieCardProps) : React.ReactElement {
    const [isHovered, setIsHovered] = React.useState(false);

    return (
        <div className='relative rounded-xl shadow-lg overflow-hidden cursor-pointer
        w-44 transition-transform duration-300 hover:scale-105' onMouseEnter={() => setIsHovered(true)} 
        onMouseLeave={() => setIsHovered(false)}>
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} 
        className = ''

        />

        {isHovered && (
            <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent backdrop-blur-md text-white
            flex flex-col justify-center '>
                <h2 className='text-lg font-bold text-center leading-snug'>{movie.title}</h2>
                <p className='text-sm text-grey-300 leading-relaxed mt-2 line-clamp-3'>{movie.overview}</p>
            </div>
        )}

        </div>
    )
}