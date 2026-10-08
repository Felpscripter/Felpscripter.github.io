import { useEffect } from 'react';


export default function useReveal(dep) {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('.reveal').forEach((el) => {
      const sibs = [...el.parentElement.querySelectorAll('.reveal')];
      el.style.setProperty('--d', Math.min(sibs.indexOf(el), 5) * 0.07 + 's');
      io.observe(el);
    });

    return () => io.disconnect();
  }, [dep]);
}
