import { useNavigate, useParams } from "react-router-dom"
import BackButton from "../../components/core/BackButton"
import CreateTeamForm from "../../components/admin/team/createTeamForm"
import { useEffect } from "react"

export default ( ) => {

    const nav = useNavigate()

    const {lobbyid} = useParams<{lobbyid: string}>()

    return (
        <>
            <div id="layout" className="flex flex-col h-screen text-white">
                <div id="banner" className="flex flex-col items-center justify-center w-screen bg-black py-3">
                    <div id="title" className="w-full md:w-max flex items-center justify-center py-2">
                        <h1 className="text-5xl drop-shadow-2xl qrc-shadow shadow-main font-graffiti">Create Team</h1>
                    </div>
                    <div id="buttonRow1" className="grow flex flex-wrap items-center justify-center md:justify-end py-2 gap-2">
                        <BackButton/>
                    </div>
                </div>
                <div id="content-wrapper" className="bg-black flex-grow gap-2 flex flex-col md:px-[10%] lg:px-[20%] xl:px-[25%] items-center">
                    <CreateTeamForm LobbyID={lobbyid as string}/>
                </div>
                <div id="footer" className="text-white bg-black">
                    <p>QRCade © {new Date(Date.now()).getFullYear()}</p>
                </div>
            </div>
        </>)
}