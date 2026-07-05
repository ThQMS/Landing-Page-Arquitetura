const { useState, useEffect, useRef } = React;

/* ============================================================
   Configuração / conteúdo
   ============================================================ */
const WHATSAPP = "5562993085547";
const WHATSAPP_HUMANO = "(62) 99308-5547";
const WA_LINK = `https://api.whatsapp.com/send/?phone=${WHATSAPP}&text=${encodeURIComponent(
  "Oi, tudo bem? Gostaria de conversar sobre um projeto."
)}`;
const INSTAGRAM = "https://www.instagram.com/eduarda.martinsarq";
const SUBSTACK = "https://danausarquitetura.substack.com";

// Palavras que giram na faixa (marquee)
const MARQUEE = [
  "Residencial", "Interiores", "Reforma", "Consultoria",
  "Projeto Executivo", "Paisagismo", "Detalhamento", "Luz Natural",
];

// Etapas do processo de projeto
const PROCESSO = [
  { n: "01", nome: "Escuta", desc: "Entender a rotina, os desejos e as limitações de quem vai viver o espaço. Todo bom projeto começa por uma conversa honesta." },
  { n: "02", nome: "Estudo", desc: "Estudo preliminar de layout, fluxos e volumes. Testamos possibilidades antes de decidir — no papel, não na obra." },
  { n: "03", nome: "Projeto", desc: "Detalhamento executivo, especificações e compatibilizações. Cada decisão registrada para a obra sair sem improviso." },
  { n: "04", nome: "Obra", desc: "Acompanhamento e curadoria de acabamentos, garantindo que o desenho vire realidade com o mesmo cuidado." },
];

// Slides do carrossel de projetos (tela cheia, foto inteira).
// Para publicar: troque/adicione `img` com o caminho da foto real.
// Slides sem `img` viram placeholder "em breve".
const CARROSSEL = [
  {
    num: "01",
    nome: "Residência A",
    desc: "Casa térrea com pátio central. A planta organiza-se em torno da luz e da ventilação cruzada.",
    img: "https://substackcdn.com/image/fetch/$s_!3i5q!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa58444ef-f6bd-4103-aa16-37f2ebd1f80b_1280x720.jpeg",
  },
  {
    num: "02",
    nome: "Residência B",
    desc: "Reforma de apartamento. Reorganização dos ambientes sociais para ganhar amplitude sem ampliar a metragem.",
    img: "https://substackcdn.com/image/fetch/$s_!ovZ2!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fdae2b184-4d27-4caf-943d-8364074e3bff_960x1280.jpeg",
  },
  {
    num: "03",
    nome: "Projeto em breve",
    desc: "Novos trabalhos entram aqui à medida que forem entregues e fotografados.",
  },
];

// Artigos reais, puxados do Substack
const ARTIGOS = [
  {
    titulo: "Arquitetura que permanece",
    resumo: "Sobre o que torna um projeto atemporal, além da estética do momento.",
    data: "2026",
    link: "https://danausarquitetura.substack.com/p/arquitetura-que-permanece",
  },
  {
    titulo: "Quanto custa não contratar um arquiteto?",
    resumo: "O custo invisível da obra sem planejamento: retrabalho, compras erradas e desgaste.",
    data: "27 Fev 2026",
    link: "https://danausarquitetura.substack.com/p/quanto-custa-nao-contratar-um-arquiteto",
  },
  {
    titulo: "O que um bom projeto resolve antes de ser bonito",
    resumo: "Circulação, uso, iluminação e manutenção vêm antes da estética.",
    data: "05 Mar 2026",
    link: "https://danausarquitetura.substack.com/p/o-que-um-bom-projeto-resolve-antes",
  },
];

/* ============================================================
   Reveal on scroll — hook global (IntersectionObserver)
   ============================================================ */
function useRevealObserver() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll(".reveal, .reveal-slide"));
    const reveal = (el) => el.classList.add("in");
    if (!("IntersectionObserver" in window)) {
      els.forEach(reveal);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            reveal(e.target);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" }
    );
    els.forEach((el) => io.observe(el));
    // Rede de segurança: nada fica invisível se o observer atrasar/falhar.
    const t = setTimeout(() => els.forEach(reveal), 2200);
    return () => {
      io.disconnect();
      clearTimeout(t);
    };
  }, []);
}

/* ============================================================
   Ícones
   ============================================================ */
const IconWhats = () => (
  <svg className="wa-icon" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.2 4.79 1.2h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 1.67c2.2 0 4.26.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.16 8.16 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24zm4.52 10.31c-.25-.12-1.47-.72-1.69-.8-.23-.09-.39-.13-.56.12-.16.25-.64.8-.79.97-.14.16-.29.18-.54.06-.25-.13-1.05-.39-1.99-1.23-.74-.66-1.23-1.48-1.38-1.72-.14-.25-.01-.38.11-.51.11-.11.25-.29.37-.43.13-.14.17-.25.25-.42.08-.16.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.48c-.16 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.17-.47-.29z" />
  </svg>
);
const IconInsta = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);
const IconChevron = ({ dir }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    {dir === "left" ? <path d="M15 5L8 12l7 7" /> : <path d="M9 5l7 7-7 7" />}
  </svg>
);
const IconSun = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
);
const IconMoon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
  </svg>
);

/* ============================================================
   Ambient glow (fundo fixo)
   ============================================================ */
const AmbientGlow = () => (
  <div className="ambient-glow" aria-hidden="true">
    <div className="ag-orb ag-orb-1" />
    <div className="ag-orb ag-orb-2" />
    <div className="ag-orb ag-orb-3" />
  </div>
);

/* ============================================================
   Nav
   ============================================================ */
function Nav({ theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [overHero, setOverHero] = useState(true);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  // Scrollspy: destaca no menu a seção que está na tela
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const secs = ["sobre", "processo", "projetos", "escritos", "contato"]
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    secs.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const NAV_H = 68; // altura aprox. da navbar
    const onScroll = () => {
      const y = window.scrollY || window.pageYOffset;
      setScrolled(y > 24);
      // Navbar fica "marrom" (over-hero) enquanto QUALQUER parte do hero
      // aparece abaixo dela; vira "branca" só quando o marrom sai da tela.
      const hero = document.querySelector(".hero");
      const heroBottom = hero ? hero.getBoundingClientRect().bottom : window.innerHeight - NAV_H;
      setOverHero(heroBottom > NAV_H);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const cls = ["nav", scrolled ? "scrolled" : "", overHero ? "over-media" : "", open ? "menu-open" : ""]
    .filter(Boolean).join(" ");

  const links = [
    ["#sobre", "Sobre"],
    ["#processo", "Processo"],
    ["#projetos", "Projetos"],
    ["#escritos", "Escritos"],
    ["#contato", "Contato"],
  ];

  return (
    <nav className={cls}>
      <a className="nav-mark" href="#top" aria-label="Maria Eduarda Martins — início">
        <span className="mark-glyph">M</span>
        <span className="mark-name">Maria Eduarda<small>Arquitetura &amp; Interiores</small></span>
      </a>

      <div className="nav-links">
        {links.map(([href, label]) => {
          const isActive = active === href.slice(1);
          return (
            <a key={href} href={href} className={isActive ? "active" : undefined} aria-current={isActive ? "true" : undefined}>{label}</a>
          );
        })}
      </div>

      <div className="nav-controls">
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Alternar tema">
          {theme === "light" ? <IconMoon /> : <IconSun />}
        </button>
        <button className="nav-burger" onClick={() => setOpen((o) => !o)} aria-label="Menu" aria-expanded={open}>
          <span /><span /><span />
        </button>
      </div>

      <div className="nav-mobile">
        {links.map(([href, label]) => (
          <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>
        ))}
      </div>
    </nav>
  );
}

/* ============================================================
   Hero
   ============================================================ */
function Hero() {
  return (
    <header className="hero" id="top">
      <div className="hero-overlay" />
      <div className="hero-watermark"><span className="glyph">M</span></div>
      <div className="hero-bg-noise" />

      <div className="hero-content">
        <div className="hero-credentials">
          <span className="cred-hide">Maria Eduarda Martins <span className="cred-sep">/</span> </span>
          Arquiteta e Urbanista
          <span className="cred-hide"> <span className="cred-sep">/</span> Residencial &amp; Interiores</span>
        </div>

        <h1 className="hero-title">
          <span className="line-mask"><span className="reveal-slide d1"><span className="line">Arquitetura que</span></span></span>
          <span className="line-mask"><span className="reveal-slide d2"><span className="line"><em className="accent-inline">resolve</em> antes</span></span></span>
          <span className="line-mask"><span className="reveal-slide d3"><span className="line">de ser bonita.</span></span></span>
        </h1>

        <div className="hero-meta">
          <div>
            <p className="hero-tagline">
              Projetos residenciais pensados para a vida real — <em>circulação, uso, luz e conforto</em>. A estética vem depois, como consequência.
            </p>
            <a className="hero-cta" href={WA_LINK} target="_blank" rel="noopener">
              Comece com intenção <span className="arrow" />
            </a>
          </div>
          <div className="hero-aside">
            <span className="eyebrow">Goiânia · GO</span>
            <div className="scroll-cue">
              <span>Role</span>
              <span className="bar" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

/* ============================================================
   Marquee
   ============================================================ */
function Marquee() {
  const row = MARQUEE.concat(MARQUEE); // duplicado p/ loop contínuo
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {row.map((w, i) => (
          <span className="marquee-item" key={i}>
            <span className={i % 2 ? "ital" : ""}>{w}</span>
            <span className="dot" />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   Placeholder de imagem
   ============================================================ */
const Placeholder = ({ label }) => (
  <div className="img-placeholder"><span className="label">{label || "FOTO"}</span></div>
);

/* ============================================================
   Sobre
   ============================================================ */
function Sobre() {
  return (
    <section className="section sobre" id="sobre">
      <div className="section-inner">
        <div className="section-head reveal">
          <div className="head-left">
            <div className="section-eyebrow">
              <span className="roman">I</span><span className="rule" /><span className="label">Sobre</span>
            </div>
            <h2 className="section-title">Maria Eduarda <em>Martins</em></h2>
          </div>
          <p className="section-lead">
            Arquiteta e urbanista. Acredito que a beleza é resultado de boas decisões — não o ponto de partida.
          </p>
        </div>

        <div className="sobre-grid">
          <div className="sobre-text reveal d1">
            <p className="dropcap">
              Arquitetura, para mim, começa antes do desenho: começa em entender como uma casa é vivida todos os dias. Onde entra o sol, por onde se caminha, o que se guarda, o que se mostra.
            </p>
            <p>
              Desenvolvo projetos residenciais e de interiores em Goiânia e região. Cada projeto nasce de uma escuta atenta e se traduz em espaços que funcionam — e que, por funcionarem bem, envelhecem bonito.
            </p>
            <p>
              <em style={{ color: "var(--cream-2)", fontStyle: "italic" }}>
                [Este é um texto de exemplo — o bio final entra aqui: formação, anos de atuação e abordagem de trabalho.]
              </em>
            </p>
          </div>

          <div className="sobre-portrait reveal d2">
            <Placeholder label="RETRATO — EM BREVE" />
            <div className="cap">Maria Eduarda Martins · Arquiteta e Urbanista</div>
          </div>

          <div className="sobre-stats reveal d3">
            <div className="stat"><div className="num">+8<em>a</em></div><div className="label">Anos de projeto</div></div>
            <div className="stat"><div className="num">40<em>+</em></div><div className="label">Projetos entregues</div></div>
            <div className="stat"><div className="num">100%</div><div className="label">Residencial &amp; interiores</div></div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Processo
   ============================================================ */
function Processo() {
  return (
    <section className="section processo" id="processo">
      <div className="section-inner">
        <div className="section-head reveal">
          <div className="head-left">
            <div className="section-eyebrow">
              <span className="roman">II</span><span className="rule" /><span className="label">Processo</span>
            </div>
            <h2 className="section-title">Do <em>problema</em><br/>à planta.</h2>
          </div>
          <p className="section-lead">
            Um método simples e transparente. Você sabe, a cada etapa, onde o projeto está e para onde vai.
          </p>
        </div>

        <div className="processo-list">
          {PROCESSO.map((p, i) => (
            <div className={`processo-item reveal d${i + 1}`} key={p.n}>
              <div className="processo-num">{p.n}</div>
              <div className="processo-name">{p.nome}</div>
              <div className="processo-desc">{p.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Projetos (galeria)
   ============================================================ */
function Carousel() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = CARROSSEL.length;
  const go = (d) => setI((p) => (p + d + n) % n);
  const touchX = useRef(null);

  // Avanço automático (pausa no hover; respeita "reduzir movimento")
  useEffect(() => {
    if (paused || n < 2) return;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((p) => (p + 1) % n), 6500);
    return () => clearInterval(t);
  }, [paused, n]);

  // Teclado (setas) e gesto de arrastar (swipe no celular)
  const onKeyDown = (e) => {
    if (e.key === "ArrowLeft") go(-1);
    else if (e.key === "ArrowRight") go(1);
  };
  const onTouchStart = (e) => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
    touchX.current = null;
  };

  const cur = CARROSSEL[i];

  return (
    <div
      className="carousel"
      role="group"
      aria-roledescription="carrossel"
      aria-label="Projetos"
      tabIndex={0}
      onKeyDown={onKeyDown}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="carousel-stack">
        {CARROSSEL.map((s, k) => (
          <div className={`carousel-slide ${k === i ? "active" : ""}`} key={k} aria-hidden={k !== i}>
            {s.img ? (
              <>
                <img className="slide-bg" src={s.img} alt="" aria-hidden="true" loading="lazy" decoding="async" />
                <img className="slide-img" src={s.img} alt={s.nome} loading={k === 0 ? "eager" : "lazy"} decoding="async" />
              </>
            ) : (
              <Placeholder label="PROJETO — EM BREVE" />
            )}
          </div>
        ))}
      </div>

      <div className="carousel-scrim" />

      {n > 1 && (
        <>
          <button className="carousel-arrow prev" onClick={() => go(-1)} aria-label="Projeto anterior"><IconChevron dir="left" /></button>
          <button className="carousel-arrow next" onClick={() => go(1)} aria-label="Próximo projeto"><IconChevron dir="right" /></button>
        </>
      )}

      <div className="carousel-title">
        <span className="carousel-num">{cur.num}</span>
        <h3 className="carousel-name">{cur.nome}</h3>
        <p className="carousel-desc">{cur.desc}</p>
      </div>

      {n > 1 && (
        <div className="carousel-dots">
          {CARROSSEL.map((_, k) => (
            <button key={k} className={`dot ${k === i ? "active" : ""}`} onClick={() => setI(k)} aria-label={`Ir para o projeto ${k + 1}`} />
          ))}
        </div>
      )}
    </div>
  );
}

function Projetos() {
  return (
    <section className="section projetos" id="projetos">
      <div className="section-inner">
        <div className="section-head reveal">
          <div className="head-left">
            <div className="section-eyebrow">
              <span className="roman">III</span><span className="rule" /><span className="label">Projetos</span>
            </div>
            <h2 className="section-title">Trabalhos <em>selecionados</em></h2>
          </div>
          <p className="section-lead">
            Uma seleção de projetos residenciais e de interiores. Novos trabalhos entram aqui à medida que são entregues.
          </p>
        </div>
      </div>

      <Carousel />
    </section>
  );
}

/* ============================================================
   Escritos (blog)
   ============================================================ */
function Escritos() {
  return (
    <section className="section escritos" id="escritos">
      <div className="section-inner">
        <div className="section-head reveal">
          <div className="head-left">
            <div className="section-eyebrow">
              <span className="roman">IV</span><span className="rule" /><span className="label">Escritos</span>
            </div>
            <h2 className="section-title">Ideias <em>em texto</em></h2>
          </div>
          <p className="section-lead">
            Reflexões sobre projeto, obra e o valor de pensar o espaço antes de construí-lo. Publicado no Substack.
          </p>
        </div>

        <div className="blog-list">
          {ARTIGOS.map((a, i) => (
            <a className={`blog-item reveal d${i + 1}`} href={a.link} target="_blank" rel="noopener" key={a.link}>
              <div>
                <h3>{a.titulo}</h3>
                <p>{a.resumo}</p>
              </div>
              <div className="blog-right">
                <span className="blog-date">{a.data}</span>
                <span className="read">Ler no Substack <span className="arrow" /></span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Contato
   ============================================================ */
function Contato() {
  return (
    <section className="section contato" id="contato">
      <div className="contato-inner">
        <div className="section-eyebrow contato-eyebrow reveal">
          <span className="roman">V</span><span className="rule" /><span className="label">Contato</span>
        </div>
        <h2 className="contato-title reveal d1">Vamos conversar<br/>sobre o <em>seu projeto</em>.</h2>
        <p className="contato-lead reveal d2">
          Conte um pouco sobre o espaço e o momento da sua obra. A primeira conversa é sem compromisso — e diz muito sobre o que dá para fazer.
        </p>

        <div className="reveal d2">
          <a className="whatsapp-cta" href={WA_LINK} target="_blank" rel="noopener">
            <span className="wa-badge"><IconWhats /></span>
            Chamar no WhatsApp
            <span className="arrow" />
          </a>
        </div>

        <div className="contato-secondary reveal d3">
          <div className="contato-block">
            <div className="block-label">WhatsApp</div>
            <a className="block-value" href={WA_LINK} target="_blank" rel="noopener">{WHATSAPP_HUMANO}</a>
            <div className="block-sub">Resposta rápida, seg–sex</div>
          </div>
          <div className="contato-block">
            <div className="block-label">Instagram</div>
            <a className="block-value" href={INSTAGRAM} target="_blank" rel="noopener">@eduarda.martinsarq</a>
            <div className="block-sub">Bastidores e projetos</div>
          </div>
          <div className="contato-block">
            <div className="block-label">Atuação</div>
            <div className="block-value">Goiânia &amp; região</div>
            <div className="block-sub">Projetos remotos sob consulta</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Footer
   ============================================================ */
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <span className="footer-logo">MARIA EDUARDA MARTINS</span>
        <span className="footer-mini">© 2026 · Arquitetura &amp; Interiores</span>
        <div className="footer-social-group">
          <a className="footer-social" href={WA_LINK} target="_blank" rel="noopener" aria-label="WhatsApp">
            <IconWhats /> WhatsApp
          </a>
          <a className="footer-social" href={INSTAGRAM} target="_blank" rel="noopener" aria-label="Instagram">
            <IconInsta /> Instagram
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ============================================================
   App
   ============================================================ */
function App() {
  const [theme, setTheme] = useState(
    document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark"
  );

  useRevealObserver();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("theme-transitioning");
    if (theme === "light") root.setAttribute("data-theme", "light");
    else root.removeAttribute("data-theme");
    localStorage.setItem("danaus-theme", theme);
    const t = setTimeout(() => root.classList.remove("theme-transitioning"), 700);
    return () => clearTimeout(t);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  return (
    <>
      <AmbientGlow />
      <Nav theme={theme} toggleTheme={toggleTheme} />
      <Hero />
      <Marquee />
      <Sobre />
      <Processo />
      <Projetos />
      <Escritos />
      <Contato />
      <Footer />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
