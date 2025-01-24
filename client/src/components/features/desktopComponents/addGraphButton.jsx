import React from 'react'
import { Plus } from 'lucide-react';

export default function AddGraph({onclick}) {
return (
    <button 
        className='border border-blue border-spacing-1 rounded-lg p-4 w-30 h-70 flex items-center justify-center '
        onClick={onclick}
    >
        <Plus color='blue' size={90}/>
    </button>
)
}
