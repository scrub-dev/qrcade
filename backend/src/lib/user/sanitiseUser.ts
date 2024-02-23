import { IUser } from "@src/models/user";
import { cloneDeep } from "sequelize/lib/utils";

export default (u: IUser) => {
    let x = cloneDeep(u)
    x.Passwd = ""
    return x
}