// components/LikesDisplay.tsx
'use client'; // This component needs to be a Client Component

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react'; // For user session context

interface Like {
  id: string;
  userId: string;
  createdAt: string; // Assuming it's a string, or Date if you parse it
  // Add other properties if your Like model has them (e.g., itemId, itemName)
}

const LikesDisplay: React.FC = () => {
  const { data: session, status } = useSession();
  const [likes, setLikes] = useState<Like[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Only fetch if authenticated and not already loading
    if (status === 'authenticated') {
      const fetchLikes = async () => {
        try {
          setLoading(true);
          setError(null); // Clear previous errors
          const response = await fetch('/api/likes'); // Your GET API route

          if (!response.ok) {
            if (response.status === 401) {
                setError('You are not authorized to view likes. Please log in.');
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Failed to fetch likes');
            }
            setLikes([]); // Clear likes on error
            return;
          }

          const data: Like[] = await response.json();
          setLikes(data);
        } catch (err) {
          console.error('Fetch error:', err);
          setError('An unexpected error occurred while fetching likes.');
        } finally {
          setLoading(false);
        }
      };

      fetchLikes();
    } else if (status === 'unauthenticated') {
      setLoading(false);
      setLikes([]);
      setError('Please sign in to view your likes.');
    }
  }, [status]); // Re-run when authentication status changes

  if (loading) {
    return <div className="text-center py-4">Loading likes...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">Error: {error}</div>;
  }

  if (likes.length === 0) {
    return <div className="text-center py-4 text-gray-500">No likes found.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Your Likes</h2>
      <ul className="space-y-2">
        {likes.map((like) => (
          <li key={like.id} className="bg-gray-100 p-3 rounded shadow-sm">
            Like ID: {like.id} (Liked on: {new Date(like.createdAt).toLocaleDateString()})
            {/* Render more details about the liked item if you include it */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LikesDisplay;