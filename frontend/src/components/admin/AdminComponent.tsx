import { useState } from "react"
import { httpWithCreds } from "../../util/http"
import Gamemode from "./Gamemode"
import GameState from "./GameState"
import UserManagement from "./UserManagement"

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
            setClearTeamsStatus("Teams Cleared")
            setTimeout(() => setClearTeamsStatus(""), 5000)
        }
    }

    return (
        <div>
            <p className="text-white">{clearHitsStatus}</p>
            <p className="text-white">{clearTeamsStatus}</p>
            <Gamemode/>
            <GameState/>
            <div className="inline-flex justify-center w-full py-2">
                <button onClick={clearHits} className="bg-purple-600 text-white py-1 px-1 rounded focus:outline-none focus:shadow-outline hover:bg-purple-500 font-bold shadow-xl hover:shadow-purple-500/50 mr-1">Reset Hits</button>
                <button onClick={clearTeams} className="bg-purple-600 text-white py-1 px-1 rounded focus:outline-none focus:shadow-outline hover:bg-purple-500 font-bold shadow-xl hover:shadow-purple-500/50 ml-1">Reset Teams</button>
            </div>
            <UserManagement/>
        </div>
    )
}