import {useEffect, useState } from "react"
import request from "../util/connection/request"
import Userlobby from "./UserLobby"
import Button from "../core/Button"

export interface TUserLobbyListProps {
    ParentCallback: Function
}

export default (props: TUserLobbyListProps) => {
    const [error, setError] = useState("No Results")
    const [lobbyList, setLobbyList] = useState<any>([])

    const getLobbyList = async () => {
        let result = (await request.get("lobby/list")).data
        if(result.code != "SUCCESS") setError(`${result.message}`)
        else setLobbyList(await result.data)
    }

    const joinLobby = (lobbyID: string) => {
        console.log(lobbyID) // args[0]
        props.ParentCallback()
    }

    useEffect(() => {
        (async () => {
            getLobbyList()
        })()
    },[])

    const lobbyListComponent = (lobbyList.length > 0) ? lobbyList.map((lobby: any) => <Userlobby key={lobby.LobbyID} onClick={joinLobby} lobby={lobby}/>) : null

    return (
    <div className="flex flex-col items-center justify-center gap-1">
        {lobbyList?.length > 0 ? lobbyListComponent : <p className="text-2xl text-white font-mono font-bold">{error}</p>}
        <Button text={"Refresh"} onClick={getLobbyList}/>
    </div>
    )
}