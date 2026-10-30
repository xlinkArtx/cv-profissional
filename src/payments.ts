// Pagamento manual por WhatsApp.
// Preços, limites e textos de cada produto ficam aqui, fáceis de mudar.
// ATENÇÃO: o "limite" de cartas e declarações também está escrito em firestore.rules (valor 5).
// Se mudares o limite aqui, muda também nas regras e Publica.
export const WHATSAPP='258877264329';
export const ADMIN_EMAIL='dariocarlos517@gmail.com';

export type Produto='cvs'|'cartas'|'declaracoes';

export interface ProdutoCfg{
  nome:string;       // título da secção
  preco:number;      // em MT
  limite:number;     // downloads sem marca de água
  campoPago:string;  // campo em users/{UID} que o administrador põe a true
  colecao:string;    // subcoleção em users/{UID}
  docId:string;      // documento com o conteúdo e o contador de downloads
  rota:string;
  acesso:string;     // frase da mensagem: "para ter acesso ..."
  chamada:string;    // título do painel de pagamento
  oQue:string;       // "descarrega ..." no painel de pagamento
  rascunho:string;   // chave do rascunho no telemóvel (localStorage)
  ficheiro:string;   // início do nome do PDF
}

export const PRODUTOS:Record<Produto,ProdutoCfg>={
  cvs:{nome:'Currículos (CVs)',preco:250,limite:7,campoPago:'paid',colecao:'cvs',docId:'cv-1',rota:'/editor',
    acesso:'a todos os modelos de currículos',chamada:'DESBLOQUEIA TODOS OS MODELOS',oQue:'o teu CV',rascunho:'cv-draft2',ficheiro:'CV'},
  cartas:{nome:'Cartas de apresentação',preco:150,limite:5,campoPago:'paidCartas',colecao:'cartas',docId:'carta-1',rota:'/cartas',
    acesso:'às cartas de apresentação',chamada:'DESBLOQUEIA AS CARTAS DE APRESENTAÇÃO',oQue:'as tuas cartas',rascunho:'carta-draft1',ficheiro:'Carta'},
  declaracoes:{nome:'Declaração de Compromisso de Honra',preco:100,limite:5,campoPago:'paidDeclaracoes',colecao:'declaracoes',docId:'decl-1',rota:'/declaracoes',
    acesso:'à Declaração de Compromisso de Honra',chamada:'DESBLOQUEIA A DECLARAÇÃO DE COMPROMISSO DE HONRA',oQue:'a tua declaração',rascunho:'decl-draft1',ficheiro:'Declaracao'}
};

export const precoTxt=(p:Produto)=>`${PRODUTOS[p].preco} MT`;

const mensagem=(p:Produto,email:string,uid:string)=>`Olá! Quero pagar ${precoTxt(p)} para ter acesso ${PRODUTOS[p].acesso}.\nE-mail: ${email}\nCódigo: ${uid}\nComo faço para pagar com E-Mola ou M-Pesa?`;

export const linkPagamentoProduto=(p:Produto,email:string,uid:string)=>`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(mensagem(p,email,uid))}`;

// Compatibilidade com o Editor.tsx dos CVs (não precisa de alterações).
export const PRECO=precoTxt('cvs');
export const linkPagamento=(email:string,uid:string)=>linkPagamentoProduto('cvs',email,uid);
export const linkMais=(email:string,uid:string,_limite?:number)=>linkPagamento(email,uid);