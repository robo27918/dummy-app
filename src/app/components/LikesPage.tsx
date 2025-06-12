'use client'
import React,{useEffect, useState} from 'react';
import {useSession} from 'next-auth/react';
import Image from 'next/image';
import Modal from './Modal';

interface Like{
    id:string;
    userId:string;
    createdAt: string;
    image:{
        id:string;
        url:string;
        title?:string;
    };
}

const LikePage: React.FC= ()=>{
    const {data:session,status}= useSession();
    const [likes,setLikes] = useState<Like[]>([]);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState<string|null>(null);
    const [isModalOpen,setIsModalOpen] = useState(false);
    const [modalUrl,setModalUrl] = useState<string|null>(null);

    useEffect(()=>{
        if(status === 'authenticated'){
            const fetchLikes = async() =>{
                try{
                    setLoading(true);
                    setError(null);
                    const response = await fetch('api/like');

                    if(!response.ok){
                        if(response.status===401){
                            setError('You are not authorized. Please log in');
                        }else{
                            const errorData = await response.json()
                            setError(errorData.message || 'Failed to fetch likes');
                        }
                        setLikes([]);
                        return;

                    }
                    const data:Like[] = await response.json();
                    setLikes(data);
                }
                catch(error){
                    console.error('Fetch error',error);
                    setError("An unexpected error occurred while fetching likes");
                }
                finally{
                    setLoading(false);
                }
            };
            fetchLikes();
        }else if(status ==="unauthenticated"){
            setLoading(false);
            setLikes([]);
            setError("Please sign in to view your likes");
        }
       
    },[status]);//Re-run when authentication status changes

    const modalSetUp = (url:string)=>{
        setIsModalOpen(true);
        setModalUrl(url);
    };

    const tearDownModal = ()=>{
        setModalUrl(null);
        setIsModalOpen(false);
    };
    
    if(loading){
        return <div className="text-center py-4">Loading likes...</div>;
    }
    if(error){
        return <div className='text-center py-4 text-red-500'>Error:{error}</div>;
    }
    if(likes.length === 0){
        return <div className='text-center py-4 text-gray-500'>No likes found.</div>;
    }

    return(
        <div className='border-red-500 flex flex-col  p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
                <h2 className='text-2xl font-bold mb-4'>Your likes</h2>
                <div className='grid grid-cols-4 gap-4'>
                    {
                        likes.map((like)=>(
                            <div key={like.id}>
                                <Image
                                    src={like.image.url}
                                    alt={'Image'}
                                    width={750}
                                    height={750}
                                    className='rounded-2xl relative w-full
                                    h-auto overflow-hidden border-2 border-gray-300
                                    ease-in-out hover:scale-105 hover:shadow-xl
                                    max-w-[75%] h-auto'
                                    onClick={()=>modalSetUp(like.image.url)}
                                />

                              
                            </div>
                            
                        ))
                    }
                </div>
                {/* Modal should be opened outside of the for loop */}
                {modalUrl &&
                      <Modal className="max-w-[1200px] max-h-[85vh]" isOpen={isModalOpen} onClose={()=> setIsModalOpen(false)}>
                    <img src={modalUrl} alt="A cute cat" className='rounded'></img>
                </Modal> 
                }
             
        </div>
    );
};
export default LikePage;