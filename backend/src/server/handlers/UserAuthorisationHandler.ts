import { NextFunction, Request, Response } from "express";
import JsonResponse from "../responses/JsonResponse.js";
import { getUserByUsername } from "@src/lib/models/user/getUser.js";
import { IUser } from "@src/models/user.js";

/**
 * Continues if the user requesting the endpoint is the same as the endpoint containing the users information or has admin
 */
export default async (req : Request, res : Response, next: NextFunction) => {
    if(!req.body.user) return JsonResponse.InsuffientPermissions(res).send()
    if(req.body.user.admin) next()

    let authUser = (req.body.user as IUser).UserID
    let paramUser = (await getUserByUsername(req.params.username) as IUser).UserID
    if(authUser != paramUser) return JsonResponse.InsuffientPermissions(res).send()

    next()
}