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
    wikipedia_url?:string;
    hypoallergenic?:string;
    image?:Record<string,string>;

}
interface BreedCardProps {
     breed:CatBreedResponse
};

const BreedCard:React.FC<BreedCardProps>=({breed})=>{
    const colClass ="space-y-2 border-4' flex flex-col"
    return(
        <div className="
         rounded-xl shadow-md p-2
         bg-white dark:bg-gray-800 border">

            <div>
                {breed.image  &&  <CatImage 
                    key={breed.image.id}
                    catId={breed.image.id}
                    imageUrlFromParent={breed.image.url}
                />}
               
            </div>
            <div className="grid grid-cols-1 sm:grid-col-2 
                lg:grid-cols-3 gap-8 p-4">

            
                <div className={colClass}>
                    <InfoRow label={"Breed:"} value={breed.name}></InfoRow>
                    <InfoRow label={"Origin"} value={breed.origin}></InfoRow>
                    <InfoRow label={"Intelligence:"} value={breed.intelligence}></InfoRow>
                    <InfoRow label={"Life Span"} value={breed.life_span}></InfoRow>
                    <InfoRow label={"Affection Level:"} value={breed.affection_level}></InfoRow>
                    <InfoRow label={"Energy Level"} value={breed.energy_level}></InfoRow>
                   
                </div>
                <div className={colClass}>
                     <InfoRow label={"Shedding level"} value={breed.shedding_level}></InfoRow>
                    <InfoRow label={"Temperment"} value={breed.temperament}></InfoRow>
                    <InfoRow label={"Adaptability"} value={breed.adaptability}></InfoRow>
                    <InfoRow label={"Hypoallergenic"} value={breed.hypoallergenic}></InfoRow>
                    
                    
                </div>
            </div>
             
            <div className={colClass}>
                <InfoRow label={"Description:"} value={breed.description}></InfoRow>
                <InfoRow label={"Wiki"} 
                    value={<a href={breed.wikipedia_url}>{breed.wikipedia_url}</a>}>
                </InfoRow>
            </div>
        
        </div>
    )
}
export default BreedCard