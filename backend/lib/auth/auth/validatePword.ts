import bcrypt from 'bcrypt'
export default async (pword, hashedpword) => bcrypt.compare(pword, hashedpword)