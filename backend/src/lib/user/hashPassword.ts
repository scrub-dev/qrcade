import bcrypt from 'bcrypt'

const passwd = (p: string | Buffer) => {
    return bcrypt.hashSync(p,10)
}


export default (p: string | Buffer) => {
    return passwd(p)
}