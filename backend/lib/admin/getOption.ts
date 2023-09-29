import { Option } from "../../models/option.js"

export default async (name: string) => {
    let optionVal = await Option.findOne({where: {name: name}})
    if(!optionVal) return undefined
    else return optionVal.dataValues.value
}