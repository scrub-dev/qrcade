export interface TFlagComponentProps {
    data: any
}
export default (props: TFlagComponentProps) => {

    return (
        <div className="text-white pt-[5%]">
            {/* <p>{JSON.stringify(props.data)}</p> */}
            <p className="text-5xl text-center drop-shadow-2xl qrc-shadow shadow-secondary_light font-graffiti pb-5">FLAG FOUND!</p>
            <div className="p-5 rounded bg-black border-2 border-secondary shadow-xl shadow-secondary_light">
                <p className="text-3xl font-mono text-center border-b-2 border-secondary_dark mb-2">{props.data?.FlagName}</p>
                <p className="text-xl font-mono">{decodeURIComponent(props.data?.FlagDesc)}</p>
            </div>
        </div>)
}