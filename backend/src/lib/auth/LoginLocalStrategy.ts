import { sequelize } from '@lib/database/database.js'
import { getUserByUsername } from '@lib/models/user/getUser.js'
import passport from 'passport'
import {Strategy as LocalStrategy} from 'passport-local'
import { AuthState } from './states.js'
import validatePassword from '@lib/user/validatePassword.js'
import { Model } from 'sequelize'
import { LogType, Log } from '@lib/logging/log.js'
import { IUser } from '@src/models/user.js'

export default () => {
    passport.use('auth', new LocalStrategy(
        {
            usernameField: "uname",
            passwordField: "pword"
        },
        //@ts-ignore
        async (username, password, done: (err: Error | null, user: IUser | boolean, {message: string, state: AuthState}) => void) => {
            const user =  (await getUserByUsername(username)) as IUser

            if(!user) return done(null, false, {message: "User not Found", state: AuthState.FAILED_NO_USER})

            const validated = validatePassword(password, user.Passwd)

            if(!validated) return done(null, false, {message: "Wrong Password", state: AuthState.FAILED_WRONG_PASSWORD})

            return done(null, user, { message: 'Logged in Successfully', state: AuthState.SUCCESS_AUTH});
        }))
}
