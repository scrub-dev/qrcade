import { User } from "../../models/user.js"

export default async () => {

    let playerList = []

    let res = await User.findAll()


    res.forEach(u => {
        playerList.push({id: u.dataValues.id ,name: u.dataValues.uname})
    })

    return playerList
}