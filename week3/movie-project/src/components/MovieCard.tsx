import { useNavigate, useParams } from "react-router-dom";
import { Movie } from "../types/movie";
import React from 'react';

interface MovieCardProps {
    movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps): React.ReactElement {
    const [isHovered, setIsHovered] = React.useState(false);
    const navigate = useNavigate();
    const {category} = useParams<{category:string}>();

    const handleClick = () => {
        if (!category || !movie?.id) return;
        navigate(`/Movies/${category}/${movie.id}`);
      };
    
    

    return (
        <div className='relative rounded-xl shadow-lg overflow-hidden cursor-pointer
        w-44 transition-transform duration-300 hover:scale-105' onMouseEnter={() => setIsHovered(true)} 
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}>
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