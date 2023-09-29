import { useAuthUser } from "react-auth-kit"
import Logout from "../login/Logout"
import Qrcode from "../profile/qrcode"
import PrintQRCode from "../profile/printQRCode"
import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import AdminComponent from "../admin/AdminComponent"
import {useFormik } from "formik"
import { httpWithCreds } from "../../util/http"

export default () => {


    const [isAdmin, setIsAdmin] = useState(false)
    const [team, setTeam] = useState("")

    const nav = useNavigate()

    const viewScore = () => {nav("/score")}

    const checkAdmin = () => {
        httpWithCreds().get("/admin/isadmin").then(res => {
            setIsAdmin(res.data.value)
        })
    }

    const getTeam = async () => {
        let data = await httpWithCreds().get("/getteam")
        return data.data.result
    }

    const setTeamRemote = (team: string) => {
        httpWithCreds().get(`/setteam?team=${team}`).then(() => {
            getTeam()
        })
    }

    useEffect( () => {
        (async () => {
            checkAdmin()
            setTeam(await getTeam())
        })()
    })

    const user = useAuthUser()

    // SET TEAM
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
        <form onSubmit={formikTeam.handleSubmit}>
            <select name="team" value={formikTeam.values.team} onChange={formikTeam.handleChange}>
            {teamList.map(t => <option key={t.name}>{t.name}</option>)}
            </select>
            <button type="submit">Submit</button>
        </form>
    )


    return <>
            <Logout/>
            <h1>Hello {user() ? user()?.uname : "User"}</h1>
            <Qrcode size={400} userID={user()?.id} margin/>
            <div>
                <PrintQRCode userID={user()?.id} size={700} margin={false} username={user()?.uname}/>
            </div>
            <div>
                <button onClick={viewScore}>View Score</button>
                {team ? "you are on team " +  team : ""}
                {teamForm}
                {isAdmin ? <AdminComponent/> : null}
            </div>
    </>
}