import Loginout from "../components/login/loginout"
import ViewScoreBtn from "../components/score/ViewScoreBtn"

export default () => {
    return (<>
    <div id="layout" className="flex flex-col h-screen text-white">
        <div id="banner" className="flex flex-wrap w-screen bg-black py-3">
            <div id="title" className="w-full md:w-max flex items-center justify-center py-2 md:pl-5">
                <h1 className="text-7xl drop-shadow-2xl qrc-shadow shadow-main font-graffiti">QRCade</h1>
            </div>
            <div id="buttons" className="grow flex items-center justify-center md:justify-end md:pr-5 py-2 gap-2">
                <Loginout/>
                <ViewScoreBtn/>
            </div>
        </div>
        <div id="content-wrapper" className="bg-main_dark flex-grow p-10 gap-2 flex flex-col md:px-[10%] lg:px-[20%] xl:px-[25%]">
            <div id="content1" className="rounded justify-center bg-black p-2 shadow-lg shadow-main_light">
                <p className="text-2xl">Welcome to QRCade!</p>
                <p className="pt-1">QRCade is a simple, mobile gaming platform designed around open play!</p>
                <br></br>
                <p className=" text-xl">Minimum Requirements:</p>
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
                </div>
            </div>
            <div id="content2" className="rounded bg-black p-2 shadow-lg shadow-main_light">
                <p className="text-2xl">What is open play?</p>
                <p className="pt-1">Remeber in primary school, where you would invent games on the playground with your own rules?</p>
                <p className="">Its that!</p>
                <br></br>
                <p className="">You might now be asking yourself, how can I do open play with a mobile game?</p>
                <p className="">Don't worry, the mobile app simply provides tools for you to still do this.</p>
                <p className="">It provides a set of tools for you to build games around (of course they have to revolve around scanning a QR Code, sorry).</p>
            </div>
        </div>
        <div id="footer" className="text-white bg-black">
            <p>QRCade © {new Date(Date.now()).getFullYear()}</p>
        </div>
    </div>



    </>)
}