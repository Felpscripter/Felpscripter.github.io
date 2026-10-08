(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const root = document.documentElement;
  const page = document.body.dataset.page;

  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Theme toggle (persistido)
  $('#theme-toggle').addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
  });

  // Header: borda/blur ao rolar + link ativo
  const header = $('#header');
  const links = $$('.nav a:not(.nav-mobile-only)');
  const pageLinks = { stack: '#nav-stack', process: '#nav-process', pipeline: '#nav-pipeline' };
  const sections = page === 'home' ? links.map(a => {
    const h = a.getAttribute('href');
    return h.startsWith('#') ? $(h) : null;
  }) : [];
  const onScroll = () => {
    header.classList.toggle('scrolled', scrollY > 8);
    if (page !== 'home') return;
    let current = -1;
    sections.forEach((s, i) => { if (s && s.getBoundingClientRect().top < innerHeight * 0.4) current = i; });
    links.forEach((a, i) => a.classList.toggle('active', i === current));
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  if (pageLinks[page]) $(pageLinks[page]).classList.add('active');

  // Menu mobile
  const burger = $('#burger');
  const menu = $('#nav-links');
  const setMenu = open => {
    menu.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open);
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };
  burger.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
  $$('a', menu).forEach(a => a.addEventListener('click', () => setMenu(false)));
  addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });

  // Efeito de digitação
  const phrases = [
    'Engenheiro de QA',
    'Automação com Playwright + Python',
    'Testes de API com Postman',
    'CI/CD com GitHub Actions',
  ];
  const typed = $('#typed');
  if (!typed) {
    // página sem o efeito de digitação
  } else if (reduced) {
    typed.textContent = phrases[0];
  } else {
    let p = 0, i = 0, del = false;
    const tick = () => {
      const word = phrases[p];
      typed.textContent = word.slice(0, i);
      let delay = del ? 24 : 55;
      if (!del && i === word.length) { del = true; delay = 1700; }
      else if (del && i === 0) { del = false; p = (p + 1) % phrases.length; delay = 300; }
      i += del ? -1 : 1;
      setTimeout(tick, delay);
    };
    tick();
  }

  // Marquee: duplica o conteúdo para loop contínuo
  const track = $('#marquee-track');
  if (track) track.append(...[...track.children].map(n => n.cloneNode(true)));

  // Reveal ao rolar
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  $$('.reveal').forEach(el => {
    const sibs = $$('.reveal', el.parentElement);
    el.style.setProperty('--d', Math.min(sibs.indexOf(el), 5) * 0.07 + 's');
    io.observe(el);
  });

  // Logs de teste aparecendo em sequência
  $$('.term-line').forEach((l, i) => setTimeout(() => l.classList.add('show'), reduced ? 0 : 700 + i * 550));

  // Spotlight sutil nos cards
  $$('.card').forEach(card => {
    card.addEventListener('pointermove', e => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', e.clientX - r.left + 'px');
      card.style.setProperty('--my', e.clientY - r.top + 'px');
    });
  });

  // Filtros da stack
  const tabs = $$('.tab');
  tabs.forEach(tab => tab.addEventListener('click', () => {
    const f = tab.dataset.filter;
    tabs.forEach(t => { t.classList.toggle('is-active', t === tab); t.setAttribute('aria-selected', t === tab); });
    $$('.card').forEach(card => card.classList.toggle('hide', f !== 'all' && card.dataset.cat !== f));
  }));

  // Copiar YAML
  const copyBtn = $('#copy-yaml');
  if (copyBtn) copyBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText($('#yaml-code').innerText);
      copyBtn.textContent = 'Copiado ✓';
    } catch { copyBtn.textContent = 'Erro'; }
    setTimeout(() => (copyBtn.textContent = 'Copiar'), 1800);
  });

  // Particle Canvas
  const canvas = $('#particle-canvas');
  if (canvas && !reduced) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let w, h;
    const mouse = { x: null, y: null, radius: 100 };

    const resize = () => {
      w = canvas.width = canvas.parentElement.offsetWidth;
      h = canvas.height = canvas.parentElement.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    canvas.addEventListener('mousemove', e => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });
    canvas.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });

    class Particle {
      constructor() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.size = Math.random() * 2 + 0.5;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
      }
      update() {
        if (this.x > w || this.x < 0) this.vx = -this.vx;
        if (this.y > h || this.y < 0) this.vy = -this.vy;
        this.x += this.vx;
        this.y += this.vy;

        if (mouse.x != null) {
          let dx = mouse.x - this.x;
          let dy = mouse.y - this.y;
          let dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const forceDirectionX = dx / dist;
            const forceDirectionY = dy / dist;
            const force = (mouse.radius - dist) / mouse.radius;
            this.x -= forceDirectionX * force;
            this.y -= forceDirectionY * force;
          }
        }
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = root.getAttribute('data-theme') === 'dark' ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.3)';
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      const num = Math.min((w * h) / 12000, 100); // cap max particles
      for (let i = 0; i < num; i++) particles.push(new Particle());
    };
    initParticles();
    window.addEventListener('resize', initParticles);

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      const isDark = root.getAttribute('data-theme') === 'dark';
      const lineColor = isDark ? '255,255,255' : '0,0,0';
      
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${lineColor}, ${0.1 - dist/1000})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
        
        if (mouse.x != null) {
          const dx = particles[i].x - mouse.x;
          const dy = particles[i].y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${lineColor}, ${0.2 - dist/600})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(animate);
    };
    animate();
  }
})();
