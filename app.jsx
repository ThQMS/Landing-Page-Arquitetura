const { useState, useEffect, useRef } = React;

/* ============================================================
   Configuração / conteúdo
   ============================================================ */
const WHATSAPP = "5562993085547";
const WHATSAPP_HUMANO = "(62) 99308-5547";
const WA_LINK = `https://api.whatsapp.com/send/?phone=${WHATSAPP}&text=${encodeURIComponent(
  "Oi, tudo bem? Gostaria de conversar sobre um projeto."
)}`;
// Instagram desativado por enquanto (fora do contato e do rodapé); reativar quando houver perfil novo.
const INSTAGRAM = "https://www.instagram.com/eduarda.martinsarq";
const INSTAGRAM_HANDLE = "@eduarda.martinsarq";
const SUBSTACK = "https://danausarquitetura.substack.com";

const EMAIL_PROFISSIONAL = "danaus.arquitetura@gmail.com";
// Link do formulário de solicitação de projeto. Vazio = o botão "Solicitar projeto" fica escondido.
// Formulário de solicitação de projeto (Google Forms)
const FORM_LINK = "https://docs.google.com/forms/d/e/1FAIpQLSdNmSkO1b5ppXMytg6n99yRfC9CWbeQaII0NkabaVfUja5_ug/viewform?usp=dialog";
const CAU = "A321508-3";
const ATENDIMENTO = "Seg. a sex. · 9h às 16h";
const SLOGAN = "Se você pode sonhar, pode realizar.";

/* Contador de visitas (GoatCounter — gratuito, sem cookies).
   Crie a conta em https://www.goatcounter.com/signup e coloque aqui o código
   escolhido (ex.: "danaus" para danaus.goatcounter.com). Vazio = desligado. */
const GOATCOUNTER = "";

const WA_LINK_SAUDE = `https://api.whatsapp.com/send/?phone=${WHATSAPP}&text=${encodeURIComponent(
  "Oi, tudo bem? Gostaria de conversar sobre um projeto para a área da saúde (clínica/consultório)."
)}`;

// Palavras que giram na faixa (marquee)
const MARQUEE = [
  "Design de Interiores", "Ambientes de Saúde", "Clínicas", "Consultórios",
  "Arquitetura Hospitalar", "Detalhamento", "Residencial",
];

// Etapas do processo de projeto
const PROCESSO = [
  { n: "01", nome: "Escuta", desc: "Entender a rotina, os desejos e as limitações de quem vai usar o espaço todos os dias. Todo bom projeto começa por uma conversa honesta." },
  { n: "02", nome: "Estudo", desc: "Estudo preliminar de layout, fluxos e volumes. Testamos possibilidades antes de decidir — no papel, não na obra." },
  { n: "03", nome: "Entrega", desc: "Você recebe o projeto pronto para executar: plantas, medidas, marcenaria, iluminação e a lista de acabamentos escolhidos. Tudo desenhado e especificado, para a equipe da obra saber exatamente o que fazer." },
  { n: "04", nome: "Obra", desc: "Acompanhamento e curadoria de acabamentos, garantindo que o desenho vire realidade com o mesmo cuidado." },
];

// Ambientes de saúde — o que um projeto para a área considera
const SAUDE = [
  { t: "Normas desde o início", d: "Projetos desenvolvidos conforme as normas hospitalares, pensando desde o primeiro traço até sua aprovação final." },
  { t: "Fluxos que funcionam", d: "Circulação de pacientes, equipe, materiais e resíduos organizada para evitar cruzamentos — mais segurança e uma rotina mais fluida para quem trabalha ali." },
  { t: "Materiais certos", d: "Revestimentos laváveis e resistentes à limpeza frequente, escolhidos sem abrir mão do aconchego e da identidade do espaço." },
  { t: "Acolhimento", d: "Luz, cor, acústica e mobiliário que diminuem a tensão de quem espera e transmitem confiança desde a recepção." },
];
const SAUDE_TIPOS = ["Consultórios", "Clínicas", "Salas de exame e procedimento", "Recepções e salas de espera", "Ambientes hospitalares"];

/* ------------------------------------------------------------------
   PORTFÓLIO — carrossel de projetos (tela cheia)

   COMO ADICIONAR UM PROJETO NOVO:
   1) Salve as fotos na pasta `fotos/` (ex.: fotos/josi-01.jpg);
   2) Copie o modelo abaixo, cole na lista e preencha;
   3) Renumere o campo `num` ("01", "02", "03"...) na ordem em que aparecem.

     { num: "02", nome: "Nome do projeto", ano: "2025", desc: "Uma ou duas frases.", img: "fotos/arquivo.jpg" },

   GALERIA: `fotos` é a lista de imagens que abre ao clicar em "Ver projeto".
   Se não houver `fotos`, a galeria mostra só a capa (`img`).

   REGRAS ÚTEIS:
   • Slide SEM `img` vira automaticamente o cartão "em breve" — serve de reserva.
   • Por padrão a foto preenche a tela toda (cover). Se ela precisar aparecer
     INTEIRA, sem cortar (ex.: uma vertical), acrescente `fit: "contain"`:
     a foto aparece por completo e o fundo das bordas fica desfocado.
   ------------------------------------------------------------------ */
const CARROSSEL = [
  {
    num: "01",
    nome: "Cozinha Viva",
    ano: "2026",
    desc: "Um projeto que une beleza, funcionalidade e convivência. Pensado para integrar momentos compartilhados, com ambientes bem definidos e soluções que favorecem a organização e a praticidade no dia a dia, sem abrir mão do acolhimento.",
    img: "fotos/cozinha-viva.jpg",              // capa do carrossel
    fotos: ["fotos/cozinha-viva.jpg", "fotos/cozinha-viva-2.jpg", "fotos/cozinha-viva-3.jpg"],         // galeria (abre em "Ver projeto") — acrescente mais fotos aqui
  },
];

/* ------------------------------------------------------------------
   RETRATO da profissional (seção Sobre).
   Quando a foto chegar: salve em `fotos/` e preencha `img` abaixo.
   Enquanto estiver vazio, aparece o cartão "retrato — em breve".
   ------------------------------------------------------------------ */
const RETRATO = {
  img: "fotos/maria-eduarda.jpg",
  alt: "Maria Eduarda Martins, arquiteta e urbanista",
  legenda: "Maria Eduarda Martins · Arquiteta e Urbanista · CAU A321508-3",
};

// Artigos reais, puxados do Substack
const ARTIGOS = [
  {
    titulo: "Arquitetura que permanece",
    resumo: "Sobre o que torna um projeto atemporal, além da estética do momento.",
    data: "26 Fev 2026",
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
   Movimento — preferências do aparelho
   ============================================================ */
const mq = (q) => !!(window.matchMedia && window.matchMedia(q).matches);
const reduzMovimento = () => mq("(prefers-reduced-motion: reduce)");
const temMouse = () => mq("(hover: hover) and (pointer: fine)");

/* ============================================================
   Reveal on scroll — hook global (IntersectionObserver)
   ============================================================ */
function useRevealObserver() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll(".reveal, .reveal-slide"));
    // A "cortina" do carrossel é grande: só abre quando boa parte dele está na tela.
    const cortinas = Array.from(document.querySelectorAll(".reveal-cortina"));
    const reveal = (el) => el.classList.add("in");
    if (!("IntersectionObserver" in window)) {
      els.concat(cortinas).forEach(reveal);
      return;
    }
    const mk = (opts) => new IntersectionObserver((entries, obs) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { reveal(e.target); obs.unobserve(e.target); }
      });
    }, opts);
    const io = mk({ threshold: 0.1, rootMargin: "0px 0px -6% 0px" });
    const ioC = mk({ threshold: 0.3 });
    // As linhas do título (.reveal-slide) começam escondidas dentro de uma máscara
    // com overflow: hidden — o observer nunca as "vê". Observa a máscara e revela a linha.
    const ioM = new IntersectionObserver((entries, obs) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.querySelectorAll(".reveal-slide").forEach(reveal);
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    els.forEach((el) => {
      const mask = el.classList.contains("reveal-slide") && el.closest(".line-mask");
      if (mask) ioM.observe(mask); else io.observe(el);
    });
    cortinas.forEach((el) => ioC.observe(el));
    // Rede de segurança: o que já está na tela (ou acima dela) nunca fica invisível
    // se o observer atrasar. O que está mais abaixo continua animando ao rolar.
    const t = setTimeout(() => {
      els.concat(cortinas).forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight) reveal(el);
      });
    }, 2200);
    return () => {
      io.disconnect();
      ioC.disconnect();
      ioM.disconnect();
      clearTimeout(t);
    };
  }, []);
}

/* ============================================================
   Rolagem suave (Lenis) — só com mouse/trackpad; toque fica nativo
   ============================================================ */
function useRolagemSuave() {
  useEffect(() => {
    if (!window.Lenis || reduzMovimento() || !temMouse()) return;
    const lenis = new window.Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 0.9,
    });
    window.__lenis = lenis;
    let raf;
    const loop = (time) => { lenis.raf(time); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);

    // Links do menu (#sobre, #projetos...) deslizam com o mesmo movimento
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href").slice(1);
      const alvo = id === "top" || id === "" ? 0 : document.getElementById(id);
      if (alvo == null) return;
      e.preventDefault();
      lenis.scrollTo(alvo, { offset: alvo === 0 ? 0 : -72 });
      if (history.replaceState) history.replaceState(null, "", "#" + (id || "top"));
    };
    document.addEventListener("click", onClick);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("click", onClick);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);
}

/* ============================================================
   Botão "magnético" — puxa de leve em direção ao mouse (só desktop)
   ============================================================ */
function useMagnetico(forca = 0.3, maxX = 10, maxY = 6) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || reduzMovimento() || !temMouse()) return;
    let raf = null;
    const lim = (v, m) => Math.max(-m, Math.min(m, v));
    const onMove = (e) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = null;
        const r = el.getBoundingClientRect();
        const dx = lim((e.clientX - (r.left + r.width / 2)) * forca, maxX);
        const dy = lim((e.clientY - (r.top + r.height / 2)) * forca, maxY);
        el.style.transition = "transform 0.2s ease-out";
        el.style.transform = `translate3d(${dx.toFixed(1)}px, ${dy.toFixed(1)}px, 0)`;
      });
    };
    const onLeave = () => {
      if (raf) { cancelAnimationFrame(raf); raf = null; }
      el.style.transition = "transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)";
      el.style.transform = "";
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return ref;
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
const IconSubstack = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
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

/* Borboleta da logo Danaus (vetorizada a partir da logo original) */
const BORBOLETA_D = "M 366.3 277.1 C 389.8 275.8 427.8 287.0 450.5 294.5 C 480.1 304.3 505.8 320.3 532.9 335.0 C 629.6 388.1 718.4 454.5 796.5 532.4 C 805.7 541.7 811.4 549.2 819.7 558.9 C 826.5 567.1 836.2 574.5 842.8 582.6 C 850.9 594.9 865.7 606.5 874.0 617.7 C 892.3 642.0 917.1 666.8 933.7 691.7 C 950.3 716.6 969.6 748.7 981.9 775.4 C 985.8 776.2 986.2 776.0 990.2 775.3 C 996.0 769.7 988.4 754.2 1009.9 740.9 C 1037.9 723.4 1050.2 735.2 1065.3 760.6 C 1068.5 766.0 1055.7 789.1 1065.2 791.3 C 1079.3 785.8 1083.1 758.9 1089.5 745.5 C 1093.8 736.5 1097.0 722.5 1102.2 714.4 C 1127.6 674.6 1160.6 640.4 1189.7 603.6 C 1203.1 586.6 1220.2 570.8 1235.6 555.4 C 1321.8 469.6 1421.5 398.4 1530.8 344.8 C 1571.4 324.6 1620.7 302.3 1665.9 297.6 C 1667.2 296.4 1669.2 294.4 1669.9 294.8 C 1677.4 298.5 1681.9 297.9 1690.2 298.6 C 1722.7 301.3 1749 317.3 1756.7 350.5 C 1757.8 355.6 1755.8 362.2 1757.5 368.9 C 1759.3 369.9 1759.5 369.9 1760.8 371.5 C 1761.0 375.8 1760.8 378.2 1759.2 382.3 C 1755.4 392.0 1758.1 405.2 1756.4 416.0 C 1753.8 432.3 1751.3 452.0 1746.5 467.8 C 1740.3 488.6 1732.5 510.9 1723.5 530.6 C 1713.3 554.7 1693.5 582.6 1689.5 608.9 C 1686.5 628.0 1690.8 648.8 1683.5 669.3 C 1680.8 676.9 1680.8 693.4 1677.9 702.5 C 1674.8 712.2 1675 726.9 1672.3 737.2 C 1662.9 775.3 1650.9 828.4 1614.3 849.9 C 1603.4 855.7 1591.2 859.8 1579.3 863.3 C 1571.7 865.5 1561.7 866.0 1556.0 871.6 C 1555.6 873.0 1555.0 875.1 1556.1 876.4 C 1567.2 888.6 1581.8 899.7 1593.1 912.2 C 1597.7 917.3 1604.1 922.6 1607.7 927.7 C 1617.2 941.2 1625.3 956.8 1633.5 971.2 C 1634.9 973.7 1634.2 981.5 1635 983.5 C 1637.0 985.4 1638.3 984.7 1638.2 988.0 C 1638.0 1028.3 1631.2 1071.5 1622.9 1110.8 C 1619.9 1125.3 1612.9 1140.2 1609.0 1154.2 C 1605.1 1168.3 1599.4 1184.7 1590.7 1195.8 C 1582.4 1204.0 1571.2 1214.2 1563.9 1222.8 C 1541.8 1249 1520.0 1276.2 1486.6 1288.0 C 1483.3 1289.2 1473.5 1293.0 1470.8 1294.6 C 1430.3 1318.3 1384.0 1333.5 1336.5 1329.4 C 1333.8 1329.2 1330.7 1329.9 1328.5 1326.8 C 1317.9 1326.9 1300.3 1320.2 1291.6 1316.7 C 1256.2 1302.1 1224.1 1280.5 1197.3 1253.1 C 1191.4 1247.0 1185.6 1238.3 1180.1 1233.0 C 1161.3 1215.8 1149.7 1194.1 1134.8 1174.4 C 1103.4 1132.9 1076.1 1089.0 1047.2 1045.8 C 1045.6 1043.4 1043 1042.0 1040.2 1042.0 C 1036.3 1047.5 1037.9 1075.1 1039.6 1082.3 C 1043.9 1100.2 1041.7 1126.1 1042.0 1144.6 C 1043.1 1145.7 1044.0 1146.5 1045.3 1147.3 C 1046.5 1170.6 1044.2 1193.0 1048.5 1216.3 C 1049.9 1223.9 1044.6 1245.6 1039.2 1251.6 C 1036.1 1255.2 1026.1 1254.1 1021.2 1253.9 C 1004.4 1229.7 1005.2 1218.8 1009.2 1192.4 C 1011.5 1177.9 1010.4 1157.3 1006.9 1143.3 C 1005.1 1136.5 1007.0 1123.1 1005.5 1115.9 C 1004.1 1109.0 1003.4 1100.4 1002.6 1093.3 C 1001.6 1076.1 1002.8 1059.2 1002.7 1042.1 C 1002.6 1039.6 1001.4 1038.8 999.9 1037.5 C 989.3 1036.1 974.0 1065.5 968.0 1073.8 L 924.2 1133.2 C 913.4 1148.0 901.1 1166.6 889.5 1180.5 C 872.2 1202.1 853.5 1221.2 834.2 1240.9 C 813.5 1262.0 796.2 1276.5 770.2 1291.1 C 747.5 1303.7 722.1 1306.6 697.4 1313.7 C 688.1 1316.4 648.7 1315.5 638.4 1314.8 C 603.0 1312.4 569.0 1293.2 539.7 1274.8 C 527.2 1267.0 512.8 1257.9 502.1 1247.8 C 484.9 1231.2 475.1 1207.7 458.5 1191.1 C 456.5 1189.0 447.1 1184.4 444.1 1182.8 C 440.4 1174.7 434.9 1171.2 431.8 1164.3 C 422.6 1145.6 419.9 1122.7 412.8 1103.6 C 404.8 1082.2 401.6 1067.4 397.9 1045.3 C 389.7 1002.2 396.3 959.1 422.0 922.8 C 433.6 906.2 453.9 886.6 467.5 870.8 C 472.0 865.6 478.8 864.9 481.3 857.5 C 481.0 855.9 481.4 856.1 479.7 855.1 C 473.5 851.5 465.5 852.6 458.9 850.4 C 436.3 842.9 401.9 823.5 391.9 801.4 C 388.4 793.6 387.3 782.8 385.5 774.3 C 382.1 758.5 377.8 742.6 375.1 726.7 C 372.1 708.9 370.3 690.4 367.8 672.5 C 367.0 666.4 367.7 650.0 363.9 645.9 C 361.2 642.9 363.5 596.2 362.2 587.3 C 358.8 564.5 345.6 547.3 335.7 527.3 C 332.4 520.5 329.8 513.3 326.6 506.4 C 318.4 488.7 310.0 471.5 303.6 453.0 C 291.2 416.9 282.5 359.9 300.1 324.6 C 315.3 294.4 337.0 287.1 366.3 277.1 z";
const Borboleta = ({ className }) => (
  <svg className={className} viewBox="282 275 1480 1059" aria-hidden="true">
    <path fill="currentColor" d={BORBOLETA_D} />
  </svg>
);
/* Símbolo: o retângulo marrom com a borboleta, como na logo */
const MarcaDanaus = ({ className = "" }) => (
  <span className={`marca-box ${className}`} aria-hidden="true"><Borboleta /></span>
);

/* Borboleta da abertura: entra pela esquerda, atravessa o topo
   batendo as asas e pousa ao lado do slogan. A posição final é o
   próprio lugar dela no layout — por isso funciona em qualquer tela. */
function BorboletaVoo() {
  const pouso = useRef(null);
  const voo = useRef(null);
  const [estado, setEstado] = useState("aguardando"); // aguardando → voando → pousada

  useEffect(() => {
    const el = voo.current;
    const alvo = pouso.current;
    if (!el || !alvo) return;
    // Sem animação: quem pediu menos movimento, navegador antigo, ou se a página
    // já abriu rolada para baixo (o topo nem está na tela).
    if (reduzMovimento() || !el.animate || window.scrollY > window.innerHeight * 0.5) {
      setEstado("pousada");
      return;
    }
    let anim;
    const t = setTimeout(() => {
      const hero = alvo.closest(".hero");
      if (!hero) { setEstado("pousada"); return; }
      const H = hero.getBoundingClientRect();
      const P = alvo.getBoundingClientRect();
      const W = H.width, Hh = H.height;
      const estreita = W < 760;
      let x0, y0, c1, c2;
      if (!estreita) {
        // Computador: entra pela esquerda, sobe em arco pela parede iluminada
        // (à direita do título) e desce até o pouso vindo de cima.
        x0 = H.left - 70 - P.left;
        y0 = H.top + Hh * 0.5 - P.top;
        c1 = { x: x0 + W * 0.42, y: y0 - Hh * 0.42 };
        c2 = { x: -Math.min(160, W * 0.14), y: -Hh * 0.30 };
      } else {
        // Celular: o texto ocupa a largura toda — o voo passa pela parte de baixo,
        // livre, e sobe até o pouso sem cruzar o título.
        x0 = H.left - 50 - P.left;
        y0 = Math.min(H.bottom - 40, P.top + Hh * 0.3) - P.top;
        c1 = { x: x0 + W * 0.75, y: y0 + 30 };
        c2 = { x: W * 0.5, y: Math.max(60, y0 * 0.35) };
      }
      const bez = (u, a, b, c, d) => {
        const v = 1 - u;
        return v * v * v * a + 3 * v * v * u * b + 3 * v * u * u * c + u * u * u * d;
      };
      const N = 48, frames = [];
      let px = x0, py = y0;
      for (let i = 0; i <= N; i++) {
        const t1 = i / N;
        const u = 1 - Math.pow(1 - t1, 2.1);            // desacelera para pousar
        const bob = Math.sin(t1 * Math.PI * 7) * 12 * (1 - t1); // sobe e desce, como borboleta
        const x = bez(u, x0, c1.x, c2.x, 0);
        const y = bez(u, y0, c1.y, c2.y, 0) + bob;
        const ang = i === 0 ? 0 : Math.atan2(y - py, x - px) * 180 / Math.PI;
        const tilt = i === N ? 0 : Math.max(-22, Math.min(22, ang * 0.3)) * (1 - t1 * 0.6);
        const sc = 1.35 - 0.35 * u;                      // vem "de perto" e assenta no tamanho final
        frames.push({ transform: `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) rotate(${tilt.toFixed(1)}deg) scale(${sc.toFixed(3)})` });
        px = x; py = y;
      }
      setEstado("voando");
      anim = el.animate(frames, { duration: 4600, easing: "linear", fill: "both" });
      anim.onfinish = () => setEstado("pousada");
    }, 1250);
    return () => { clearTimeout(t); if (anim) anim.cancel(); };
  }, []);

  return (
    <span className="pouso" ref={pouso} aria-hidden="true">
      <span className={`voo ${estado}`} ref={voo}>
        <span className="asas"><Borboleta /></span>
      </span>
    </span>
  );
}

/* ============================================================
   Contador de visitas (GoatCounter) + cliques nos contatos
   ============================================================ */
function useContador() {
  useEffect(() => {
    if (!GOATCOUNTER) return;
    const sc = document.createElement("script");
    sc.async = true;
    sc.src = "https://gc.zgo.at/count.js";
    sc.dataset.goatcounter = `https://${GOATCOUNTER}.goatcounter.com/count`;
    document.body.appendChild(sc);
    // Conta cliques em WhatsApp, Instagram, e-mail e Substack como "eventos"
    const onClick = (e) => {
      const a = e.target.closest && e.target.closest("a[href]");
      if (!a || !window.goatcounter || !window.goatcounter.count) return;
      const h = a.getAttribute("href");
      const nome = h.includes("whatsapp") ? "clique-whatsapp"
        : h.includes("instagram") ? "clique-instagram"
        : h.startsWith("mailto:") ? "clique-email"
        : h.includes("substack") ? "clique-substack" : null;
      if (nome) window.goatcounter.count({ path: nome, title: a.textContent.trim().slice(0, 60), event: true });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
}

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
    const secs = ["sobre", "saude", "processo", "projetos", "escritos", "contato"]
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
    const hero = document.querySelector(".hero"); // resolvido uma vez, não a cada scroll
    let ticking = false;
    const update = () => {
      ticking = false;
      const y = window.scrollY || window.pageYOffset;
      setScrolled(y > 24);
      // Navbar fica "marrom" (over-hero) enquanto QUALQUER parte do hero
      // aparece abaixo dela; vira "branca" só quando o marrom sai da tela.
      const heroBottom = hero ? hero.getBoundingClientRect().bottom : window.innerHeight - NAV_H;
      setOverHero(heroBottom > NAV_H);
    };
    // Throttle por frame: a leitura de layout acontece 1x por frame, não por evento.
    const onScroll = () => {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const cls = ["nav", scrolled ? "scrolled" : "", overHero ? "over-media" : "", open ? "menu-open" : ""]
    .filter(Boolean).join(" ");

  const links = [
    ["#sobre", "Sobre"],
    ["#saude", "Saúde"],
    ["#processo", "Processo"],
    ["#projetos", "Projetos"],
    ["#escritos", "Escritos"],
    ["#contato", "Contato"],
  ];

  return (
    <nav className={cls}>
      <a className="nav-mark" href="#top" aria-label="Danaus Arquitetura — início">
        <MarcaDanaus className="mark-glyph" />
        <span className="mark-name">Danaus<small>Arquitetura · Maria Eduarda Martins</small></span>
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
  const foto = useRef(null);
  const conteudo = useRef(null);
  const cta = useMagnetico(0.3, 8, 5);

  // Profundidade: ao rolar, a parede anda mais devagar e o texto sobe e esmaece.
  // Só com mouse (no celular a rolagem fica 100% nativa e leve).
  useEffect(() => {
    if (reduzMovimento() || !temMouse()) return;
    let raf = null;
    const aplicar = () => {
      raf = null;
      const y = window.scrollY;
      const h = window.innerHeight;
      if (y > h * 1.2) return; // topo fora da tela: não gasta nada
      if (foto.current) foto.current.style.transform = `translate3d(0, ${(y * 0.3).toFixed(1)}px, 0)`;
      if (conteudo.current) {
        const p = Math.min(1, y / (h * 0.75));
        conteudo.current.style.transform = `translate3d(0, ${(y * -0.08).toFixed(1)}px, 0)`;
        conteudo.current.style.opacity = (1 - p * 0.85).toFixed(3);
      }
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(aplicar); };
    aplicar();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); if (raf) cancelAnimationFrame(raf); };
  }, []);

  return (
    <header className="hero" id="top">
      <img
        ref={foto}
        className="hero-photo"
        src="fotos/hero-luz-2400.jpg"
        srcSet="fotos/hero-luz-1280.jpg 1280w, fotos/hero-luz-2400.jpg 2400w"
        sizes="100vw"
        alt=""
        aria-hidden="true"
        decoding="async"
        fetchpriority="high"
      />
      <div className="hero-overlay" />
      {/* Penumbra que se dissipa na abertura: "a luz acende" */}
      <div className="hero-penumbra" aria-hidden="true" />
      <div className="hero-bg-noise" />

      <div className="hero-content" ref={conteudo}>
        <div className="hero-credentials">
          <span className="cred-hide">Maria Eduarda Martins <span className="cred-sep">/</span> </span>
          Arquiteta e Urbanista
          <span className="cred-hide"> <span className="cred-sep">/</span> Interiores &amp; Ambientes de Saúde</span>
        </div>

        <h1 className="hero-title">
          <span className="line-mask"><span className="reveal-slide d1"><span className="line">Arquitetura que</span></span></span>
          <span className="line-mask"><span className="reveal-slide d2"><span className="line"><em className="accent-inline">resolve</em> antes</span></span></span>
          <span className="line-mask"><span className="reveal-slide d3"><span className="line">de ser bonita.</span></span></span>
        </h1>

        <div className="hero-meta">
          <div>
            <p className="hero-tagline">
              Design de interiores e ambientes de saúde pensados para a vida real — <em>fluxo, uso, luz e conforto</em>. A estética vem depois, como consequência.
            </p>
            <a className="hero-cta" ref={cta} href={WA_LINK} target="_blank" rel="noopener">
              Comece com intenção <span className="arrow" />
            </a>
          </div>
          <div className="hero-aside">
            <span className="hero-slogan"><BorboletaVoo />{SLOGAN}</span>
            <span className="eyebrow">Anápolis · Goiânia · Online</span>
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
            Arquiteta e urbanista, com especialização em Arquitetura Hospitalar. Acredito que a beleza é resultado de boas decisões — não o ponto de partida.
          </p>
        </div>

        <div className="sobre-grid">
          <div className="sobre-text reveal d1">
            <p className="dropcap">
              Projetar, para mim, é compreender as necessidades de cada espaço e das pessoas que o utilizam. É observar a rotina, entender os usos, considerar os fluxos e traduzir tudo isso em ambientes funcionais, confortáveis e bem resolvidos.
            </p>
            <p>
              Minha atuação se concentra no <strong>design de interiores e na arquitetura para ambientes de saúde</strong>, com desenvolvimento de projetos para hospitais, clínicas e consultórios.
            </p>
            <p>
              Mais do que transformar espaços, meu trabalho consiste em encontrar soluções coerentes com cada realidade, respeitando as particularidades, os usos e as necessidades de cada ambiente.
            </p>
            <p>
              Atendimento presencial em Anápolis e Goiânia, e on-line para todo o Brasil e o exterior.
            </p>

            <dl className="sobre-cred">
              <div><dt>Formação</dt><dd>Arquitetura e Urbanismo <span>· 2025</span></dd></div>
              <div><dt>Especialização</dt><dd>Arquitetura Hospitalar</dd></div>
              <div><dt>MBA</dt><dd>Gestão de Projetos</dd></div>
              <div><dt>Registro</dt><dd>{CAU}</dd></div>
            </dl>
          </div>

          <div className="sobre-portrait reveal d2">
            {RETRATO.img
              ? (
                <div className="portrait-frame">
                  {/* 4 linhas que se desenham em sequência, no sentido horário */}
                  <span className="fl fl-t" aria-hidden="true" />
                  <span className="fl fl-r" aria-hidden="true" />
                  <span className="fl fl-b" aria-hidden="true" />
                  <span className="fl fl-l" aria-hidden="true" />
                  <img className="portrait-img" src={RETRATO.img} alt={RETRATO.alt} loading="lazy" decoding="async" />
                </div>
              )
              : <Placeholder label="RETRATO — EM BREVE" />}
            <div className="cap">{RETRATO.legenda}</div>
          </div>

          <div className="sobre-stats reveal d3">
            <div className="stat"><div className="num">Presencial</div><div className="label">Anápolis &amp; Goiânia</div></div>
            <div className="stat"><div className="num"><em>On-line</em></div><div className="label">Todo o Brasil &amp; exterior</div></div>
            <div className="stat"><div className="num">Sob medida</div><div className="label">Cada projeto parte do zero</div></div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Ambientes de saúde
   ============================================================ */
function Saude() {
  const cta = useMagnetico(0.3, 8, 5);
  return (
    <section className="section saude" id="saude">
      <div className="section-inner">
        <div className="section-head reveal">
          <div className="head-left">
            <div className="section-eyebrow">
              <span className="roman">II</span><span className="rule" /><span className="label">Ambientes de saúde</span>
            </div>
            <h2 className="section-title">Cuidar começa<br/>pelo <em>espaço</em>.</h2>
          </div>
          <p className="section-lead">
            Hospitais, clínicas e consultórios precisam acolher quem chega e funcionar para quem trabalha ali o dia inteiro. Com especialização em Arquitetura Hospitalar, cada decisão de projeto parte dessas duas necessidades.
          </p>
        </div>

        <div className="saude-grid">
          {SAUDE.map((x, i) => (
            <div className={`saude-item reveal d${i + 1}`} key={x.t}>
              <span className="saude-num">{String(i + 1).padStart(2, "0")}</span>
              <h3>{x.t}</h3>
              <p>{x.d}</p>
            </div>
          ))}
        </div>

        <div className="saude-foot reveal">
          <ul className="saude-tipos" aria-label="Tipos de projeto">
            {SAUDE_TIPOS.map((t) => <li key={t}>{t}</li>)}
          </ul>
          <a className="saude-cta" ref={cta} href={WA_LINK_SAUDE} target="_blank" rel="noopener">
            Conversar sobre um projeto de saúde <span className="arrow" />
          </a>
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
              <span className="roman">III</span><span className="rule" /><span className="label">Processo</span>
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
function Galeria({ projeto, onClose }) {
  const fotos = projeto.fotos && projeto.fotos.length ? projeto.fotos : [projeto.img];
  const [k, setK] = useState(0);
  const n = fotos.length;
  const go = (d) => setK((p) => (p + d + n) % n);
  const closeRef = useRef(null);
  const touchX = useRef(null);

  useEffect(() => {
    const prev = document.activeElement;
    document.body.style.overflow = "hidden";
    if (window.__lenis) window.__lenis.stop();
    closeRef.current && closeRef.current.focus();
    // Fase de captura: roda antes de qualquer outro handler (a galeria é um portal
    // e o stopPropagation abaixo impediria o evento de chegar ao window).
    const onKey = (e) => {
      if (e.key === "Escape") { e.preventDefault(); onClose(); }
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "Tab") {
        // Mantém o foco do teclado dentro da galeria aberta
        const box = document.querySelector(".galeria");
        const f = box ? Array.from(box.querySelectorAll("button")) : [];
        if (!f.length) return;
        const i = f.indexOf(document.activeElement);
        e.preventDefault();
        f[(i + (e.shiftKey ? -1 : 1) + f.length) % f.length].focus();
      }
    };
    window.addEventListener("keydown", onKey, true);
    return () => {
      document.body.style.overflow = "";
      if (window.__lenis) window.__lenis.start();
      window.removeEventListener("keydown", onKey, true);
      prev && prev.focus && prev.focus({ preventScroll: true });
    };
  }, []);

  // Portal: renderiza direto no <body>, acima de tudo (fora da seção de projetos)
  return ReactDOM.createPortal(
    <div
      className="galeria"
      role="dialog"
      aria-modal="true"
      aria-label={`Galeria — ${projeto.nome}`}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      onKeyDown={(e) => e.stopPropagation()}
      onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        if (touchX.current == null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
    >
      <div className="galeria-top">
        <div className="galeria-info">
          <span className="galeria-nome">{projeto.nome}</span>
          {projeto.ano && <span className="galeria-ano">{projeto.ano}</span>}
        </div>
        <button ref={closeRef} className="galeria-close" onClick={onClose} aria-label="Fechar galeria">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19" /></svg>
        </button>
      </div>

      <img className="galeria-img" key={fotos[k]} src={fotos[k]} alt={`${projeto.nome} — foto ${k + 1} de ${n}`} decoding="async" />

      {n > 1 && (
        <>
          <button className="carousel-arrow prev" onClick={() => go(-1)} aria-label="Foto anterior"><IconChevron dir="left" /></button>
          <button className="carousel-arrow next" onClick={() => go(1)} aria-label="Próxima foto"><IconChevron dir="right" /></button>
          <div className="galeria-count">{String(k + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}</div>
        </>
      )}
    </div>,
    document.body
  );
}

function Carousel() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [aberto, setAberto] = useState(null); // projeto aberto na galeria
  const n = CARROSSEL.length;
  const go = (d) => setI((p) => (p + d + n) % n);
  const touchX = useRef(null);
  const verRef = useMagnetico(0.3, 10, 6);

  // Avanço automático (pausa no hover; respeita "reduzir movimento")
  useEffect(() => {
    if (paused || aberto || n < 2) return;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((p) => (p + 1) % n), 6500);
    return () => clearInterval(t);
  }, [paused, aberto, n]);

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
      className="carousel reveal-cortina"
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
                {/* Fundo desfocado só nos slides "contain" (onde sobram bordas); em cover a foto cobre tudo. */}
                {s.fit === "contain" && (
                  <img className="slide-bg" src={s.img} alt="" aria-hidden="true" loading="lazy" decoding="async" />
                )}
                <img className={`slide-img${s.fit === "contain" ? " fit-contain" : ""}`} src={s.img} alt={s.nome} loading={k === 0 ? "eager" : "lazy"} decoding="async" />
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
        <span className="carousel-num">{cur.num}{cur.ano && <span className="carousel-year">{cur.ano}</span>}</span>
        <h3 className="carousel-name">{cur.nome}</h3>
        <p className="carousel-desc">{cur.desc}</p>
        {cur.img && (
          <button className="ver-projeto" ref={verRef} onClick={() => setAberto(cur)}>
            Ver projeto
            {cur.fotos && cur.fotos.length > 1 && <span className="ver-n">{cur.fotos.length} fotos</span>}
            <span className="arrow" />
          </button>
        )}
      </div>

      {n > 1 && (
        <div className="carousel-dots">
          {CARROSSEL.map((_, k) => (
            <button key={k} className={`dot ${k === i ? "active" : ""}`} onClick={() => setI(k)} aria-label={`Ir para o projeto ${k + 1}`} />
          ))}
        </div>
      )}

      {aberto && <Galeria projeto={aberto} onClose={() => setAberto(null)} />}
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
              <span className="roman">IV</span><span className="rule" /><span className="label">Projetos</span>
            </div>
            <h2 className="section-title">Projetos <em>recentes</em></h2>
          </div>
          <p className="section-lead">
            Um portfólio em construção: novos trabalhos entram aqui à medida que são entregues.
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
              <span className="roman">V</span><span className="rule" /><span className="label">Escritos</span>
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
  const wa = useMagnetico(0.25, 12, 7);
  return (
    <section className="section contato" id="contato">
      <div className="contato-inner">
        <div className="section-eyebrow contato-eyebrow reveal">
          <span className="roman">VI</span><span className="rule" /><span className="label">Contato</span>
        </div>
        <h2 className="contato-title reveal d1">Vamos conversar<br/>sobre o <em>seu projeto</em>.</h2>
        <p className="contato-lead reveal d2">
          Conte um pouco sobre o espaço e o momento em que ele está. A primeira conversa é sem compromisso — e diz muito sobre o que dá para fazer. Atendimento on-line para todo o Brasil e o exterior.
        </p>

        <div className="contato-actions reveal d2">
          <a className="whatsapp-cta" ref={wa} href={WA_LINK} target="_blank" rel="noopener">
            <span className="wa-badge"><IconWhats /></span>
            Chamar no WhatsApp
            <span className="arrow" />
          </a>
          {FORM_LINK && (
            <a className="form-cta" href={FORM_LINK} target="_blank" rel="noopener">
              Solicitar projeto
              <span className="arrow" />
            </a>
          )}
        </div>

        <div className="contato-secondary reveal d3">
          <div className="contato-block">
            <div className="block-label">WhatsApp</div>
            <a className="block-value" href={WA_LINK} target="_blank" rel="noopener">{WHATSAPP_HUMANO}</a>
            <div className="block-sub">{ATENDIMENTO}</div>
          </div>
          {FORM_LINK && (
            <div className="contato-block">
              <div className="block-label">Formulário</div>
              <a className="block-value" href={FORM_LINK} target="_blank" rel="noopener">Solicitação de projeto</a>
              <div className="block-sub">Conte o essencial em 2 minutos</div>
            </div>
          )}
          <div className="contato-block">
            <div className="block-label">E-mail</div>
            <a className="block-value" href={`mailto:${EMAIL_PROFISSIONAL}`}>{EMAIL_PROFISSIONAL}</a>
            <div className="block-sub">Maria Eduarda Martins</div>
          </div>
          <div className="contato-block">
            <div className="block-label">Atuação</div>
            <div className="block-value">Brasil &amp; exterior</div>
            <div className="block-sub">Presencial em Anápolis e Goiânia · on-line nos demais locais</div>
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
        <div className="footer-brand">
          <MarcaDanaus className="footer-marca" />
          <div>
            <span className="footer-logo">DANAUS ARQUITETURA</span>
            <span className="footer-slogan">{SLOGAN}</span>
          </div>
        </div>
        <span className="footer-mini">© 2026 · Maria Eduarda Martins · CAU {CAU}</span>
        <div className="footer-social-group">
          <a className="footer-social" href={WA_LINK} target="_blank" rel="noopener" aria-label="WhatsApp">
            <IconWhats /> WhatsApp
          </a>
          <a className="footer-social" href={SUBSTACK} target="_blank" rel="noopener" aria-label="Substack">
            <IconSubstack /> Substack
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
  useRolagemSuave();
  useContador();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("theme-transitioning");
    if (theme === "light") root.setAttribute("data-theme", "light");
    else root.removeAttribute("data-theme");
    try { localStorage.setItem("danaus-theme", theme); } catch (e) {}
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
      <Saude />
      <Processo />
      <Projetos />
      <Escritos />
      <Contato />
      <Footer />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
