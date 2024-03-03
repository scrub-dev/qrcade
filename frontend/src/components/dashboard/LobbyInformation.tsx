import { useEffect } from "react"
import Button from "../core/Button"

export interface TLobbyInformation {
    LobbyID: string,
    ParentCallback: any
}

export default (props: TLobbyInformation) => {


    useEffect(() => {
        (async () => {

        })()
    }, [])

    const LobbyComponents = (
        <div className="rounded bg-main_dark shadow-lg shadow-main text-center py-2 flex flex-row items-center justify-center gap-2">
            <p className="flex-grow text-center text-white text-3xl font-graffiti">{props.LobbyID}</p>
        </div>
    )
    const NoLobbyComponents = (
        <div className="rounded bg-main_dark shadow-lg shadow-main text-center py-2 flex flex-row items-center justify-center gap-2">
            <Button text={"Join Lobby"} onClick={() => {props.ParentCallback()}}/>
    </div>
    )

    return props.LobbyID ? LobbyComponents : NoLobbyComponents
}