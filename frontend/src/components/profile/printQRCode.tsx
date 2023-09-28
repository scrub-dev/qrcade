import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import Qrcode from './qrcode';

export default (props: any) => {
  const componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
    <div style={{display: "none"}}>
        <div ref={componentRef} style={
            {
                position: "absolute",
                padding: "5%"
            }
        }>
            <h1 style={{textAlign: "center", marginTop: "5%"}} className='text-7xl'>{props.username}</h1>
            <h1 style={{textAlign: "center", marginBottom: "5%"}} className='text-4xl'>{props.userID}</h1>
            <Qrcode userID={props.userID} size={props.size} margin={props.margin} />
        </div>
    </div>
        <button onClick={handlePrint}>Print QR Code</button>
    </>
  );
};