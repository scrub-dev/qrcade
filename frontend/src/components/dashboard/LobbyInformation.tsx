import { useNavigate } from "react-router-dom"
import Button from "../core/Button"
import Modal from "../core/Modal"
import UserLobbyList from "../lobby/userlobbylist"
import request from "../util/connection/request"
import useAuthUser from "react-auth-kit/hooks/useAuthUser"

export interface TLobbyInformation {
    LobbyInfo: {[x: string]: any},
    ParentCallback: any
}

export default (props: TLobbyInformation) => {
    const nav = useNavigate()
    const authedUser = useAuthUser() as any

    const leaveLobby = async () => {
        (await request.patch(`lobby/${props.LobbyInfo.LobbyID}/leave/${authedUser.UserID}`))
        props.ParentCallback()
    }

    const LobbyComponents = (
        <div className="rounded bg-main_dark shadow-lg shadow-main text-center py-2 flex flex-col items-center justify-center gap-2">
            <p className="flex gap-2"><span className="font-graffiti text-2xl">Lobby:</span><span className="text-xl font-semibold font-mono">{props.LobbyInfo.LobbyName}</span></p>
            <div className="flex flex-row items-center justify-center gap-2">
                <Button text={"Players"} onClick={()=> {nav(`/list/${props.LobbyInfo.LobbyID}`)}}/>
                <Button text={"Leave"} onClick={leaveLobby}/>
            </div>
        </div>
    )
    const NoLobbyComponents = (
        <div className="flex flex-col rounded bg-main_dark shadow-lg shadow-main text-center py-2 items-center justify-center gap-2">
            <p className="flex gap-2"><span className="font-graffiti text-2xl">Lobby:</span><span>Not Available</span></p>
            <Modal title={""} buttonName={"Join Lobby"}>
                <p className="qrc-shadow font-graffiti text-2xl px-5">Lobbies</p>
                <UserLobbyList ParentCallback={props.ParentCallback}/>
            </Modal>
    </div>
    )
    return props.LobbyInfo.LobbyID ? LobbyComponents : NoLobbyComponents
}