'use client'

import { useState } from 'react'

export default function RangeSlider({
  min = 0,
  max = 100,
  step = 1,
  defaultValue = 50,
  onChange
}) 
  {
  const [value, setValue] = useState(defaultValue)

  const handleChange = (event) => {
    const newValue = Number(event.target.value)
    setValue(newValue)
    if (onChange) {
      onChange(newValue)
    }
  }

  const percentage = ((value - min) / (max - min)) * 100

  return (
    <div className="w-full max-w-md mx-auto py-5 px-6 bg-white rounded-2xl shadow-md">
      <div className="mt-4 text-lg text-header font-medium">
        How well known are with business terminology?
      </div>
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={10}
          value={value}
          onChange={handleChange}
          className="w-full h-3 mt-5 mb-3 bg-gold rounded-full appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #3F56FF 0%, #3F56FF ${percentage}%, #F4BE37 ${percentage}%, #F4BE37 100%)`
          }}
        />
        <div 
          className="absolute top-1/2 left-1/2 w-5 h-7 bg-white border-4 border-blue rounded-full shadow-md transform -translate-y-1/2 -translate-x-1/2 pointer-events-none"
          style={{ left: `${percentage}%` }}
        />
      </div>
      <div className="mt-4 text-center text-header font-medium">
        Around {value}%
      </div>
    </div>
  )
};