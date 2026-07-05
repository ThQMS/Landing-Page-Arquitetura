# Maria Eduarda Martins — Arquitetura & Interiores

Site de apresentação (landing page) da arquiteta e urbanista **Maria Eduarda Martins**, com foco em projetos residenciais e de interiores em Goiânia e região.

**🔗 Site no ar:** https://thqms.github.io/Landing-Page-Arquitetura/

---

## Sobre o projeto

Uma página única (one-page), em estilo editorial e sofisticado, pensada para transmitir a proposta da arquiteta: *arquitetura que resolve antes de ser bonita*. O visual combina tipografia clássica, uma paleta quente (travertino, terracota e champanhe) e animações discretas.

### Seções
- **Início** — apresentação com chamada principal
- **Sobre** — bio e números de atuação
- **Processo** — as etapas de projeto (Escuta → Estudo → Projeto → Obra)
- **Projetos** — carrossel de tela cheia com as fotos dos trabalhos
- **Escritos** — artigos publicados no Substack
- **Contato** — WhatsApp e redes

### Destaques
- Tema **claro/escuro** (com preferência salva no navegador)
- **Carrossel** de projetos em tela cheia, com avanço automático
- **Responsivo** (celular, tablet e desktop)
- Botão direto de **WhatsApp** e link do **Instagram**
- Animações de entrada e brilho, respeitando "reduzir movimento" por acessibilidade

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
