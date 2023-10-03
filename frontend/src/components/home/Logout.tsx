import { useSignOut } from 'react-auth-kit'
import {useNavigate} from 'react-router-dom'



export default () => {
    const signout = useSignOut()
    const navigate = useNavigate()

    const logout = () => {
        signout()
        navigate('/login')
    }
    return <button onClick={logout} className='font-graffiti text-white m-auto text-2xl bg-purple-600 px-8 py-1 my-2 rounded focus:outline-none focus:shadow-outline hover:bg-purple-500 font-bold shadow-xl hover:shadow-purple-500/50'>Logout</button>
}