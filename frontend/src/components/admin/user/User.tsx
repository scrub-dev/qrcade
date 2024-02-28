import { useState } from "react"
import Modal from "../../core/Modal"
import Button from "../../core/Button"

export interface TUserProps {
    UserID: string,
    Username: string,
    DisplayName: string
}
export default (props: TUserProps) => {
    const [isUserAdmin, setIsUserAdmin] = useState(false)

    // Make user admin || remove admin
    // Reset user displayname
    // Reset user password
    // Delete User

    return (
        <Modal buttonName={"Test"} title={"ABCDEFGHIJKLMNOPQRSTUVWXYZ"}>
        <div className="flex flex-col justify-center items-center gap-2">
        <Button text={"Make User Admin"} onClick={() => {}}/>
        <Button text={"Reset DisplayName"} onClick={() => {}}/>
        <Button text={"Reset Password"} onClick={() => {}}/>
        <Button text={"Delete User"} onClick={() => {}}/>
        </div>
    </Modal>
    )
}