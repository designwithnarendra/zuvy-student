import { useState, useEffect, useRef } from "react";

interface AnimatedProgressBarProps {
  progress: number; // 0–100
  className?: string;
}

const DURATION = 1500; // ms — slow enough to make the count-up numbers visible

// Ease-in-out (sinusoidal) — smooth acceleration and deceleration
function easeInOut(t: number): number {
  return -(Math.cos(Math.PI * t) - 1) / 2;
}

const AnimatedProgressBar = ({ progress, className }: AnimatedProgressBarProps) => {
  const [animated, setAnimated] = useState(0);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number>(0);

  useEffect(() => {
    // Respect prefers-reduced-motion — skip to final value immediately
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setAnimated(progress);
      return;
    }

    startRef.current = 0;
    cancelAnimationFrame(rafRef.current);

    const tick = (timestamp: number) => {
      if (!startRef.current) startRef.current = timestamp;
      const elapsed = timestamp - startRef.current;
      const t = Math.min(elapsed / DURATION, 1);
      setAnimated(easeInOut(t) * progress);
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [progress]);

  const rounded = Math.round(animated);

  // Label tracks the fill front; snap to edges at near-zero / near-full
  const labelStyle: React.CSSProperties =
    animated < 1
      ? { top: "50%", left: 0, transform: "translateY(-50%)" }
      : animated > 99
      ? { top: "50%", right: 0, transform: "translateY(-50%)" }
      : {
          top: "50%",
          left: `${animated}%`,
          transform: "translateX(calc(-100% + 12px)) translateY(-50%)",
        };

  return (
    <div className={`relative bg-primary-light rounded-full h-2 w-full${className ? ` ${className}` : ""}`}>
      <div
        className="bg-primary h-2 rounded-full"
        style={{ width: `${animated}%` }}
      />
      <div
        className="absolute progress-label-bg progress-label px-2 py-0.5 rounded shadow-sm border text-xs font-medium whitespace-nowrap"
        style={labelStyle}
      >
        {rounded}%
      </div>
    </div>
  );
};

export default AnimatedProgressBar;
