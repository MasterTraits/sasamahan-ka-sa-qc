import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "lucide-react";

import Header from "@/components/layout/header";
import Footer_Navigator from "@/components/layout/nav";
import History from "@/components/features/history";

import { useHistory } from "@/store/useHistory";

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

export default function view() {
  const menu = useHistory((state) => state.menu);

  return (
    <div className="relative gradient-custom h-screen w-full overflow-hidden">
      <Header text="Views" />
      <Card className="relative h-[calc(100%-160px)] bg-white rounded-t-2xl rounded-b-3xl mx-3 mt-2 border border-neutral-200">
        <CardHeader className="flex flex-row items-center justify-between px-4 py-5 leading-tight">
          <p className="leading-3 text-sm text-[#030303] font-medium">
            Session 01
            <br />
            <span className="text-xl font-semibold tracking-tight leading-tight">
              How to Generate Revenue
            </span>
          </p>
          <Button className="text-md rounded-3xl px-6 bg-[#F4BE37] text-white hover:bg-[#F4BE37]/90">
            + New
          </Button>
        </CardHeader>
        <hr />
        <CardContent className="relative h-[calc(100%-90px)] p-4">
          
        </CardContent>
      </Card>
      {menu && <History />}
      <Footer_Navigator page="view" />
    </div>
  );
}
