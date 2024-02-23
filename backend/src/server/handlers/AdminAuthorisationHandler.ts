import { NextFunction, Request, Response } from "express";
import JsonResponse from "../responses/JsonResponse.js";

export default (req : Request, res : Response, next: NextFunction) => {
    if(!req.body.user || !req.body.user.admin) return JsonResponse.InsuffientPermissions(res).send()
    next()
}