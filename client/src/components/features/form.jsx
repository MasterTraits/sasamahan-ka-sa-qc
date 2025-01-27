import React from 'react';

export default function Form({
  showContextForm,
  handleContextSubmit,
  handleSkipForm,
  businessType,
  setBusinessType,
  monthlyRevenue,
  setMonthlyRevenue,
  businessPlacement,
  setBusinessPlacement,
  financeUnderstanding,
  setFinanceUnderstanding,
  comfortWithGraphs,
  setComfortWithGraphs
}) {
  return (
    <section className="p-4 flex-grow h-auto overflow-x-auto">
        {showContextForm && (
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md min-h-[400px]">
              <h2 className="text-xl font-bold mb-4">Provide Business Context</h2>
              <form onSubmit={handleContextSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">What kind of business do you have?</label>
                    <input
                      type="text"
                      value={businessType}
                      onChange={(e) => setBusinessType(e.target.value)}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">What is your average monthly revenue?</label>
                    <input
                      type="text"
                      value={monthlyRevenue}
                      onChange={(e) => setMonthlyRevenue(e.target.value)}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">What type of business placement do you have (e.g., physical store, online, etc.)?</label>
                    <input
                      type="text"
                      value={businessPlacement}
                      onChange={(e) => setBusinessPlacement(e.target.value)}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label className="b lock text-sm font-medium text-gray-700">On a scale of 1-10, how would you rate your understanding of managing your business finances?</label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={financeUnderstanding}
                      onChange={(e) => setFinanceUnderstanding(e.target.value)}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">On a scale of 1-10, how comfortable are you interpreting financial graphs and charts?</label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={comfortWithGraphs}
                      onChange={(e) => setComfortWithGraphs(e.target.value)}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>

                  <footer className='flex items-center justify-center '>
                      <div className="flex justify-start flex-grow ">
                        <button
                          type="button"
                          onClick={handleSkipForm}
                          className="bg-blue text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
                        >
                          Do this another time!
                        </button>
                      </div>

                      <div className='flex justify-end'>
                        <button
                          type="submit"
                          className="bg-green text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300"
                        >
                          Submit
                        </button>
                      </div>
                  </footer>
                </div>
              </form>
            </div>
        )}
    </section>
  );
}