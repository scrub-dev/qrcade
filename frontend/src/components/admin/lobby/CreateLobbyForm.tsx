import { Formik, Form, Field, FormikValues } from 'formik'
import { useEffect, useState } from 'react'
import request from '../../util/connection/request'
import { defaultButtonStyle } from '../../core/Button'



export default () => {


    const [success, setSuccess] = useState("")
    const [error, setError] = useState("")
    const [lobbyTypes, setLobbyTypes] = useState<any>([])



    useEffect(() => {
        (async () => {
            getLobbyTypes()
        })()
    }, [])


    const getLobbyTypes = async () => {
        let res = (await request.get("lobby/types")).data.data
        setLobbyTypes(res)
    }



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
        if(!values.LobbyName || values.LobbyName.length <= 0) return setErrorBox("Please enter a lobby name")
        if(!values.LobbyType || values.LobbyType.length <= 0) return setErrorBox("Please select a lobby type")

        if(!lobbyTypes.map((e: { name: string }) => e.name).includes(values.LobbyType)) return setErrorBox("Invalid Lobby Type")

        let result = (await request.post("lobby/create", {data: values})).data

        if(result.code != "SUCCESS") setErrorBox("An Error occured: " + `${result.code} | ${result.message}`)
        else setSuccessBox("Lobby Created")

        setTimeout(clearFeedback, 3000);
    }


    return (
    <div id="form" className=''>
        <Formik
            initialValues={{
                LobbyName: "",
                LobbyType: ""
            }}
            onSubmit={(values, {resetForm}) => {
                submitForm(values)
                resetForm()
            }}>
            <Form onChange={() => {clearFeedback()}}>
                <div id='formBox' className='flex flex-col py-2'>
                    <div id='LobbyName' className='flex flex-col items-center justify-center mb-2'>
                        <label htmlFor="LobbyName" className='text-white font-bold w-full'>Lobby Name</label>
                        <Field id="LobbyName" name="LobbyName" placeholder="Lobby Name" className="p-2 rounded shadow-main_light shadow-xl w-full text-black"/>
                    </div>
                    <div id='LobbyType' className='flex flex-col items-center justify-center mb-2'>
                        <label htmlFor="LobbyType" className='font-bold w-full'>Lobby Type</label>
                        <Field id="LobbyType" name="LobbyType" component="select" className="w-full rounded p-2 text-black shadow-xl shadow-main_light">
                            <option value="">Pick a Gamemode</option>
                            {lobbyTypes.map((type: any, idx: number) => <option key={type.name + ("" + idx)} value={type.name}>{type.readableName}</option>)}
                        </Field>
                    </div>
                    <div className='flex flex-wrap items-center justify-center gap-2 my-4'>
                    <div id='buttonField' className=''>
                        <button type="submit" className={defaultButtonStyle}>Create Lobby</button>
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