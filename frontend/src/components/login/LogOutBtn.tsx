import Button from "../core/Button"

export interface ILoginButtonProps {
    className?: string
    onClick? : () => void
}

export default (props: ILoginButtonProps) => {


    const onClickFunc = () => {
        if(props.onClick) {props.onClick()}
    }
    return (
        <Button text={"Logout"} onClick={() => {onClickFunc()}} className = {"" + (props.className || "")}/>
    )
}