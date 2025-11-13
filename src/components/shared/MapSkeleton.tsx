import { Skeleton } from "@/components/ui/skeleton";

export function MapSkeleton() {
  return (
    <div className="relative h-full w-full bg-gray-100 flex items-center justify-center">
      {/* Loading indicator */}
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-gray-300 border-t-[#FACC15] rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-sm text-gray-500">Memuat peta...</p>
      </div>

      {/* Control skeletons */}
      <div className="absolute right-4 top-4 z-10 flex flex-col gap-2">
        <Skeleton className="h-10 w-32 rounded-lg" />
        <div className="flex gap-1">
          <Skeleton className="h-10 w-10 rounded-lg" />
          <Skeleton className="h-10 w-10 rounded-lg" />
          <Skeleton className="h-10 w-10 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
