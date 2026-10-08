import React, { useState, useEffect } from 'react';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function BackgroundMoon() {
  const [opacity, setOpacity] = useState(0.25);

  useEffect(() => {
    const reduced = prefersReducedMotion();
    if (reduced) return;

    const onScroll = () => {
      const newOpacity = Math.max(0, 0.25 * (1 - window.scrollY / 1200));
      setOpacity(newOpacity);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="bg-moon" style={{ opacity }} aria-hidden="true">
      <img src="/moon.png" alt="Lua" />
    </div>
  );
}
