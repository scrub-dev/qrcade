import { useNavigate } from "react-router-dom"
import Button from "../core/Button"

export default () => {
    const nav = useNavigate()

    return <Button text={"View Scoreboards"} onClick={() => nav("/scoreboard")}/>
}