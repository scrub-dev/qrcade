import { useState, useEffect, useRef } from "react"
import { useParams } from "react-router-dom"
import request from "../../components/util/connection/request"
import SHOOTER_FFAScoreboard from "../../components/score/scoreboards/SHOOTER_FFAScoreboard"
import SHOOTER_TDMScoreboard from "../../components/score/scoreboards/SHOOTER_TDMScoreboard"
import LOOTER_FFAScoreboard from "../../components/score/scoreboards/LOOTER_FFAScoreboard"
import BackButton from "../../components/core/BackButton"
import Button from "../../components/core/Button"

export default () => {
    let { id } = useParams<{id: string}>()

    const [error, setError] = useState(false)
    const [data, setData] = useState<any>({})
    const [_refreshVal, _refresh] = useState(false)



    // Auto Refresh
    const [btnColour, setBtnColour] = useState("RED")
    const [btnText, setBtnText] = useState("Auto-Off")
    const [isRunning, setIsRunning] = useState(false)
    const interval = 5 * 1000
    const intervalRef = useRef(0)

    const startAutoRefresh = () => {
        setIsRunning(true)
        if(intervalRef.current !== null) clearInterval(intervalRef.current)

        intervalRef.current = setInterval(getScores, interval)
    }
    const stopAutoRefresh = () => {
        setIsRunning(false)
        clearInterval(intervalRef.current)
    }

    const toggleAutoRefresh = () => {
        if(isRunning) {
            setBtnColour("RED")
            setBtnText("Auto-Off")
            stopAutoRefresh()
        }
        else {
            setBtnColour("GREEN")
            setBtnText("Auto-On")
            startAutoRefresh()
        }
    }



    const refreshPage = () => {
        _refresh(!_refreshVal)
    }

    const getScores = async () => {

        if(id?.split("-")[0].toUpperCase() !== "LOBBY") return setError(true)

        const res = (await request.get(`score/${id}`)).data
        setData(res.data)
    }


    const showComponent = () => {
        if(error) return <div>Error</div>
        switch(data.LobbyType){
            case "SHOOTER_FFA": return <SHOOTER_FFAScoreboard data={data} parentCallback={refreshPage}/>
            case "SHOOTER_TDM": return <SHOOTER_TDMScoreboard data={data} parentCallback={refreshPage}/>
            case "LOOTER_FFA": return  <LOOTER_FFAScoreboard data={data} parentCallback={refreshPage}/>
            default: return <div>Invalid Lobby Type</div>
        }
    }

    useEffect(() => {
        (async () => {
            await getScores()
        })()
    }, [_refresh])

    return (<>
        <div id="layout" className="flex flex-col h-screen text-white">
            <div id="banner" className="flex flex-col items-center justify-center w-screen bg-black py-3">
                <div id="title" className="w-full md:w-max flex items-center justify-center py-2">
                    <h1 className="text-7xl drop-shadow-2xl qrc-shadow shadow-main font-graffiti">QRCade</h1>
                </div>
                <div id="buttonRow1" className="grow flex flex-wrap items-center justify-center md:justify-end py-2 gap-2">
                    <BackButton/>
                </div>
            </div>
            <div id="content-wrapper" className="bg-black flex-grow pt-0 p-5 gap-2 flex flex-col md:px-[10%] lg:px-[20%] xl:px-[25%] items-center">
                <div className="flex-grow">
                    {showComponent()}
                </div>
                <div className="flex flex-row gap-2">
                    <Button text={"Refresh"} onClick={getScores}/>
                    <button onClick={toggleAutoRefresh} className="p-2 rounded font-graffiti" style={{backgroundColor: btnColour}}>{btnText}</button>
                </div>
            </div>
            <div id="footer" className="text-white bg-black">
                <p>QRCade © {new Date(Date.now()).getFullYear()}</p>
            </div>
        </div>
        </>)
}