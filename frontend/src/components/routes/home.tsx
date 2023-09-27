import { useAuthUser } from "react-auth-kit"
import Logout from "../login/Logout"
import Qrcode from "../profile/qrcode"
import qrcode from "../profile/qrcode"

export default () => {

    const user = useAuthUser()
    const code = qrcode(user()?.id)

    return <>
            <Logout/>
            <h1>Hello {user() ? user()?.uname : "User"}</h1>
            <h1 className="bg-black text-white text-3xl">HelloWorld</h1>
            {code}

    </>
}