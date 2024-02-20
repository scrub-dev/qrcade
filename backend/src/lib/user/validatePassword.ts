import bcrypt from 'bcrypt'
export default (password: string, storedPassword: string) => {
    console.log(password, storedPassword)
    return bcrypt.compareSync(password, storedPassword)
}