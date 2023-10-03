export default (props : any) => {
const calcTeam = (colour: string) => {

    let val = ["",""]

    switch (colour) {
        default: val = ["Free for All", "#000000", "#FFFFFF"]; break;
        case "NOTEAM": val = ["Free for All", "#000000", "#FFFFFF"]; break;
        case "RED": val = ["Red Team", "#FF0000", "#FFFFFF"]; break;
        case "BLUE": val = ["Blue Team", "#0000FF", "#FFFFFF"]; break;
    }
    return val
}

const [teamName, teamColour, textColor] = calcTeam(props.team)

return <div style={{backgroundColor: teamColour, color: textColor}} className="text-3xl py-2 font-graffiti text-center">{teamName}</div>
}