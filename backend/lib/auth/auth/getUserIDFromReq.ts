export default (req: { cookies: { _qrcade_state: string } }) => {
    let res = undefined

    try{
        res = JSON.parse(req.cookies._qrcade_state).id
    }catch(err){}

    return res
}