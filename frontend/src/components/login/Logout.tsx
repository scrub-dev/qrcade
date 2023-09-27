import { useSignOut } from 'react-auth-kit'
import {useNavigate} from 'react-router-dom'



export default () => {
    const signout = useSignOut()
    const navigate = useNavigate()

    const logout = () => {
        signout()
        navigate('/login')
    }
    return <button onClick={logout}>Logout</button>
}