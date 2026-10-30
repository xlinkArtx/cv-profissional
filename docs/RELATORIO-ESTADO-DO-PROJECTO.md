# Dossiê de transferência — CV Profissional
**Data:** 30/10/2026  
**Repositório:** https://github.com/xlinkArtx/cv-profissional  
**Branch principal:** `main`  
**Aplicação publicada:** https://cv-profissional-blush.vercel.app  
**Stack:** React 18 + TypeScript + Vite + Tailwind CSS + Firebase Authentication + Cloud Firestore + Vercel.

## 1. Objectivo do produto
Plataforma web orientada a utilizadores em Moçambique para criar, editar, pré-visualizar e exportar em PDF:
- Currículos profissionais (CVs), com vários modelos;
- Cartas de apresentação, com vários modelos;
- Declaração de Compromisso de Honra.

A interface é responsiva e foi pensada para utilização em telemóveis Android. O proprietário não pretende criar nem publicar APK: o produto é um site web.

## 2. Estado funcional confirmado
O proprietário informou que testou e confirmou o funcionamento das regras de acesso/pagamento e que as últimas alterações de navegação ficaram boas.

Últimas alterações registadas no histórico desta manutenção:
- `src/MenuConta.tsx`: menu «Mais», email do utilizador em letra muito pequena e opções para criar CV, carta e declaração.
- `src/DocEditor.tsx`: menu «Mais» também integrado no editor de cartas/declarações para permitir alternar entre produtos.
- `firestore.rules`: regras para que os campos de autorização das cartas e declarações sejam lidos nos documentos próprios.
- `src/Pagina.tsx`, `src/CartaRender.tsx`, `src/DocEditor.tsx`: versões actualizadas anteriormente para a paginação/renderização dos documentos.

**Importante:** o estado acima descreve alterações guardadas na branch main e testes relatados pelo proprietário; não significa que este dossiê tenha executado uma nova compilação ou teste automatizado. Confirmar o estado actual da implantação na Vercel antes de qualquer alteração.

## 3. Navegação e ficheiros centrais
- `src/main.tsx`: rotas principais.
  - `/` → `Home`
  - `/entrar` → `Login`
  - `/editor` → editor de CV
  - `/cartas` → editor de cartas
  - `/declaracoes` → editor de declarações
- `src/Home.tsx`: página inicial, secções/galerias de modelos de CV, cartas e declarações.
- `src/MenuConta.tsx`: menu global «Mais», email discreto e autenticação/saída.
- `src/Editor.tsx`: editor de CV, dados, modelos, pré-visualização, gravação e exportação.
- `src/DocEditor.tsx`: editor reutilizável para cartas e declarações, condicionado pela propriedade `produto`.
- `src/CVRender.tsx`, `src/CartaRender.tsx`, `src/DeclRender.tsx`: renderização visual/impressão dos documentos.
- `src/registry.ts`, `src/registry-docs.ts`: catálogo de modelos e formulários.
- `src/payments.ts`: preços, limites, identificadores Firestore, mensagens e link WhatsApp.
- `src/cvs.ts`, `src/cv.ts`: estrutura e persistência dos dados de CV.
- `src/firebase.ts`: inicialização Firebase a partir de variáveis Vite.
- `firestore.rules`: regras de segurança Firestore.
- `functions/index.js`: Cloud Functions de inicialização de campos de contagem.
- `vercel.json`: rewrite SPA para `index.html`.
- `package.json`: scripts e dependências.

## 4. Modelo de dados Firestore e autorizações
Os documentos de conteúdo ficam em subcolecções do utilizador:
- CV: `users/{UID}/cvs/cv-1`
- Carta: `users/{UID}/cartas/carta-1`
- Declaração: `users/{UID}/declaracoes/decl-1`

Campos de desbloqueio:
- CV: `paid: true` — o editor actual de CV também consulta o documento raiz `users/{UID}` para o campo `paid`, por compatibilidade.
- Carta: `paidCartas: true` dentro de `users/{UID}/cartas/carta-1`.
- Declaração: `paidDeclaracoes: true` dentro de `users/{UID}/declaracoes/decl-1`.

Limites actuais definidos no código:
- CV: 7 downloads limpos.
- Carta: 5 downloads limpos.
- Declaração: 5 downloads limpos.

Os contadores `downloadsUsed` e `downloadsLimit` ficam no documento de cada produto. As Rules impedem o utilizador de alterar directamente campos protegidos e impedem apagar os documentos de produto para repor o contador. Para cartas/declarações, as Rules verificam a autorização no documento de produto correspondente.

**Atenção a uma discrepância a rever em manutenção futura:** comentários e metadados de `src/payments.ts` ainda descrevem `campoPago` como estando em `users/{UID}`, embora cartas e declarações sejam agora lidas no documento de produto. Actualizar apenas comentários/documentação, ou validar cuidadosamente qualquer alteração funcional.

## 5. Pagamentos
O fluxo actualmente implementado é **manual por WhatsApp**, não uma integração automática de gateway:
- WhatsApp de contacto configurado no código: número definido em `src/payments.ts`.
- CV: 250 MT.
- Carta: 100 MT.
- Declaração: 100 MT.
- Métodos anunciados: M-Pesa e e-Mola.
- O utilizador entra com Google; o site abre WhatsApp com mensagem contendo produto, email e UID. O administrador confirma o pagamento e altera o campo Boolean correspondente no Firestore.

Não afirmar que M-Pesa/e-Mola estão integrados automaticamente. O texto da página inicial também indica que os pagamentos são «em breve» e o editor explica que o pagamento é combinado por WhatsApp.

## 6. Autenticação, privilégios e exportação
- Firebase Authentication com Google.
- Os rascunhos são mantidos no armazenamento local do navegador (localStorage).
- A gravação na nuvem é feita em Firestore.
- A exportação é baseada em impressão do navegador (`window.print`), com nome de documento ajustado; o utilizador escolhe «Guardar como PDF» no dispositivo.
- Os componentes de renderização recebem estado de marca de água/desfoque para utilizadores sem autorização ou que excederam o limite.
- Existe email de administrador definido em `src/payments.ts` e também referência no editor de CV; esse utilizador recebe acesso ilimitado conforme a lógica actual. Não alterar sem autorização expressa do proprietário.

## 7. Configuração e publicação
Dependências e comandos no `package.json`:
- `npm install`
- `npm run dev`
- `npm run build`
- `npm run preview`

Vercel está ligada ao repositório e a branch principal é `main`; commits em `main` deverão iniciar deploy automático, sujeito à configuração da conta Vercel.

Variáveis necessárias no ambiente Vercel (e em `.env.local` local):
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`

Não incluir valores secretos, tokens, credenciais privadas ou ficheiros `.env` no pacote de transferência. O repositório tem `src/firebase.ts` que lê estas variáveis. O projecto Firebase anteriormente identificado pelo proprietário usa o ID `linkart-2d6b9`; confirmar sempre na consola antes de alterar configurações.

## 8. Regras de trabalho para futuras alterações
1. Antes de editar, ler os ficheiros actuais da branch `main`; nunca assumir que cópias antigas são actuais.
2. Identificar o fluxo completo: componente, configuração em `payments.ts`, renderizador, persistência e Firestore Rules, conforme a tarefa.
3. Preservar o funcionamento dos outros produtos. CV, carta e declaração têm contadores e campos de pagamento independentes.
4. Não mover campos de pagamento de local sem pedido expresso.
5. Não expor dados pessoais de clientes, UID, emails de clientes, API keys ou credenciais.
6. Nunca tornar as Firestore Rules públicas para escrita geral; preservar a protecção dos campos pagos e contadores.
7. Não criar APK, Capacitor build ou fluxo Android nativo. O proprietário quer apenas o site web.
8. Após alterações, executar/verificar `npm run build` se houver ambiente disponível; verificar deploy Vercel e testar no telemóvel.
9. Informar claramente quais ficheiros foram alterados, commits, passos manuais Firebase/Vercel e testes que realmente foram feitos.
10. Não afirmar que algo foi testado se apenas foi editado.

## 9. Checklist de regressão
- Página inicial carrega e mostra as três categorias.
- Botão «Mais» permanece visível na Home, editor CV, cartas e declarações.
- Menu permite alternar entre CV, carta e declaração.
- Login Google e logout funcionam.
- Dados e modelos seleccionados persistem como esperado.
- PDF gratuito contém marca de água/desfoque conforme a regra do produto.
- Pagamento confirmado e campo Boolean correcto removem marca de água até ao limite.
- Limites: CV 7; cartas 5; declarações 5.
- Ao atingir o limite, exportação volta a aplicar marca de água.
- Um produto pago não desbloqueia os outros.
- Rules impedem utilizador comum de editar `paid`, `paidCartas`, `paidDeclaracoes` ou contadores de forma indevida.

## 10. Limitações e itens a confirmar
- Não foi executada compilação/teste automatizado ao criar este relatório.
- Confirmar se a versão mais recente está efectivamente publicada na Vercel.
- Verificar a configuração efectiva de domínios autorizados do Firebase Authentication.
- Confirmar se Cloud Functions estão implantadas; o código existe no repositório, mas a existência do ficheiro não prova implantação.
- Pagamento automático M-Pesa/e-Mola ainda não está implementado no código consultado; o processo é manual via WhatsApp.
- O README principal está desactualizado e ainda descreve a fase inicial; este dossiê é a referência de transferência mais actual.
