export interface TPlayerComponentProps {
    data: any
}
export default (props: TPlayerComponentProps) => {



    return (
    <div className="text-white">
        <p className="text-5xl text-center drop-shadow-2xl qrc-shadow shadow-secondary_light font-graffiti pb-10">YOU HIT SOMEONE!</p>
        <p className="text-5xl font-mono text-center">{(props.data?.DisplayName) ? props.data?.DisplayName : props.data?.UserName}</p>
        <p className="text-2xl font mono text-center">has been hit!</p>
    </div>)
}