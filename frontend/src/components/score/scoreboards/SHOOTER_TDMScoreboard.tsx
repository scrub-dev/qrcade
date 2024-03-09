import { useEffect, useState } from "react";

export interface SHOOTER_TDMScoreboardProps {
    data: any;
    parentCallback: any;
}
export default (props: SHOOTER_TDMScoreboardProps) => {

    const [teams, setTeams] = useState<any>([])
    const [players, setPlayers] = useState<any>([])

    const getPlayerTeam = (player: any, teams: any[]) => {
        let res = teams.filter(team => team.teamID == player.teamID)
        return res[0]
    }

    useEffect(() => {
        (async () => {
            setTeams(props.data.Teams)
            setPlayers(props.data.Players.map((player: any) => {
                return {
                    ...player,
                    team: getPlayerTeam(player, props.data.Teams)
                }
            }))
        })()
    }, [])

    return (
    <div>
        <div id="teamSect">
            <table className="table-fixed w-full text-left">
                <thead>
                    <tr>
                        <th className="pl-2">Team</th>
                        <th className="pl-2">Score</th>
                    </tr>
                </thead>
                <tbody>
                    {teams.sort((t1: any, t2: any) => (t2.teamScore - t1.teamScore)).map((team: any) => { return (
                        <tr className="border-b-2 border-black" style={{backgroundColor: team.teamColour}} key={team.teamID}>
                            <td className="text-white text-stroke text-xl pl-2 border-r-2 border-black">{team.teamName}</td>
                            <td className="text-whtie text-stroke text-xl pl-2">{team.teamScore}</td>
                        </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
        <div id="playerSect">
            <table className="table-fixed w-full text-left">
                <thead>
                    <tr>
                        <th className="w-1/2 pl-2">Player</th>
                        <th className="pl-2">Given</th>
                        <th className="pl-2">Taken</th>
                    </tr>
                </thead>
                <tbody>
                    {players.sort((p1: any, p2: any) => (p2.hitsGiven - p1.hitsGiven)).map((player: any) => { return (
                        <tr className="border-b-2 border-black" style={{backgroundColor: player.team.teamColour}} key={player.playerID}>
                            <td className="text-white text-stroke text-xl pl-2 border-r-2 border-black">{player.playerName}</td>
                            <td className="text-whtie text-stroke text-xl pl-2">{player.hitsGiven}</td>
                            <td className="text-whtie text-stroke text-xl pl-2">{player.hitsTaken}</td>
                        </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    </div>)
}