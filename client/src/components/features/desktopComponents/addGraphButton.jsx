import React from 'react'
import { Plus } from 'lucide-react';

export default function AddGraph({onclick}) {
return (
    <button 
        className='border border-blue border-spacing-1 rounded-lg p-4 w-96 h-96 flex items-center justify-center transform transition-transform duration-300 hover:scale-105'
        onClick={onclick}
    >
        <Plus color='blue' size={90}/>
    </button>
)
}
