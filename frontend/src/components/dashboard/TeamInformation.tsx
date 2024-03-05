export interface TTeamInformationProps {
    TeamInfo: {[x: string]: any},
    UserTeam: {[x: string]: any},
}

export default (props: TTeamInformationProps) => {

    const TeamComponent = (<></>)
    const NoTeamComponent = (<></>)

    return (
        <div className="rounded bg-main_dark shadow-lg shadow-main text-center py-2 flex flex-row items-center justify-center gap-2">
            <p>{JSON.stringify(props)}</p>
        </div>
    )
}