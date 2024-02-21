export interface IButtonProps {
    text: string,
    onClick: () => void,
    className?: string
}
export default (props: IButtonProps) => {
    const defaultButtonStyle = "text-2xl px-4 py-1 bg-main rounded font-graffiti text-white hover:bg-main_light hover:shadow-xl hover:shadow-main"
    return (
        <button className={`${props.className || defaultButtonStyle}`} onClick={() => props.onClick()}>{props.text}</button>
    )
}