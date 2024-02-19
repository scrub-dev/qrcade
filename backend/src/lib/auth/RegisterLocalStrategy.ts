import { Database } from '@lib/database/database.js'
import { getHighestUserPlayerNumber, getUserByUsername } from '@lib/models/user/getUser.js'
import passport from 'passport'
import {Strategy as LocalStrategy} from 'passport-local'
import { AuthState } from './states.js'
import createUser from '@lib/models/user/createUser.js'
import hashPassword from '@lib/user/hashPassword.js'
import gameConfig from "@config/GameConfig.json" assert {type: "json"}


const s = (await Database.getInstance())

passport.use('auth', new LocalStrategy({usernameField: "uname", passwordField: "pword"}, async (uname: string, pword: string, cb: Function) => {
    const foundUser: any = await getUserByUsername(s, uname)

    if(foundUser) return cb(false, {state: AuthState.FAILED_EXISTING_USER})

    let x = createUser(s, {
        userName: uname,
        passwd  : hashPassword(pword)
    })

    return cb(null, x, {state: AuthState.SUCCESS_REGISTER})
}))
