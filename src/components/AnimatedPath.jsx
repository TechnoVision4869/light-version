import { useEffect, useRef } from 'react';

export default function AnimatedPath({
  points = null,
  color = "#3f3f3f",
  strokeWidth = 0.005
}) {
  const pathRef = useRef(null);

  useEffect(() => {
    const path = pathRef.current;
    if (path) {
      const length = path.getTotalLength();
      path.style.strokeDasharray = length;
      path.style.strokeDashoffset = length;
    }
  }, [points]);

  if (!points || points.length < 2) return null;

  // Always generate a polyline with straight segments unless curve=true
  const pathData = 'M ' + points.map(p => `${p.x} ${p.y}`).join(' L ');

  return (
    <svg
      viewBox="0 0 1 1"
      width="100%"
      height="100%"
      preserveAspectRatio="none"
      className="absolute inset-0 pointer-events-none"
    >
      <path
        ref={pathRef}
        d={pathData}
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
        className="animate-draw"
      />
    </svg>
  );
}