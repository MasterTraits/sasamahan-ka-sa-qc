import React from 'react'
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { useState } from 'react';
export default function ThumbsButton() {
    const [thumbsUpClicked, setThumbsUpClicked] = useState(false);
    const [thumbsDownClicked, setThumbsDownClicked] = useState(false);
  
    const handleThumbsUpClick = () => {
      setThumbsUpClicked(!thumbsUpClicked);
      if (thumbsDownClicked) setThumbsDownClicked(false);
    };
  
    const handleThumbsDownClick = () => {
      setThumbsDownClicked(!thumbsDownClicked);
      if (thumbsUpClicked) setThumbsUpClicked(false);
    };

return (
    <div className='flex gap-1 items-center'>
        <button
            onClick={handleThumbsUpClick}
            className="mt-1 ml-1 bg-gray-200 rounded p-1 text-sm hidden group-hover:block"
        >
            <span className='flex gap-1 items-center text-grayText '>
                <ThumbsUp color={thumbsUpClicked ? 'blue' : 'grayText'} size={18} />
            </span>
        </button>
        <button
            onClick={handleThumbsDownClick}
            className="mt-1 ml-1 bg-gray-200 rounded p-1 text-sm hidden group-hover:block"
        >
            <span className='flex gap-1 items-center text-grayText '>
            <ThumbsDown color={thumbsDownClicked ? 'blue' : 'grayText'} size={18} />
            </span>
        </button>
    </div>
)
}
