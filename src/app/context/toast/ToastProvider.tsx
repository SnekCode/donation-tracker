"use client"
import React, { ReactNode, createContext, useContext, useState } from "react";
import { ContextType } from "../ContextType";

interface ToastContextType {
  showToast: (message: string, displayTime?: string ) => void;
}

const ToastContext = createContext<ToastContextType>({
  showToast: () => {},
});

export const useToast = () => useContext(ToastContext);

export const ToastProvider: React.FC<ContextType> = ({ children }) => {
  const [toastMessage, setToastMessage] = useState<string>("");

  const showToast = (message: string, displayTime: string = "3s" ) => {

    // not needed but just incase lol
    if(!displayTime) {
        displayTime = "3s";
    }

    // parse displayTime to setToastMessage using regex to get the words and the numbers
    const stringsplit = displayTime.match(/([0-9]+)([a-z]+)/i);
    
    const time = parseFloat(stringsplit?.[1]!);
    const unit = stringsplit?.[2] as 's' | 'm' | 'h'
    const unitConversion = {
        's': 1000,
        'm': 60000,
        'h': 3600000,
    }

    setToastMessage(message);
    setTimeout(() => {
      setToastMessage("");
    }, time * unitConversion[unit]);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toastMessage && (
        <div className="fixed bottom-0 right-0 m-4">
          <div className="bg-blue-800 text-white py-2 px-4 rounded-md">
            {toastMessage}
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
};