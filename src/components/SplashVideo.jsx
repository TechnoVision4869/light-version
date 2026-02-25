export default function SplashVideo({ src, onFinished }) {
  const handleDone = () => {
    if (onFinished) onFinished();
  };

  return (
    <div className="fixed inset-0 z-70 bg-black">
      <video
        className="w-full h-full object-cover"
        src={src}
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={handleDone}
        onError={handleDone}
      />
    </div>
  );
}
