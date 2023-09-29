import { Option } from '../models/option.js'

export default async () => {
    Option.create({
        name: "GAMEACTIVE",
        values: "FALSE"
    })
    Option.create({
        name: "GAMEMODE",
        value: "FFA"
    })
}