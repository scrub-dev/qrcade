import { Field, Form, Formik, FormikValues } from "formik"
import { useEffect, useState } from "react"
import useAuthUser from "react-auth-kit/hooks/useAuthUser"
import useSignIn from "react-auth-kit/hooks/useSignIn"
import { defaultButtonStyle } from "../core/Button"
import useSignOut from "react-auth-kit/hooks/useSignOut"
import request from "../util/connection/request"
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom"

export default () => {
    const nav = useNavigate()
    // const signIn = useSignIn()
    const signOut = useSignOut()
    // const [cookies, setCookie] = useCookies();

    let user = useAuthUser() as any

    // let [user, setUser] = useState({DisplayName: "", UserID: "", Username: "" })

    // useEffect(() => {
    //     (async () => {
    //         const result = (await request.get(`user/${authedUser.UserID}`)).data.data
    //         setUser({DisplayName: result.DisplayName, UserID: result.UserID, Username: result.Username})
    //         console.log(result)
    //     })()
    // }, [])

    const [error, setError] = useState("")
    const setErrorBox = (err: string) => {
        setError(err)
    }

    // const updateCookie = (key: string, newValue: any) => {
    //     const currentCookie = cookies["_qrc_state"]
    //     setCookie("_qrc_state", {...currentCookie, [key]: newValue})
    // }

    const submitForm = async (values: FormikValues): Promise<void | Promise<any>> => {

        if(values.DisplayName == user.DisplayName){
            return setErrorBox("Nothing changed...")
        }
        let res = (await request.patch(`user/${user.UserID}/update/displayname`, {data: {newValue: values.DisplayName}}))

        if(res.data.code != "FIELD_UPDATED") return setErrorBox(`An Error occured : ${res.data.message}`)

        let newDisplayName = (await request.get(`user/${user.UserID}/displayname`))
        if(newDisplayName.data.code != "SUCCESS") return setErrorBox(`An Error occured : ${res.data.message}`)

        // setUser({...user, DisplayName: newDisplayName.data.data.DisplayName})

        // updateCookie("DisplayName", newDisplayName.data.data.DisplayName)
        signOut()
        // signIn({
        //     auth: {
        //         token: cookies["_qrc"],
        //         type: "Bearer",
        //     },
        //     userState: {...cookies["_qrc_state"]}
        // })
        nav("/")
    }

    return (
        <div id="UserInfoForm">
            <Formik
            initialValues={{
                UserID: user.UserID,
                Username: user.Username,
                DisplayName: user.DisplayName,
            }}
            onSubmit={submitForm}
            >
                <Form onChange={() => {setErrorBox("")}}>
                <div id='formBox' className='flex flex-col'>
                    <div id='idBox' className='flex flex-col items-center justify-center mb-4'>
                    <label htmlFor="UserID" className='text-white font-bold w-full'>User ID</label>
                    <Field id="UserID" name="UserID" disabled className="p-2 rounded shadow-main_light shadow-xl w-full" values=""/>
                    </div>

                    <div id='unameBox' className='flex flex-col items-center justify-center mb-4'>
                    <label htmlFor="Username" className='text-white font-bold w-full'>Username</label>
                    <Field id="Username" name="Username" disabled className="p-2 rounded shadow-main_light shadow-xl w-full"/>
                    </div>

                    <div id='nameBox' className='flex flex-col items-center justify-center mb-4'>
                    <label htmlFor="DisplayName" className='text-white font-bold w-full'>Display Name</label>
                    <Field id="DisplayName" name="DisplayName" className="p-2 rounded shadow-main_light shadow-xl w-full text-black"/>
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-2 my-2">
                        <div id='buttonField' className=''>
                            <button type="submit" className={defaultButtonStyle}>Update</button>
                        </div>
                        <div>
                            <button type="reset" className={defaultButtonStyle}>Reset</button>
                        </div>
                    </div>
                </div>
                <div id='errorBox' className='absolute font-extrabold flex items-center justify-center left-0 right-0 m-auto'>
                    <p className="text-failure ">{error}</p>
                </div>
                </Form>
            </Formik>
        </div>
    )



}