'use client'
import {useState,useEffect} from 'react';
interface rowProps{
    label:string|undefined;
    value:string|undefined;

}

const InfoRow:React.FC<rowProps> = ({label,value})=>{

    return(
    <div className="flex justify-between gap-2">
        <span className="font-medium text-gray-700
        dark:text-gray-300">{label}</span>
        <span className="
            tex-right 
            break-words
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