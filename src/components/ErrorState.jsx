function ErrorState({ message, onRetry }) {
  return (
    <div className="error-state">
      <div className="error-icon" aria-hidden="true">⚠️</div>
      <h3>Something went wrong</h3>
      <p>{message || 'We could not load this. Please check your connection and try again.'}</p>
      {onRetry && (
        <button type="button" className="retry-btn" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
}

export default ErrorState;
