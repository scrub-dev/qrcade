import { useNavigate } from "react-router-dom"
import request from "../util/connection/request"
import { useEffect, useState } from "react"
import Button from "../core/Button"

export default () => {
    const nav = useNavigate()
    const [lobbyList, setLobbyList] = useState([])
    const [error, setError] = useState("")
    useEffect(() => {
        (async () => {
            getLobbyList()
        })()
    }, [])

    const getLobbyList = async () => {
        let res = (await request.get(`lobby/list`)).data
        if(res.code !== "SUCCESS") return setError(res.message)

        setLobbyList(res.data)
    }

    return (
    <div className="w-full flex flex-col gap-2">
        {lobbyList.length > 0 ? (lobbyList.map((lobby: any, i: number) => <Button key={i} text={lobby.LobbyName} onClick={() => nav(lobby.LobbyID)}/>)) : ""}
        <p>{error}</p>
    </div>)
}