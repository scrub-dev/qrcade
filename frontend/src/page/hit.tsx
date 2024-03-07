import { useParams } from "react-router-dom"

export default () => {

    const { hitid } = useParams<{hitid: string}>()

    const getHitType = () => {
        if(hitid && hitid.includes("-")) return hitid.split("-")[0]
        else return "UNKNOWN"
    }

    const hitRouter = (hitType: string) => {
        switch(hitType){
            case "FLAG": return "FLAG"
            case "PLAYER": return "PLAYER"
            default: return "INVALID"
        }
    }

    return (
        <div id="layout" className="flex flex-col h-screen text-white">
            <div id="banner" className="flex flex-col items-center justify-center w-screen bg-black pt-3">
                <div id="title" className="w-full md:w-max flex items-center justify-center py-2">
                    <h1 className="text-7xl drop-shadow-2xl qrc-shadow shadow-main font-graffiti">QRCade</h1>
                </div>
                <div id="buttonRow1" className="grow flex flex-wrap items-center justify-center md:justify-end py-2 gap-2">
                </div>
            </div>
            <div id="content-wrapper" className="bg-black flex-grow px-10 gap-2 flex flex-col md:px-[10%] lg:px-[20%] xl:px-[25%]">
                <p>HIT {hitRouter(getHitType())}</p>
            </div>
        </div>
        )
}