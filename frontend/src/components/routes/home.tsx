import { useAuthUser } from "react-auth-kit"
import Logout from "../home/Logout"
import PrintQRCode from "../home/qrcodes/printQRCode"
import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import AdminComponent from "../admin/AdminComponent"
import { httpWithCreds } from "../../util/http"
import TeamPicker from "../home/Team/TeamPicker"
import Team from "../home/Team/Team"

export default () => {


    const [isAdmin, setIsAdmin] = useState(false)

    const [team, teamForm] = TeamPicker()

    const nav = useNavigate()

    const viewScore = () => {nav("/score")}

    const checkAdmin = () => {
        httpWithCreds().get("/admin/isadmin").then(res => {
            setIsAdmin(res.data.value)
        })
    }

    useEffect( () => {
        (async () => {
            checkAdmin()
        })()
    })

    const user = useAuthUser()


    return <>
        <div className="h-screen w-full flex flex-col justify-between">
        <div className="w-full bg-black">
            <h1 className="font-graffiti text-white neon-glow text-center text-6xl shadow-purple-500/50 py-2">QRCADE</h1>
        </div>
        <div className="flex-grow">
        <div className="bg-black flex w-full py-3 border-y-2 border-purple-500">
            <div className="mx-auto">
                <h1 className="font-graffiti text-white text-center my-auto text-2xl">Player</h1>
                <span className="px-3  font-mono text-4xl text-white my-auto">{user() ? user()?.uname : "User"}</span>
            </div>
        </div>
        <div className="w-full flex bg-black border-b-2 border-purple-500">
            <button onClick={viewScore} className="font-graffiti text-white m-auto text-2xl bg-purple-600 px-8 py-1 my-2 rounded focus:outline-none focus:shadow-outline hover:bg-purple-500 font-bold shadow-xl hover:shadow-purple-500/50">View Scores</button>
        </div>
        <div>
            <Team team={team}/>
            {teamForm}
        </div>
        <div>
            {isAdmin ? <AdminComponent/> : null}
        </div>
        </div>
        <PrintQRCode userID={user()?.id} size={700} margin={false} username={user()?.uname}/>
        <div className="w-full flex bg-black">
            <Logout/>
        </div>
        </div>
    </>
}