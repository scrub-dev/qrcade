import useAuthUser from "react-auth-kit/hooks/useAuthUser"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import request from "../../components/util/connection/request"
import BackButton from "../../components/core/BackButton"

export default () => {
    const nav = useNavigate()
    const authedUser = useAuthUser() as any

    const isUserAdmin = async () => {
        let res = (await request.get(`user/${authedUser.UserID}/admin`)).data.data.admin
        if(!res) nav("/")
    }

    useEffect(() => {
        (async () => {
            await isUserAdmin()
        })()
    }, [])


    return (<>
    <div id="layout" className="flex flex-col h-screen text-white">
        <div id="banner" className="flex flex-col items-center justify-center w-screen bg-black py-3">
            <div id="title" className="w-full md:w-max flex items-center justify-center py-2">
                <h1 className="text-5xl drop-shadow-2xl qrc-shadow shadow-main font-graffiti">Users</h1>
            </div>
            <div id="buttonRow1" className="grow flex flex-wrap items-center justify-center md:justify-end py-2 gap-2">
                <BackButton/>
            </div>
        </div>
        <div id="content-wrapper" className="bg-black flex-grow p-10 gap-2 flex flex-col md:px-[10%] lg:px-[20%] xl:px-[25%] items-center justify-center">

        </div>
        <div id="footer" className="text-white bg-black">
            <p>QRCade © {new Date(Date.now()).getFullYear()}</p>
        </div>
    </div>
    </>)
}