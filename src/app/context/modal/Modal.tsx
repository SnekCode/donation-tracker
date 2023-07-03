"use client"
import React from "react";
import ReactDOM from "react-dom";
import { useProvider } from "../useProvider";
import { ModalContext } from "./ModalProvider";
import { useTheme } from "../theme/ThemeProvider";


const Modal = () => {
    const {handleModal, modalContent, showModal} = useProvider(ModalContext);
    const theme = useTheme()

    if (!React.isValidElement(modalContent)) {
        return null;
    }

    const handleOuterClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
          handleModal();
        }
      };

  if (showModal) {
    return ReactDOM.createPortal(
      <div
        className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-opacity-75 blur-none"
        onKeyDown={(e) => {
            if (e.key === "Escape") {
                handleModal();
            }
        }}
        onClick={handleOuterClick}

      >
          <p>{modalContent}
        <button onClick={handleModal} className={`text-center w-full ${theme.inputfieldbg} ${theme.text} ${theme.hover} ${theme.border}`}>Close</button>
          </p>
      </div>,
     document.querySelector("#modal-root")
    );
  } else return null;
};

export default Modal;