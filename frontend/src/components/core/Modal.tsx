import { ReactNode, useState } from "react"
import { defaultButtonStyle, defaultButtonStyleAlt } from "./Button"

export interface TModalProps {
    buttonName: string,
    title     : string
    children  : ReactNode
}

export default (props: TModalProps) => {
    const [showModal, setShowModal] = useState(false);
    return (
      <>
        <button
          className={defaultButtonStyle}
          type="button"
          onClick={() => setShowModal(true)}
        >
            {props.buttonName}
        </button>
        {showModal ? (
          <>
            <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-secondary_light outline-none focus:outline-none">
                  <div className="flex items-start justify-between p-2">
                    <h3 className="text-2xl font-semibold">{props.title}</h3>
                  </div>
                  <div className="p-2">
                    {props.children}
                  </div>
                  <div className="flex items-center justify-end p-2">
                    <button
                      className={defaultButtonStyleAlt}
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </>
    );
  };