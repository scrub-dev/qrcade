import { useEffect, useState } from "react"
import request from "../../util/connection/request"
import User from "./User"
import Button from "../../core/Button"

export default () => {
    const [userList, setUserList] = useState([]) as any[]

    const getUserList = async () => {
        let result = (await request.get("user/list")).data.data
        setUserList(await result)
    }

    useEffect(() => {
        (async () => {
            getUserList()
        })()
    }, [])

    return (<>
        <div className="w-full h-full flex flex-col items-center gap-1">
            {userList.map((user: any) => <User UserID={user.UserID} Username={user.Username} DisplayName={user.DisplayName} Admin={user.Admin} key={user.UserID}/>)}
        </div>
        <Button text={"Refresh"} onClick={() => {getUserList()}}/>
    </>)
}