# PROMPT PARA NOVO CHAT — CONTINUIDADE DO SITE CV PROFISSIONAL

Assume o papel de engenheiro de software responsável por continuar um projecto existente. Não comeces do zero.

O projecto é o site CV Profissional:
- GitHub: https://github.com/xlinkArtx/cv-profissional
- Branch: main
- Site: https://cv-profissional-blush.vercel.app
- Stack: React + TypeScript + Vite + Tailwind + Firebase Auth/Firestore + Vercel.
- O proprietário trabalha frequentemente apenas pelo telemóvel Android e precisa de instruções simples, passo a passo.
- O proprietário NÃO quer construir APK. Trabalhar exclusivamente no site web.

PRIMEIRO PASSO OBRIGATÓRIO:
1. Lê integralmente o ficheiro `docs/RELATORIO-ESTADO-DO-PROJECTO.md`.
2. Consulta o repositório e os ficheiros actuais da branch main antes de qualquer alteração. O ZIP é uma fotografia e pode ficar desactualizado.
3. Identifica as dependências entre Home, MenuConta, Editor, DocEditor, renderizadores, payments.ts, registry files e firestore.rules.
4. Resume em poucas linhas que compreendeste a arquitectura e pergunta qual alteração o proprietário pretende, se ainda não tiver indicado uma tarefa.

FUNCIONALIDADES:
- CV: rota /editor; dados/modelos/preview; exportação para PDF pelo diálogo de impressão.
- Carta: rota /cartas; usa DocEditor com produto cartas.
- Declaração de Compromisso de Honra: rota /declaracoes; usa DocEditor com produto declaracoes.
- Menu «Mais» com navegação entre os três produtos deve continuar visível na Home e em todos os editores.
- Login Google via Firebase Auth; Firestore guarda documentos; rascunhos locais via localStorage.
- Marca de água e desfoque em documentos não pagos/sem autorização, e exportação limpa quando autorizado dentro do limite.

PAGAMENTOS E FIRESTORE:
- CV: paid; documento users/{UID}/cvs/cv-1; limite 7.
- Carta: paidCartas; documento users/{UID}/cartas/carta-1; limite 5.
- Declaração: paidDeclaracoes; documento users/{UID}/declaracoes/decl-1; limite 5.
- Importante: paidCartas e paidDeclaracoes devem ser lidos dentro dos documentos carta-1 e decl-1, respectivamente, NÃO no documento raiz users/{UID}.
- Pagamentos são actualmente combinados manualmente por WhatsApp; não dizer que M-Pesa/e-Mola estão automaticamente integrados.
- Preservar Firestore Rules seguras e os contadores. Nunca permitir que o utilizador se atribua pagamento.

PREÇOS ACTUAIS:
- CV 250 MT; carta 100 MT; declaração 100 MT.
- Confirmar no código antes de mudar.

REGRAS:
- Não alterar funcionalidades não solicitadas.
- Não remover marca de água globalmente nem contornar pagamentos.
- Não alterar admin/email privilegiado, preços, limites, estrutura Firestore ou Rules sem pedido explícito.
- Nunca expor API keys, tokens, dados de clientes ou credenciais.
- Não criar APK nem propor construção Android nativa.
- Antes de editar, fetch dos ficheiros reais e SHA actual. Fazer alterações pequenas, coerentes e documentadas.
- Se mexer em regras, explicar que é necessário publicar no Firebase Console; commit no GitHub não publica Rules automaticamente.
- Se mexer no frontend, verificar deploy Vercel; commit no GitHub não prova deploy concluído.
- Relatar exactos ficheiros alterados, links, passos manuais e testes realmente executados.
- Se não houver ambiente de build/teste, declarar isso honestamente.

Usa o relatório como documentação de contexto, mas considera sempre o código actual do GitHub como fonte de verdade.
