import { useNavigate } from "react-router-dom"
import Button from "../core/Button"
import useSignOut from "react-auth-kit/hooks/useSignOut"

export interface ILoginButtonProps {
    className?: string
}

export default (props: ILoginButtonProps) => {
    const nav = useNavigate()

    const onClickFunc = () => {
        useSignOut()
        nav("/")

        // TODO:
        /**
         *  1. LEAVE TEAM
         *  2. LEAVE LOBBY
         */
    }

    return (
        <Button text={"Logout"} onClick={onClickFunc} className = {"" + (props.className || "")}/>
    )
}