import { useEffect, useState } from "react"
import request from "../../util/connection/request"
import Button from "../../core/Button"
import Lobby from "./Lobby"

export default () => {
    const [error, setError] = useState("No Results")
    const [lobbyList, setLobbyList] = useState<any>([])

    const getLobbyList = async () => {
        let result = (await request.get("lobby/list")).data

        if(result.code != "SUCCESS") {
            setLobbyList([])
            return setError(`${result.message}`)
        }

        setLobbyList(result.data)
    }

    const lobbyListComponent = (lobbyList.length > 0) ? lobbyList.map((lobby: any) => <Lobby key={lobby.LobbyID} LobbyID={lobby.LobbyID} LobbyName={lobby.LobbyName} LobbyType={lobby.LobbyType} GameInfo={lobby.GameInfo} Participants={lobby.Participants}/>) : null

    useEffect(() => {
        (async () => {
            getLobbyList()
        })()
    }, [])

    return (<>
        <div className="w-full h-full flex flex-col items-center gap-1">
            {lobbyList?.length > 0 ? lobbyListComponent : <p className="text-2xl text-white font-mono font-bold">{error}</p>}
        </div>
        <Button text={"Refresh"} onClick={() => {getLobbyList()}}/>
    </>)
}