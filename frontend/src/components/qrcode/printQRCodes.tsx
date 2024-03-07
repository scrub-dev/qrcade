import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import QrcodeContent from './qrcodeContent';
import Button from '../core/Button';


export interface TPrintQRCodeProps {
    IDList: string[]
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
        {props.IDList.map(id => <QrcodeContent ID={id}/>)}
      </div>
    </div>
        <Button text={'QR Codes'} onClick={handlePrint} className='w-full rounded bg-main p-1 font-graffiti text-2xl'/>
    </>
  );
};