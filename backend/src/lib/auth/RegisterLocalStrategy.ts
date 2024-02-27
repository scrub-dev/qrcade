import { getUserByUsername } from '@lib/models/user/getUser.js'
import passport from 'passport'
import {Strategy as LocalStrategy} from 'passport-local'
import { AuthState } from './states.js'
import createUser from '@lib/models/user/createUser.js'
import { IUser } from '@src/models/user.js'

export default () => {
    passport.use('register', new LocalStrategy({
        usernameField: "uname",
        passwordField: "pword"
    },
    //@ts-ignore
    async (username: string, password: string, done: (err: Error | null, user: IUser | boolean, {message: string, state: AuthState}) => void) => {
        const foundUser: IUser = (await getUserByUsername(username)) as IUser
        if(foundUser) return done(null, false, {message: "A user already exists with this username" , state: AuthState.FAILED_EXISTING_USER})

        let newUser = (await createUser({
            userName: username,
            passwd: password
        })) as IUser

        return done(null, newUser, {message: "New user created", state: AuthState.SUCCESS_REGISTER})

    }))
}