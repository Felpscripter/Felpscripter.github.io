import React, { useState, useEffect } from 'react';
import { TERM_LINES } from '../../data/homeData';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function Terminal() {
  const total = TERM_LINES.length + 1;
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const reduced = prefersReducedMotion();
    const timers = Array.from({ length: total }, (_, i) =>
      setTimeout(() => setShown((s) => Math.max(s, i + 1)), reduced ? 0 : 700 + i * 550)
    );
    return () => timers.forEach(clearTimeout);
  }, [total]);

  const cls = (i, extra = '') => 'term-line' + extra + (i < shown ? ' show' : '');

  return (
    <div className="term mono" id="term" aria-hidden="true">
      {TERM_LINES.map((line, i) => (
        <div className={cls(i)} key={i}>{line}</div>
      ))}
      <div className={cls(TERM_LINES.length, ' sum')}>3 passaram em 4.21s</div>
    </div>
  );
}
