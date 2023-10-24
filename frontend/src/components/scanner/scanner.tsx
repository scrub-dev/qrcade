import { useState, useRef, useEffect, useCallback } from "react";
import Quagga from '@ericblade/quagga2'
import Camera from "./camera";

export const Scanner: any = () => {
    const [scanning, setScanning] = useState(false); // toggleable state for "should render scanner"
    const [cameras, setCameras] = useState([]); // array of available cameras, as returned by Quagga.CameraAccess.enumerateVideoDevices()
    const [cameraId, setCameraId] = useState(null); // id of the active camera device
    const [cameraError, setCameraError] = useState(null); // error message from failing to access the camera
    const [result, setResult] = useState(""); // list of scanned results
    const [torch, setTorch] = useState(false); // toggleable state for "should torch be on"
    const scannerRef = useRef(null); // reference to the scanner element in the DOM

    useEffect(() => {
        const enableCamera = async () => await Quagga.CameraAccess.request(null, {})
        const disableCamera = async () => await Quagga.CameraAccess.release()
        const enumerateCamera = async () => await Quagga.CameraAccess.enumerateVideoDevices()
        const disableTorch =async () => Quagga.CameraAccess.disableTorch()

        enableCamera()
            .then(disableCamera)
            .then(enumerateCamera)
            .then((c: any) => setCameras(c))
            .then(disableTorch)
            .catch(err => setCameraError(err));

            (async () => {disableCamera()})
    }, [])

    const onTorchClick = useCallback(() => {
        const t = !torch
        setTorch(t)

        if(t) Quagga.CameraAccess.enableTorch()
        else Quagga.CameraAccess.disableTorch()

    }, [torch, setTorch])


    return (
        <div id="scanner-wrapper">
            {cameraError ? <p>CAMERA ERROR ${JSON.stringify(cameraError)}</p> : null}
            {cameras.length === 0 ? <p>Getting Cameras, Please allow permission to use camera</p> : null}

            <form>
                <select onChange={(e: any) => setCameraId(e.target.value)}>
                    {cameras.map((c: any) => (<option key={c.deviceId} value={c.deviceId}>{c.label || c.deviceId}</option>))}
                </select>
            </form>

            <button onClick={onTorchClick}>{torch ? 'Disable Torch' : 'Enable Torch'}</button>
            <button onClick={() => setScanning(!scanning) }>{scanning ? 'Disable Camera' : 'Enable Camera'}</button>

            <div id="scanner" ref={scannerRef}>
                <canvas id="scanner-canvas" width={640} height={400} style={
                    {
                        position: 'absolute',
                        border: '3px solid green'
                    }
                }/>
                {scanning ? <Camera scannerRef={scannerRef} cameraId={cameraId} onDetected={(result: any) => setResult(result)} onScannerReady={undefined} facingMode={undefined} /> : null}
            </div>
            {result}
        </div>
    )
}