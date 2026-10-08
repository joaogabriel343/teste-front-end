# Teste Front-End Econverse

Loja virtual desenvolvida para o teste técnico de Desenvolvedor Front-End da Econverse.

A vitrine consome a lista de produtos em JSON fornecida no teste. Ao clicar em um produto, um modal exibe nome, foto, preço, parcelamento e descrição, com seletor de quantidade e botão de compra.

Além da página inicial pedida no teste, todos os botões e links levam a telas funcionais. Os dados ficam salvos no navegador (`localStorage`) e continuam lá depois de recarregar a página.

## Funcionalidades

- **Página do produto:** aberta pelo link "Veja mais detalhes do produto" do modal, com produtos relacionados.
- **Carrinho:** adicionar, alterar quantidade, remover e esvaziar, com resumo e parcelamento.
- **Finalizar compra:** formulário de entrega com máscara de CEP e telefone, escolha de pagamento e opção de salvar os dados.
- **Meus pedidos:** lista e detalhe de cada pedido, com o botão Comprar novamente.
- **Favoritos:** botão de coração nos cards e no modal.
- **Minha conta:** edição do cadastro, resumo da conta e exclusão de todos os dados salvos.
- **Busca:** pelo campo do cabeçalho, com ordenação dos resultados.
- **Catálogo:** todos os produtos, ofertas do dia, lançamentos, departamentos, marcas e parceiros.
- **Assinatura:** contratar, trocar e cancelar um plano.
- **Atendimento:** formulários de contato, suporte e trabalhe conosco, com protocolo e histórico.
- **Newsletter:** inscrição com bloqueio de e-mail repetido.
- **Páginas institucionais:** sobre, movimento, termos, privacidade, troca e devolução e perguntas frequentes.
- **Página não encontrada** para endereços inválidos.

## Tecnologias

- React 19 e TypeScript
- Vite
- Sass (SCSS Modules)
- Vitest e Testing Library
- Oxlint
- Fonte Poppins hospedada localmente com `@fontsource/poppins`

Nenhuma biblioteca de UI foi utilizada.

## Como instalar, compilar, testar e rodar

Pré-requisito: Node.js 20.19 ou superior.

### 1. Instalar

```bash
git clone https://github.com/joaogabriel343/teste-front-end.git
cd teste-front-end
npm install
```

### 2. Rodar em modo de desenvolvimento

```bash
npm run dev
```

Acesse `http://localhost:5173`.

### 3. Compilar para produção

```bash
npm run build
npm run preview
```

O `build` verifica os tipos e gera os arquivos em `dist/`. O `preview` serve essa versão em `http://localhost:4173`.

### 4. Testar

```bash
npm test
npm run lint
```

O `test` executa os testes automatizados. O `lint` faz a análise estática do código.

## Integração contínua

O workflow `.github/workflows/ci.yml` roda no GitHub Actions a cada push e pull request para a `main`. Ele instala as dependências, executa o lint, os testes e o build.

## Estrutura de pastas

```
src/
  assets/images/    Imagens otimizadas em WebP
  components/       Um diretório por componente, com .tsx e .module.scss
  data/             Conteúdo estático da loja e das páginas
  hooks/            useProducts, useCarousel, usePersistentState e usePageTitle
  pages/            Uma tela por rota
  router/           Roteador próprio baseado na History API
  services/         Requisição e validação da lista de produtos
  store/            Contextos de catálogo, loja (dados salvos) e interface
  styles/           Tokens de design, mixins e estilos globais
  test/             Configuração e utilitários dos testes
  types/            Tipos dos produtos e da loja
  utils/            Formatação, armazenamento e normalização de texto
  App.tsx           Layout e rotas
  main.tsx          Ponto de entrada
```

## Principais decisões técnicas

- **Consumo do JSON:** o servidor do JSON não envia cabeçalhos CORS, então o navegador bloqueia a requisição direta. O Vite faz proxy de `/api/produtos.json` para a URL oficial, tanto em `npm run dev` quanto em `npm run preview`. Em uma hospedagem estática, basta configurar o mesmo redirecionamento.
- **Preços:** os valores do JSON são tratados como centavos (`149990` vira `R$ 1.499,90`) e formatados com `Intl.NumberFormat`.
- **Abas da vitrine:** a categoria de cada produto é identificada pelo nome. Como o JSON só traz celulares, as outras abas mostram um aviso e um atalho para ver todos os produtos.
- **Modal:** usa o elemento nativo `<dialog>`, que já cuida do foco, do fechamento com Esc e do bloqueio do conteúdo ao fundo. Também fecha ao clicar fora.
- **Carrossel:** feito com CSS scroll snap e setas que avançam uma página por vez. As setas ficam desabilitadas no início e no fim da lista. No celular, a navegação é por toque.
- **Rotas:** um roteador pequeno, sem dependências, intercepta os links internos e usa a History API. A navegação não recarrega a página, o foco vai para o conteúdo principal e o título da aba muda em cada tela. O Vite já devolve o `index.html` em qualquer endereço, então os links diretos funcionam.
- **Animações:** a troca de páginas usa a View Transitions API, com o cabeçalho fixo durante a transição. As seções aparecem ao rolar com animações ligadas à rolagem (`animation-timeline: view()`), os cards entram em sequência e os botões respondem ao clique. Navegadores sem suporte mostram tudo normalmente, e quem ativa a redução de movimento no sistema não vê animações.
- **Dados locais:** o hook `usePersistentState` salva cada parte do estado no `localStorage`, trata falhas de acesso e sincroniza entre abas abertas.
- **Estados da requisição:** carregamento com esqueleto animado, erro com botão para tentar novamente e lista vazia com orientação.
- **Estilos:** SCSS Modules evitam conflito de classes. Cores, espaçamentos, breakpoints e mixins ficam centralizados em `styles/_tokens.scss`. O layout é mobile first.
- **Acessibilidade:** HTML semântico, link para pular ao conteúdo, foco visível, rótulos em todos os campos e botões de ícone, contraste AA e respeito a `prefers-reduced-motion`.
- **Performance:** imagens em WebP com `srcset`, carregamento tardio fora da primeira dobra, fontes locais apenas com o subconjunto latino e nenhuma dependência de execução além do React.
- **SEO:** idioma `pt-BR`, título e descrição, Open Graph, `robots.txt` e hierarquia de títulos correta.

## Qualidade

- 23 testes automatizados cobrem utilitários, serviço, modal, página do produto, carrinho, compra completa, favoritos, busca, newsletter, assinatura, contato e página não encontrada.
- Lighthouse (desktop): 100 em Performance, Acessibilidade, Boas práticas e SEO na página inicial.
- Lighthouse (mobile): 97 a 98 em Performance e 100 nas demais categorias.
- Testado em 360px, 768px, 1280px e 1440px.

## Créditos das imagens

A foto do banner principal foi exportada do layout do teste no Figma. As fotos dos parceiros foram obtidas no [Unsplash](https://unsplash.com), sob a licença Unsplash.
