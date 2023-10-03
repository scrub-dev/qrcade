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
    <div className='w-full bg-black text-white py-3 flex border-y-2 border-purple-500'>
      <button onClick={handlePrint} className='inline-flex items-center bg-purple-600 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-purple-500 font-bold shadow-xl hover:shadow-purple-500/50 mx-auto'>
        <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/></svg>
        Print QR Code
      </button>
    </div>
    </>
  );
};