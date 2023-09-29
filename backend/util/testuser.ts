import hashPword from "../lib/auth/auth/hashPword.js";
import { User } from "../models/user.js";

export default async () => {
    User.create({
        id: 11111,
        pword: await hashPword("123"),
        uname: "scrub",
        is_admin: true,
    })
    User.create({
        id: 22222,
        pword: await hashPword("123"),
        uname: "notScrub",
        is_admin: true,
    })
}