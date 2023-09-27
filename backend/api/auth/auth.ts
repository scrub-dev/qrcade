import passport from 'passport'
import {Strategy as LocalStrat }from 'passport-local'
import { User } from '../../models/user.js'
import validatePword from '../../auth/validatePword.js'

passport.use('auth', new LocalStrat(
    {
        usernameField: "uname",
        passwordField: "pword"
    },
    async (uname, pword, callback) => {
        const user = await User.findOne({where: {uname : uname}})

        if(!user) return callback(null, false, {message: "User not Found"})

        const validated = validatePword(pword, user.pword)

        if(!validated) return callback(null, false, {message: "Wrong Password"})

        return callback(null, user, { message: 'Logged in Successfully' });
    }))