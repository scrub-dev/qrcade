import {QRCodeSVG} from 'qrcode.react'

export default (props: any) => {
    const x = `https://localhost:5173/hit?h=${props.userID}`
    return <QRCodeSVG
                value={x}
                size={(props.size) ? props.size : 600}
                includeMargin = {props.margin}
            />

}