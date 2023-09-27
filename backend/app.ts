import express, { Request, Response, NextFunction, Router }  from 'express'
import { debugWebPrint } from './util/print.js'
import passport from 'passport'
import jwt from 'jsonwebtoken'
import cors from 'cors'

import './api/auth/auth.js'
import './api/auth/register.js'
import { User } from './models/user.js'


export const app = express()
const router = express.Router()

const webLogger = (req: Request, res: Response, next: NextFunction) => {
    debugWebPrint(`Path: ${req.url} | Time: ${new Date(Date.now()).toUTCString()}`)
    next()
}

app.use(cors())
app.use(webLogger)
app.use(express.json())
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
                if(!user) return res.json({status: 400, message: info.message})
                if (error) return next(error);

                const body = { _id: user._id, email: user.email };
                const token = jwt.sign({ user: body }, process.env.JWT_SECRET);

                return res.json({ token });
            }
        );
        }
    )(req, res, next);
  }
)

router.get("/", (req: Request, res: Response) => {
    res.send("Hello World").status(200).end()
})

router.get("/getID", async (req: Request, res: Response) => {
    let user = await User.findOne({where: {uname : req.query.uname}})
    if(!user) return res.json({message: "User does not exist"}).status(204).end()
    else res.json({id: user.dataValues["id"]}).status(200).end()
})
router.get("/getUname", async (req: Request, res: Response) => {
    let user = await User.findOne({where: {id : req.query.id}})
    if(!user) return res.json({message: "User does not exist"}).status(204).end()
    else res.json({id: user.dataValues["uname"]}).status(200).end()
})

router.get("/hit", (req: Request, res: Response) => {
    res.send("YOU SHOT SOMEONE!!!!!111").status(200).end()
})

router.get("/brew", async (req: Request, res: Response) => {
    res.status(418).end()
})