import React from 'react'
import ReactDOM from 'react-dom/client'
import {Route, Routes, BrowserRouter} from 'react-router-dom'

import './index.css'

import { AuthProvider, RequireAuth } from 'react-auth-kit'
import Home from './components/routes/home.tsx'
import Login from './components/routes/login.tsx'
import Hit from './components/routes/Hit.tsx'
import Score from './components/routes/Score.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthProvider
      authType='cookie'
      authName='_qrcade'
      cookieDomain={window.location.hostname}
      cookieSecure={import.meta.env.DEV}
    >
      <Routes>
        <Route path='/' element={
          <RequireAuth loginPath='/login'>
            <Home/>
          </RequireAuth>
        }></Route>

      <Route path='/score' element={
          <RequireAuth loginPath='/login'>
            <Score/>
          </RequireAuth>
        }></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/hit' element={<Hit/>}></Route>
      </Routes>
    </AuthProvider>
    </BrowserRouter>

  </React.StrictMode>,
)
