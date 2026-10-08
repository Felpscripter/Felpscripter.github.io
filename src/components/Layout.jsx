import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import useReveal from '../hooks/useReveal.js';
import useScrollManager from '../hooks/useScrollManager.js';

const pageFromPath = (pathname) => {
  const seg = pathname.replace(/^\/+|\/+$/g, '');
  return ['stack', 'process', 'pipeline'].includes(seg) ? seg : 'home';
};

export default function Layout() {
  const { pathname } = useLocation();
  const page = pageFromPath(pathname);

  useScrollManager();
  useReveal(pathname);

  return (
    <>
      <a className="skip" href="#conteudo">Pular para o conteúdo</a>
      <Header page={page} />
      <main id="conteudo">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
