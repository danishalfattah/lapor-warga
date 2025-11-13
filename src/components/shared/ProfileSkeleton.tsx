import { Skeleton } from "@/components/ui/skeleton";

export function ProfileSkeleton() {
  return (
    <div className="min-h-screen bg-[#f2f2ed]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Profile Header Skeleton */}
        <div className="mb-6 rounded-2xl bg-white p-6 shadow-sm">
          <div className="flex items-center gap-6">
            {/* Avatar Skeleton */}
            <Skeleton className="h-24 w-24 rounded-full flex-shrink-0" />

            {/* User Info Skeleton */}
            <div className="flex-1 space-y-3">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-4 w-64" />
              <Skeleton className="h-4 w-56" />
            </div>
          </div>
        </div>

        {/* Profile Stats Skeleton */}
        <div className="mb-6 grid gap-4 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-2xl bg-white p-6 shadow-sm">
              <Skeleton className="h-10 w-16 mb-2" />
              <Skeleton className="h-5 w-32" />
            </div>
          ))}
        </div>

        {/* User Reports Skeleton */}
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <Skeleton className="h-7 w-40 mb-6" />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-gray-50 rounded-xl overflow-hidden border border-gray-100">
                <Skeleton className="h-40 w-full" />
                <div className="p-3.5">
                  <div className="flex items-center gap-2 mb-2">
                    <Skeleton className="h-6 w-24 rounded-full" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                  <div className="flex items-start gap-1.5 mb-3">
                    <Skeleton className="h-3.5 w-3.5 mt-0.5" />
                    <Skeleton className="h-4 w-48" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-9 w-20 rounded-lg" />
                    <Skeleton className="h-4 w-28" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
