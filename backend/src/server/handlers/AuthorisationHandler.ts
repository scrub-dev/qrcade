import { NextFunction, Request, Response } from "express";
import JsonResponse from "../responses/JsonResponse.js";

/**
 * Continues if the user requesting the endpoint is authenticated
 */
export default async (req : Request, res : Response, next: NextFunction) => {
    if(!req.body.user) return JsonResponse.InsuffientPermissions(res).send()
    next()
}