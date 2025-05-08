import './App.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom' 
import HomePage from './pages/home'
import MoviePage from './pages/movies'
import Notfound from './pages/not-found'
import RootLayout from './layout/root-layout'
import { useEffect } from 'react'

const router = createBrowserRouter([
  {
    path: '/',
    // element: <HomePage />,
    element: <RootLayout />,
    errorElement: <Notfound />,
    children :[
      {
        //index가 true면 홈 경로를 의미
        index: true,
        element: <HomePage />
      },
      {
        path: 'movies/:movieId',
        element: <MoviePage />
      }
    ]
  },
])

function App() {
  return (
    <RouterProvider router={router} />
  )
}
export default App