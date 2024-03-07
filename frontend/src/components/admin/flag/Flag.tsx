import { useState } from "react"
import Button from "../../core/Button"
import Modal from "../../core/Modal"
import request from "../../util/connection/request"
import PrintQRCode from "../../qrcode/printQRCode"

export interface TFlagProps {
    flag: any
}
export default (props: TFlagProps) => {

    const [error, setError] = useState("")
    const deleteFlag = async () => {
        const res = (await request.delete(`lobby/${props.flag.LobbyID}/remove/flag/${props.flag.FlagID}`)).data
        if(res.code != "SUCCESS") return setError(`${res.message}`)
        else setError("Flag Deleted")

        setTimeout(() => {setError("")}, 3000)
    }


    return (
    <Modal title={props.flag.FlagInfo} buttonName={`${props.flag.FlagName} (${props.flag.FlagID || "null"})`} style="font-mono rounded p-2 bg-main w-full">
        <div className="flex flex-col gap-1">
            <p className="text-wrap break-words max-w-56 mb-4">{decodeURIComponent(props.flag.FlagDesc)}</p>
            <div className="flex flex-col pt-4 px-4 gap-1">
                <p>{error}</p>
                <Button text={"Delete Flag"} onClick={deleteFlag}/>
                <PrintQRCode ID={props.flag.FlagID}/>
            </div>
        </div>
    </Modal>)
}