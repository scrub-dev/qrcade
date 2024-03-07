import { Formik, Form, Field, FormikValues } from 'formik'
import { useEffect, useState } from 'react'
import request from '../../util/connection/request'
import { defaultButtonStyle } from '../../core/Button'


export interface TCreateFlagFormProps {
    lobbyID: string
}
export default (props: TCreateFlagFormProps) => {

    const [success, setSuccess] = useState("")
    const [error, setError] = useState("")

    useEffect(() => {
        (async () => {
        })()
    }, [])

    const clearFeedback = () => {
        setError("")
        setSuccess("")
    }

    const submitForm = async (values: FormikValues): Promise<void | Promise<any>> => {
        console.log(values)
        if(values.flagName == "") return setError("Please enter a flag name")
        if(values.flagInfo == "") return setError("Please enter a flag title")
        if(values.flagDesc == "") return setError("Please enter a flag description")

        values.flagDesc = encodeURIComponent(values.flagDesc)

        if(values.flagName.length > 40) return setError("Flag name is too long")
        if(values.flagInfo.length > 80) return setError("Flag title is too long")
        if(values.flagDesc.length > 1000) return setError("Flag description is too long")

        let res = (await request.patch(`lobby/${props.lobbyID}/add/flag`, {data: values})).data

        if(res.code !== "SUCCESS") return setError(res.message)
        else setSuccess(res.message)
        setTimeout(clearFeedback, 3000)
    }

    return (
    <div id="form" className=''>
        <Formik
            initialValues={{
                flagName: "",
                flagInfo: "",
                flagDesc: ""
            }}
            onSubmit={(values, {resetForm}) => {
                submitForm(values)
                resetForm()
            }}>
            <Form onChange={() => {clearFeedback()}}>
                <div id='formBox' className='flex flex-col py-2'>
                    <div className='flex flex-wrap items-center justify-center gap-2 my-4 w-full'>
                        <div className='flex flex-col w-full'>
                            <label htmlFor="flagName" className="text-white font-bold">Flag Name</label>
                            <Field type="text" name="flagName" placeholder="Flag Name" className="rounded p-2 shadow-lg shadow-main_light  text-black"/>
                        </div>
                        <div className='flex flex-col w-full'>
                            <label htmlFor="flagInfo" className="text-white font-bold">Flag Title</label>
                            <Field type="text" name="flagInfo" placeholder="Flag Title" className="rounded p-2 shadow-lg shadow-main_light  text-black"/>
                        </div>
                        <div className='flex flex-col w-full mb-4'>
                            <label htmlFor="flagDesc" className="text-white font-bold">Flag Description</label>
                            <Field type="text" name="flagDesc" placeholder="Flag Description" className="rounded p-2 shadow-lg shadow-main_light max-h-48 min-h-48 text-black" as="textarea"/>
                        </div>
                    <div id='buttonField' className=''>
                        <button type="submit" className={defaultButtonStyle}>Create Flag</button>
                    </div>
                    </div>
                </div>
            </Form>
        </Formik>
        <div id='errorBox' className='absolute font-extrabold flex items-center justify-center left-0 right-0 m-auto pt-5'>
            <p className='text-failure'>{error}</p>
            <p className='text-success'>{success}</p>
        </div>
    </div>
    )
}