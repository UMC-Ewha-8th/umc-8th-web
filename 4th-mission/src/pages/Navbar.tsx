import { NavLink } from "react-router-dom";

const LINKS = [
    { to: '/', label: 'HOME'},
    { to: '/movies/popular', label: 'POPULAR'},
    { to: '/movies/now_playing', label: 'NOW_PLAYING'},
    { to: '/movies/top_rated', label: 'TOP_RATED'},
    { to: '/movies/upcoming', label: 'UPCOMING'},
]

export const Navbar = () => {
    return (
        <div className='flex gap-3 p-4'>
            {LINKS.map(({to, label}) => (
                <NavLink
                    key={to}
                    to={to}
                    className={({isActive}) => {
                        return isActive? 'text-[#6071c7] font-bold' : 'text-gray-500';
                    }}
                >
                    {label}
                </NavLink>
            ))}
        </div>
    );
};