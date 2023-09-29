import { User } from "../../../models/user.js"
import randomNum from "../../../util/randomNum.js"

export default () => {
    const idLen = 5
    let id = randomNum(idLen)
    while(!User.findOne({where: {id : id}})){
        id = randomNum(idLen)
    }
    return id
}