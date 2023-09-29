import express, { Request, Response, NextFunction, Router }  from 'express'
import { debugWebPrint } from './util/print.js'
import passport from 'passport'
import jwt from 'jsonwebtoken'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import './api/auth/auth.js'
import './api/auth/register.js'
import { User } from './models/user.js'
import { Hit } from './models/hits.js'
import getOption from './lib/admin/getOption.js'
import getTeam from './lib/game/getTeam.js'
import playerExists from './lib/game/playerExists.js'
import isAdmin from './lib/admin/isAdmin.js'
import setOption from './lib/admin/setOption.js'
import clearHits from './lib/admin/clearHits.js'
import setTeam from './lib/game/setTeam.js'
import clearTeams from './lib/admin/clearTeams.js'


export const app = express()
const router = express.Router()


const frontend = (process.env.NODE_ENV === 'development') ? "http://localhost:5173" : "https://qrcade.xyz"



const webLogger = (req: Request, res: Response, next: NextFunction) => {
    debugWebPrint(`Path: ${req.url} | Time: ${new Date(Date.now()).toUTCString()}`)
    next()
}

app.use(cors({
    origin: frontend,
    credentials: true,
    optionsSuccessStatus: 200
}))

app.use(webLogger)
app.use(express.json())
app.use(cookieParser())
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
    else res.json({uname: user.dataValues["uname"]}).status(200).end()
})

router.get("/hit", async (req: Request, res: Response) => {

    let errMessage = ""
    let errStatus = ""

    let time = new Date(Date.now())
    let target_id = req.query.id
    let shooter_id = JSON.parse(req.cookies._qrcade_state).id


    if(!await playerExists(+req.query.id) || ! await playerExists(+target_id)){
        return res.json({message: "invalid", status: "INVALID HTI"}).status(200).end()
    }


    let validHit = true

    let lastMatchingHit =  await Hit.findOne({where: [{player: shooter_id}, {player_hit: target_id}], order: [["createdAt", "DESC"]] })

    if(lastMatchingHit){
        let lastHitTime = new Date(lastMatchingHit.dataValues.createdAt)
        let threshold = 5

        let thresholdTime = new Date(lastHitTime.getTime() + (threshold * 1000))

        if(time <= thresholdTime) {
            validHit = false
            errMessage = "Success"
            errStatus = "DUPLICATE"
        }
    }

    if(await getOption("GAMEMODE") == "TEAM"){
        let playerTeam = await getTeam(+shooter_id)
        let targetTeam = await getTeam(+target_id)

        if(!playerTeam) {
            validHit = false
            errMessage = "You are not on a team, please join one to play in the team game!"
            errStatus = "PLAYER_NO_TEAM"
        }

        if(!targetTeam){
            validHit = false
            errMessage = "They're not on a team!"
            errStatus = "TARGET_NO_TEAM"
        }

        if(playerTeam == targetTeam){
            validHit == false
            errMessage = "You're on the same team!"
            errStatus = "PLAYER_TARGET_SAME_TEAM"
        }
    }
    if(validHit) {
        Hit.create({
            player: shooter_id,
            player_hit: target_id,
            team: await getTeam(+shooter_id)
        })
        return res.json({message: "Success", status: "SUCCESS"}).status(201).end()
    } else return res.json({message: errMessage || "invalid", status: errStatus}).status(200).end()
})

router.get("/getteam", async (req: Request, res: Response) => {
    let userID = JSON.parse(req.cookies._qrcade_state).id

    let user = await User.findOne({where : {id : userID}})
    if(!user) return res.json({satus: "FAILED", message: "User does not exist"}).status(200).end()

    let team = await getTeam(userID)
    if(team == null) team == "NOTEAM"

    res.json({result: team, status: "SUCCSS"}).end
})
router.get("/setteam", async (req: Request, res: Response) => {
    let userID = JSON.parse(req.cookies._qrcade_state).id

    let user = await User.findOne({where : {id : userID}})
    if(!user) return res.json({satus: "FAILED", message: "User does not exist"}).status(200).end()

    let team = req.query.team as string
    if(!team) return res.json({satus: "FAILED", message: "User does not exist"}).status(200).end()

    let validTeamArr = ["RED", "BLUE", "NOTEAM"]
    if(!validTeamArr.includes(team)) return res.json({satus: "FAILED", message: "Invalid Team"}).status(200).end()

    let result = await setTeam(userID, team == null ? "NOTEAM" : team)
    if(!result) return res.json({satus: "FAILED", message: "Invalid"}).status(200).end()
    else return res.json({satus: "SUCCESS", message: "Team changed"}).status(200).end()
})
router.get("/getTeamScore", async (req: Request, res: Response) => {

    let isTeamGame = (await getOption("GAMEMODE")) === "TDM"
    if(!isTeamGame) return res.json({message: "Mode is currently FFA, no team stats available", status: "FAILED"}).status(200).end()

    let userID = JSON.parse(req.cookies._qrcade_state).id
    let user = await User.findOne({where : {id : userID}})
    if(!user) return res.json({message: "No User specified", status: "FAILED"}).status(200).end()

    let redCount =  await Hit.count({ where: {team : "RED"}})
    let blueCount =  await Hit.count({ where: {team: "BLUE"}})

    return res.json({status: "SUCCESS", results: {
        red : redCount,
        blue : blueCount
    }}).status(200).end()
})
router.get("/getPlayerScore", async (req: Request, res: Response) => {
    let userID = JSON.parse(req.cookies._qrcade_state).id

    let user = await User.findOne({where : {id : userID}})
    if(!user) return res.json({value: false}).status(200).end()

    let playerHitCount =  await Hit.count({ where: {player : user.dataValues.id}})
    let hitPlayerCount =  await Hit.count({ where: {player_hit : user.dataValues.id}})

    return res.json({status: "SUCCESS", results: {
        youHit : playerHitCount,
        hitYou : hitPlayerCount
    }}).status(200).end()

})

router.get("/admin/isadmin", async (req: Request, res: Response) => {
    let userID = JSON.parse(req.cookies._qrcade_state).id

    let user = await User.findOne({where : {id : userID}})
    if(!user) return res.json({value: false}).status(200).end()

    if(await isAdmin(userID)) return res.json({value: true}).status(200).end()
    else return res.json({value: false}).status(200).end()
})
router.get("/admin/clearhits", async (req: Request, res: Response) => {

    let userID = JSON.parse(req.cookies._qrcade_state).id
    if(!await isAdmin(userID)) return res.json({message: "Unauthorized"}).status(403).end()

    await clearHits()
    return res.json({message: "Hits Removed", status: "SUCCESS"}).status(201).end()

})
router.get("/admin/clearteams", async (req: Request, res: Response) => {

    let userID = JSON.parse(req.cookies._qrcade_state).id
    if(!await isAdmin(userID)) return res.json({message: "Unauthorized"}).status(403).end()

    let teamsResetResult = await clearTeams()

    return res.json({message: "Teams Reset", status: (teamsResetResult) ? "SUCCESS" : "FAILED"}).status(200).end()
})
router.get("/admin/setoption", async (req: Request, res: Response) => {

    let userID = JSON.parse(req.cookies._qrcade_state).id

    if(!await isAdmin(userID)) return res.json({message: "Unauthorized"}).status(403).end()

    let option = req.query.option as string
    let value  = req.query.value as string

    if(! await getOption(option)) return res.json({message: "Invalid Option"}).status(406).end()

    await setOption(option, value)
    return res.json({message: "Value Updated", status: "SUCCESS"}).status(201).end()

})
router.get("/admin/getoption", async (req: Request, res: Response) => {
    let userID = JSON.parse(req.cookies._qrcade_state).id

    if(!await isAdmin(userID)) return res.json({message: "Unauthorized"}).status(403).end()

    let option = req.query.option as string
    let optionRes = await getOption(option)
    if(!optionRes) return res.json({message: "Invalid Option"}).status(406).end()

    return res.json({message: optionRes , status: "SUCCESS"}).status(201).end()
})
router.get("/brew", async (req: Request, res: Response) => {
    res.status(418).end()
})