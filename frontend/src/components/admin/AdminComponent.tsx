import { useEffect, useState } from "react"
import { httpWithCreds } from "../../util/http"
import Gamemode from "./Gamemode"
import GameState from "./GameState"

export default ()  => {

    const [clearHitsStatus, setClearHitsStatus] = useState("")
    const [clearTeamsStatus, setClearTeamsStatus] = useState("")


    const clearHits = async () => {
        let res = await httpWithCreds().get("/admin/clearhits")
        if(res.data.status == "SUCCESS") {
            setClearHitsStatus("Hits Cleared")
            setTimeout(() => setClearHitsStatus(""), 5000)
        }
    }

    const clearTeams = async () => {
        let res = await httpWithCreds().get('/admin/clearteams')
        if(res.data.status == "SUCCESS") {
            setClearHitsStatus("Hits Cleared")
            setTimeout(() => setClearTeamsStatus(""), 5000)
        }
    }

    return (
        <div>
            <p>You are an Admin</p>
            <p>{clearHitsStatus}</p>
            <p>{clearTeamsStatus}</p>
            <Gamemode/>
            <GameState/>
            <button onClick={clearHits}>Reset Hits</button>
            <button onClick={clearTeams}>Reset Teams</button>
        </div>
    )
}