import { useEffect, useState } from "react"
import { httpWithCreds } from "../../util/http"
import { useFormik } from "formik"

export default () => {
    const validGamemodes = [{name: "Free for All", val: "FFA"},{name: "Team Deathmatch", val: "TDM"}]

    const [currentGamemode, setCurrentGamemodeStatus] = useState("")

    const getGamemode = async () => {
        let res = await httpWithCreds().get(`/admin/getoption?option=GAMEMODE`)
        if(res.data.status == "SUCCESS") setCurrentGamemodeStatus(validGamemodes.filter(e => e.val == res.data.message)[0].name)
    }

    const setGamemode = async (val:string) => {
        await httpWithCreds().get(`/admin/setoption?option=GAMEMODE&value=${val}`)
    }

    useEffect(() => {
        (async () => {
            getGamemode()
        })()
    })

    const onSubmit = async (values: any) => {
        let selectedGamemode = validGamemodes.filter(e => values.gamemode === e.name)[0].val
        setGamemode(selectedGamemode)
    }

    const formikGamemode = useFormik({
        initialValues: {
            gamemode: "Free for All"
        },
        onSubmit
    })

    const gamemodeForm = (
        <form onSubmit={formikGamemode.handleSubmit}>
            <select name="gamemode" value={formikGamemode.values.gamemode} onChange={formikGamemode.handleChange} className="m-auto w-full appearance-none border rounded py-2 px-3 bg-gray-700 shadow-xl shadow-purple-500/50 text-white">
            {validGamemodes.map(t => <option key={t.name} className="">{t.name}</option>)}
            </select>
            <button type="submit" className="bg-purple-600 text-white py-1 px-4 my-2 rounded focus:outline-none focus:shadow-outline hover:bg-purple-500 font-bold shadow-xl hover:shadow-purple-500/50">Submit</button>
        </form>
    )

    return (
        <>
            <p className="text-white">Current Gamemode: {currentGamemode}</p>
            {gamemodeForm}
        </>
    )
}
