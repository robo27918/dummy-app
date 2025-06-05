// src/components/ImageCard.tsx
import React, { useState } from 'react';
import { FaHeart, FaTimes } from 'react-icons/fa'; // Importing Font Awesome heart and times icons

// 1. Define the type for a single Image object
// This ensures that any 'image' prop passed to ImageCard conforms to this structure.
interface Image {
  id: number | string; // The ID of the image, can be a number or string
  imageUrl: string;    // The URL of the image
  altText: string;     // Alternative text for accessibility
}

// 2. Define the types for the props of the ImageCard component
// This specifies that ImageCard expects a single prop named 'image' which is of type 'Image'.
interface ImageCardProps {
  image: Image;
}

// ImageCard functional component defined with React.FC<ImageCardProps> for TypeScript typing.
// This clearly indicates it's a Function Component and what props it expects.
const ImageCard: React.FC<ImageCardProps> = ({ image }) => {
  // State to manage the voting status for *this specific card*.
  // It can be 'liked', 'disliked', or 'null' (meaning no vote yet).
  const [votedStatus, setVotedStatus] = useState<'liked' | 'disliked' | null>(null);

  /**
   * Handles the voting action (like or dislike).
   * @param type - The type of vote: 'liked' or 'disliked'.
   */
  const handleVote = (type: 'liked' | 'disliked') => {
    // If a vote has already been cast on this card, prevent further votes.
    if (votedStatus) return;

    // Set the voting status for visual feedback.
    setVotedStatus(type);

    // Log the vote to the console. In a real application, you would send this to a backend API.
    console.log(`${type === 'liked' ? 'Liked' : 'Disliked'} image ID: ${image.id}`);

    // --- Backend API Call Example (uncomment and implement in a real app) ---
    // fetch('/api/vote', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ imageId: image.id, voteType: type }),
    // })
    // .then(response => response.json())
    // .then(data => console.log('Vote recorded:', data))
    // .catch(error => console.error('Error sending vote:', error));
  };

  return (
    // Main container for the image card. Uses flexbox for layout, padding, borders, shadows, etc.
    <div className="relative flex flex-col items-center p-4 border border-gray-200 rounded-lg bg-white shadow-lg overflow-hidden">
      {/* Image display area. Relative positioning for the vote overlay. */}
      <div className="relative w-full h-48 overflow-hidden rounded-md bg-gray-100 flex justify-center items-center mb-4">
        <img
          src={image.imageUrl}
          alt={image.altText}
          // Tailwind classes for image styling: full width/height, cover the area.
          className="w-full h-full object-cover"
        />
        {/*
          Vote Overlay: Conditionally rendered based on `votedStatus`.
          Applies a large icon and a translucent background.
          `animate-fade-in-out` is a custom Tailwind animation (defined in tailwind.config.js).
          `pointer-events-none` ensures clicks pass through the overlay to the buttons.
        */}
        {votedStatus === 'liked' && (
          <div className="absolute inset-0 flex justify-center items-center text-6xl text-red-500 bg-black bg-opacity-20 animate-fade-in-out pointer-events-none">
            ❤️
          </div>
        )}
        {votedStatus === 'disliked' && (
          <div className="absolute inset-0 flex justify-center items-center text-6xl text-gray-600 bg-black bg-opacity-20 animate-fade-in-out pointer-events-none">
            ❌
          </div>
        )}
      </div>

      {/* Display the Image ID */}
      <p className="text-lg font-semibold text-gray-700 mb-4">Image ID: {image.id}</p>

      {/* Voting Buttons Container */}
      <div className="flex gap-6">
        {/* Dislike Button */}
        <button
          // Tailwind classes for button styling: padding, rounded, shadow, text color, hover effects, transitions, etc.
          // `enabled:hover:scale-110` scales up only if the button is not disabled.
          // `disabled:opacity-50 disabled:cursor-not-allowed` styles when the button is disabled.
          className="p-3 rounded-full bg-white shadow-md text-gray-500 text-3xl hover:bg-gray-50 hover:text-gray-700 transition-all duration-200 enabled:hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => handleVote('disliked')}
          disabled={votedStatus !== null} // Disable button if a vote has already been cast
          aria-label={`Dislike image ID ${image.id}`} // Accessibility label for screen readers
        >
          <FaTimes /> {/* 'X' icon from react-icons */}
        </button>

        {/* Like Button */}
        <button
          className="p-3 rounded-full bg-white shadow-md text-red-500 text-3xl hover:bg-red-50 hover:text-red-600 transition-all duration-200 enabled:hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => handleVote('liked')}
          disabled={votedStatus !== null} // Disable button if a vote has already been cast
          aria-label={`Like image ID ${image.id}`} // Accessibility label for screen readers
        >
          <FaHeart /> {/* Heart icon from react-icons */}
        </button>
      </div>
    </div>
  );
};

export default ImageCard;