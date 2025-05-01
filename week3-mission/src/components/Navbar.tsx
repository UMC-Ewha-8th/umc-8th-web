import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const linkClass = (path: string) =>
    `block px-4 py-2 transition-colors duration-200 hover:text-green-400 ${
      location.pathname === path ? "text-green-400 font-bold" : "text-white"
    }`;

  return (
    <div>
      <ul className="flex flex-col md:flex-row md:space-x-4 mt-2 md:mt-0 bg-black">
        <li>
          <Link to="/" className={linkClass("/")}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/movies/popular" className={linkClass("/movies/popular")}>
            Popular
          </Link>
        </li>
        <li>
          <Link to="/movies/upcoming" className={linkClass("/movies/upcoming")}>
            Upcoming
          </Link>
        </li>
        <li>
          <Link
            to="/movies/top-rated"
            className={linkClass("/movies/top-rated")}
          >
            Top Rated
          </Link>
        </li>
        <li>
          <Link
            to="/movies/now-playing"
            className={linkClass("/movies/now-playing")}
          >
            Now Playing
          </Link>
        </li>
      </ul>
    </div>
  );
}
