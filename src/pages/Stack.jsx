import { useState } from 'react';
import usePageMeta from '../hooks/usePageMeta.js';
import { TABS, TOOLS } from '../data/stackData.jsx';

const spotlight = (e) => {
  const card = e.currentTarget;
  const r = card.getBoundingClientRect();
  card.style.setProperty('--mx', e.clientX - r.left + 'px');
  card.style.setProperty('--my', e.clientY - r.top + 'px');
};

export default function Stack() {
  usePageMeta({
    page: 'stack',
    title: 'Stack | Luiz Felipe Ribeiro da Silva – Engenheiro de QA',
    description:
      'Stack de QA de Luiz Felipe: Playwright, Python, Postman, SQL/MySQL, Chrome DevTools, Git, GitHub Actions, Docker, Jira e Linux CLI.',
    ogTitle: 'Stack | Luiz Felipe Ribeiro da Silva',
  });

  const [filter, setFilter] = useState('all');
  const cardClass = (cat, extra = '') =>
    'card' + extra + (filter !== 'all' && cat !== filter ? ' hide' : '');

  return (
    <section className="section page" id="stack">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow mono">Stack</span>
          <h1>Ferramentas que uso todos os dias.<br /><span className="fade">Cada uma cobre uma camada de qualidade.</span></h1>
        </div>

        <div className="tabs reveal" role="tablist" aria-label="Filtrar por categoria">
          {TABS.map((tab) => (
            <button
              key={tab.filter}
              className={'tab' + (filter === tab.filter ? ' is-active' : '')}
              data-filter={tab.filter}
              role="tab"
              aria-selected={filter === tab.filter}
              id={tab.id}
              onClick={() => setFilter(tab.filter)}
            >
              {tab.label} <sup>{tab.count}</sup>
            </button>
          ))}
        </div>

        <div className="stack-grid reveal" id="stack-grid">
          {TOOLS.map((tool) => (
            <article className={cardClass(tool.cat)} data-cat={tool.cat} key={tool.title} onPointerMove={spotlight}>
              <div className="card-top">
                <span className="cell-ico">{tool.icon}</span>
                <span className="tag mono">{tool.tag}</span>
              </div>
              <h3>{tool.title}</h3>
              <p>{tool.desc}</p>
            </article>
          ))}

          <a
            className={cardClass('all-only', ' card-link')}
            data-cat="all-only"
            href="https://github.com/Felpscripter"
            target="_blank"
            rel="noopener noreferrer"
            id="stack-github"
            onPointerMove={spotlight}
          >
            <span className="mono tag">Código aberto</span>
            <h3>Ver no GitHub <span className="arrow">→</span></h3>
            <p>Repositórios e projetos de automação.</p>
          </a>
        </div>
      </div>
    </section>
  );
}
