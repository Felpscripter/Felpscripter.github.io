import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import usePageMeta from '../hooks/usePageMeta.js';
import ParticleCanvas from '../components/ParticleCanvas.jsx';
import { BranchIcon, GearIcon, GitHubIcon, TargetIcon, TriangleIcon, ZoomIcon } from '../components/Icons.jsx';

import Typed from '../components/home/Typed.jsx';
import Terminal from '../components/home/Terminal.jsx';
import BackgroundMoon from '../components/home/BackgroundMoon.jsx';
import { CODE_LINES, TOOLS } from '../data/homeData.jsx';

export default function Home() {
  usePageMeta({
    page: 'home',
    title: 'Luiz Felipe Ribeiro da Silva | Engenheiro de QA',
    description:
      'Portfólio de Luiz Felipe Ribeiro da Silva, engenheiro de QA experiente em automação de testes com Playwright e Python, testes de API com Postman, SQL/MySQL, Docker e CI/CD com GitHub Actions.',
    ogTitle: 'Luiz Felipe Ribeiro da Silva | Engenheiro de QA',
  });

  return (
    <>
      <section className="hero" id="inicio">
        <div className="container hero-in">
          <h1 className="reveal">Qualidade em cada commit.<br /><span className="fade">Confiança em cada deploy.</span></h1>

          <div className="profile-pic-container reveal" style={{ '--d': '0.1s' }}>
            <img src="/profile.jpg" alt="Luiz Felipe Ribeiro da Silva" className="profile-pic" />
          </div>

          <p className="hero-sub reveal">
            <strong>Luiz Felipe Ribeiro da Silva</strong> · Engenheiro de QA.<br />
            Exterminador profissional de bugs com mais de 2 anos de experiência em qualidade de software.
          </p>

          <p className="role mono reveal" aria-live="polite">
            <span className="prompt">$</span> <Typed /><span className="caret"></span>
          </p>

          <div className="hero-actions reveal">
            <Link to="/stack" className="btn btn-lg btn-primary" id="cta-stack">Ver minha stack</Link>
            <Link to="/#contato" className="btn btn-lg btn-secondary" id="cta-contato">Entrar em contato</Link>
          </div>
        </div>

        <div className="container deploy-wrap reveal">
          <div className="deploy" id="deploy">
            <div className="deploy-head">
              <div className="deploy-meta">
                <TriangleIcon />
                <span className="mono">felps/e2e-tests</span>
                <span className="branch mono"><BranchIcon /> main</span>
              </div>
              <span className="status"><i className="dot"></i> Pronto · <span className="mono">4.21s</span></span>
            </div>

            <div className="deploy-body">
              <div className="deploy-col">
                <div className="col-title mono">test_login.py</div>
                <pre className="code" aria-label="Exemplo de teste automatizado com Playwright e Python"><code>
                  {CODE_LINES.map((line, i) => (
                    <Fragment key={i}>{line}{i < CODE_LINES.length - 1 ? '\n' : null}</Fragment>
                  ))}
                </code></pre>
              </div>
              <div className="deploy-col term-col">
                <div className="col-title mono">Logs de build</div>
                <Terminal />
              </div>
            </div>
          </div>
        </div>

        <div className="container marquee-wrap reveal">
          <p className="marquee-label mono">Ferramentas</p>
          <div className="marquee" aria-hidden="true">
            <div className="marquee-track" id="marquee-track">
              {[...TOOLS, ...TOOLS].map((tool, i) => <span key={i}>{tool}</span>)}
            </div>
          </div>
        </div>
        <BackgroundMoon />
      </section>

      <section className="section" id="sobre">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow mono">Sobre</span>
            <h2>Qualidade não é uma etapa.<br /><span className="fade">É uma mentalidade.</span></h2>
          </div>

          <div className="about-grid">
            <div className="about-text reveal">
              <p>
                Me chamo <strong>Luiz Felipe Ribeiro da Silva</strong>, sou o responsável por entender
                como o software funciona e encontrar os problemas que passariam despercebidos.
              </p>
              <p>
                Já atuo na área há mais de 2 anos e minha experiência abrange testes automatizados, web &amp; mobile, de API e banco de dados, com Python, Playwright,
                Postman, Docker, GitHub Actions, Git e Jira como parte do meu kit diário de ferramentas.
              </p>
              <p>
                Eu foco em criar testes confiáveis, investigar comportamentos inesperados
                e trabalhar em colaboração com as equipes de desenvolvimento para melhorar a qualidade do software
                durante todo o processo de desenvolvimento.
              </p>
            </div>

            <div className="about-cards">
              <article className="cell reveal">
                <span className="cell-ico"><TargetIcon /></span>
                <h3>Pensar em riscos</h3>
                <p>Eu foco primeiro nos cenários que podem ter o maior impacto para os usuários.</p>
              </article>

              <article className="cell reveal">
                <span className="cell-ico"><GearIcon /></span>
                <h3>Automatizar o que importa</h3>
                <p>Uso a automação onde ela economiza tempo e dá mais confiança para a equipe.</p>
              </article>

              <article className="cell reveal">
                <span className="cell-ico"><ZoomIcon /></span>
                <h3>Investigar profundamente</h3>
                <p>Eu não paro no "falhou", eu tento entender por que falhou.</p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="section contact" id="contato">
        <div className="container">
          <div className="cta reveal">
            <ParticleCanvas />
            <div className="cta-content">
              <h2>Vamos construir um software<br /><span className="fade">mais confiável?</span></h2>
              <p>Confira meus projetos e repositórios no GitHub/LinkedIn.</p>
              <div className="hero-actions center">
                <a className="btn btn-lg btn-primary" id="contact-github" href="https://github.com/Felpscripter" target="_blank" rel="noopener noreferrer">
                  <GitHubIcon />
                  github.com/Felpscripter
                </a>
                <a className="btn btn-lg btn-primary" id="contact-linkedin" href="https://www.linkedin.com/in/devfeliperibeiro" target="_blank" rel="noopener noreferrer">
                  <GitHubIcon />
                  Linkedin.com/in/devfeliperibeiro
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
