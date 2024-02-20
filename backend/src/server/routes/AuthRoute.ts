
import { AuthState } from '@lib/auth/states.js'
import { login, register } from '@server/controllers/AuthController.js'
import express from 'express'
import passport from 'passport'
import { Model } from 'sequelize'
export const router = express.Router()



router.get("/test", (req, res) => {
    res.json({"Time": new Date(Date.now()).toUTCString(), message: "HELLOWORLD"}).end()
})

// router.post("/login", (req, res, next) => {
//     console.log(req)
//     passport.authenticate('auth',{session: false}, async (err: Error | null, user: Model<any, any>, info: { state: AuthState }) => login(err,user,info,req,res))(res,req, next)
// })
router.post('/auth',
async (req, res, next) => {
    passport.authenticate('auth',
    //@ts-ignore
      async (err, user, info) => {
        if (err) next(new Error('An error occurred.'));
        req.login(
            user,
            { session: false },
            async (error) => {
                if(!user) return res.json({status: 400, message: info.message})
                if (error) return next(error);


                return res.json({ "abc" : 123 });
            }
        );
        }
    )(req, res, next);
  }
)

router.post("/register", (req, res) => {
    passport.authenticate('register', {session: false}, async (err: Error | null, user: Model, info: {state: AuthState}) => register(err, user, info, req, res))
})