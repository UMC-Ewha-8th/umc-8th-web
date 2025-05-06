import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import MoviePage from './pages/MoviePage';
import NotFoundPage from './pages/NotFoundPage';
import MovieDetailPage from './pages/MovieDetailPage';
import HomeLayout from './layouts/HomeLayout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true, 
        element: <HomePage />
      },
      {
        path:"login",
        element: <LoginPage />,
      },
      {
        path: 'movies/:category',
        element: <MoviePage />,
      },
      {
        path: 'movies/:movieId',
        element: <MovieDetailPage />,
      },
    ],
  },
]);

function App() {
  return (
      <RouterProvider router={router} />
  );
}

export default App;