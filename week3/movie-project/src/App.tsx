
import './App.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import PopularMoviePage from './pages/PopularMoviePage'
import Home from './pages/Home'
import RootLayout from './layout/root-layout'
import NowPlayingMoviePage from './pages/NowPlayingMoviePage'
import TopRatedMoviePage from './pages/TopRatedMoviePage'
import UpcomingMoviePage from './pages/UpcomingMoviePage'

const router = createBrowserRouter([ 
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <h1>Page not found</h1>,
    children: [
      {
        path: '/Popular',
        element: <PopularMoviePage />
      },
      {
        path: '/nowplaying',
        element: <NowPlayingMoviePage />
      },
      {
        path: '/top-rated',
        element: <TopRatedMoviePage/>
      },
      {
        path: '/upcoming',
        element: <UpcomingMoviePage />
      },
    ]
  }
  
])

function App() {

  return (
    <>
      <RouterProvider router = {router} />
    </>
  )
}

export default App
