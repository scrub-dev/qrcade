import Loginout from "../components/login/loginout"
import ViewProfileBtn from "../components/profile/ViewProfileBtn"

export default () => {
    return (<>
    <div id="layout" className="flex flex-col h-screen text-white">
        <div id="banner" className="flex flex-col items-center justify-center w-screen bg-black py-3">
            <div id="title" className="w-full md:w-max flex items-center justify-center py-2">
                <h1 className="text-7xl drop-shadow-2xl qrc-shadow shadow-main font-graffiti">QRCade</h1>
            </div>
            <div id="buttons" className="grow flex items-center justify-center md:justify-end md:pr-5 py-2 gap-2">
                <ViewProfileBtn/>
                <Loginout/>
            </div>
        </div>
        <div id="content-wrapper" className="bg-black flex-grow p-10 gap-2 flex flex-col md:px-[10%] lg:px-[20%] xl:px-[25%]">

        </div>
        <div id="footer" className="text-white bg-black">
            <p>QRCade © {new Date(Date.now()).getFullYear()}</p>
        </div>
    </div>



    </>)
}