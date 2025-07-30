'use client'
import {useState,useEffect} from "react";
import BreedCard from "../components/BreedCard"
import { fetchBreeds } from "../../../utils/fetchBreeds";
type CatBreedResponse = {
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
export default function BreedPage(){
        
    const [breedInfo,setBreedInfo] = useState<CatBreedResponse[]>([]);
    const [loading,setLoading] = useState(true);
    // const [error,setError] = useState<string|null>(null);
    //function to get all the breeds form theCatAPI
    console.log("from Cat Breeds page...")
    const getBreeds = async ()=>{
        try{
            const res: CatBreedResponse[] = await fetchBreeds();
            console.log("response from breeds page",res);
            setBreedInfo(res);
          

        }
        catch(err){
            console.error("Error fetching breeds",err);
           
        }
        finally{
             setLoading(false);
        }
    
       

    }
    useEffect(()=>{
        getBreeds()
    },[]);

    // console.log("From BreedPage!",breedInfo[0].id)
    return(
        //  {error && (
        //     <div>{error}</div>
        //  )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
            {!loading && breedInfo.length>0 &&(
                breedInfo.map((info,idx)=><BreedCard key={idx} breed={info}/>)
            )}
           
        </div>
    )
}