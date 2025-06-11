'use client';
import React from 'react'
import {FaTimes} from 'react-icons/fa';

interface ModalProps{
    isOpen:boolean,
    onClose:()=>void;
    children:React.ReactNode;
    className?:string
}

const Modal: React.FC<ModalProps> = ({isOpen, onClose, children}) =>{

    //if modal is not open, render nothing
    if(!isOpen) return null;
    return(
        <div className="fixed inset-0 z-50 flex items-center 
        justify-center bg-black bg-opacity-50">

        <button 
        onClick={onClose}
        className='absolute top-5 right-7 text-white
        hover:text-gray-900
        text-4xl'
        aria-label="Close modal">
            <FaTimes></FaTimes>
        </button>
        {children}
        </div>
    );
};
export default Modal;