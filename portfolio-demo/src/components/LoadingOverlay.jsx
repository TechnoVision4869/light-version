export default function LoadingOverlay({ loading, error, onRetry }) {
  if (!loading && !error) return null;
  return (
    <div className={`overlay${loading ? " overlay--loading" : ""}`}>
      {error ? (
        <div className="overlay-message overlay-message--error">
          <p>This panorama couldn't be loaded. Try a different browser or check your connection.</p>
          <button type="button" className="overlay-retry" onClick={onRetry}>
            Retry
          </button>
        </div>
      ) : (
        <p className="overlay-message">Loading panorama…</p>
      )}
    </div>
  );
}
