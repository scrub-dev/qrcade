import { useIsAuthenticated, useSignIn } from 'react-auth-kit'
import { useFormik } from 'formik'
import { useState } from "react";
import axios, { AxiosError } from "axios";
import getUserID from './getUserID';

import {useNavigate} from 'react-router-dom'

export default (props: any) => {

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
            try { if(values.register) await axios.post("http://localhost:3000/register", values)}
            catch (err) {return setError("Username Taken")}

            const res = await axios.post("http://localhost:3000/auth", values)
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
        <div>
            <form onSubmit={formik.handleSubmit}>
                <input name='uname' value={formik.values.uname} onChange={formik.handleChange} placeholder='username'/>
                <input name='pword' value={formik.values.pword} onChange={formik.handleChange} placeholder='password'/>
                <label>Register<input type="checkbox" name='register' value={formik.values.register} onChange={formik.handleChange}/></label>
                <p>{error}</p>
                <button type='submit'>Login</button>
            </form>
        </div>
    )
}