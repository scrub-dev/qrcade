import { Hit } from "../../models/hits.js"
import getHitPlayer from "./getHitPlayer.js"
import getPlayerHits from "./getPlayerHits.js"

export default async (playerID) => {

    let a = await getPlayerHits(playerID)
    let b = await getHitPlayer(playerID)

    return {
        playerHitCount: a,
        hitPlayerCount: b
    }
}