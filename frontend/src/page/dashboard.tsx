import useAuthUser from "react-auth-kit/hooks/useAuthUser"
import ViewAdminBtn from "../components/admin/ViewAdminBtn"
import PrintQRCodeBtn from "../components/dashboard/PrintQRCodeBtn"
import Loginout from "../components/login/loginout"
import ViewProfileBtn from "../components/profile/ViewProfileBtn"
import { useEffect, useState } from "react"

export default () => {

    const user = useAuthUser() as any
    // const [user, setUser] = useState() as any
    const [isAdmin, setIsAdmin] = useState(false)

    // const isUserAdmin = async () => (await request.get(`user/${authedUser.UserID}/admin`)).data.data.admin
    // const getUserInformation = async () => (await request.get(`user/${authedUser.UserID}`)).data.data

    useEffect(() => {
        (async () => {
            // setUser(await getUserInformation())
            // setIsAdmin(await isUserAdmin())
            setIsAdmin(user.Admin)
        })()
    }, [])



    // get user information

    // check if lobby is valid
    // check if team is valid


    // display user info
    // display team info
    // link to player score

    // if user is not in lobby
    // prompt to join lobby

    return (<>
    <div id="layout" className="flex flex-col h-screen text-white">
        <div id="banner" className="flex flex-col items-center justify-center w-screen bg-black py-3">
            <div id="title" className="w-full md:w-max flex items-center justify-center py-2">
                <h1 className="text-7xl drop-shadow-2xl qrc-shadow shadow-main font-graffiti">QRCade</h1>
            </div>
            <div id="buttonRow1" className="grow flex flex-wrap items-center justify-center md:justify-end py-2 gap-2">
                <ViewProfileBtn/>
                <PrintQRCodeBtn/>
                <Loginout/>
                {isAdmin ? <ViewAdminBtn/> : ""}
            </div>
            <div id="buttonRow2" className="grow flex items-center justify-center md:justify-end md:pr-5 py-2 gap-2">
                {/* {JSON.stringify(user)} */}
            </div>
        </div>
        <div id="content-wrapper" className="bg-black flex-grow p-10 gap-2 flex flex-col md:px-[10%] lg:px-[20%] xl:px-[25%]">

        </div>
        <div id="footer" className="text-white bg-black">
            <p>QRCade © {new Date(Date.now()).getFullYear()}</p>
        </div>
    </div>



    </>)
}