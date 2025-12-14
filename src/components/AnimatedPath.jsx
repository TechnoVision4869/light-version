// AnimatedPath.jsx
import { useEffect, useRef } from 'react';

export default function AnimatedPath({ points, curve = true, color = "white", strokeWidth = 0.005 }) {
  const pathRef = useRef(null);

  useEffect(() => {
    const path = pathRef.current;
    if (path) {
      const length = path.getTotalLength();
      path.style.strokeDasharray = length;
      path.style.strokeDashoffset = length;
    }
  }, [points]); // re-run if points change

  if (!points || points.length < 2) return null;

  let pathData = '';

  if (curve && points.length >= 2) {
    // Use smooth cubic interpolation (via Catmull-Rom-like approximation)
    // Or simpler: use polyline if you prefer straight segments
    pathData = generateSmoothPath(points);
  } else {
    // Straight line segments (polyline)
    pathData = 'M ' + points.map(p => `${p.x} ${p.y}`).join(' L ');
  }

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

// Optional: Helper to create a smooth curve through points
function generateSmoothPath(points) {
  if (points.length === 2) {
    // Just a straight line or simple quadratic
    const [p0, p1] = points;
    const midX = (p0.x + p1.x) / 2;
    const midY = (p0.y + p1.y) / 2 - 0.05; // slight upward curve
    return `M ${p0.x} ${p0.y} Q ${midX} ${midY} ${p1.x} ${p1.y}`;
  }

  // For 3+ points: use cubic Bézier segments (simplified)
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length - 1; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const next = points[i + 1];

    // Approximate control points (tension = 0.3)
    const cx1 = curr.x - (next.x - prev.x) * 0.1;
    const cy1 = curr.y - (next.y - prev.y) * 0.1;
    const cx2 = curr.x + (next.x - prev.x) * 0.1;
    const cy2 = curr.y + (next.y - prev.y) * 0.1;

    d += ` C ${cx1} ${cy1}, ${cx2} ${cy2}, ${next.x} ${next.y}`;
  }
  return d;
}