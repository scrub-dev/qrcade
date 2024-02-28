import { NextFunction, Request, Response } from "express";
import JsonResponse from "../responses/JsonResponse.js";

/**
 * Continues if the user requesting the endpoint is authenticated and has admin permissions
 */
export default (req : Request, res : Response, next: NextFunction) => {
    if(!req.body.user || !req.body.user.Admin) return JsonResponse.InsuffientPermissions(res).send()
    next()
}