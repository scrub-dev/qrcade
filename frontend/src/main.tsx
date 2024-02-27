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
import Profile from './page/profile.tsx'
import Admin from './page/admin.tsx'
import UserCreate from './page/AdminSubPages/UserCreate.tsx'
import UserList from './page/AdminSubPages/UserList.tsx'
import LobbyCreate from './page/AdminSubPages/LobbyCreate.tsx'
import LobbyList from './page/AdminSubPages/LobbyList.tsx'


const authStore = createStore({
  authName: '_qrc',
  authType: 'cookie',
  cookieDomain: window.location.hostname,
  cookieSecure: config.PROD
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
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

            <Route path='/profile' element={
              <RequireAuth fallbackPath={'/'}>
                <Profile/>
              </RequireAuth>}>
            </Route>

            <Route path='/admin' element={
              <RequireAuth fallbackPath={'/'}>
                <Admin/>
              </RequireAuth>}>
            </Route>
            <Route path='/admin/user/create' element={
              <RequireAuth fallbackPath={'/'}>
                <UserCreate/>
              </RequireAuth>}>
            </Route>
            <Route path='/admin/user/list' element={
              <RequireAuth fallbackPath={'/'}>
                <UserList/>
              </RequireAuth>}>
            </Route>
            <Route path='/admin/lobby/create' element={
              <RequireAuth fallbackPath={'/'}>
                <LobbyCreate/>
              </RequireAuth>}>
            </Route>
            <Route path='/admin/lobby/list' element={
              <RequireAuth fallbackPath={'/'}>
                <LobbyList/>
              </RequireAuth>}>
            </Route>

            // Scoreboard
            // Score
            // Hit
          </Routes>
        </BrowserRouter>
      </AuthProvider>
  // </React.StrictMode>,
)
