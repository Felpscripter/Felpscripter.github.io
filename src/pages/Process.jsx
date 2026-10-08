import usePageMeta from '../hooks/usePageMeta.js';

export default function Process() {
  usePageMeta({
    page: 'process',
    title: 'Processo | Luiz Felipe Ribeiro da Silva – Engenheiro de QA',
    description:
      'Como Luiz Felipe garante a qualidade: entender, explorar, automatizar e integrar, do requisito ao deploy.',
    ogTitle: 'Processo | Luiz Felipe Ribeiro da Silva',
  });

  return (
    <section className="section page" id="process">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow mono">Processo</span>
          <h1>Como eu garanto a qualidade.<br /><span className="fade">Do requisito ao deploy.</span></h1>
        </div>
        <ol className="steps">
          <li className="step reveal">
            <span className="step-n mono">01</span>
            <h3>Entender</h3>
            <p>Leio requisitos e histórias no <b>Jira</b> e mapeio riscos e critérios de aceite.</p>
          </li>
          <li className="step reveal">
            <span className="step-n mono">02</span>
            <h3>Explorar</h3>
            <p>Testo manualmente com <b>DevTools</b> e <b>Postman</b>, validando dados via <b>SQL</b>.</p>
          </li>
          <li className="step reveal">
            <span className="step-n mono">03</span>
            <h3>Automatizar</h3>
            <p>Cenários críticos viram testes em <b>Python + Playwright</b>, versionados no <b>Git</b>.</p>
          </li>
          <li className="step reveal">
            <span className="step-n mono">04</span>
            <h3>Integrar</h3>
            <p>Executo tudo em <b>Docker</b> e <b>GitHub Actions</b> para feedback contínuo.</p>
          </li>
        </ol>
      </div>
    </section>
  );
}
