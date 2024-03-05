export interface TTeamProps {
    team: any
}

export default (props: TTeamProps) => {
    return (<>{JSON.stringify(props.team)}</>)
}