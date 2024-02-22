import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AuthProvider from 'react-auth-kit/AuthProvider'
import createStore from 'react-auth-kit/createStore'
import Root from './page/root.tsx'
import RequireAuth from '@auth-kit/react-router/RequireAuth'
import Dashboard from './page/dashboard.tsx'
import Login from './page/login.tsx'
import Lobby from './page/lobby.tsx'
import config from './components/util/connection/config.ts'


const authStore = createStore({
  authName: '_qrc',
  authType: 'cookie',
  cookieDomain: window.location.hostname,
  cookieSecure: config.PROD
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <AuthProvider store={authStore}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Root/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/lobby' element={
              <RequireAuth fallbackPath={'/'}>
                <Lobby/>
              </RequireAuth>}>
            </Route>
            <Route path='/dashboard' element={
              <RequireAuth fallbackPath={'/'}>
                <Dashboard/>
              </RequireAuth>}>
            </Route>
            // Scoreboard
            // Score
            // Hit
          </Routes>
        </BrowserRouter>
      </AuthProvider>
  </React.StrictMode>,
)
