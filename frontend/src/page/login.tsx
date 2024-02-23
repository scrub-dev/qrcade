import LoginForm from "../components/login/LoginForm"

export default () => {
    return (<>
        <div id="loginContainer" className="h-screen w-screen flex items-center justify-center bg-black">
            <div className="bg-black rounded-lg p-5 flex flex-col items-center justify-center">
                <h1 className="text-5xl drop-shadow-2xl qrc-shadow shadow-main font-graffiti text-white pb-5">QRCade</h1>
                <LoginForm/>
            </div>
        </div>
    </>)
}