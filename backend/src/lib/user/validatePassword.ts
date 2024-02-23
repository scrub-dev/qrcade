import bcrypt from 'bcrypt'
export default (password: string, storedPassword: string) => {
    return bcrypt.compareSync(password, storedPassword)
}