import { useNavigate } from "react-router-dom"
import Button, { defaultButtonStyleAlt } from "../components/core/Button"
import Loginout from "../components/login/loginout"
import ViewScoreBtn from "../components/score/ViewScoreBtn"

export default () => {

    const nav = useNavigate()

    return (<>
    <div id="layout" className="flex flex-col h-screen text-white">
        <div id="banner" className="flex flex-wrap w-screen bg-black py-3">
            <div id="title" className="w-full md:w-max flex items-center justify-center py-2 md:pl-5">
                <h1 className="text-7xl drop-shadow-2xl qrc-shadow shadow-main font-graffiti">QRCade</h1>
            </div>
            <div id="buttons" className="grow flex flex-wrap items-center justify-center md:justify-end md:pr-5 py-2 gap-2">
                <ViewScoreBtn/>
                <Loginout isRoot={true}/>
            </div>
        </div>
        <div id="content-wrapper" className="bg-black flex-grow pt-5 px-10 gap-2 flex flex-col md:px-[10%] lg:px-[20%] xl:px-[25%]">
            <div id="content1" className="rounded justify-center bg-main_light p-2 shadow-lg shadow-main_light hover:bg-main_dark hover:shadow-main_dark transition-all">
                <p className="text-2xl text-center">Welcome to QRCade!</p>
                <p className="pt-1 text-center">QRCade is a simple, mobile gaming platform designed around open play!</p>
                <br></br>
                {/* <p className=" text-xl">Minimum Requirements:</p>
                <div className="ml-10">
                    <ul className="list-disc ">
                        <li>A mobile phone with an internet connection.</li>
                        <li>Said phone being able to scan QR Codes, either through:</li>
                            <div className="ml-10">
                                <ul className="list-disc ">
                                    <li>The Phone Camera.</li>
                                    <li>A 3rd Party App.</li>
                                </ul>
                            </div>
                        <li>Access to a printer if you need to print off your own QR Code or are running a game.</li>
                    </ul>
                </div> */}
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
                <Button text={"About QRCade"} onClick={() => {nav("/")}} className={defaultButtonStyleAlt + " w-full md:w-max"}/>
                <Button text={"How 2 Play"} onClick={() => {nav("/")}} className={defaultButtonStyleAlt + " w-full md:w-max "}/>
                <a target='_blank' rel='noopener noreferrer' href="https://scrub-dev.com" className={defaultButtonStyleAlt + " w-full md:w-max text-center"}>My Website</a>
                <a target='_blank' rel='noopener noreferrer' href="https://github.com/scrub-dev" className={defaultButtonStyleAlt + " w-full md:w-max text-center"}>My Projects</a>
                <a target='_blank' rel='noopener noreferrer' href="https://ko-fi.com/scrubdev" className={defaultButtonStyleAlt + " w-full md:w-max text-center"}>Support Me</a>
            </div>
        </div>
        <div id="footer" className="text-white bg-black">
            <p>QRCade © {new Date(Date.now()).getFullYear()}</p>
        </div>
    </div>



    </>)
}