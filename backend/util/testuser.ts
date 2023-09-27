import hashPword from "../auth/hashPword.js";
import { User } from "../models/user.js";

export default async () => {
    User.create({
        id: 123,
        pword: await hashPword("123"),
        uname: "123",
        is_admin: true,
        team: "red"
    })
}