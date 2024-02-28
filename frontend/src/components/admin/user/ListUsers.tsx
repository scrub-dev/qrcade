import { useEffect, useState } from "react"
import request from "../../util/connection/request"

export default () => {
    const [userList, setUserList] = useState([]) as any[]

    const getUserList = async () => {
        let result = (await request.get("user/list")).data.data
        return result as any[]
    }

    useEffect(() => {
        (async () => {
            setUserList(await getUserList())
        })()
    }, [])

    return (<>
        {JSON.stringify(userList)}
    </>)


}