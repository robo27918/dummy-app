'use client'
import {useState,useEffect} from "react";
import BreedCard from "../components/BreedCard"
import { fetchBreeds } from "../../../utils/fetchBreeds";
type CatBreedResponse={
    name:string;
    temperment?:string;
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
}
export default function BreedPage(){
        
    const [breedInfo,setBreedInfo] = useState<CatBreedResponse[]>([]);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState<string|null>(null);
    //function to get all the breeds form theCatAPI
    console.log("from Cat Breeds page...")
    const getBreeds = async ()=>{
        const res: CatBreedResponse[] = await fetchBreeds();
        console.log(res);
        setBreedInfo(res);
        setLoading(false);
        const firstBreed = breedInfo[0];
        console.log(firstBreed.adaptability);
        console.log(firstBreed.description);
    }
    useEffect(()=>{
        getBreeds()
    },[]);
    return(
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
            <BreedCard/>
        </div>
    )
}