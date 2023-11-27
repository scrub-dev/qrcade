import getScore from "./getScore.js"

export default async (userList: Array<Object>) => {
    return userList.map(async u => await getScore(u))
}