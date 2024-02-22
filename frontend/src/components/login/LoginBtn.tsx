import { useNavigate } from "react-router-dom"
import Button from "../core/Button"

export interface ILoginButtonProps {
    className?: string,
    onClick?  : () => void
}

export default (props : ILoginButtonProps) => {


    const onClickFunc = () => {
        if(props.onClick) props.onClick()
    }
    return (
        <Button text={"Login"} onClick={onClickFunc} className = {"" + (props.className || "")}/>
    )
}