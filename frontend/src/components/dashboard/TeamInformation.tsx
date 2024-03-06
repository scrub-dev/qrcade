import Button from "../core/Button"
import Modal from "../core/Modal"

export interface TTeamInformationProps {
    TeamInfo: [{[x : string]: any}],
    UserTeam: {[x: string]: any},
}

export default (props: TTeamInformationProps) => {
    console.log(props.TeamInfo)
    const TeamComponent = (<></>)
    const NoTeamComponent = (<>
        <div className="rounded bg-main_dark shadow-lg shadow-main text-center py-2 flex flex-col items-center justify-center gap-1">
            <p className="font-graffiti qrc-shadow text-xl">Join a Team</p>
            <div className="flex flex-col justify-center w-full px-5 pb-1 gap-1">
                {props.TeamInfo.length <= 0 ? <p>No teams available</p> :
                    <>
                        {props?.TeamInfo?.map((team: any, i: number) =>
                        <Modal key={i} buttonName={team.TeamName} title={""} style="w-full bg-main rounded font-graffiti text-xl py-1" background={team.TeamColour} outline="white">
                            <div className="flex items-center justify-center">
                                <Button text={`Join ${team.TeamName} Team`} onClick={() => {}}/>
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