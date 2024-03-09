import { useState, useEffect } from "react";

export interface SHOOTER_FFAScoreboardProps {
    data: any;
    parentCallback: any;
}

export default (props: SHOOTER_FFAScoreboardProps) => {

    const [players, setPlayers] = useState<any>([])

    useEffect(() => {
        (async () => {
            setPlayers(props.data.Players.map((player: any) => {
                return {
                    ...player,
                }
            }))
        })()
    }, [])

    return (
        <table className="table-fixed w-full text-left">
            <thead>
                <tr>
                    <th className="w-1/2 border-b-2 border-r-2 border-white pl-2">Player</th>
                    <th className="border-b-2 border-white pl-2">Given</th>
                    <th className="border-b-2 border-white pl-2">Taken</th>
                </tr>
            </thead>
            <tbody>
                {players.sort((p1: any, p2: any) => (p2.hitsGiven - p1.hitsGiven)).map((player: any) => { return (
                    <tr className="border-b-2 border-white" key={player.playerID}>
                        <td className="text-white text-stroke text-xl pl-2 border-r-2 ">{player.playerName}</td>
                        <td className="text-whtie text-stroke text-xl pl-2">{player.hitsGiven}</td>
                        <td className="text-whtie text-stroke text-xl pl-2">{player.hitsTaken}</td>
                    </tr>
                    )
                })}
            </tbody>
        </table>
    )
}