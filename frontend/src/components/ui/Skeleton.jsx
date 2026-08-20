export function SkeletonBlock({ className = "" }) {
  return <div className={`animate-pulse bg-navy/10 rounded-xl ${className}`} />;
}

export function SkeletonGrid({ count = 6, className = "" }) {
  return (
    <div className={`grid gap-6 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonBlock key={i} className="h-64 w-full" />
      ))}
    </div>
  );
}
