import Button from "../core/Button"
import Modal from "../core/Modal"
import UserLobbyList from "../lobby/UserLobbyList"

export interface TLobbyInformation {
    LobbyID: string,
    ParentCallback: any
}

export default (props: TLobbyInformation) => {

    const leaveLobby = (lobbyID: string) => {
        // leave lobby
        props.ParentCallback()
    }

    const LobbyComponents = (
        <div className="rounded bg-main_dark shadow-lg shadow-main text-center py-2 flex flex-col items-center justify-center gap-2">
            <p className="flex gap-2"><span className="font-graffiti text-2xl">Lobby:</span><span>{}</span></p>
            <Button text={"Participants"} onClick={()=> {}}/>
            <Button text={"Leave"} onClick={()=> {leaveLobby(props.LobbyID)}}/>
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

    return props.LobbyID ? LobbyComponents : NoLobbyComponents
}