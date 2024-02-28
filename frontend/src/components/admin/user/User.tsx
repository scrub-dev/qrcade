import { useEffect, useRef, useState } from "react"
import Modal from "../../core/Modal"
import Button from "../../core/Button"
import request from "../../util/connection/request"
import PrintQRCode from "../../qrcode/printQRCode"

export interface TUserProps {
    UserID: string,
    Username: string,
    DisplayName: string,
    Admin      : boolean
}
export default (props: TUserProps) => {
    const [userInfo, setUserInfo] = useState({...props})
    const [result, setResult] = useState("")

    const timeoutRef = useRef(0)

    const clearResultBox = () => setResult("")

    const setResultBox = (str: string) => {
        if(timeoutRef.current !== null) clearTimeout(timeoutRef.current)

        setResult(str)
        timeoutRef.current = setTimeout(clearResultBox, 2000)
    }

    const updateUserInfo = async () => {
        let res = (await request.get(`user/${props.UserID}`)).data.data
        setUserInfo({...res})
    }

    useEffect(() => {
        (async () => {
            updateUserInfo()
        })()
    }, [])

    const printQRCode = () => {
        setResultBox("Loading QR Code")
        updateUserInfo()
    }

    const deleteUser = () => {
        setResultBox("Deleted User")
        updateUserInfo()
    }

    const makeAdmin = () => {
        setResultBox("User Admin Added")
        updateUserInfo()
    }
    const removeAdmin = () => {
        setResultBox("User Admin Removed")
        updateUserInfo()
    }

    const resetDisplayName = () => {
        setResultBox("DisplayName Reset")
        updateUserInfo()
    }
    const resetPassword = () => {
        setResultBox("Password Reset")
        updateUserInfo()
    }

    return (
        <Modal buttonName={`${props.Username} (${props.UserID})`} title="User Controls" style="rounded bg-main p-1 font-mono w-full">
            <p>
                <span className="font-bold">UserID: </span><span>{userInfo.UserID}</span> <br/>
                <span className="font-bold">Username: </span><span>{userInfo.Username}</span> <br/>
                <span className="font-bold">DisplayName: </span><span>{userInfo.DisplayName}</span>
            </p>
        <div className="flex flex-col justify-center items-center gap-3 m-5">
        <PrintQRCode ID={userInfo.UserID} name="Print QR Code" style="rounded bg-main p-1 font-mono w-full px-5"/>
            {props.Admin ?
                    <Button text={"Remove User Admin"} onClick={removeAdmin} className="rounded bg-main p-1 font-mono w-full px-5"/>:
                    <Button text={"Make User Admin"} onClick={makeAdmin} className="rounded bg-main p-1 font-mono w-full px-5"/>
            }
        <Button text={"Reset DisplayName"} onClick={resetDisplayName} className="rounded bg-main p-1 font-mono w-full px-5"/>
        <Button text={"Reset Password"} onClick={resetPassword} className="rounded bg-main p-1 font-mono w-full px-5"/>
        <Button text={"Delete User"} onClick={deleteUser} className="rounded bg-main p-1 font-mono w-full px-5"/>
        </div>
        <div className="flex items-center justify-center">
            <p className="text-white absolute">{result}</p>
        </div>
    </Modal>
    )
}