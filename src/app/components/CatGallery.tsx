'use client';
import {useEffect,useRef,useState} from 'react';
import CatImage from './CatImage';
import { fetchCats } from '../../../utils/fetchCats';

type CatApiResponse = {
    id:string;
    url:string;
}

const CatGallery = ()=>{
    const [images,setImages] = useState<CatApiResponse[]>([]);
    const [isLoading,setIsLoading] = useState(false);
    const loaderRef = useRef<HTMLDivElement | null>(null);

    const getMoreCatImages = async ()=> {
        setIsLoading(true);
        const res:CatApiResponse[] = await fetchCats()
        setImages((prev:CatApiResponse[]) =>[...prev,...res]);
        setIsLoading(false);
    }
    useEffect(()=>{
        getMoreCatImages();
    },[]);

    useEffect(()=>{
        const observer = new IntersectionObserver(
            entries =>{
                if (entries[0].isIntersecting && !isLoading){
                    getMoreCatImages();
                }
            },{threshold:1}
        );
        
        if(loaderRef.current){
            observer.observe(loaderRef.current);
        }
        return ()=>{
            if(loaderRef.current){
                observer.unobserve(loaderRef.current);
            }
        };
    },[isLoading]);
    return(
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
        {
            images.map(cat=>(
            <CatImage key={cat.id} catId={cat.id} imageUrlFromParent={cat.url}/>
         ))
        }
        <div ref={loaderRef} className="col-span-full text-center py-4 text-gray-500">
            {isLoading ?'Loading more of them cats...':'Scroll to load more'}
        </div>
    </div>
    );
}
export default CatGallery;