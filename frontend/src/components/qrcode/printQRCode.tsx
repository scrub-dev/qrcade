import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import QrcodeContent from './qrcodeContent';
import Button from '../core/Button';


export interface TPrintQRCodeProps {
    ID: string
}

export default (props: TPrintQRCodeProps) => {
  const componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
    <div style={{display: "none"}}>
      <div ref={componentRef} style={{overflow: "initial"}}>
        <QrcodeContent ID={props.ID}/>
      </div>
    </div>
        <Button text={'QR Code'} onClick={handlePrint}/>
    </>
  );
};