'use client';
import React, { useEffect, useState } from 'react';
interface CatImageProps{
    catId ?:string;
}
const CatImage: React.FC<CatImageProps> = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

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
    <div>
      <h2 className='Apple font-bold'>Random Cat Image</h2>
      <img src={imageUrl} alt="A cute cat" style={{ maxWidth: '75%', height: 'auto' }}
       className='rounded-2xl relative w-full h-auto overflow-hidden border-2 border-gray-300
       ease-in-out hover:scale-105 hover:shadow-xl' />
    </div>
  );
};

export default CatImage;