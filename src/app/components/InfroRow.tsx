'use client'
import {useState,useEffect} from 'react';
interface rowProps{
    label:string|undefined;
    value:string|React.ReactNode|undefined;

}

const InfoRow:React.FC<rowProps> = ({label,value})=>{

    return(
    <div className="flex justify-between gap-4">
        <span className="font-bold text-gray-700
        dark:text-gray-300">{label}</span>
        <span className="
            text-left 
            
            min-h-[1.5rem]
            text-gray-900
            dark:text-gray-100
        ">
            {value}
        </span>

    </div>
    );
}
export default InfoRow;