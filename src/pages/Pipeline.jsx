import { useEffect, useRef, useState } from 'react';
import usePageMeta from '../hooks/usePageMeta.js';
import { YAML } from '../data/pipelineData.js';

export default function Pipeline() {
  usePageMeta({
    page: 'pipeline',
    title: 'Pipeline | Luiz Felipe Ribeiro da Silva – Engenheiro de QA',
    description: 'Exemplo de pipeline de testes E2E com GitHub Actions, Python e Playwright a cada commit.',
    ogTitle: 'Pipeline | Luiz Felipe Ribeiro da Silva',
  });

  const yamlRef = useRef(null);
  const timerRef = useRef(null);
  const [copyLabel, setCopyLabel] = useState('Copiar');

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const copyYaml = async () => {
    try {
      await navigator.clipboard.writeText(yamlRef.current.innerText);
      setCopyLabel('Copiado ✓');
    } catch {
      setCopyLabel('Erro');
    }
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setCopyLabel('Copiar'), 1800);
  };

  return (
    <section className="section page" id="pipeline">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow mono">Pipeline</span>
          <h1>Testes a cada commit.<br /><span className="fade">Feedback antes do merge.</span></h1>
        </div>

        <div className="pipeline reveal">
          <div className="deploy">
            <div className="deploy-head">
              <div className="deploy-meta"><span className="mono">.github/workflows/tests.yml</span></div>
              <button className="copy" id="copy-yaml" type="button" onClick={copyYaml}>{copyLabel}</button>
            </div>
            <pre className="code" id="yaml-code" ref={yamlRef}><code>{YAML}</code></pre>
          </div>

          <ul className="flow" aria-label="Fluxo do pipeline">
            <li className="flow-item"><span className="flow-dot"></span><div><b>Push</b><span className="mono">git push origin main</span></div></li>
            <li className="flow-item"><span className="flow-dot"></span><div><b>Build</b><span className="mono">pip install · playwright install</span></div></li>
            <li className="flow-item"><span className="flow-dot"></span><div><b>Testes</b><span className="mono">pytest · API · UI · DB</span></div></li>
            <li className="flow-item ready"><span className="flow-dot"></span><div><b>Pronto</b><span className="mono">todas as checagens passaram</span></div></li>
          </ul>
        </div>
      </div>
    </section>
  );
}
