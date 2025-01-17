import React, { useState } from 'react';
import { Paperclip } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function FileChecker() {
  const [file, setFile] = useState(null);
  const [open, setOpen] = useState(false);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    console.log(selectedFile);
  };

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
        <div className='absolute bottom-20 bg-white p-4 rounded-lg shadow-md mt-2 w-[20rem] z-30'>
          <input
            type="file"
            onChange={handleFileChange}
          />
        </div>
      )}
    </>
  );
}
