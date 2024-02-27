import { useNavigate } from "react-router-dom"
import BackButton from "../components/core/BackButton"
import ProfileInformationBox from "../components/profile/ProfileInformationBox"
import ChangePasswordForm from "../components/profile/ChangePasswordForm"


export default () => {
    const nav = useNavigate()

    return (<>
    <div id="layout" className="flex flex-col h-screen text-white">
        <div id="banner" className="flex flex-col items-center justify-center w-screen bg-black py-3">
            <div id="title" className="w-full md:w-max flex items-center justify-center py-2">
                <h1 className="text-7xl drop-shadow-2xl qrc-shadow shadow-main font-graffiti">Profile</h1>
            </div>
            <div id="buttons" className="grow flex items-center justify-center md:justify-end md:pr-5 py-2 gap-2">
                {/* Change to also re-signin to refresh state cookie */}
                <BackButton handleOnClick={() => nav("/dashboard")}/>
            </div>
        </div>
        <div id='warningBox' className='font-extrabold flex items-center justify-center text-center bg-black px-5'>
            <p className="text-failure ">Warning: Changing values will require you to log back in.</p>
        </div>
        <div id="content-wrapper" className="bg-black flex-grow pt- p-5 gap-2 flex flex-col md:px-[10%] lg:px-[20%] xl:px-[25%]">
            <div className="flex flex-col px-[10%] sm:px-[20%] gap-2">
                <ProfileInformationBox/>
                <ChangePasswordForm/>
            </div>
        </div>
        <div id="footer" className="text-white bg-black">
            <p>QRCade © {new Date(Date.now()).getFullYear()}</p>
        </div>
    </div>



    </>)
}