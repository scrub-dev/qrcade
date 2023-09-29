import {Option} from '../../models/option.js'

export default async (optionStr: string, value: string) => {
    let option = await Option.findOne({where : {name : optionStr.toUpperCase()}})

    if(!option) return undefined

    await option.update({value: value})
    await option.save()

    return true
}