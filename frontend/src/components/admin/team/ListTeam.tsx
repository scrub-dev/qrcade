import { useEffect, useState } from "react"
import request from "../../util/connection/request"
import Team from "./Team"

export interface IListTeamProps {
    LobbyID: string
}
export default (props: IListTeamProps) => {

    const [error, setError] = useState("")
    const [teamList, setTeamList] = useState([])

    useEffect(() => {
        (async () => {
            let res = (await request.get(`lobby/${props.LobbyID}/teams`)).data
            console.log(res)
            if(res.code !== "SUCCESS") return setError(res.message)
            else setTeamList(res.data)
        })()
    }, [])


    return (
    <div>
        <div>
            {teamList.length >= 0 ? teamList.map((team, i) => <Team key={i} team={team}/>) : ""}
        </div>
        <div>
            <p className="text-white font-bold text-2xl">{error}</p>
        </div>
    </div>
    )
}