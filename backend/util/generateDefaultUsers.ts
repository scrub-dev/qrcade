import chalk from "chalk";
import hashPword from "../lib/auth/auth/hashPword.js";
import { User } from "../models/user.js";

export default async () => {
    User.create({
        id: 11111,
        pword: await hashPword("123"),
        uname: "scrub",
        is_admin: true,
    })
    const COUNT_GENERATE_USERS = 10
    for(let i = 0; i < COUNT_GENERATE_USERS; i++){
        User.create({
            id: +((""+(i+1)).repeat(3)),
            pword: await hashPword("Player"+(i+1)),
            uname: "Player"+(i+1),
            is_admin: false
        })
        console.log(`${chalk.magenta("[ SVR ]")} Default user created: Player${i+1}`)
    }

}