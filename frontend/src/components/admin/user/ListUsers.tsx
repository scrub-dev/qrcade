import { useEffect, useState } from "react"
import request from "../../util/connection/request"
import User from "./User"
import Button from "../../core/Button"
import useAuthUser from "react-auth-kit/hooks/useAuthUser"

export default () => {
    const authedUser = useAuthUser() as any
    const [userList, setUserList] = useState([]) as any[]

    const getUserList = async () => {
        let result = (await request.get("user/list")).data.data
        setUserList(await result)
    }

    const userListComponent  = userList
                .filter((user: any) => user.UserID != authedUser.UserID)
                .map((user: any) =>
                    <User UserID={user.UserID} Username={user.Username} DisplayName={user.DisplayName} Admin={user.Admin} key={user.UserID}/>
                )

    useEffect(() => {
        (async () => {
            getUserList()
        })()
    }, [])

    return (<>
        <div className="w-full h-full flex flex-col items-center gap-1">
            {userList.length > 0 ? userListComponent : <p className="text-2xl text-white font-mono font-bold">No Users Found</p>}
        </div>
        <Button text={"Refresh"} onClick={() => {getUserList()}}/>
    </>)
}