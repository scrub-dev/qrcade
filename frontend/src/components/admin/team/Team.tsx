import { useState } from "react"
import Button from "../../core/Button"
import Modal from "../../core/Modal"
import request from "../../util/connection/request"

export interface TTeamProps {
    team: any,
}

export default (props: TTeamProps) => {

    const [status, setStatus] = useState("")


    const deleteTeam = async () => {
        let res = await request.delete(`lobby/${props.team.LobbyID}/remove/team/${props.team.TeamID}`)
        setStatus(res.data.message)
        setTimeout(() => setStatus(""), 2000)
    }

    return (
    <Modal buttonName={props.team.TeamName} title="Team Management" style="rounded w-full p-2 font-mono bg-main" outline={props.team.TeamColour}>
        <div className="flex flex-col gap-1">
            <Button text={"Participants"} onClick={() => {}}/>
            <Button text={"Delete"} onClick={deleteTeam}/>
            <p className="text-center">{status}</p>
        </div>
    </Modal>
    )
}