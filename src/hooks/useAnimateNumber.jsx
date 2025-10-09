import { useEffect, useRef, useState } from "react";

/**
 * useAnimateNumber
 * - Animates numeric changes to `targetValue` using requestAnimationFrame.
 * - Works with async values (e.g. coming from useSelector).
 *
 * Options:
 *  - duration (ms)
 *  - skipInitial: if true, the first value will NOT animate from 0 (default true)
 *  - round: whether to return a rounded integer (default true)
 */
export default function useAnimateNumber(
  targetValue,
  duration = 500,
  opts = {}
) {
  const { skipInitial = true, round = true } = opts;

  // Coerce target to number; if not finite, fallback to 0
  const toNum = (v) => {
    const n = Number(v);
    return Number.isFinite(n) ? n : 0;
  };

  const initial = toNum(targetValue);
  const [animatedValue, setAnimatedValue] = useState(initial);

  // Refs to hold mutable values across frames
  const animatedRef = useRef(initial); // mirrors the latest displayed value
  const startRef = useRef(initial); // animation start value
  const startTimeRef = useRef(null);
  const rafRef = useRef(null);
  const mountedRef = useRef(false);

  // Keep ref in sync whenever state changes
  const setAndRef = (v) => {
    animatedRef.current = v;
    setAnimatedValue(v);
  };

  useEffect(() => {
    const endValue = toNum(targetValue);

    // If this is the very first mount and user opted to skip initial
    if (!mountedRef.current && skipInitial) {
      setAndRef(endValue);
      mountedRef.current = true;
      return; // don't animate initial load
    }
    mountedRef.current = true;

    // If end equals current, nothing to animate
    if (Math.abs(endValue - animatedRef.current) < 0.00001) {
      setAndRef(endValue);
      return;
    }

    // Prepare animation
    startRef.current = animatedRef.current;
    startTimeRef.current = null;

    // easing function (can swap for other easings)
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    // The step function — this is where a breakpoint or `debugger;` will hit
    const step = (timestamp) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);

      const current = startRef.current + (endValue - startRef.current) * eased;

      setAndRef(current);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        rafRef.current = null;
      }
    };

    // Kick off
    rafRef.current = requestAnimationFrame(step);

    // Cleanup on dependency change / unmount
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
    // Intentionally depends only on targetValue and duration
  }, [targetValue, duration, skipInitial]); // opts changing re-runs

  return round ? Math.round(animatedValue) : animatedValue;
}
