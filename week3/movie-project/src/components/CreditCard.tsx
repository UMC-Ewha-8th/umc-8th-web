import React from 'react'
import { Cast, Crew } from '../types/credits'

interface CreditCardProps {
    credit: Cast | Crew;
}
export default function CreditCard({ credit }: CreditCardProps): React.ReactElement {
    
  return (
    <div className = "flex flex-col items-center justify-center bg-black-800 text-white p-4 rounded-lg shadow-lg ">
        <img src={`https://image.tmdb.org/t/p/w500${credit.profile_path}`} alt={credit.name} className="w-36 h-36 rounded-full object-cover aspect-square" />
        <h2 className="text-lg font-bold">{credit.name}</h2>
        <p className="text-sm text-gray-400">{'character' in credit ? credit.character : credit.job}</p>
        <p className="text-sm text-gray-400">{credit.known_for_department}</p>
      
    </div>
  )
}

