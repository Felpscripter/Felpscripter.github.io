import React, { useState, useEffect } from 'react';
import { PHRASES } from '../../data/homeData';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function Typed() {
  const [reduced] = useState(prefersReducedMotion);
  const [text, setText] = useState(reduced ? PHRASES[0] : '');

  useEffect(() => {
    if (reduced) return;
    let p = 0, i = 0, del = false, timer;
    const tick = () => {
      const word = PHRASES[p];
      setText(word.slice(0, i));
      let delay = del ? 24 : 55;
      if (!del && i === word.length) { del = true; delay = 1700; }
      else if (del && i === 0) { del = false; p = (p + 1) % PHRASES.length; delay = 300; }
      i += del ? -1 : 1;
      timer = setTimeout(tick, delay);
    };
    tick();
    return () => clearTimeout(timer);
  }, [reduced]);

  return <span id="typed">{text}</span>;
}
