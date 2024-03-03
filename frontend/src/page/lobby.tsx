

export default () => {
    return (
    <div id="layout" className="flex flex-col h-screen text-white">
        <div id="banner" className="flex flex-col items-center justify-center w-screen bg-black py-3">
            <div id="title" className="w-full md:w-max flex items-center justify-center py-2">
                <h1 className="text-7xl drop-shadow-2xl qrc-shadow shadow-main font-graffiti">QRCade</h1>
            </div>
            <div id="buttonRow1" className="grow flex flex-wrap items-center justify-center md:justify-end py-2 gap-2">
            </div>
        </div>
        <div id="content-wrapper" className="bg-black flex-grow p-10 gap-2 flex flex-col md:px-[10%] lg:px-[20%] xl:px-[25%]">
            <div className="bg-main_dark rounded p-5">
                <p className="text-5xl drop-shadow-xl qrc-shadow shadow-main_light font-graffiti text-center">Lobbies</p>
                <div id="lobbyList">

                </div>
            </div>
        </div>
        <div id="footer" className="text-white bg-black">
            <p>QRCade © {new Date(Date.now()).getFullYear()}</p>
        </div>
    </div>
    )
}