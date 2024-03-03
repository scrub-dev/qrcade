export interface TUserInformationProps {
    DisplayName: string
}

export default (props: TUserInformationProps) => {
    return (
        <div className="rounded bg-main_dark shadow-lg shadow-main text-center py-2 flex flex-row items-center justify-center gap-2">
            <p className="flex-grow text-center text-white text-3xl font-graffiti">{props.DisplayName}</p>
        </div>
    )
}