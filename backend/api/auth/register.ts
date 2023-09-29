import passport from 'passport';
import {Strategy as LocalStrat }from 'passport-local'
import { User } from '../../models/user.js';
import createUid from '../../lib/auth/auth/createUid.js';
import hashPword from '../../lib/auth/auth/hashPword.js';

passport.use('register', new LocalStrat(
    {
        usernameField: 'uname',
        passwordField: 'pword'
    },
    async (uname, pword, callback) => {

        const exists = await User.findOne({where: {uname : uname}})

        if(exists) return callback("User already exists", false)

        let id = createUid()
        pword = await hashPword(pword)
        let is_admin = false
        let team = undefined

        const newUser = await User.create({
            id, pword, uname, is_admin, team
        })

        return callback(null, newUser)
    }
))