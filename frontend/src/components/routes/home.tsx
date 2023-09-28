import { useAuthUser } from "react-auth-kit"
import Logout from "../login/Logout"
import Qrcode from "../profile/qrcode"
import PrintQRCode from "../profile/printQRCode"

export default () => {

    const user = useAuthUser()

    return <>
            <Logout/>
            <h1>Hello {user() ? user()?.uname : "User"}</h1>
            <Qrcode size={400} userID={user()?.id} margin/>
            <PrintQRCode userID={user()?.id} size={700} margin={false} username={user()?.uname}/>

    </>
}