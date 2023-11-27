import { useState, useEffect } from "react"
import { http, httpWithCreds } from "../../util/http"
import { useNavigate } from 'react-router-dom'

export default () => {

    const [isTeamGame, setIsTeamGame] = useState(false)

    const [blueHit, setBlueHit] = useState(0)
    const [redHit, setRedHit] = useState(0)

    const [players, setPlayers] = useState<any[]>([])
    const [playerScores, setPlayerScores] = useState<any[]>([])

    const getPlayers = async () => {
        let res = await httpWithCreds().get(`/admin/players`)
        setPlayers(res.data.data)
    }

    const getPlayerScore = async (playerID: number) => {
        let res = (await http().get(`/getplayerscore?userid=${playerID}`))
        return res.data.results.youHit
        // setPlayerScores(res.data)
    }
    const getPlayerScores = async () => {
        let res = players.map(async p => p["score"] = await getPlayerScore(p.id))
        console.log(res)
        setPlayerScores(res)
    }

    const checkIfTeamGame = async () => {
        const validGamemodes = [{val: "FFA", isTeamGame: false},{val: "TDM", isTeamGame: true}]
        let res = await httpWithCreds().get(`/admin/getoption?option=GAMEMODE`)
        setIsTeamGame(validGamemodes.filter(e => e.val == res.data.message)[0].isTeamGame || false)
    }

    const getTeamScore = async () => {
        checkIfTeamGame().then(async () => {
            if(isTeamGame){
                let res = await httpWithCreds().get("/getteamscore")
                let scores = res.data.results
                setRedHit(scores.red)
                setBlueHit(scores.blue)
            }
        })
    }

    const refresh = async () => {
        getPlayers()
        getPlayerScores()
        getTeamScore()
    }

    useEffect(() => {
        (async () => {
            getTeamScore()
            setInterval(refresh, 15 * 1000)
        })()
    })

    const nav = useNavigate()
    const goBack = () => {
        nav("/")
    }

    const playerList = (
        <div className="text-white">
            {players.map(p => JSON.stringify(p))}
        </div>
    )


    const teamScore = (
        <>
            <div className="flex h-full z-10 mt-5">
                <div className="w-1/2 bg-[#ff0000]">
                    <p className="text-white text-center font-graffiti text-5xl mt-5">Red</p>
                    <div className="flex h-full w-full">
                        <p className="text-white text-center font-graffiti text-9xl m-auto">{redHit}</p>
                    </div>
                </div>
                <div className="w-1/2 bg-[#0000ff]">
                    <p className="text-white text-center font-graffiti text-5xl mt-5">Blue</p>
                    <div className="flex h-full w-full">
                        <p className="text-white text-center font-graffiti text-9xl m-auto"> {blueHit}</p>
                    </div>
                </div>
            </div>
        </>
    )

    return (
        <>
        <div className="h-screen w-full">
            <div className="h-4/5 flex-wrap">
                <div className="w-full h-1/2">
                {playerList}
                </div>
                <div className="w-full h-1/2">
                {isTeamGame ? teamScore : null}
                </div>
            </div>
            <div className="w-full flex justify-center mb-auto mt-10">
                <button onClick={refresh} className="bg-purple-600 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-purple-500 font-bold shadow-xl hover:shadow-purple-500/50 mr-1 ">Refresh</button>
                <button onClick={goBack} className="bg-purple-600 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-purple-500 font-bold shadow-xl hover:shadow-purple-500/50 ml-1">Go Back</button>
            </div>
        </div>
        </>
    )
}