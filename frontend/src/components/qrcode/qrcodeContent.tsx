import Qrcode from "./qrcode"

export interface TQRCodeContentProps {
    ID: string
}


export default (props: TQRCodeContentProps) => {
    return (
        <div className="w-screen h-screen">
            <div className="w-full flex flex-col items-center justify-center py-16">
                <p className="text-5xl font-graffiti font-bold">QRCade</p>
                <p className="text-3xl font-mono font-bold">{props.ID}</p>
            </div>
                    <div className="flex flex-col items-center justify-center">
                        <div className="flex-grow flex-1">
                            <Qrcode ID={props.ID}/>
                        </div>
                </div>
            </div>
    )
}