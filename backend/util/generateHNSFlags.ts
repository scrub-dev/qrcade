import { Flag } from "../models/flag.js";

export default async () => {
    const GENERATE_FLAG_COUNT = 5
    const ID_LENGTH_MULTI = 3
    for(let i = 0; i < GENERATE_FLAG_COUNT; i++){
        Flag.create({
            id: +((""+(i+1)).repeat(ID_LENGTH_MULTI)),
            name: "Flag"+(i+1)
        })
    }
}