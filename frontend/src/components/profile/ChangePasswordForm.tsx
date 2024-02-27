import { Field, Form, Formik, FormikValues } from "formik"
import { useState } from "react"
import useAuthUser from "react-auth-kit/hooks/useAuthUser"
import { defaultButtonStyle } from "../core/Button"
import useSignOut from "react-auth-kit/hooks/useSignOut"
import request from "../util/connection/request"
import { useNavigate } from "react-router-dom"

export default () => {
    const nav = useNavigate()
    const signOut = useSignOut()
    const user = useAuthUser() as any

    const [error, setError] = useState("")
    const setErrorBox = (err: string) => {
        setError(err)
    }

    const submitForm = async (values: FormikValues): Promise<void | Promise<any>> => {
        let newPasswd = values.Passwd as string

        if(!newPasswd || newPasswd.length <= 0 ) return setError("Please enter a new password")
        if(newPasswd.length < 3) return setError("Password must be 8 characters long")

        let res = (await request.patch(`user/${user.UserID}/update/password`, {data: {newValue: values.Passwd}}))
        if(res.data.code != "FIELD_UPDATED") return setErrorBox(`An Error occured : ${res.data.message}`)

        signOut()
        nav("/")

    }

    return (
        <div id="ChangePasswdForm">
            <Formik
            initialValues={{
                Passwd: ""
            }}
            onSubmit={submitForm}
            >
                <Form onChange={() => {setErrorBox("")}}>
                <div id='formBox' className='flex flex-col'>
                    <div id='passwdBox' className='flex flex-col items-center justify-center mb-4'>
                    <label htmlFor="Passwd" className='text-white font-bold w-full'>Reset Password</label>
                    <Field id="Passwd" name="Passwd" type="password" placeholder = {"*".repeat(Math.floor(Math.random() * 8) + 5)} className="p-2 rounded shadow-main_light shadow-xl w-full text-black"/>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-2 my-4">
                        <div id='buttonField' className=''>
                            <button type="submit" className={defaultButtonStyle}>Change Password</button>
                        </div>
                    </div>
                </div>
                <div id='errorBox' className='text-failure absolute font-extrabold flex items-center justify-center left-0 right-0 m-auto'>
            <p>{error}</p>
        </div>
                </Form>
            </Formik>
        </div>
    )



}