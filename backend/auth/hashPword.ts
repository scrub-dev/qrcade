import bcrypt from 'bcrypt'
export default async (pword: string | Buffer) => await bcrypt.hash(pword, 10)