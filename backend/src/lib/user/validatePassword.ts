import bcrypt from 'bcrypt'
export default (password: string, storedPassword: string) => bcrypt.compareSync(password, storedPassword)