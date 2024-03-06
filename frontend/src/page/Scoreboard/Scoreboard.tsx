import { useParams } from "react-router-dom"

export default () => {
    let { id } = useParams<{id: string}>()

    return (<>Scoreboard {id}</>)
}