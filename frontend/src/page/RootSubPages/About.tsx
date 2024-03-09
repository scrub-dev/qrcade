import { useNavigate } from "react-router-dom"
import BackButton from "../../components/core/BackButton"
import Button from "../../components/core/Button"


export default () => {

    const nav = useNavigate()

    return (<>
    <div id="layout" className="flex flex-col h-screen text-white">
        <div id="banner" className="flex flex-wrap w-screen bg-black py-3">
            <div id="title" className="w-full md:w-max flex items-center justify-center py-2 md:pl-5">
                <h1 className="text-7xl drop-shadow-2xl qrc-shadow shadow-main font-graffiti">QRCade</h1>
            </div>
            <div id="buttons" className="grow flex flex-wrap items-center justify-center md:justify-end md:pr-5 py-2 gap-2">
                <BackButton/>
                <Button text="Home" onClick={() => nav('/')}/>
            </div>
        </div>
        <div id="content-wrapper" className="bg-black flex-grow pt-5 px-10 gap-2 flex flex-col md:px-[10%] lg:px-[20%] xl:px-[25%]">
            <div id="content1" className="rounded justify-center bg-main_light p-5 shadow-lg shadow-main_light hover:bg-main_dark hover:shadow-main_dark transition-all lg:order-1">
                <p className="text-2xl text-center">What?!</p>
                <p className="pt-1 text-left">Oringinally, QRCade was a prototype platform, rapidly developed for a masters research project to help answer questions around the gamification of QR Codes.</p>
                <p className="pt-1 text-left">This Platform is designed to be a pseudo-laser-tag like experience and its possibilities were quickly realised, thus becoming a more thorough product.</p>

            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 pt-4 lg:order-0">
            </div>
        </div>
        <div id="footer" className="text-white bg-black">
            <p>QRCade © {new Date(Date.now()).getFullYear()}</p>
        </div>
    </div>
    </>)
}