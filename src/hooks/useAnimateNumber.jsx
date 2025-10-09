import { useEffect, useState, useRef } from "react";

/**
 * Smoothly animates a number value from a start to an end over a duration.
 * @param {number} value - The target number to animate to.
 * @param {number} duration - Duration of the animation in milliseconds (default: 500).
 * @returns {number} - The current animated number.
 */
export default function useAnimateNumber(value, duration = 500) {
  const [animatedValue, setAnimatedValue] = useState(value);
  const startValue = useRef(value);
  const startTime = useRef(null);

  useEffect(() => {
    startValue.current = animatedValue;
    startTime.current = null;

    const step = (timestamp) => {
      if (!startTime.current) startTime.current = timestamp;
      const progress = Math.min((timestamp - startTime.current) / duration, 1);
      const easedProgress = easeOutCubic(progress); // smoother animation

      const newValue =
        startValue.current + (value - startValue.current) * easedProgress;

      setAnimatedValue(newValue);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    requestAnimationFrame(step);
  }, [value, duration]);

  return Math.round(animatedValue); // or keep as float if needed
}
