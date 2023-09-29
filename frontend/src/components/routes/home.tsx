import { useAuthUser } from "react-auth-kit"
import Logout from "../login/Logout"
import Qrcode from "../profile/qrcode"
import PrintQRCode from "../profile/printQRCode"
import { useEffect, useState } from "react"
import axios from "axios"
import AdminComponent from "../admin/AdminComponent"
import {useFormik } from "formik"

export default () => {


    const [isAdmin, setIsAdmin] = useState(false)
    const [team, setTeam] = useState("")


    const checkAdmin = () => {
        axios.get("http://localhost:3000/admin/isadmin", {withCredentials : true}).then(res => {
            setIsAdmin(res.data.value)
        })
    }

    const getTeam = async () => {
        let data = await axios.get("http://localhost:3000/getteam",  {withCredentials : true})
        return data.data.result
    }

    const setTeamRemote = (team: string) => {
        axios.get(`http://localhost:3000/setteam?team=${team}`, {withCredentials: true}).then(() => {
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
                {team ? "you are on team " +  team : ""}
                {teamForm}
                {isAdmin ? <AdminComponent/> : null}
            </div>
    </>
}