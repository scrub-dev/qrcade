import { IUser } from "@src/models/user.js";
import { NextFunction, Request, Response } from "express";
import passport from "passport";

export const addUserToReqFromBearerToken = (req: Request, res: Response, next: NextFunction) => {

    passport.authenticate('jwt', {session: false}, (err: Error | null, user: IUser | boolean) => {
        if(user) req.body.user = user
        next()
    })(req, res, next)
}