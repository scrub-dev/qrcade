import { useState, useEffect } from "react"
import { httpWithCreds } from "../../util/http"

export default () => {

    const [isTeamGame, setIsTeamGame] = useState(false)

    const [youHit, setYouHit] = useState(0)
    const [hitYou, setHitYou] = useState(0)

    const [blueHit, setBlueHit] = useState(0)
    const [redHit, setRedHit] = useState(0)

    const checkIfTeamGame = async () => {
        const validGamemodes = [{val: "FFA", isTeamGame: false},{val: "TDM", isTeamGame: true}]
        let res = await httpWithCreds().get(`/admin/getoption?option=GAMEMODE`)
        setIsTeamGame(validGamemodes.filter(e => e.val == res.data.message)[0].isTeamGame || false)
    }

    const getPlayerScore = async () => {
        let res = await httpWithCreds().get("/getplayerscore")
        let scores = res.data.results
        setYouHit(scores.youHit)
        setHitYou(scores.hitYou)
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
        getPlayerScore()
        getTeamScore()
    }

    useEffect(() => {
        (async () => {
            getPlayerScore()
            getTeamScore()
        })()
    })

    const playerScore = (
        <>
            <p>You Hit: {youHit}</p>
            <p>Hit you: {hitYou}</p>
        </>
    )
    const teamScore = (
        <>
            <p>Red: {redHit}</p>
            <p>Blue: {blueHit}</p>
        </>
    )


    return (
        <>
            {playerScore}
            {isTeamGame ? teamScore : null}
            <button onClick={refresh}>Refresh</button>
        </>

    )
}