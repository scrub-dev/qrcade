import { sequelize } from '@lib/database/database.js'
import { getUserByUsername } from '@lib/models/user/getUser.js'
import passport from 'passport'
import {Strategy as LocalStrategy} from 'passport-local'
import { AuthState } from './states.js'
import validatePassword from '@lib/user/validatePassword.js'
import { Model } from 'sequelize'
import { LogType, Log } from '@lib/logging/log.js'

export default () => {
    // passport.use('auth', new LocalStrategy(
    //     {
    //         usernameField: "username",
    //         passwordField: "password"
    //     },
    //     async (uname: string, pword: string, cb: Function) => {

    //         Log("TEST", LogType.API)

    //     const foundUser: any = await getUserByUsername(s, uname)

    //     if(!foundUser) return cb(null, false, {state: AuthState.FAILED_NO_USER})

    //     const validated = validatePassword(pword, foundUser.Passwd)

    //     if(!validated) return cb(null, false, {state: AuthState.FAILED_WRONG_PASSWORD})

    //     return cb(null, foundUser as Model, {state: AuthState.SUCCESS_AUTH})
    // }))
    passport.use('auth', new LocalStrategy(
        {
            usernameField: "uname",
            passwordField: "pword"
        },
        //@ts-ignore
        async (uname, pword, callback) => {
            const user =  await getUserByUsername(uname)

            if(!user) return callback(null, false, {message: "User not Found"})

            //@ts-ignore
            const validated = validatePassword(pword, user.pword)

            if(!validated) return callback(null, false, {message: "Wrong Password"})

            return callback(null, user, { message: 'Logged in Successfully' });
        }))
}
