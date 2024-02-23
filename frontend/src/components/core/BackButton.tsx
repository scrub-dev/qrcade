import { useNavigate } from "react-router-dom"
import Button from "./Button"

export default () => {
    const nav = useNavigate()
    return <Button text={"Go Back"} onClick={() => nav(-1)}/>
}