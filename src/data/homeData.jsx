import React from 'react';

export const PHRASES = [
  'Engenheiro de QA',
  'Automação com Playwright + Python',
  'Testes de API com Postman',
  'CI/CD com GitHub Actions',
];

export const TERM_LINES = [
  <React.Fragment key="1"><span className="muted">$</span> pytest --headed</React.Fragment>,
  <React.Fragment key="2"><span className="check">✓</span> test_valid_login <i>1.4s</i></React.Fragment>,
  <React.Fragment key="3"><span className="check">✓</span> test_api_status_200 <i>0.3s</i></React.Fragment>,
  <React.Fragment key="4"><span className="check">✓</span> test_query_orders <i>0.2s</i></React.Fragment>,
];

const K = ({ children }) => <span className="c-k">{children}</span>;
const F = ({ children }) => <span className="c-f">{children}</span>;
const S = ({ children }) => <span className="c-s">{children}</span>;
const C = ({ children }) => <span className="c-c">{children}</span>;

export const CODE_LINES = [
  <React.Fragment key="c1"><K>from</K>{' playwright.sync_api '}<K>import</K>{' Page, expect'}</React.Fragment>,
  '',
  <React.Fragment key="c2"><K>def</K>{' '}<F>test_valid_login</F>{'(page: Page):'}</React.Fragment>,
  <React.Fragment key="c3">{'    page.'}<F>goto</F>{'('}<S>"/login"</S>{')'}</React.Fragment>,
  <React.Fragment key="c4">{'    page.'}<F>get_by_label</F>{'('}<S>"Email"</S>{').'}<F>fill</F>{'('}<S>"qa@test.com"</S>{')'}</React.Fragment>,
  <React.Fragment key="c5">{'    page.'}<F>get_by_label</F>{'('}<S>"Password"</S>{').'}<F>fill</F>{'('}<S>"********"</S>{')'}</React.Fragment>,
  <React.Fragment key="c6">{'    page.'}<F>get_by_role</F>{'('}<S>"button"</S>{', name='}<S>"Sign in"</S>{').'}<F>click</F>{'()'}</React.Fragment>,
  '',
  <React.Fragment key="c7">{'    '}<C># qualidade é um requisito, não um extra</C></React.Fragment>,
  <React.Fragment key="c8">{'    '}<F>expect</F>{'(page).'}<F>to_have_url</F>{'('}<S>"/dashboard"</S>{')'}</React.Fragment>,
];

export const TOOLS = [
  'Playwright', 'Python', 'Postman', 'Docker',
  'GitHub Actions', 'Jira', 'MySQL', 'Git',
  'Chrome DevTools', 'Linux', 'SQL', 'GitLab',
];
