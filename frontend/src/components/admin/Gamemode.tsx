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
            <select name="gamemode" value={formikGamemode.values.gamemode} onChange={formikGamemode.handleChange}>
            {validGamemodes.map(t => <option key={t.name}>{t.name}</option>)}
            </select>
            <button type="submit">Submit</button>
        </form>
    )

    return (
        <>
            <p>Current Gamemode: {currentGamemode}</p>
            {gamemodeForm}
        </>
    )
}
