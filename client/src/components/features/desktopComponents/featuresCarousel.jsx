import React from 'react'

export default function Features() {
  return (
    <main className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md h-[41.5rem]">
        <h2 className="text-xl font-bold mb-4">Features</h2>

        <section className='flex flex-col gap-6'>
                <div className="flex flex-col gap-2">
                    <p className="text-lg font-semibold">GABAY AI Mentor!</p>
                    <p className="text-sm text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec velit nec urna elementum aliquet.</p>
                </div>

                <div className='flex flex-col gap-2'>
                    <p className="text-lg font-semibold">Simulate your</p>
                    <p className="text-sm text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec velit nec urna elementum aliquet.</p>
                </div>

                <div className='flex flex-col gap-2'>
                    <p className="text-lg font-semibold">Freedom</p>
                    <p className="text-sm text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec velit nec urna elementum aliquet.</p>
                </div>  
        </section>


    </main>
  )
}
