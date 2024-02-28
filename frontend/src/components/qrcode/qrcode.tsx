import { QRCodeSVG } from "qrcode.react"

export interface TQRCodeProps {
    ID: string
}

export default (props: TQRCodeProps) => {
    let val = `${window.location.protocol}//${window.location.hostname}/hit?h=${props.ID}`
    return <QRCodeSVG value={val} size={700}/>
}