export default function LoadingOverlay({ loading, error }) {
  if (!loading && !error) return null;
  return (
    <div className={`overlay${loading ? " overlay--loading" : ""}`}>
      {error ? (
        <p className="overlay-message overlay-message--error">
          This panorama couldn't be loaded. Try a different browser or check
          your connection.
        </p>
      ) : (
        <p className="overlay-message">Loading panorama…</p>
      )}
    </div>
  );
}
