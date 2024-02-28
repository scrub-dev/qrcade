import { ReactNode, useState } from "react"
import { defaultButtonStyle } from "./Button"

export interface TModalProps {
    buttonName: string,
    title     : string,
    children  : ReactNode,
    style?    : string
}

export default (props: TModalProps) => {
    const [showModal, setShowModal] = useState(false);

    return (
      <>
        <button
          className={props.style || defaultButtonStyle}
          type="button"
          onClick={() => setShowModal(true)}
        >
            {props.buttonName}
        </button>
        {showModal ? (
            <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none w-full blur-none">
              <div className="relative w-50 my-6 mx-auto w-auto">
                <div className="border-1 border-main_light shadow-2xl shadow-main_light rounded-lg relative flex flex-col w-max bg-black border outline-none focus:outline-none">
                  <div className="flex items-start justify-between p-2">
                    <h3 className="text-md font-semibold">{props.title}</h3>
                  </div>
                  <div className="p-2">
                    {props.children}
                  </div>
                  <div className="flex items-center justify-end p-2">
                    <button
                      className="text-lg px-2 rounded font-graffiti text-white bg-secondary_dark hover:bg-secondary hover:shadow-lg"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      close
                    </button>
                  </div>
                </div>
              </div>
          </div>
        ) : null}
      </>
    );
  };