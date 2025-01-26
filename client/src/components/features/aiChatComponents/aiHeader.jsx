import { Menu } from "lucide-react";
import { useHistory } from "@/store/useHistory";
import { useCallback } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function aiHeader({ title }) {
  const openMenu = useCallback(useHistory((state) => state.openMenu));

  return (
    <header className="flex items-center justify-between mt-6 mr-2 pb-5">
      <button
        onClick={openMenu}
        className="flex items-center gap-3 py-1 px-3 hover:bg-white rounded-3xl"
      >
        <Menu className="h-5 w-5 text-neutral-600" />
        <span className="font-bold text-left text-lg text-neutral-600 tracking-tight">
          {title}
        </span>
      </button>

      <Link reloadDocument to="/desktop">
        <Button className="text-md rounded-3xl px-6 bg-[#F4BE37] text-white hover:bg-[#F4BE37]/90">
          + New
        </Button>
      </Link>
    </header>
  );
}
