import { Formik, Form, Field, FormikValues } from 'formik'
import { useState } from 'react'
import request from '../../util/connection/request'
import { defaultButtonStyle } from '../../core/Button'



export default () => {


    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    const setErrorBox = (err: string) => {
        setError(err)
    }

    const setSuccessBox = (str: string) => {
        setSuccess(str)
    }


    const clearFeedback = () => {
        setErrorBox("")
        setSuccessBox("")
    }

    const submitForm = async (values: FormikValues): Promise<void | Promise<any>> => {
        clearFeedback()

        if(!values.uname || values.uname.length == 0) return setErrorBox("Please enter a username!")
        if(!values.pword || values.pword.length == 0) values.pword = values.uname


        let result = (await request.post("auth/register", { data: values }))
        switch(result.data.code){
            default:
                return setErrorBox(result.data.code)
            case "REGISTER_UNAME_DUPLICATE":
                return setErrorBox("Username already exists!")
            case "REGISTER_SUCCESS":
                return setSuccessBox("User Created")
        }
    }

    return (
    <div id="form" className=''>
        <Formik
            initialValues={{
                uname: "",
                pword: ""
            }}
            onSubmit={(values, {resetForm}) => {
                submitForm(values)
                resetForm()
            }}>
            <Form onChange={() => {clearFeedback()}}>
                <div id='formBox' className='flex flex-col py-2'>
                    <div id='unameBox' className='flex flex-col items-center justify-center mb-2'>
                        <label htmlFor="uname" className='text-white font-bold w-full'>Username</label>
                        <Field id="username" name="uname" placeholder="Username" className="p-2 rounded shadow-main_light shadow-xl w-full text-black"/>
                    </div>
                    <div id='pwordBox' className='flex flex-col items-center justify-center mb-2'>
                        <label htmlFor="pword" className='font-bold w-full'>Password</label>
                        <Field id="Password" name="pword" placeholder="Password" className="p-2 shadow-main_light shadow-xl rounded w-full text-black"/>
                    </div>
                    <div className='flex flex-wrap items-center justify-center gap-2 my-4'>
                    <div id='buttonField' className=''>
                        <button type="submit" className={defaultButtonStyle}>Create User</button>
                    </div>
                    </div>

                </div>
            </Form>
        </Formik>
        <div id='errorBox' className='absolute font-extrabold flex items-center justify-center left-0 right-0 m-auto pt-5'>
            <p className='text-failure '>{error}</p>
            <p className='text-success'>{success}</p>
        </div>
    </div>
    )
}