import { useEffect, useRef } from 'react';

export default function AnimatedPath({ path }) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(path, 'image/svg+xml');

  const svgElement = doc.querySelector('svg');
  const x = svgElement?.getAttribute('x');
  const y = svgElement?.getAttribute('y');

  const pathElement = doc.querySelector('path');
  const d = pathElement?.getAttribute('d');

  const color = pathElement?.getAttribute('stroke') || '#ffffff';

  const pathRef = useRef(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const length = path.getTotalLength();
    path.style.strokeDasharray = length;
    path.style.strokeDashoffset = length;

    // Trigger reflow
    path.getBoundingClientRect();

    // Animate
    path.style.transition = 'stroke-dashoffset 1.25s ease-in-out';
    path.style.strokeDashoffset = '0';
  }, [d]);

  return (
    <svg
      viewBox="0 0 1920 1080"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      className="w-full h-full absolute inset-0 z-20"
    >
      <g transform={`translate(${x}, ${y})`}>
        <path
          ref={pathRef}
          d={d}
          fill="none"
          stroke={color}
          strokeWidth="5"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}