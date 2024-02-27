import { useNavigate } from "react-router-dom"
import Button from "./Button"

export type TBackButtonProps = {
    handleOnClick? : any
}
export default (props: TBackButtonProps) => {
    const nav = useNavigate()
    return <Button text={"Go Back"} onClick={props.handleOnClick || (() => nav(-1))}/>
}