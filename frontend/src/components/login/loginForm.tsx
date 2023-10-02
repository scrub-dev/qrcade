import { useIsAuthenticated, useSignIn } from 'react-auth-kit'
import { useFormik } from 'formik'
import { useState } from "react";
import { AxiosError } from "axios";
import getUserID from './getUserID';

import {useNavigate} from 'react-router-dom'
import { http } from '../../util/http';

export default () => {

    const nav = useNavigate()
    const isAuth = useIsAuthenticated()
    if(isAuth()) nav("/")

    const [error, setError] = useState("")
    const signIn = useSignIn()

    const onSubmit = async (values: any) => {
        try{

            if(!values.uname || !values.pword) return setError("Dont leave any fields blank")
            else setError("")

            console.log(values)
            try { if(values.register) await http().post("/register", values)}
            catch (err) {return setError("Username Taken")}

            const res = await http().post("/auth", values)
            console.log(res)

            if(res.status != 200 || !res.data.token) return setError("Invalid Credentials or User does not Exist")

            const id = await getUserID(values.uname)

            signIn({
                token: res.data.token,
                expiresIn: 3600000,
                tokenType:"Bearer",
                authState: {uname: values.uname, id: id.data.id}
            })
        } catch(err){
            if(err && err instanceof AxiosError) setError(err.response?.data.message)
            else if(err && err instanceof Error) setError(err.message)
        }

    }
    const formik = useFormik({
        initialValues: {
          uname: "",
          pword: "",
          register: undefined
        },
        onSubmit,
    });

    return (
        <div className='bg-black shadow-md rounded px-8 pt-6 pb-8 mb-4'>
            <form onSubmit={formik.handleSubmit}>
                <div className='mb-4 shadow-purple-500/50'>
                    <label htmlFor="uname" className='font-bold text-white'>Username:</label>
                    <input name='uname' value={formik.values.uname} onChange={formik.handleChange} placeholder='Username' className='appearance-none border rounded w-full py-2 px-3 bg-gray-700 shadow-xl shadow-purple-500/50 text-white'/>
                </div>


                <div className='mb-4'>
                    <label htmlFor='pword' className='font-bold text-white'>Password:</label>
                    <input name='pword' type='password' value={formik.values.pword} onChange={formik.handleChange} placeholder='Password' className='appearance-none border rounded w-full py-2 px-3 bg-gray-700 shadow-xl shadow-purple-500/50 text-white'/>
                </div>


                <div className='flex'>
                    <div className='appearance-none rounded w-full py-2 px-3 mr-5 bg-gray-700 shadow-xl shadow-purple-500/50'>
                        <label htmlFor='register' className='font-bold text-white'> New Account</label>
                        <input type="checkbox" name='register' value={formik.values.register} onChange={formik.handleChange} className='ml-2 leading-tight'/>
                    </div>

                    <button type='submit' className='bg-purple-600 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-purple-500 font-bold shadow-xl hover:shadow-purple-500/50'>Login</button>
                </div>

                <p className='text-red-500 font-bold italic appearance-none rounded w-full pt-3 drop-shadow'>{error}</p>


            </form>
        </div>
    )
}