export default function FeedSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="animate-pulse rounded-lg border border-dark-brown/10 bg-white p-4">
          <div className="mb-2 h-6 w-1/4 rounded bg-dark-brown/10"></div>
          <div className="mb-2 h-4 w-3/4 rounded bg-dark-brown/10"></div>
          <div className="mb-3 h-4 w-full rounded bg-dark-brown/10"></div>
          <div className="h-4 w-1/3 rounded bg-dark-brown/10"></div>
        </div>
      ))}
    </div>
  );
}
