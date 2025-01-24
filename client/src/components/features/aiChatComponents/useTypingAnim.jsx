import { useState, useEffect } from 'react';

export function useTypingAnimation(text, speed = 50) {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    // Reset displayedText if text is invalid
    if (!text || typeof text !== 'string') {
      setDisplayedText('');
      return;
    }

    // Reset displayedText when text changes
    setDisplayedText('');

    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText((prev) => prev + text[index]);
        index++;
      } else {
        clearInterval(interval); // Stop the interval when the animation is complete
      }
    }, speed);

    // Cleanup function to clear the interval
    return () => clearInterval(interval);
  }, [text, speed]);

  return displayedText;
}