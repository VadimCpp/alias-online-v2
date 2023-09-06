import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Dictionary from './screens/dictionary'
import About from './screens/about'
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dictionary />,
  },
  {
    path: "/about",
    element: <About />,
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
