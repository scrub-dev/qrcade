import { useNavigate, useParams } from "react-router-dom"
import FlagComponent from "../components/hit/FlagComponent"
import PlayerComponent from "../components/hit/PlayerComponent"
import { useEffect, useState } from "react"
import request from "../components/util/connection/request"
import Button from "../components/core/Button"

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

    const nav = useNavigate()

    const { hitid } = useParams<{hitid: string}>()

    const [hitType, setHitType] = useState("")
    const [componentData, setComponentData] = useState()

    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    const getHitType = () => {
        if(hitid && hitid.includes("-")) return hitid.split("-")[0]
        else return "UNKNOWN"
    }

    const getHitComponent = (hitType: string) => {
        switch(hitType.toUpperCase()){
            case "FLAG": return <FlagComponent data={componentData}/>
            case "USER": return <PlayerComponent data={componentData}/>
            default: return <p>Invalid Hit</p>
        }
    }

    const manageHit = async () => {
        setHitType(getHitType())
        let res = (await request.post(`hit/${hitid}`)).data
        if(res.code == "VALID_HIT") setComponentData(res.data)
        else {
            setError(true)
            setErrorMessage(res.message)
        }
    }

    const parseErrorMessage = (errorMessage: string) => {
        console.log(errorMessage)
        switch(errorMessage){
            case "NOT_FOUND": return <p>The Player or Flag scanned could not be identified.</p>
            case "INVALID_SCAN_TYPE": return <p>Please only scan Players or Flags.</p>
            case "INVALID_LOBBY_DIFFERENT": return <p>You scanned someone in a different lobby.</p>
            case "INVALID_TEAM_SAME": return <p>Friendly Fire will not be tolerated...</p>
            case "INVALID_PLAYER_SAME": return <p>"Shooting yourself might be funny... but you should't do it here."</p>
            case "INVALID_TOO_SOON": return <p>WOAH QUICKDRAW!<br/>You're too fast! Slow down!</p>
            case "INVALID_DUPLICATE": return <p>You've already scanned this flag! <br/> Find another to scan.</p>
            case "INVALID_HIT": return <p>Invalid Hit, something went oops.</p>
            case "INVALID_LOBBY_SCAN_USER": return <p>You can't scan users in this gamemode</p>
            case "INVALID_LOBBY_SCAN_FLAG": return <p>You can't scan flags in this gamemode</p>
            default: return <p>Something went really wrong. :(</p>
        }
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
                    <Button onClick={() => nav("/")} text="Home" />
                    <Button onClick={() => nav("/dashboard")} text="Dashboard" />
                </div>
            </div>
            <div id="content-wrapper" className="bg-black flex-grow px-10 gap-2 flex flex-col md:px-[10%] lg:px-[20%] xl:px-[25%] items-center">
                <div className="">
                    {!error && getHitComponent(hitType)}
                    {error &&
                        <div className="flex flex-col items-center justify-center pt-[20%]">
                            <p className="text-center text-5xl drop-shadow-2xl qrc-shadow shadow-secondary_light font-graffiti pb-10">You're Hit didn't count</p>
                            <div className="text-white text-center font-mono text-2xl">
                                {parseErrorMessage(errorMessage)}
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
        )
}