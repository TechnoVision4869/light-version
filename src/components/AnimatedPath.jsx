import { motion } from "motion/react";

export default function AnimatedPath({ path }) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(path, 'image/svg+xml');

  const svgElement = doc.querySelector('svg');
  const x = svgElement?.getAttribute('x');
  const y = svgElement?.getAttribute('y');

  const pathElement = doc.querySelector('path');
  const d = pathElement?.getAttribute('d');

  return (
    <svg
      viewBox="0 0 1920 1080"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      className="w-full h-full absolute inset-0"
    >
      <g transform={`translate(${x}, ${y})`}>
        <motion.path
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          transition={{
            duration: 1.7,
            ease: "easeInOut",
          }}
          d={d}
          stroke="#ffffff"
          strokeWidth="5"
        />
      </g>
    </svg>
  );
}