'use client';
import React, { useEffect, useState } from 'react';
import{FaHeart, FaTimes} from 'react-icons/fa'
import {v4 as uuidv4} from 'uuid';
import Modal from './Modal';
interface CatImageProps{
    catId ?:string;
}
const CatImage: React.FC<CatImageProps> = ({catId}) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [votedStatus,setVotedStatus] = useState<'liked'|'disliked'|null>(null);
  const [isModalOpen,setIsModalOpen] = useState(false);
  const [fallbackId] = useState(()=>uuidv4());
  const actualCatId = catId ?? fallbackId;

  /***
   * method for handling the voting action
   */
  const handleVote= async (type:'liked'|'disliked')=>{
    if(votedStatus)return;

    setVotedStatus(type);
    try{
       const imageId = catId;
       const res = await fetch('/api/like',{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify({
          imageUrl,
          imageId,
         
        }),
      });

      const data = await res.json();
      if(!res.ok) throw new Error(data.error|| 'Failed to like image');
      console.log("Liked saved:",data);
    }
    catch(error){
      console.error("Error liking image:",error);
    }
    // Log the vote to the console. In a real application, you would send this to a backend API.

    console.log(`${type === 'liked' ? 'Liked' : 'Disliked'} image ID: ${catId}`);
    console.log("imageUrl",imageUrl)
  }

  useEffect(() => {
    // Access the environment variable
    const apiKey: string | undefined = process.env.NEXT_PUBLIC_THE_CAT_API_KEY;

    if (!apiKey) {
      console.error("The Cat API key is not set! Please check your .env.local file.");
      setError("API key missing.");
      return;
    }

    const fetchCatImage = async () => {
      try {
        const response = await fetch('https://api.thecatapi.com/v1/images/search', {
          headers: {
            'x-api-key': apiKey, // The Cat API expects the key in this header
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data && data.length > 0) {
          setImageUrl(data[0].url);
        } else {
          setImageUrl(null); // No image found
          setError("No cat image found.");
        }
      } catch (err: any) {
        console.error('Error fetching cat image:', err);
        setError(err.message || "Failed to fetch cat image.");
      }
    };

    fetchCatImage();
  }, []); // Empty dependency array means this runs once on mount

  if (error) {
    return <div style={{ color: 'red' }}>Error: {error}</div>;
  }

  if (!imageUrl) {
    return <div className="Apple text-lg font-bold ">Loading cat image...</div>;
  }

  return (
    <div className="flex-col justify-center items-center">
      <h2 className='Apple font-bold'>Number: {actualCatId}</h2>
      <img src={imageUrl} alt="A cute cat" style={{ maxWidth: '75%', height: 'auto' }}
       className='rounded-2xl relative w-full h-auto overflow-hidden border-2 border-gray-300
       ease-in-out hover:scale-105 hover:shadow-xl' 
       onClick={()=>setIsModalOpen(true)}/>

       <Modal className="max-w-[1200px] max-h-[85vh]" isOpen={isModalOpen} onClose={()=> setIsModalOpen(false)}>
        <img src={imageUrl} alt="A cute cat" className='rounded'></img>
       </Modal>

          {/* Voting Buttons Container */}
             <div className="flex gap-6  justify-center">
               {/* Dislike Button */}
               <button
                 // Tailwind classes for button styling: padding, rounded, shadow, text color, hover effects, transitions, etc.
                 // `enabled:hover:scale-110` scales up only if the button is not disabled.
                 // `disabled:opacity-50 disabled:cursor-not-allowed` styles when the button is disabled.
                 className="p-3 rounded-full bg-white shadow-md text-gray-500 text-3xl hover:bg-gray-50 hover:text-gray-700 transition-all duration-200 enabled:hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                 onClick={() => handleVote('disliked')}
                 disabled={votedStatus !== null} // Disable button if a vote has already been cast
                 aria-label={`Dislike image ID ${actualCatId}`} // Accessibility label for screen readers
               >
                 <FaTimes /> {/* 'X' icon from react-icons */}
               </button>
       
               {/* Like Button */}
               <button
                 className="p-3 rounded-full bg-white shadow-md text-red-500 text-3xl hover:bg-red-50 hover:text-red-600 transition-all duration-200 enabled:hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                 onClick={() => handleVote('liked')}
                 disabled={votedStatus !== null} // Disable button if a vote has already been cast
                 aria-label={`Like image ID ${actualCatId}`} // Accessibility label for screen readers
               >
                 <FaHeart /> {/* Heart icon from react-icons */}
               </button>
             </div>
    </div>
  );
};

export default CatImage;