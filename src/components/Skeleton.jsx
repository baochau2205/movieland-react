function SkeletonCard() {
  return (
    <div className="movie-card skeleton-card" aria-hidden="true">
      <div className="skeleton skeleton-poster" />
      <div className="movie-card-body">
        <div className="skeleton skeleton-line skeleton-title" />
        <div className="skeleton skeleton-line skeleton-meta" />
        <div className="skeleton skeleton-line skeleton-actions" />
      </div>
    </div>
  );
}

export function SkeletonGrid({ count = 8, compact = false }) {
  return (
    <div className={`movie-grid ${compact ? 'compact-grid' : ''}`}>
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
}

export function MovieDetailSkeleton() {
  return (
    <div className="detail-page" aria-hidden="true">
      <div className="skeleton skeleton-line" style={{ width: '9rem', marginBottom: '1.5rem' }} />
      <div className="detail-layout">
        <div className="skeleton detail-skeleton-poster" />
        <div className="detail-skeleton-content">
          <div className="skeleton skeleton-line" style={{ width: '60%', height: '2rem' }} />
          <div className="skeleton skeleton-line" style={{ width: '45%' }} />
          <div className="skeleton skeleton-line" style={{ width: '100%' }} />
          <div className="skeleton skeleton-line" style={{ width: '100%' }} />
          <div className="skeleton skeleton-line" style={{ width: '80%' }} />
        </div>
      </div>
    </div>
  );
}

export default SkeletonCard;
