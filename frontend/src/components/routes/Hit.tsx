import { useEffect, useState } from "react"
import hitparser from "../hit/hitparser"
import getUsername from "../login/getUsername"
import registerHit from "../hit/registerHit"

export default () => {

    const [target, setTarget] = useState("")
    const [result, setResult] = useState(false)
    const [resultText, setResultText] = useState("")

    useEffect( () => {

        let target = hitparser()

        if(target) {
            getUsername(target).then(uname => {setTarget(uname)})
            registerHit(target).then(res => {setResultText(res.data.message)})
        } else {
            setResult(false)
        }
    })


    return (
        <>
            <p>Target : {target}</p>
            <p>{!!result} {resultText}</p>
        </>
    )
}