import {QRCodeSVG} from 'qrcode.react'

export default (user_id: string, size? : number) => {
    const x = `https://localhost:5173/hit?h=${user_id}`
    return <QRCodeSVG
                value={x}
                size={(size) ? size : 600}
                includeMargin
            />

}