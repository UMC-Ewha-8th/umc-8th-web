
import './App.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import PopularMoviePage from './pages/PopularMoviePage'
import RootLayout from './layout/root-layout'
import MovieDetailPage from './pages/MovieDetailPage'

const router = createBrowserRouter([ 
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <h1>Page not found</h1>,
    children: [
      {
        path: '/Movies/:category',
        element: <PopularMoviePage />,
      },
      
      
    ]
  },

    {
      path: '/Movies/:category/:movieId',
            element: <MovieDetailPage />,
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
