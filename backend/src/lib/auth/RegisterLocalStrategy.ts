import { getUserByUsername } from '@lib/models/user/getUser.js'
import passport from 'passport'
import {Strategy as LocalStrategy} from 'passport-local'
import { AuthState } from './states.js'
import createUser from '@lib/models/user/createUser.js'
import hashPassword from '@lib/user/hashPassword.js'

export default () => {passport.use('register', new LocalStrategy({usernameField: "uname", passwordField: "pword"}, async (uname: string, pword: string, cb: Function) => {
        const foundUser: any = await getUserByUsername(uname)

        if(foundUser) return cb(false, {state: AuthState.FAILED_EXISTING_USER})

        let x = await createUser({
            userName: uname,
            passwd  : hashPassword(pword)
        })

        return cb(null, x, {state: AuthState.SUCCESS_REGISTER})
    }))
}
