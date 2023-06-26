"use client";
import React, { ReactNode, createContext, useState } from "react";
import Modal from "./Modal";
import { ContextType } from "../ContextType";

const defaultModalContent = () => <></>;

type ModalContextProps = {
  showModal: boolean;
  modalContent: React.FC | ReactNode;
  setShowModal: (show: boolean) => void;
  setModalContent: (content: React.FC | ReactNode) => void;
  handleModal: () => void;
};

export const ModalContext = createContext<ModalContextProps | undefined>(
  undefined
);

type ModalProps = {
  children: React.ReactNode;
};

const ModalProvider: React.FC<ContextType> = ({ children }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState<React.FC | ReactNode>(
    () => defaultModalContent
  );

  const handleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <ModalContext.Provider
      value={{ setModalContent, setShowModal, handleModal, showModal, modalContent }}
    >
      <div className={showModal ? `` : ""}>{children}</div>
      {showModal && (
        <Modal/>
      )}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
