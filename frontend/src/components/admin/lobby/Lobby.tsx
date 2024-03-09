import { useEffect, useRef, useState } from "react"
import Modal from "../../core/Modal"
import request from "../../util/connection/request"
import Button from "../../core/Button"
import { useNavigate } from "react-router-dom"

export interface TLobbyProps {
    LobbyID: string,
    LobbyName: string,
    LobbyType: string,
    GameInfo: {name: string, readableName: string, rules: string[]},
    Participants: {count: number, players: any[]}
}

export default (props: TLobbyProps) => {

    const nav = useNavigate()

    const [lobbyInfo, setLobbyInfo] = useState({...props})
    const [result, setResult] = useState("")
    const [rules, setRules] = useState<any>([])

    const timeoutRef = useRef(0)
    const clearResultBox = () => setResult("")

    const setResultBox = (str: string) => {
        if(timeoutRef.current !== null) clearTimeout(timeoutRef.current)
        setResult(str)
        timeoutRef.current = setTimeout(clearResultBox, 2000)
    }

    const updateLobbyInfo = async () => {
        let res = (await request.get(`lobby/${props.LobbyID}`)).data.data
        let data = {...res}

        let ruleList = data.GameInfo.rules
        setRules(ruleList)
        setLobbyInfo(data)
    }

    const deleteLobbyHits = async () => {
        let res = (await request.delete(`admin/clear/lobbyhits/${props.LobbyID}`)).data
        setResultBox(res.message)
    }

    useEffect(() => {
        (async () => {
            updateLobbyInfo()
        })()
    }, [])

    const deleteLobby = async () => {
        let res = (await request.delete(`lobby/delete/${props.LobbyID}`)).data
        setResultBox(res.message)
    }

    const TeamComponents = (
    <>
            <Button text={"Add Team"} onClick={() => {nav(`/admin/team/add/${lobbyInfo.LobbyID}`)}} className="rounded bg-main p-1 font-mono w-full px-5"/>
            <Button text={"List Teams"} onClick={() => {nav(`/admin/team/list/${lobbyInfo.LobbyID}`)}} className="rounded bg-main p-1 font-mono w-full px-5"/>
    </>

    )
    const FlagComponents = (
    <>
        <Button text={"Add Flag"} onClick={() => {nav(`/admin/flag/add/${lobbyInfo.LobbyID}`)}} className="rounded bg-main p-1 font-mono w-full px-5"/>
        <Button text={"List Flags"} onClick={() => {nav(`/admin/flag/list/${lobbyInfo.LobbyID}`)}} className="rounded bg-main p-1 font-mono w-full px-5"/>
    </>
    )
    return (
        <Modal buttonName={`${props.LobbyName} (${props.LobbyID})`} title="Lobby Controls" style="rounded bg-main p-1 font-mono w-full">
            <p className="">
                <span className="font-bold">ID: </span><span>{lobbyInfo.LobbyID}</span><br/>
                <span className="font-bold">Name: </span><span>{lobbyInfo.LobbyName}</span> <br/>
                <span className="font-bold">Type: </span><span>{lobbyInfo.GameInfo?.readableName}</span> <br/>
                <span className="font-bold">Players: </span><span>{lobbyInfo.Participants?.count}</span>

            </p>
        <div className="flex flex-col justify-center items-center gap-3 m-5">
            {rules.includes("REQUIRED_FLAG") ? FlagComponents : null}
            {rules.includes("REQUIRED_TEAM") ? TeamComponents : null}
            <Button text={"Participants"} onClick={()=> {nav(`/list/${lobbyInfo.LobbyID}`)}} className="rounded bg-main p-1 font-mono w-full px-5"/>
            <Button text={"Delete Hits"} onClick={deleteLobbyHits} className="rounded bg-main p-1 font-mono w-full px-5"/>
            <Button text={"Delete Lobby"} onClick={deleteLobby} className="rounded bg-main p-1 font-mono w-full px-5"/>
        </div>
        <div className="flex items-center justify-center">
            <p className="text-white absolute">{result}</p>
        </div>
    </Modal>
    )
}