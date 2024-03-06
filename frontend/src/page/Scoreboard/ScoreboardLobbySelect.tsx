import BackButton from "../../components/core/BackButton"
import ScoreboardLobbyList from "../../components/score/ScoreboardLobbyList"

export default () => {
    return (
        <div id="layout" className="flex flex-col h-screen text-white">
            <div id="banner" className="flex flex-col items-center justify-center w-screen bg-black pt-3">
                <div id="title" className="w-full md:w-max flex items-center justify-center py-2">
                    <h1 className="text-5xl drop-shadow-2xl qrc-shadow shadow-main font-graffiti text-center">Select a Lobby</h1>
                </div>
                <div id="buttonRow1" className="grow flex flex-wrap items-center justify-center md:justify-end py-2 gap-2">
                    <BackButton/>
                </div>
            </div>
            <div id="content-wrapper" className="bg-black flex-grow px-10 gap-2 flex flex-col md:px-[10%] lg:px-[20%] xl:px-[25%] items-center pt-5">
                <ScoreboardLobbyList/>
            </div>
        </div>
    )
}