import { useEffect, useState } from "react"
import { httpWithCreds } from "../../util/http"
import Gamemode from "./Gamemode"
import GameState from "./GameState"

export default ()  => {

    const [clearHitsStatus, setClearHitsStatus] = useState("")

    const clearHits = async () => {
        let res = await httpWithCreds().get("/admin/clearhits")
        if(res.data.status == "SUCCESS") {
            setClearHitsStatus("Hits Cleared")
            setTimeout(() => setClearHitsStatus(""), 5000)
        }
    }

    return (
        <div>
            <p>You are an Admin</p>
            <p>{clearHitsStatus}</p>
            <Gamemode/>
            <GameState/>
            <button onClick={clearHits}>Reset Hits</button>
        </div>
    )
}