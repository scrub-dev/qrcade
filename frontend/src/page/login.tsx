import BackButton from "../components/core/BackButton"
import LoginForm from "../components/login/LoginForm"

export default () => {
    return (<>
        <div id="loginContainer" className="h-screen w-screen flex items-center justify-center bg-main_dark">
            <div className="bg-black rounded-lg p-5 shadow-2xl shadow-main_light">
                <h1 className="text-5xl drop-shadow-2xl qrc-shadow shadow-main font-graffiti text-white pb-5">QRCade</h1>
                <LoginForm/>
                <div className="flex items-center justify-center">
                    <BackButton/>
                </div>
            </div>
        </div>
    </>)
}