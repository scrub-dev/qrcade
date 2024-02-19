import bcrypt from 'bcrypt'

const passwd = async (p: string | Buffer) => {
    return (await bcrypt.hash(p,10))
}


export default async (p: string | Buffer) => {

    return await passwd(p)
}