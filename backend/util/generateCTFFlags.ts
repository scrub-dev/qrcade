import { CTFFlag } from "../models/CTFFlag"

export const async = () => {
    CTFFlag.create({
        id: 1,
        name: "Red Team Flag",
        team: "RED"
    })
    CTFFlag.create({
        id: 2,
        name: "Blue Team Flag",
        team: "BLUE"
    })
}