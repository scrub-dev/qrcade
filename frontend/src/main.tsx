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
import FlagCreate from './page/AdminSubPages/FlagCreate.tsx'
import FlagList from './page/AdminSubPages/FlagList.tsx'
import TeamCreate from './page/AdminSubPages/TeamCreate.tsx'
import TeamList from './page/AdminSubPages/TeamList.tsx'
import PlayerList from './page/playerlist.tsx'
import ScoreboardLobbySelect from './page/Scoreboard/ScoreboardLobbySelect.tsx'
import Scoreboard from './page/Scoreboard/Scoreboard.tsx'
import Hit from './page/hit.tsx'

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

            <Route path='/admin/flag/add/:lobbyid' element={
              <RequireAuth fallbackPath={'/'}>
                <FlagCreate/>
              </RequireAuth>}>
            </Route>
            <Route path='/admin/flag/list/:lobbyid' element={
              <RequireAuth fallbackPath={'/'}>
                <FlagList/>
              </RequireAuth>}>
            </Route>

            <Route path='/admin/team/add/:lobbyid' element={
              <RequireAuth fallbackPath={'/'}>
                <TeamCreate/>
              </RequireAuth>}>
            </Route>
            <Route path='/admin/team/list/:lobbyid' element={
              <RequireAuth fallbackPath={'/'}>
                <TeamList/>
              </RequireAuth>}>
            </Route>

            <Route path='/list/:id' element={
              <RequireAuth fallbackPath={'/'}>
                <PlayerList/>
              </RequireAuth>}>
            </Route>


            <Route path='/scoreboard/' element={
                <ScoreboardLobbySelect/>
            }>
            </Route>
            <Route path='/scoreboard/:id' element={
                <Scoreboard/>
            }>
            </Route>


            <Route path='/hit/:hitid' element={
              <RequireAuth fallbackPath={'/'}>
                <Hit/>
              </RequireAuth>}>
            </Route>

            // Player Score
            // Hit
          </Routes>
        </BrowserRouter>
      </AuthProvider>
  // </React.StrictMode>,
)
