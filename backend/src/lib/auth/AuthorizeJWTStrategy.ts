import { getUserByID, getUserByUsername } from '@lib/models/user/getUser.js'
import passport from 'passport'
import { AuthState } from './states.js'
import validatePassword from '@lib/user/validatePassword.js'
import { Model } from 'sequelize'
import { IUser } from '@src/models/user.js'

import {Strategy as JWTStrategy, ExtractJwt, StrategyOptionsWithoutRequest} from 'passport-jwt'
import getAuthSecret from './getAuthSecret.js'
import { sequelize } from '../database/database.js'
import sanitiseUser from '../user/sanitiseUser.js'

export default () => {

    const opts: StrategyOptionsWithoutRequest = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: getAuthSecret()
    }

    passport.use('jwt', new JWTStrategy(opts, async (payload, done) => {
        let user = (await getUserByID(payload.user._id)) || false
        if(user) user = sanitiseUser(user)
        done("", user)
    }))
}
