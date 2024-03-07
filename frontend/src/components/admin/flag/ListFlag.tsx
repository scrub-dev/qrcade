import { useEffect, useState } from "react"
import request from "../../util/connection/request"
import Flag from "./Flag"
import Button from "../../core/Button"
import PrintQRCodes from "../../qrcode/printQRCodes"

export interface TListFlagProps {
    lobbyID: string
}
export default (props: TListFlagProps) => {
    const [error, setError] = useState("No Results" as string)
    const [flags, setFlags] = useState([])

    const getFlags = async () => {
        const res = (await request.get(`lobby/${props.lobbyID}/flags`)).data
        if(res.code != "SUCCESS") return setError(`${res.message}`)
        setFlags(res.data)
    }

    useEffect(() => {
        (async () => {
            getFlags()
        })()
    }, [])

    const flagComponent = flags.map((flag: any) => <Flag key={flag.FlagID} flag={flag}/>)

    return (<>
        <div className="w-full h-full flex flex-col items-center gap-1">
            {flags?.length > 0 ? flagComponent : <p className="text-2xl text-white font-mono font-bold">{error}</p>}
        </div>
        <PrintQRCodes IDList={flags.map((e: any) => e.FlagID)}/>
        <Button text={"Refresh"} onClick={() => {getFlags()}} className="font-graffiti p-1 w-full bg-main text-2xl rounded"/>
        </>)
}