import { useParams } from "react-router-dom"
import FlagComponent from "../components/hit/FlagComponent"
import PlayerComponent from "../components/hit/PlayerComponent"
import { useEffect, useState } from "react"
import request from "../components/util/connection/request"

export default () => {

    // POSSIBLE RESPONSES
    /**
     * NOT_FOUND (User not found or Lobby not found or user not in a lobby and tried to scan)
     * INVALID_SCAN_TYPE (User has scanned unknown type)
     * INVALID_LOBBY_DIFFERENT (User is in a different lobby)
     * INVALID_TEAM_SAME (User has scanned a teammate)
     * INVALID_PLAYER_SAME (User has scanned themselves)
     * INVALID_TOO_SOON (User has scanned too soon)
     * INVALID_DUPLICATE (Flag already scanned by user in lobby)
     * INVALID_HIT
     * VALID_HIT
     */

    const { hitid } = useParams<{hitid: string}>()

    const [hitType, setHitType] = useState("")
    const [componentData, setComponentData] = useState({} as any)

    const getHitType = () => {
        if(hitid && hitid.includes("-")) return hitid.split("-")[0]
        else return "UNKNOWN"
    }

    const getHitComponent = (hitType: string) => {
        switch(hitType.toUpperCase()){
            case "FLAG": return <FlagComponent/>
            case "USER": return <PlayerComponent/>
            default: return <p>Invalid</p>
        }
    }

    const manageHit = async () => {
        setHitType(getHitType())

        let res = (await request.post(`hit/${hitid}`)).data
        console.log(res)
    }

    useEffect(() => {
        (async () => {
            manageHit()
        })()
    }, [])

    return (
        <div id="layout" className="flex flex-col h-screen text-white">
            <div id="banner" className="flex flex-col items-center justify-center w-screen bg-black pt-3">
                <div id="title" className="w-full md:w-max flex items-center justify-center py-2">
                    <h1 className="text-7xl drop-shadow-2xl qrc-shadow shadow-main font-graffiti">QRCade</h1>
                </div>
                <div id="buttonRow1" className="grow flex flex-wrap items-center justify-center md:justify-end py-2 gap-2">
                </div>
            </div>
            <div id="content-wrapper" className="bg-black flex-grow px-10 gap-2 flex flex-col md:px-[10%] lg:px-[20%] xl:px-[25%]">
                <div className="flex flex-col items-center justify-center">
                    {getHitComponent(hitType)}
                </div>
            </div>
        </div>
        )
}