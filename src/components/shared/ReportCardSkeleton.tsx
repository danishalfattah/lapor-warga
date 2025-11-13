import { Skeleton } from "@/components/ui/skeleton";

export function ReportCardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
      {/* Image Skeleton */}
      <Skeleton className="h-40 w-full" />

      {/* Content Skeleton */}
      <div className="p-3.5">
        {/* Category and Date */}
        <div className="flex items-center gap-2 mb-2">
          <Skeleton className="h-6 w-24 rounded-full" />
          <Skeleton className="h-4 w-32" />
        </div>

        {/* Location */}
        <div className="flex items-start gap-1.5 mb-3">
          <Skeleton className="h-3.5 w-3.5 mt-0.5" />
          <Skeleton className="h-4 w-48" />
        </div>

        {/* Upvote and Reporter */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-9 w-20 rounded-lg" />
          <Skeleton className="h-4 w-28" />
        </div>
      </div>
    </div>
  );
}
