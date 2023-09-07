import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Dictionary from './screens/dictionary'
import Home from './screens/home'
import Profile from './screens/profile'
import Room from './screens/room'
import Word from './screens/word'
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/dictionary",
    element: <Dictionary />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/room",
    element: <Room />,
  },
  {
    path: "/word",
    element: <Word />,
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
