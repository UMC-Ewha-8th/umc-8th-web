import "./App.css";
import Navbar from "./components/Navbar";
import MoviePage from "./pages/MoviePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PopularPage from "./pages/PopularPage";
import UpComingPage from "./pages/UpcomingPage";
import NowPlayingPage from "./pages/NowPlayingPage";
import TopRatedPage from "./pages/TopRatedPage";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<MoviePage />} />
        <Route path="/movies/popular" element={<PopularPage />} />
        <Route path="/movies/upcoming" element={<UpComingPage />} />
        <Route path="/movies/top-rated" element={<TopRatedPage />} />
        <Route path="/movies/now-playing" element={<NowPlayingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
