export default (): string => {
    let secret = (process.env.JWT_SECRET) ? process.env.JWT_SECRET : undefined;
    if(!secret) throw Error(`KEY NOT SET, set key in .env "JWT_SECRET"`)
    return secret
}