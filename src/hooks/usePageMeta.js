import { useEffect } from 'react';

const setMeta = (selector, content) => {
  const el = document.head.querySelector(selector);
  if (el && content) el.setAttribute('content', content);
};


export default function usePageMeta({ page, title, description, ogTitle }) {
  useEffect(() => {
    document.title = title;
    setMeta('meta[name="description"]', description);
    setMeta('meta[property="og:title"]', ogTitle);
    document.body.dataset.page = page;
  }, [page, title, description, ogTitle]);
}
