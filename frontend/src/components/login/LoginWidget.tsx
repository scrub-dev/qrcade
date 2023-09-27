import {useIsAuthenticated} from 'react-auth-kit'
import LoginForm from './LoginForm'
import {useNavigate} from 'react-router-dom'

export default () => {
    const isAuth = useIsAuthenticated()
    const nav = useNavigate()

    if(isAuth()) nav("/")
    else return <LoginForm/>
}