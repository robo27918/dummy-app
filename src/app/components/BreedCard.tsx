import React,{useEffect,useState} from 'react'
import CatImage from './CatImage'
import InfoRow from './InfroRow'

interface CatBreedResponse{
    name:string;
    temperament?:string;
    origin?:string;
    description?:string;
    life_span?:string;
    adaptability?:string;
    affection_level?:string;
    energy_level?:string;
    intelligence?:string;
    shedding_level?:string;
    wiki_url?:string;
    hypoallergenic?:string;
    ref_id?:string;

}
interface BreedCardProps {
    breed:CatBreedResponse
};

const BreedCard:React.FC<BreedCardProps>=({breed})=>{
    console.log("breed",breed)
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
                    <InfoRow label={"Breed:"} value={breed.name}></InfoRow>
                    <InfoRow label={"Origin"} value={breed.origin}></InfoRow>
                    <InfoRow label={"Intelligence:"} value={breed.intelligence}></InfoRow>
                    <InfoRow label={"Life Span"} value={breed.life_span}></InfoRow>
                </div>
            
                 
             </div>
            
        </div>
    )
}
export default BreedCard