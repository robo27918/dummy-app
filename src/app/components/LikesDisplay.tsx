'use client'

import React,{useEffect, useState} from 'react';
import {useSession} from 'next-auth/react';

interface Like{
    id:string;
    userId:string;
    createdAt: string;
}

const LikeDisplay: React.FC= ()=>{
    const {data:session,status}= useSession();
    const [likes,setLikes] = useState<Like[]>([]);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState<string|null>(null);

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
        <div className='container mx-auto p-4'>
            <h2 className='text-2xl font-bold mb-4'>Your likes</h2>
            <ul className='space-y-2'>
                {
                    likes.map((like)=>(
                        <li key={like.id} className='bg-gray-100 p-3 rounded shadow-sm'>
                            Like ID: {like.id} (Liked on: {new Date(like.createdAt).toLocaleDateString()})
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};
export default LikeDisplay;