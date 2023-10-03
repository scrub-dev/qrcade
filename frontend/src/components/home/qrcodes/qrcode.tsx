import {QRCodeSVG} from 'qrcode.react'
import { getFrontendURI } from '../../../util/http'

export default (props: any) => {
    const x = `${getFrontendURI()}/hit?h=${props.userID}`
    return <QRCodeSVG
                value={x}
                size={(props.size) ? props.size : 600}
                includeMargin = {props.margin}
            />

}