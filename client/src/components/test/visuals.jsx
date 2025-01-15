import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Bell, LineChart, Star, User } from "lucide-react";
import React from "react";

const navigationData = [
  { icon: Star, label: "Generate" },
  { icon: LineChart, label: "Visuals", active: true },
];

const chartData = [
  {
    title: "Inventory",
    total: "25,000",
    topExpense: "5,000",
    items: [
      { label: "Payroll", color: "#f4be37" },
      { label: "Inventory", color: "#0d2535" },
      { label: "Utilities", color: "#5388d8" },
    ],
  },
  {
    title: "Expenses",
    total: "25,000",
    topExpense: "5,000",
    items: [
      { label: "Payroll", color: "#f4be37" },
      { label: "Inventory", color: "#0d2535" },
      { label: "Utilities", color: "#5388d8" },
    ],
  },
];

export default function Visuals() {
  return (
    <div className="bg-white flex flex-row justify-center w-full">
      <div className="bg-gradient-to-b from-[#5388D8] via-[#F7F7F7] to-[#F4BE37] w-[402px] h-[874px] relative">
        <header className="flex items-center justify-between px-8 pt-6">
          <div className="flex items-center gap-3">
            <h1 className="font-extrabold text-[#686868] text-lg tracking-tight">
              Visuals
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <Bell className="w-6 h-6 text-[#686868]" />
            <User className="w-6 h-6 text-[#686868]" />
          </div>
        </header>

        <main className="mt-4 mx-3">
          <Card className="rounded-[20px_20px_30px_30px] border-[#dfdfdf]">
            <CardHeader className="space-y-1 px-4">
              <p className="text-sm text-[#030303] font-medium tracking-tight">
                Session 01
              </p>
              <h2 className="text-lg font-semibold text-[#33363f] tracking-tight">
                How to Generate Revenue
              </h2>
            </CardHeader>
            <Separator />
            <CardContent className="p-4">
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-semibold">Sales</h3>
                    <span className="text-[#9BA1A6]">today</span>
                  </div>
                  <Badge className="bg-green-100 text-green-800">↑ 1.2%</Badge>
                </div>
                <div className="text-2xl font-bold mb-4">16,000</div>
                <div className="h-[150px] bg-gray-50 rounded-lg">
                  {/* Placeholder for chart - you'll need to implement actual chart */}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {chartData.map((item, index) => (
                  <Card key={index} className="border-[#dfdfdf]">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <CardTitle className="text-[15px]">
                          {item.title}
                        </CardTitle>
                        <span className="text-sm">{item.total}</span>
                      </div>
                      <div className="flex justify-between text-xs text-[#33363f] mb-4">
                        <span>Top Expense</span>
                        <span>{item.topExpense}</span>
                      </div>
                      <div className="flex gap-4">
                        <div className="w-[58px] h-[55px]">
                          {/* Placeholder for pie chart */}
                        </div>
                        <div className="space-y-2">
                          {item.items.map((subItem, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <div
                                className="w-1.5 h-1.5 rounded"
                                style={{ backgroundColor: subItem.color }}
                              />
                              <span className="text-xs">{subItem.label}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>

        <nav className="absolute bottom-0 w-full bg-white border-t border-[#dfdfdf]">
          <div className="flex justify-center gap-12 py-3">
            {navigationData.map((item, index) => (
              <div
                key={index}
                className={`flex flex-col items-center gap-1 ${
                  item.active ? "bg-[#dfdfdf] px-8 rounded-t-[30px]" : ""
                }`}
              >
                <item.icon className="w-8 h-8" />
                <span className="text-xs">{item.label}</span>
              </div>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
}