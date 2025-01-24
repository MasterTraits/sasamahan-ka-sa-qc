import React, { useState, useRef, useEffect } from 'react';
import { Paperclip } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function FileChecker() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const popupRef = useRef(null); // Ref for the popup element

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file.');
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:8000/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        // File uploaded successfully
        console.log('File uploaded successfully!');
        setOpen(false);
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'File upload failed.');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setError('An error occurred while uploading the file.');
    } finally {
      setLoading(false);
    }
  };

  // Close the popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    // Add event listener when the popup is open
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Clean up the event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  return (
    <>
      <Button
        onClick={() => setOpen(!open)}
        size="icon"
        className="size-10 rounded-full bg-stone-200 *:text-stone-700 hover:bg-stone-300"
        type="button"
      >
        <Paperclip />
      </Button>
      {open && (
        <div
          ref={popupRef}
          className="absolute bottom-20 bg-white p-4 rounded-lg shadow-md mt-2 w-[20rem] z-30"
        >
          <input type="file" onChange={handleFileChange} />
          <Button onClick={handleUpload} disabled={loading}>
            {loading ? 'Uploading...' : 'Upload'}
          </Button>
          {error && <div className="text-red-500 mt-2">{error}</div>}
        </div>
      )}
    </>
  );
}