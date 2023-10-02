import LoginWidget from "../login/LoginWidget"

export default () => {
    return (
        <div className="w-full h-screen bg-black flex">

            <div className="m-auto">
            <h1 className='text-white font-graffiti text-6xl text-center py-3 drop-shadow-xl neon-glow shadow-purple-500'>QRCade</h1>
            <LoginWidget/>
            </div>
        </div>
    )
}