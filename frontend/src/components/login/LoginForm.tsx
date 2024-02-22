import { Formik, Form, Field, FormikValues, useFormikContext } from 'formik';
import { defaultButtonStyle } from '../core/Button';
import { useEffect, useState } from 'react';
import BackButton from '../core/BackButton';



export default () => {

    const [error, setError] = useState("")

    const setErrorBox = (err: string) => {
        setError(err)
    }
    const submitForm = (values: FormikValues): void | Promise<any> => {
        if(!values.uname || values.uname.length == 0) return setErrorBox("Please enter a username")
        if(!values.pword || values.pword.length == 0) return setErrorBox("Please enter a password")


        if(values.register) {
            // New User
        }

        // Returning User


    }






    return (
    <div id="form" className=''>
        <Formik
            initialValues={{
                uname: "",
                pword: "",
                register: false
            }}
            onSubmit={submitForm}>
            <Form onChange={() => {setErrorBox("")}}>
                <div id='formBox' className='flex flex-col py-2'>
                    <div id='unameBox' className='flex flex-col items-center justify-center mb-4'>
                        <label htmlFor="uname" className='text-white font-bold w-full'>Username</label>
                        <Field id="username" name="uname" placeholder="Username" className="p-2 rounded shadow-main_light shadow-xl w-full"/>
                    </div>
                    <div id='pwordBox' className='flex flex-col items-center justify-center mb-4'>
                        <label htmlFor="pword" className='text-white font-bold w-full'>Password</label>
                        <Field id="Password" name="pword" placeholder="Password" type="password" className="p-2 shadow-main_light shadow-xl rounded w-full"/>
                    </div>
                    <div className='flex flex-wrap items-center justify-center gap-2 my-2'>
                    <div id='regBox' className='flex items-center justify-center bg-main_dark rounded p-2'>
                        <label htmlFor="register" className='text-white font-bold w-full pr-2'>New Account?</label>
                        <Field id="register" name="register" type="checkbox" className=""/>
                    </div>
                    <div id='buttonField' className=''>
                        <button type="submit" className={defaultButtonStyle}>Submit</button>
                    </div>
                    </div>

                </div>
            </Form>
        </Formik>
        <div className="flex items-center justify-center">
            <BackButton/>
        </div>
        <div id='errorBox' className='text-failure font-extrabold absolute'>
            {error}
        </div>
    </div>
    )
}