import { getUserByID } from '@lib/models/user/getUser.js'
import passport from 'passport'
import {Strategy as JWTStrategy, ExtractJwt, StrategyOptionsWithoutRequest} from 'passport-jwt'
import getAuthSecret from './getAuthSecret.js'
import sanitiseUser from '../user/sanitiseUser.js'
import { IUser } from '@src/models/user.js'
import { Request } from 'express'

export default () => {

    const cookieExtractor = (req: Request) => req.cookies["_qrc"] || null

    const opts: StrategyOptionsWithoutRequest = {
        jwtFromRequest: cookieExtractor,
        secretOrKey: getAuthSecret()
    }

    passport.use('jwt',new JWTStrategy(opts, async (payload, done) => {
        let user = (await getUserByID(payload.user._id)) as unknown as IUser || undefined

        if(user) user = sanitiseUser(user)

        done("", user, payload)
    }))
}
