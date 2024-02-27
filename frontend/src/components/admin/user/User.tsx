import { useState } from "react"
import Modal from "../../core/Modal"

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
        <Modal buttonName={props.Username} title={props.Username} children={undefined}></Modal>
    )
}