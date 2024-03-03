import { useEffect, useState } from "react"
import request from "../util/connection/request"
import Button from "../core/Button"

export interface TUserLobbyProps {
    onClick: any,
    lobby: any,
}

export default (props: TUserLobbyProps) => {

    const handleOnClick = () => {
        props.onClick("test")
    }

    const [lobbyInfo, setLobbyInfo] = useState<any>({})

    const getLobbyInformation = async () => {
        let res = (await request.get(`lobby/${props.lobby.LobbyID}`)).data.data
        let data = {...res}
        setLobbyInfo(data)
    }

    useEffect(() => {
        (async () => {getLobbyInformation()})()
    }, [])

    return (
        <div className="bg-main p-2 rounded w-full flex flex-row justify-center items-center gap-2">
            <div className="flex flex-col flex-grow">
                <p className="font-semibold text-start">{lobbyInfo.LobbyName}</p>
                <p className="text-start">{lobbyInfo.GameInfo?.readableName}</p>
                <p className="text-start">Players: {"0"}</p>
            </div>

            <Button text={"Join"} onClick={handleOnClick} className="rounded bg-secondary p-2 px-5 shadow-md shadow-secondary_light font-graffiti text-2xl hover:shadow-secondary_dark hover:bg-secondary_dark"/>
        </div>
    )
}