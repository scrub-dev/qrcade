import { useEffect, useState } from "react"
import { httpWithCreds } from "../../util/http"
import { useFormik } from "formik"

export default () => {
    const validGameStatus = [{name: "Offline", val: "FALSE"},{name: "Active", val: "TRUE"}]
    const [currentGameStatus, setCurrentGameStatus] = useState("")

    const getGameState = async () => {
        let res = await httpWithCreds().get(`/admin/getoption?option=GAMEACTIVE`)
        if(res.data.status == "SUCCESS") setCurrentGameStatus(validGameStatus.filter(e => e.val == res.data.message)[0].name)
    }

    const setGameState = async (val:string) => {
        await httpWithCreds().get(`/admin/setoption?option=GAMEACTIVE&value=${val}`)
    }

    useEffect(() => {
        (async () => {
            getGameState()
        })()
    })

    const onSubmit = async (values: any) => {
        let selectedGamestate = validGameStatus.filter(e => e.name === values.gamestate)[0].val
        setGameState(selectedGamestate)
    }

    const formikGamestate = useFormik({
        initialValues: {
            gamestate: "Offline"
        },
        onSubmit
    })

    const gamestatusForm = (
        <form onSubmit={formikGamestate.handleSubmit}>
            <select name="gamestate" value={formikGamestate.values.gamestate} onChange={formikGamestate.handleChange}>
            {validGameStatus.map(t => <option key={t.name}>{t.name}</option>)}
            </select>
            <button type="submit">Submit</button>
        </form>
    )

    return (
        <>
            <p>Current Game State: {currentGameStatus}</p>
            {gamestatusForm}
        </>
    )
}