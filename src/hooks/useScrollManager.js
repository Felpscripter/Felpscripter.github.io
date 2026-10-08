import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Gerencia a rolagem entre rotas:
 * - troca de página → topo (ou âncora) instantaneamente, como num carregamento normal;
 * - mesma página com âncora (#sobre, #contato…) → rolagem suave (scroll-behavior do CSS).
 */
export default function useScrollManager() {
  const { pathname, hash, key } = useLocation();
  const prevPath = useRef(null);

  useEffect(() => {
    const firstRun = prevPath.current === null;
    const pageChanged = prevPath.current !== pathname;
    prevPath.current = pathname;

    if (hash) {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (el) {
        el.scrollIntoView(pageChanged ? { behavior: 'instant' } : undefined);
        return;
      }
    }
    if (!firstRun && pageChanged) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [pathname, hash, key]);
}
