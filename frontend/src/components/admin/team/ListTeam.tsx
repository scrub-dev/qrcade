import { useEffect, useState } from "react"
import request from "../../util/connection/request"
import Team from "./Team"
import Button from "../../core/Button"

export interface IListTeamProps {
    LobbyID: string
}
export default (props: IListTeamProps) => {

    const [error, setError] = useState("")
    const [teamList, setTeamList] = useState([])

    const getTeamList = async () => {
        let result = (await request.get(`lobby/${props.LobbyID}/teams`)).data
        if(result.code != "SUCCESS") setError(`${result.message}`)
        else setTeamList(await result.data)
    }

    useEffect(() => {
        (async () => {
            await getTeamList()
        })()
    }, [])


    return (<>
        <div className="w-full h-full flex flex-col items-center gap-1">
            {teamList.length >= 0 ? teamList.map((team, i) => <Team key={i} team={team}/>) : <p className="text-white font-bold text-2xl">{error}</p>}
        </div>
        <Button text={"Refresh"} onClick={() => {getTeamList()}}/>
    </>)
}