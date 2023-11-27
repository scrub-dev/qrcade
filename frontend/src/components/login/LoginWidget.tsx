import {useIsAuthenticated} from 'react-auth-kit'
import LoginForm from './LoginForm'
import {useNavigate} from 'react-router-dom'

export default () => {
    const isAuth = useIsAuthenticated()
    const nav = useNavigate()

    if(isAuth()) nav("/")
    else return (
    <div className='bg-black w-full md:w-1/3 m-auto'>
        <LoginForm/>
    </div>
    )
}