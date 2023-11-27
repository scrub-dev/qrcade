import { useEffect, useState } from "react"
import { httpWithCreds } from "../../util/http"
import DeleteUser from "./user/DeleteUser"
import CreateUser from "./user/CreateUser"


export default () => {




    const createUser = () => {}

    const deleteUser = () => {}

    const [users, setUsers] = useState<any[]>()
    const listUsers = async () => {
        console.log("AAAA")
        let res = await httpWithCreds().get(`/admin/players`)
        setUsers(res.data.data)
    }

    useEffect(() => {
        (async () => {
            listUsers()
        })
    })


    const refresh = () => {
        listUsers()
    }

    const userList = (
        <div>
            <select className="m-auto w-full appearance-none border rounded py-2 px-3 bg-gray-700 shadow-xl shadow-purple-500/50 text-white">
                {users?.map(u => <option key={u.id}> {u.name} : {u.id}</option>)}
            </select>
            <button className="bg-purple-600 text-white py-1 px-4 my-2 rounded focus:outline-none focus:shadow-outline hover:bg-purple-500 font-bold shadow-xl hover:shadow-purple-500/50" onClick={refresh}>Refresh User List</button>

        </div>
    )

    return (<>
        <div className="mt-4">
        {userList}
        <DeleteUser/>
        <CreateUser/>
        </div>
    </>)
}