export interface IButtonProps {
    text: string,
    onClick: () => void,
    className?: string
}


export const defaultButtonStyle = "text-2xl px-4 py-1 bg-main rounded font-graffiti text-white hover:bg-main_light hover:shadow-lg hover:shadow-main"
export const defaultButtonStyleAlt = "text-2xl px-4 py-1 bg-main rounded font-graffiti text-white bg-secondary_dark hover:bg-secondary hover:shadow-lg hover:shadow-secondary_light"

export default (props: IButtonProps) => {
    return (
        <button className={`${props.className || defaultButtonStyle}`} onClick={() => props.onClick()}>{props.text}</button>
    )
}