import React,{useEffect,useState} from 'react'
import CatImage from './CatImage'
import InfoRow from './InfroRow'
export default function BreedCard(){
    
    return(
        <div className="
         rounded-xl shadow-md p-2
         bg-white dark:bg-gray-800 border">

            <div>
                <CatImage/>
            </div>
            <div className="grid grid-cols-1 sm:grid-col-2 
                lg:grid-cols-3 gap-8 p-4">

            
                <div className='space-y-4'>
                    <InfoRow label={"Breed:"} value={"fdfdfdfdfdfd"}></InfoRow>
                    <InfoRow label={"Breed: "} value={"fdfdfdfdfdfdfd"}></InfoRow>
                     <InfoRow label={"Breed: "} value={"fdfdfdfdfdfdfd"}></InfoRow>
                    <InfoRow label={"Breed: "} value={"fdfdfdfdfdfdfd"}></InfoRow>
                </div>
            
                 
             </div>
            
        </div>
    )
}