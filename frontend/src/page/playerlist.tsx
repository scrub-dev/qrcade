import { useParams } from "react-router-dom"
import BackButton from "../components/core/BackButton"
import request from "../components/util/connection/request"
import { useEffect, useState } from "react"
import Button from "../components/core/Button"
import useAuthUser from "react-auth-kit/hooks/useAuthUser"
import PrintQRCodes from "../components/qrcode/printQRCodes"

export default () => {
    const user = useAuthUser() as any
    let { id } = useParams<{id: string}>()

    const [error, setError] = useState("")
    const [playerList, setPlayerList] = useState([])
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        (async () => {
            getPlayers()
            setIsAdmin(user.Admin)
        })()
    }, [])

    const getPlayersFromID = async (id: string) => {
        let idType = id.split('-')[0]
        switch(idType) {
            case "LOBBY":
                return (await getLobbyParticipants(id))
            case "TEAM":
                return (await getTeamParticipants(id))
            default: return "Unknown"
        }
    }

    const getLobbyParticipants = async (lobbyID: string) => {
        let res = (await request.get(`lobby/${lobbyID}/users`)).data
        if(res.code !== "SUCCESS") return setError(res.message)
        return res.data
    }
    const getTeamParticipants = async (teamID: string) => {
        let res = (await request.get(`lobby/team/${teamID}/users`)).data
        if(res.code !== "SUCCESS") return setError(res.message)
        return res.data
    }

    const getPlayers = async () => {
        if(!id) return (<></>)
        let players = await getPlayersFromID(id)
        if(players) setPlayerList(players)
    }

    return (
        <div id="layout" className="flex flex-col h-screen text-white">
            <div id="banner" className="flex flex-col items-center justify-center w-screen bg-black pt-3">
                <div id="title" className="w-full md:w-max flex items-center justify-center py-2">
                    <h1 className="text-7xl drop-shadow-2xl qrc-shadow shadow-main font-graffiti">Players</h1>
                </div>
                <div id="buttonRow1" className="grow flex flex-wrap items-center justify-center md:justify-end py-2 gap-2">
                    <BackButton/>
                </div>
            </div>
            <div id="content-wrapper" className="bg-black flex-grow px-10 gap-2 flex flex-col md:px-[10%] lg:px-[20%] xl:px-[25%] items-center pt-5">
                <div className="h-full w-full flex flex-col p-5">
                    <div className="h-full flex flex-col gap-1">
                        {playerList.length > 0 ? playerList.map((player: any, i: number) => <div key={i} className="rounded p-2 bg-main w-full text-center font-graffiti">{player.DisplayName}</div>): ""}
                        <p>{error}</p>
                    </div>
                    <div className="w-full flex flex-col items-center justify-center gap-2 pb-5">
                        {isAdmin ? <PrintQRCodes IDList={playerList.map((e: any) => e.UserID)}/> : ""}
                        <Button text="Refresh" onClick={() => {}} className="p-1 w-full bg-main rounded font-graffiti text-2xl"/>
                    </div>
                </div>
            </div>
        </div>
        )
}