# Danaus Arquitetura — Maria Eduarda Martins

Site de apresentação (landing page) da arquiteta e urbanista **Maria Eduarda Martins**, com foco em design de interiores e ambientes de saúde (hospitais, clínicas e consultórios). Atendimento presencial em Anápolis e Goiânia e on-line para todo o Brasil e o exterior. Projetos residenciais são atendidos sob demanda.

**🔗 Site no ar:** https://thqms.github.io/Landing-Page-Arquitetura/

---

## Sobre o projeto

Uma página única (one-page), em estilo editorial e sofisticado, pensada para transmitir a proposta da arquiteta: *arquitetura que resolve antes de ser bonita*. O visual combina tipografia clássica, uma paleta quente (travertino, terracota e champanhe) e animações discretas.

### Seções
- **Início** — apresentação sobre uma parede de luz e sombra de folhas (no espírito da logo)
- **Sobre** — bio, formação, registro profissional e área de atendimento
- **Ambientes de saúde** — o que um projeto para hospitais, clínicas e consultórios considera
- **Processo** — as etapas de projeto (Escuta → Estudo → Projeto → Obra)
- **Projetos** — carrossel de tela cheia; "Ver projeto" abre a galeria com todas as fotos (fotos em `fotos/`)
- **Escritos** — artigos publicados no Substack
- **Contato** — WhatsApp, e-mail e formulário

### Destaques
- Tema **claro/escuro** (com preferência salva no navegador)
- **Carrossel** de projetos em tela cheia, com avanço automático
- **Responsivo** (celular, tablet e desktop)
- Botão direto de **WhatsApp** e formulário de **solicitação de projeto**
- **Abertura animada**: a luz acende na parede e a borboleta da marca voa e pousa ao lado do slogan
- **Rolagem suave** (Lenis) e profundidade no topo — só com mouse/trackpad; no celular a rolagem fica nativa
- Moldura do retrato que se desenha, foto do projeto que abre como cortina e botões "magnéticos"
- Tudo respeita "reduzir movimento" (acessibilidade): quem ativa vê o site parado, já no estado final

---

## Tecnologia

- **React 18** (via CDN, sem framework de build pesado)
- **esbuild** para compilar o `app.jsx` → `app.js`
- HTML/CSS puro (design system em variáveis CSS)
- Hospedagem estática em **GitHub Pages**

## Estrutura

```
index.html   → estrutura da página + todo o CSS (design system)
app.jsx      → código-fonte do site (conteúdo e componentes React)  ← editar aqui
app.js       → versão compilada do app.jsx (gerada pelo build)
package.json → scripts de build
```

## Como editar e rodar localmente

Todo o conteúdo (textos, projetos, fotos, contatos) fica no topo do **`app.jsx`**.

```bash
# instalar dependências (só na primeira vez)
npm install

# compilar após editar o app.jsx
npm run build

# recompilar automaticamente enquanto edita
npm run watch
```

Depois é só abrir o `index.html` no navegador.

## Galeria de projetos

Cada projeto em `CARROSSEL` (no `app.jsx`) tem `img` (capa) e `fotos` (lista que abre em "Ver projeto"). Para incluir mais fotos, salve em `fotos/` e acrescente na lista.

## Contador de visitas (GoatCounter)

Gratuito e sem cookies. Crie a conta em https://www.goatcounter.com/signup, escolha um código (ex.: `danaus`) e preencha `GOATCOUNTER` no topo do `app.jsx`. Além das visitas, ele conta cliques em WhatsApp, Instagram, e-mail e Substack.

## Publicar atualizações

O site republica sozinho a cada `push` na branch `main`:

```bash
npm run build
git add -A
git commit -m "descrição da mudança"
git push
```

Em ~1 minuto o GitHub Pages atualiza o link automaticamente.

---

## Licença

**Todos os direitos reservados** © 2026 — veja o arquivo [LICENSE](LICENSE).

O código está visível por ser um repositório público, mas **não pode ser copiado, reutilizado ou redistribuído** sem autorização.

## Créditos

Projeto e desenvolvimento por **ThQMS**.
Conteúdo e identidade: **Maria Eduarda Martins — Arquitetura & Interiores**.
