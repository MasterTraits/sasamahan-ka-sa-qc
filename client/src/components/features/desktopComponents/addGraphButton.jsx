import React from 'react'
import { Plus } from 'lucide-react';

export default function AddGraph({onclick, isMobile}) {
return (
    <div className={`${isMobile ? `bg-neutral-100` : `bg-white`} shadow-md p-5 rounded-2xl tracking-tight hover:bg-indigo-50`}
    >
        <p className='font-jost mb-2 text-center text-blue font-semibold'>Add your own <b>Visuals!</b></p>
        <div className='flex justify-center'>
            <button 
                className={`border border-blue border-spacing-1 rounded-xl p-4 ${isMobile ? `w-28 h-28` : `w-64 h-64` }  flex items-center justify-center`}
                onClick={onclick}
            >
                <Plus color='blue' size={90}/>
            </button>
        </div>
    </div>
)
}
