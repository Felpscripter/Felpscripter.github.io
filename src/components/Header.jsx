import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BugIcon, MoonIcon, SunIcon } from './Icons.jsx';

const NAV_LINKS = [
  { id: 'nav-sobre', to: '/#sobre', label: 'Sobre', section: 'sobre' },
  { id: 'nav-stack', to: '/stack', label: 'Stack', page: 'stack' },
  { id: 'nav-process', to: '/process', label: 'Processo', page: 'process' },
  { id: 'nav-pipeline', to: '/pipeline', label: 'Pipeline', page: 'pipeline' },
];

export default function Header({ page }) {
  const isHome = page === 'home';
  const [scrolled, setScrolled] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const [menuOpen, setMenuOpen] = useState(false);


  useEffect(() => {
    const sections = isHome
      ? NAV_LINKS.map((l) => (l.section ? document.getElementById(l.section) : null))
      : [];
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      if (!isHome) return;
      let current = -1;
      sections.forEach((s, i) => {
        if (s && s.getBoundingClientRect().top < window.innerHeight * 0.4) current = i;
      });
      setActiveIdx(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHome]);


  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);
  useEffect(() => setMenuOpen(false), [page]);


  const toggleTheme = () => {
    const root = document.documentElement;
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) { }
  };

  const isActive = (link, i) => (isHome ? i === activeIdx : link.page === page);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={'header' + (scrolled ? ' scrolled' : '')} id="header">
      <div className="header-in">
        <Link to={isHome ? '/#inicio' : '/'} className="brand" id="brand-link" aria-label="Luiz Felipe – home">
          <BugIcon />
          <span className="slash" aria-hidden="true">/</span>
          <span className="brand-name">Luiz Felipe</span>
        </Link>

        <nav className={'nav' + (menuOpen ? ' open' : '')} id="nav-links" aria-label="Navegação principal">
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.id}
              to={link.to}
              id={link.id}
              className={isActive(link, i) ? 'active' : undefined}
              onClick={closeMenu}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/#contato" id="nav-contato" className="nav-mobile-only" onClick={closeMenu}>Contato</Link>
        </nav>

        <div className="header-actions">
          <button className="icon-btn" id="theme-toggle" type="button" aria-label="Alternar tema claro/escuro" onClick={toggleTheme}>
            <SunIcon />
            <MoonIcon />
          </button>
          {!isHome && (
            <a href="https://github.com/Felpscripter" target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-secondary hide-sm" id="nav-github">GitHub</a>
          )}
          <Link to="/#contato" className="btn btn-sm btn-primary hide-sm" id="nav-cta">Contato</Link>
          <button
            className="burger"
            id="burger"
            type="button"
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuOpen}
            aria-controls="nav-links"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span></span><span></span>
          </button>
        </div>
      </div>
    </header>
  );
}
