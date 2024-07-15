import React from "react";
import { IoCloseOutline } from "react-icons/io5";

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isVisible, onClose, children }) => {
  if (!isVisible) return null;

  // const handleClose = (e) =>{
  //   if( e.target.id === 'wrapped') onClose();
  // }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
      id="wrapper"
    >
      <div className="w-[600px]  flex flex-col p-[100px]">
        <button
          className="text-white text-xl place-self-end"
          onClick={() => onClose()}
        >
          <IoCloseOutline />
        </button>

        <div className="bg-white p-2 rounded">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
