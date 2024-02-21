import { useNavigate } from "react-router-dom"
import Button from "../core/Button"

export interface ILoginButtonProps {
    className?: string
}

export default (props : ILoginButtonProps) => {

    const nav = useNavigate()
    return (
        <Button text={"Login"} onClick={() => nav("/login")} className = {"" + (props.className || "")}/>
    )
}