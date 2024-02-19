import { Database } from '@lib/database/database.js'
import { getUserByUsername } from '@lib/models/user/getUser.js'
import passport from 'passport'
import {Strategy as LocalStrategy} from 'passport-local'
import { AuthState } from './states.js'
import validatePassword from '@lib/user/validatePassword'


const s = (await Database.getInstance())

passport.use('register', new LocalStrategy({usernameField: "uname", passwordField: "pword"}, async (uname: string, pword: string, cb: Function) => {
    const foundUser: any = await getUserByUsername(s, uname)

    if(!foundUser) return cb(null, false, {state: AuthState.FAILED_NO_USER})

    const validated = validatePassword(pword, foundUser.Passwd)

    if(!validated) return cb(null, false, {state: AuthState.FAILED_WRONG_PASSWORD})

    return cb(null, foundUser, {state: AuthState.SUCCESS_AUTH})
}))
