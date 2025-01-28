import React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

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
  setComfortWithGraphs,
}) {
  return (
    <section className="p-4 flex-grow h-auto overflow-x-auto">
      {showContextForm && (
        <div className="rounded-3xl bg-white p-8 shadow-lg w-full max-w-full h-[41.5rem] ">
          <h2 className="mx-2 mb-6 font-montserrat tracking-tight text-3xl font-bold text-zinc-700">
            Lastly, <br/>         
            <h4 className="font-montserrat font-bold text-zinc-700 text-xl leading-tight">
              Provide Your <span className="underline">Business Context</span>
            </h4>
          </h2>

          <form onSubmit={handleContextSubmit}>
            <div className="space-y-4 mx-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 ">
                  1. What kind of business do you have?
                </label>
                <Input
                  type="text"
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-neutral-100"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  2. What is your average monthly revenue?
                </label>
                <Input
                  type="text"
                  value={monthlyRevenue}
                  onChange={(e) => setMonthlyRevenue(e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-neutral-100"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  3. What type of business placement do you have (e.g., physical
                  store, online, etc.)?
                </label>
                <Input
                  type="text"
                  value={businessPlacement}
                  onChange={(e) => setBusinessPlacement(e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-neutral-100"
                  required
                />
              </div>
              <div>
                <label className="b lock text-sm font-medium text-gray-700">
                  4. On a scale of 1-10, how would you rate your understanding of
                  managing your business finances?
                </label>
                <Input
                  type="number"
                  min="1"
                  max="10"
                  value={financeUnderstanding}
                  onChange={(e) => setFinanceUnderstanding(e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-neutral-100"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  5. On a scale of 1-10, how comfortable are you interpreting
                  financial graphs and charts?
                </label>
                <Input
                  type="number"
                  min="1"
                  max="10"
                  value={comfortWithGraphs}
                  onChange={(e) => setComfortWithGraphs(e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-neutral-100"
                  required
                />
              </div>

              <footer className="flex items-center justify-between">
                <div className="mt-2 flex justify-start flex-grow ">
                  <Button
                    variant="outline"
                    onClick={handleSkipForm}
                    className="border-2 border-blue text-blue px-4 py-2 rounded-xl hover:bg-blue-600 transition duration-300 "
                  >
                    Do this another time!
                  </Button>
                </div>

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    className="bg-gold text-white px-4 py-2 w-full rounded-xl hover:bg-green-600 transition duration-300"
                  >
                    Submit<ArrowRight/>
                  </Button>
                </div>
              </footer>
            </div>
          </form>
        </div>
      )}
    </section>
  );
}
