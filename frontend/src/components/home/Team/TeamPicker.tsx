import { useEffect, useState } from "react"
import { httpWithCreds } from "../../../util/http"
import { useFormik } from "formik"

export default () => {

    const [team, setTeam] = useState("")


    const getTeam = async () => {
        let data = await httpWithCreds().get("/getteam")
        return data.data.result
    }

    const setTeamRemote = (team: string) => {
        httpWithCreds().get(`/setteam?team=${team}`).then(() => {
            getTeam()
        })
    }

    useEffect(() => {
        (async () => {
            setTeam(await getTeam())
        })()
    })

    const teamList = [{name: "Red", key: "RED"},{name:"Blue", key: "BLUE"},{name: "No Team", key: "NOTEAM"}]
    const onSubmit = async (values: any) => {
        let teamSelected = teamList.filter(e => e.name == values.team)[0] || "Red"

        setTeamRemote(teamSelected.key || "NOTEAM")
        getTeam()
    }
    const formikTeam = useFormik({
        initialValues: {
            team: "Red"
        },
        onSubmit
    })
    const teamForm = (
        <div className="bg-black py-6 w-full flex border-b-2 border-purple-500">
            <div className="m-auto flex">
                <form onSubmit={formikTeam.handleSubmit}>
                    <label htmlFor="team" className="text-white text-bold m-auto text-xl">Pick your team</label>
                    <div className="flex mb-4 mt-2">
                        <select name="team" className="m-auto w-full appearance-none border rounded py-2 px-3 bg-gray-700 shadow-xl shadow-purple-500/50 text-white" value={formikTeam.values.team} onChange={formikTeam.handleChange}>
                            {teamList.map(t => <option key={t.name}>{t.name}</option>)}
                        </select>
                    </div>
                    <div className="flex">
                        <button type="submit" className="bg-purple-600 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-purple-500 font-bold shadow-xl hover:shadow-purple-500/50 m-auto">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )

    return [team, teamForm]
}