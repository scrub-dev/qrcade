import { useSignIn } from 'react-auth-kit'
import { useFormik } from 'formik'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";

export default (props: any) => {

    const serverLoc: string = (process.env.BACKEND_LOCATION || "::1:3000") + process.env.LOGIN_ENDPOINT


    const [error, setError] = useState("")
    const signIn = useSignIn()

    const onSubmit = async (values: any) => {
        try{
            const res = await axios.post(serverLoc, values)

            signIn({
                token: res.data.token,
                expiresIn: 3600000,
                tokenType:"Bearer",
                authState: {email: values.email}
            })

        } catch(err){
            if(err && err instanceof AxiosError) setError(err.response?.data.message)
            else if(err && err instanceof Error) setError(err.message)
        }

    }
}