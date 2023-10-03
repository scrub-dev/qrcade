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
        <div className="w-full">
        <p className="text-white">Current Game State: {currentGameStatus}</p>
        <form onSubmit={formikGamestate.handleSubmit}  className="mb-auto">
            <select name="gamestate" value={formikGamestate.values.gamestate} onChange={formikGamestate.handleChange} className="m-auto appearance-none border rounded py-2 px-3 bg-gray-700 shadow-xl shadow-purple-500/50 text-white w-full mx-auto">
            {validGameStatus.map(t => <option key={t.name}>{t.name}</option>)}
            </select>
            <button type="submit" className="bg-purple-600 text-white py-1 px-4 my-2 rounded focus:outline-none focus:shadow-outline hover:bg-purple-500 font-bold shadow-xl hover:shadow-purple-500/50">Submit</button>
        </form>
        </div>
    )

    return gamestatusForm
}