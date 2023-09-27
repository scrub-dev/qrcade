import express, { Request, Response, NextFunction, Router }  from 'express'
import { debugWebPrint } from './util/print.js'
import passport from 'passport'
import jwt from 'jsonwebtoken'

import './api/auth/auth.js'
import './api/auth/register.js'


export const app = express()
const router = express.Router()

const webLogger = (req: Request, res: Response, next: NextFunction) => {
    debugWebPrint(`Path: ${req.url} | Time: ${new Date(Date.now()).toUTCString()}`)
    next()
}

app.use(webLogger)
app.use(router)

router.post('/register', passport.authenticate('register', {session : false}),
    async (req, res) => {
        res.send({message: "Registration Successful", user: req.user, status: 200})
    }
)

router.post('/auth',
async (req, res, next) => {
    passport.authenticate('auth',
      async (err, user, info) => {
        if (err) next(new Error('An error occurred.'));
        req.login(
            user,
            { session: false },
            async (error) => {
                if(!user) return res.json({status: 400, message: "User does not exist"})
                if (error) return next(error);

                const body = { _id: user._id, email: user.email };
                const token = jwt.sign({ user: body }, process.env.JWT_SECRET);

                return res.json({ token });
            }
        );
        }
    )(req, res, next);
  }, (req, res) => {console.log("test")}
)

router.get("/", (req: Request, res: Response) => {
    res.send("Hello World").status(200).end()
})


router.get("/getuser", (req: Request, res: Response) => {
    res.send("Hello GETUSER").status(200).end()
})

router.get("/hit", (req: Request, res: Response) => {
    res.send("YOU SHOT SOMEONE!!!!!111").status(200).end()
})