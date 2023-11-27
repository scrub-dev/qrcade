import {Field, Form, Formik } from 'formik';import { httpWithCreds } from "../../../util/http"

export default () => {

    const createUserForm = (
        <Formik
            initialValues={{
                uname: "",
                pword: "",
                admin: false
            }}

            onSubmit={async (values: Object) => {
                await httpWithCreds().post(`/admin/player/create`, values)
            }}
        >
        {() => (
        <Form>
            <div className='flex items-center justify-center'>
                <div>
                    <label>
                        <p className='text-white'>Username </p>
                        <Field type="text" name="uname" className="m-auto w-full appearance-none border rounded py-2 px-3 bg-gray-700 shadow-xl shadow-purple-500/50 text-white"></Field>
                    </label>
                </div>
            </div>
            <div className='flex items-center justify-center'>
                <div>
                    <label>
                        <p className='text-white'>Password </p>
                        <Field type="text" name="pword" className="m-auto w-full appearance-none border rounded py-2 px-3 bg-gray-700 shadow-xl shadow-purple-500/50 text-white"></Field>
                    </label>
                </div>
            </div>
            <div className='flex items-center justify-center'>
                <div>
                <label>
                        <p className='text-white'>Admin </p>
                        <Field type="checkbox" name="admin"></Field>
                    </label>
                </div>
            </div>
            <div className='flex items-center justify-center'>
                <div>
                    <button type="submit" className="bg-purple-600 text-white py-1 px-4 my-2 rounded focus:outline-none focus:shadow-outline hover:bg-purple-500 font-bold shadow-xl hover:shadow-purple-500/50">Submit</button>
                </div>
            </div>
        </Form>
        )}


        </Formik>

    )



    return (
        createUserForm
    )
}