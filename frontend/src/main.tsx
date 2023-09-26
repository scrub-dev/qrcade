import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import 'dotenv/config'


import './index.css'


import { AuthProvider } from 'react-auth-kit'
import Home from './components/routes/home.tsx'
import Notfound from './components/routes/notfound.tsx'
import Scanner from './components/routes/scanner.tsx'


const router = createBrowserRouter(
    [
      {path: "/", element: <Home/>, errorElement: <Notfound/>},
      {path: "/scanner", element: <Scanner/>}
    ]
  )

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider
      authType='cookie'
      authName='_qrcade'
      cookieDomain={window.location.hostname}
      cookieSecure={false}
    >
      <RouterProvider router={router}/>
    </AuthProvider>
  </React.StrictMode>,
)
