import { useState } from 'react';
import usePageMeta from '../hooks/usePageMeta.js';

const ico = {
  viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor',
  strokeWidth: '1.7', strokeLinecap: 'round', strokeLinejoin: 'round',
};

const TABS = [
  { filter: 'all', id: 'filter-all', label: 'Todas', count: 11 },
  { filter: 'testes', id: 'filter-testes', label: 'Testes e Automação', count: 3 },
  { filter: 'dados', id: 'filter-dados', label: 'API e Dados', count: 3 },
  { filter: 'infra', id: 'filter-infra', label: 'Infra e Workflow', count: 5 },
];

const TOOLS = [
  {
    cat: 'testes', tag: 'Automação', title: 'Playwright',
    desc: 'Automação end-to-end em navegadores reais com seletores resilientes.',
    icon: <svg {...ico}><path d="M8 3 4 7l4 4M16 3l4 4-4 4M14 14l-4 7" /></svg>,
  },
  {
    cat: 'testes', tag: 'Testes', title: 'Playwright Test',
    desc: 'Execuções paralelas, relatórios, traces e screenshots para diagnosticar falhas.',
    icon: <svg {...ico}><path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3" /><path d="M8 15h8" /></svg>,
  },
  {
    cat: 'testes', tag: 'Linguagem', title: 'Python',
    desc: 'Scripts de teste e frameworks claros, reutilizáveis e fáceis de evoluir.',
    icon: <svg {...ico}><path d="M12 3c-3 0-3 2-3 3v2h6V6c0-1-1-3-3-3Z" /><path d="M9 8H6a3 3 0 0 0-3 3v1a3 3 0 0 0 3 3h3" /><path d="M15 16h3a3 3 0 0 0 3-3v-1a3 3 0 0 0-3-3h-3" /><path d="M12 21c3 0 3-2 3-3v-2H9v2c0 1 1 3 3 3Z" /></svg>,
  },
  {
    cat: 'dados', tag: 'API', title: 'Postman',
    desc: 'Coleções, ambientes e validações de contrato para testar endpoints REST.',
    icon: <svg {...ico}><path d="M22 2 11 13" /><path d="m22 2-7 20-4-9-9-4 20-7Z" /></svg>,
  },
  {
    cat: 'dados', tag: 'Banco de Dados', title: 'SQL · MySQL',
    desc: 'Consultas para validar regras de negócio, dados de teste e integridade.',
    icon: <svg {...ico}><ellipse cx="12" cy="5" rx="8" ry="3" /><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5" /><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" /></svg>,
  },
  {
    cat: 'dados', tag: 'Web', title: 'Chrome DevTools',
    desc: 'Network, console, DOM e performance para encontrar a causa raiz de bugs.',
    icon: <svg {...ico}><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18M7 6.5h.01M10 6.5h.01" /></svg>,
  },
  {
    cat: 'infra', tag: 'Controle de versão', title: 'Git · GitHub / GitLab',
    desc: 'Branches, pull requests e code review com histórico rastreável.',
    icon: <svg {...ico}><circle cx="6" cy="6" r="2.2" /><circle cx="6" cy="18" r="2.2" /><circle cx="18" cy="9" r="2.2" /><path d="M6 8.2v7.6M18 11.2c0 4-6 2.5-12 5" /></svg>,
  },
  {
    cat: 'infra', tag: 'CI/CD', title: 'GitHub Actions',
    desc: 'Pipelines que executam a suíte automaticamente a cada push e pull request.',
    icon: <svg {...ico}><path d="M21 12a9 9 0 1 1-3-6.7" /><path d="M21 4v5h-5" /><path d="m9 12 2 2 4-4" /></svg>,
  },
  {
    cat: 'infra', tag: 'Containers', title: 'Docker',
    desc: 'Ambientes isolados e reprodutíveis para rodar testes em qualquer lugar.',
    icon: <svg {...ico}><path d="M3 13h18c0 4-3 7-8 7s-8-3-10-7Z" /><path d="M6 10h3v3H6zM9 10h3v3H9zM12 10h3v3h-3zM9 7h3v3H9z" /></svg>,
  },
  {
    cat: 'infra', tag: 'Gestão', title: 'Jira',
    desc: 'Gestão de bugs, histórias e sprints com relatórios claros e rastreáveis.',
    icon: <svg {...ico}><rect x="3" y="3" width="7" height="18" rx="1.5" /><rect x="14" y="3" width="7" height="11" rx="1.5" /></svg>,
  },
  {
    cat: 'infra', tag: 'Linux', title: 'Linux CLI',
    desc: 'Produtividade no terminal: logs, processos, scripts e acesso ao ambiente.',
    icon: <svg {...ico}><rect x="3" y="4" width="18" height="16" rx="2" /><path d="m7 9 3 3-3 3M13 15h4" /></svg>,
  },
];


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
