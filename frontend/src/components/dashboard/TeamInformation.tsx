import { useEffect, useState } from "react"
import Button from "../core/Button"
import Modal from "../core/Modal"
import request from "../util/connection/request"

export interface TTeamInformationProps {
    UserID: string,
    TeamInfo: [{[x : string]: any}],
    UserTeam: string,
    ParentCallback: Function
}

export default (props: TTeamInformationProps) => {

    const [userTeamInfo , setUserTeamInfo] = useState<any>({})


    useEffect(() => {
        (async () => {
            if(props.UserTeam){
                await getUserTeamInfo()
            }
        })()
    },[])

    const getUserTeamInfo = async () => {
        let res = (await request.get(`lobby/team/${props.UserTeam}`)).data
        if(res.code == "SUCCESS") return setUserTeamInfo(res.data)
    }

    const joinTeam = async (teamID: number) => {
        let res = await request.patch(`lobby/team/${teamID}/join/${props.UserID}`)
        props.ParentCallback()
    }
    const leaveTeam = async (teamID: string) => {
        let res = await request.patch(`lobby/team/${teamID}/leave/${props.UserID}`)
        props.ParentCallback()
    }

    const TeamComponent = (<>
        <div className="rounded p-2 flex flex-col items-center justify-center text-stroke-md" style={{backgroundColor: userTeamInfo.TeamColour}}>
            <p className="text-2xl font-graffiti">{userTeamInfo.TeamName}</p>
            <Button text={"Leave Team"} onClick={() => leaveTeam(props.UserTeam)}/>
        </div>
    </>)

    const NoTeamComponent = (<>
        <div className="rounded bg-main_dark shadow-lg shadow-main text-center py-2 flex flex-col items-center justify-center gap-1">
            <p className="font-graffiti qrc-shadow text-2xl">Join a Team</p>
            <div className="flex flex-col justify-center w-full px-5 pb-1 gap-1">
                {props.TeamInfo.length <= 0 ? <p>No teams available</p> :
                    <>
                        {props?.TeamInfo?.map((team: any, i: number) =>
                        <Modal key={i} buttonName={team.TeamName} title={""} style="w-full bg-main rounded font-graffiti text-2xl py-1 text-stroke-md" background={team.TeamColour} outline="white">
                            <div className="flex items-center justify-center">
                                <Button text={`Join ${team.TeamName}`} onClick={() => joinTeam(team.TeamID)}/>
                            </div>
                        </Modal>)}
                    </>
                }
            </div>
        </div>
    </>)


    if(!props.UserTeam && props.TeamInfo.length <= 0){
        return (<></>)
    }

    return (
    <>
        {props.UserTeam ? TeamComponent : NoTeamComponent}
    </>
    )
}