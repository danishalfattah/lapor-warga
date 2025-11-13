import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface TopSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function TopSearchBar({
  value,
  onChange,
  placeholder = "Cari laporan atau lokasi...",
}: TopSearchBarProps) {
  return (
    <div className="w-full px-4 py-3 md:hidden">
      <div className="relative max-w-2/3">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 z-10" />
        <Input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="pl-10 pr-4 h-11 bg-white rounded-full shadow-md border-none focus-visible:ring-1 focus-visible:ring-primary text-sm"
        />
      </div>
    </div>
  );
}
