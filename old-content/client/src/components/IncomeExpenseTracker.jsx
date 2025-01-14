'use client'

import { useState } from 'react'

export default function IncomeExpenseTracker() {
  const [selected, setSelected] = useState<string | null>(null)

  const options = [
    { id: 'yes', label: 'Yes' },
    { id: 'no', label: 'No' },
    { id: 'occasionally', label: 'Occasionally' }
  ]

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-center text-gray-800 mb-4">Financial Habits</h2>
        <div className="space-y-4">
          <p className="text-base font-medium text-center text-gray-700">
            Do you track your income and expenses regularly?
          </p>
          <div className="space-y-2">
            {options.map((option) => (
              <label key={option.id} className="flex items-center space-x-3 cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    id={option.id}
                    className="sr-only"
                    checked={selected === option.id}
                    onChange={() => setSelected(option.id)}
                  />
                  <div className={`w-6 h-6 border-2 rounded-md ${
                    selected === option.id ? 'bg-blue-500 border-blue-500' : 'border-gray-300'
                  }`}>
                    {selected === option.id && (
                      <svg className="w-4 h-4 text-white absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-sm font-medium text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
          {selected && (
            <div className="mt-4 text-center text-sm font-medium text-blue-600">
              You selected: {selected.charAt(0).toUpperCase() + selected.slice(1)}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}