import useAuthUser from "react-auth-kit/hooks/useAuthUser"
import ViewAdminBtn from "../components/admin/ViewAdminBtn"
import Loginout from "../components/login/loginout"
import ViewProfileBtn from "../components/profile/ViewProfileBtn"
import { useEffect, useState } from "react"
import PrintQRCode from "../components/qrcode/printQRCode"
import request from "../components/util/connection/request"
import { useNavigate } from "react-router-dom"
import UserInformation from "../components/dashboard/UserInformation"
import LobbyInformation from "../components/dashboard/LobbyInformation"
import TeamInformation from "../components/dashboard/TeamInformation"

export default () => {
    const nav = useNavigate()
    const user = useAuthUser() as any
    const [userInfo, setUserInfo] = useState<any>([])
    const [isAdmin, setIsAdmin] = useState(false)

    const [showTeam, setShowTeam] = useState(false)

    const [_refresh, refreshDashboard] = useState(false)

    const rerenderCallback = () => refreshDashboard(!_refresh)
    const getUserInformation = async () => (await request.get(`user/${user.UserID}`))

    useEffect(() => {
        (async () => {
            let _userInfo = (await getUserInformation()).data

            if(_userInfo.code != "SUCCESS") return nav("/")

            setUserInfo(_userInfo.data)
            setIsAdmin(user.Admin)

            // does user have lobby
            // get lobby information

            // does lobby require teams
            // get team information
            // show teams

        })()
    }, [_refresh])

    // get user information

    // check if lobby is valid
    // check if team is valid


    // display user info
    // display team info
    // link to player score

    // if user is not in lobby
    // prompt to join lobby

    return (
    <div id="layout" className="flex flex-col h-screen text-white">
        <div id="banner" className="flex flex-col items-center justify-center w-screen bg-black py-3">
            <div id="title" className="w-full md:w-max flex items-center justify-center py-2">
                <h1 className="text-7xl drop-shadow-2xl qrc-shadow shadow-main font-graffiti">QRCade</h1>
            </div>
            <div id="buttonRow1" className="grow flex flex-wrap items-center justify-center md:justify-end py-2 gap-2">
                <ViewProfileBtn/>
                <PrintQRCode ID={user.UserID}/>
                <Loginout/>
                {isAdmin ? <ViewAdminBtn/> : ""}
            </div>
        </div>
        <div id="content-wrapper" className="bg-black flex-grow p-10 gap-2 flex flex-col md:px-[10%] lg:px-[20%] xl:px-[25%]">
            <UserInformation DisplayName={userInfo.DisplayName}/>
            <LobbyInformation LobbyID={userInfo.LobbyID} ParentCallback = {rerenderCallback}/>
            {showTeam ? <TeamInformation/> : ""}
        </div>
        <div id="footer" className="text-white bg-black">
            <p>QRCade © {new Date(Date.now()).getFullYear()}</p>
        </div>
    </div>
    )
}