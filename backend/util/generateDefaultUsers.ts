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
            pword: "Player"+(i+1),
            uname: "Player"+(i+1),
            is_admin: false
        })
    }

}