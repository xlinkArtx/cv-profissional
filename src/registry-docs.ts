// Registo dos modelos de cartas de apresentação e declarações de compromisso de honra.
// Fase 2: 12 modelos de cartas e 5 textos-modelo. Declarações: ainda 1 modelo de teste (Fase 3).
export type ProdutoDoc='cartas'|'declaracoes';

// style escolhe o desenho no CartaRender / DeclRender; primary e accent são as cores do modelo.
export interface DocTpl{id:string;produto:ProdutoDoc;name:string;style:string;primary:string;accent:string}

export const DOC_TEMPLATES:DocTpl[]=[
  // Cartas formais (letra Times, texto preto)
  {id:'carta-formal-1',produto:'cartas',name:'Formal com cabeçalho',style:'formal',primary:'#0b2f5b',accent:'#f97316'},
  {id:'carta-formal-2',produto:'cartas',name:'Formal moçambicana',style:'formal2',primary:'#111111',accent:'#111111'},
  {id:'carta-formal-3',produto:'cartas',name:'Formal com título',style:'titulo',primary:'#111111',accent:'#0b2f5b'},
  {id:'carta-formal-4',produto:'cartas',name:'Formal com moldura',style:'moldura',primary:'#0b2f5b',accent:'#f97316'},
  // Cartas modernas (letra sem serifa, cor)
  {id:'carta-moderna-1',produto:'cartas',name:'Faixa de contactos',style:'faixa',primary:'#111827',accent:'#dc2626'},
  {id:'carta-moderna-2',produto:'cartas',name:'Barra lateral',style:'lateral',primary:'#0b2f5b',accent:'#f97316'},
  {id:'carta-moderna-3',produto:'cartas',name:'Topo colorido',style:'topo',primary:'#0f766e',accent:'#f59e0b'},
  {id:'carta-moderna-4',produto:'cartas',name:'Geométrica',style:'geo',primary:'#6d28d9',accent:'#f97316'},
  {id:'carta-moderna-5',produto:'cartas',name:'Monograma',style:'timbre',primary:'#7f1d1d',accent:'#d97706'},
  {id:'carta-moderna-6',produto:'cartas',name:'Minimalista',style:'minimal',primary:'#334155',accent:'#f97316'},
  {id:'carta-moderna-7',produto:'cartas',name:'Rodapé colorido',style:'rodape',primary:'#15803d',accent:'#86efac'},
  {id:'carta-moderna-8',produto:'cartas',name:'Duas colunas',style:'duascol',primary:'#0b2f5b',accent:'#f97316'},
  // Declaração (Fase 3 acrescenta os restantes)
  {id:'decl-simples-1',produto:'declaracoes',name:'Declaração simples',style:'simples',primary:'#000000',accent:'#000000'}
];
export const docTemplates=(p:ProdutoDoc)=>DOC_TEMPLATES.filter(t=>t.produto===p);
export const docById=(p:ProdutoDoc,id:string)=>docTemplates(p).find(t=>t.id===id)||docTemplates(p)[0];

// ---------- Tipos dos dados ----------
export interface Carta{name:string;role:string;phone:string;email:string;address:string;
  bi:string;nacionalidade:string;idade:string;filiacao:string;
  place:string;date:string;destCargo:string;destInst:string;destCidade:string;ref:string;
  subject:string;greeting:string;p1:string;p2:string;p3:string;p4:string;closing:string;signature:string}

export interface Decl{name:string;sexo:''|'m'|'f';father:string;mother:string;birthplace:string;birthdate:string;
  nationality:string;address:string;profession:string;bi:string;biDate:string;biPlace:string;
  items:string[];place:string;date:string;signature:string}

// ---------- Dados de exemplo (fictícios) ----------
const MESES=['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
export const hoje=()=>{const n=new Date();return `${n.getDate()} de ${MESES[n.getMonth()]} de ${n.getFullYear()}`};

export const DEMO_CARTA:Carta={name:'Ana Paula Fictícia',role:'Assistente Administrativa',phone:'+258 84 000 0000',email:'exemplo@email.com',
  address:'Bairro Exemplo, Cidade de Maputo',bi:'',nacionalidade:'',idade:'',filiacao:'',
  place:'Maputo',date:hoje(),destCargo:'Director de Recursos Humanos',destInst:'Empresa Exemplo, Lda',destCidade:'Maputo',
  ref:'Vaga de Assistente Administrativa',subject:'Candidatura à vaga de Assistente Administrativa',greeting:'Exmos Senhores,',
  p1:'Chamo-me Ana Paula Fictícia, sou licenciada em Gestão e venho, por este meio, candidatar-me à vaga de Assistente Administrativa, anunciada por V. Exas.',
  p2:'Tenho mais de três anos de experiência em atendimento ao cliente, organização de documentos e apoio à direcção, funções que desempenho com responsabilidade e atenção ao detalhe.',
  p3:'Gostaria de integrar a vossa equipa porque procuro uma oportunidade para pôr em prática o que aprendi e continuar a crescer profissionalmente.',
  p4:'Junto o meu currículo em anexo e fico à disposição para uma entrevista, no dia e hora que considerarem mais convenientes.',
  closing:'Com os melhores cumprimentos,',signature:''};

export const DEMO_DECL:Decl={name:'Ana Paula Fictícia',sexo:'f',father:'Pai Fictício',mother:'Mãe Fictícia',
  birthplace:'Cidade Exemplo, Província Exemplo',birthdate:'1 de Janeiro de 1998',nationality:'moçambicana',address:'',profession:'',
  bi:'000000000000X',biDate:'1 de Janeiro de 2020',biPlace:'Maputo',
  items:['Nunca fui expulsa de nenhuma instituição de ensino ou de trabalho.',
    'Todas as informações que prestei são verdadeiras.',
    'Assumo inteira responsabilidade, nos termos da lei, se alguma das informações se mostrar falsa.'],
  place:'Maputo',date:hoje(),signature:''};

export const DEMOS:Record<ProdutoDoc,any>={cartas:DEMO_CARTA,declaracoes:DEMO_DECL};

// Campos vazios (botão "Limpar exemplo").
export const VAZIOS:Record<ProdutoDoc,()=>any>={
  cartas:()=>({name:'',role:'',phone:'',email:'',address:'',bi:'',nacionalidade:'',idade:'',filiacao:'',place:'',date:hoje(),
    destCargo:'',destInst:'',destCidade:'',ref:'',subject:'',greeting:'Exmos Senhores,',p1:'',p2:'',p3:'',p4:'',
    closing:'Com os melhores cumprimentos,',signature:''}),
  declaracoes:()=>({name:'',sexo:'',father:'',mother:'',birthplace:'',birthdate:'',nationality:'',address:'',profession:'',
    bi:'',biDate:'',biPlace:'',items:[''],place:'',date:hoje(),signature:''})
};

// ---------- Formulários (o DocEditor desenha-os a partir daqui) ----------
export interface Campo{k:string;label:string;ph?:string;tipo?:'area'|'sexo'}
export interface Grupo{titulo:string;ajuda?:string;campos:Campo[];lista?:string}

export const FORMS:Record<ProdutoDoc,Grupo[]>={
  cartas:[
    {titulo:'1. Os teus dados',campos:[
      {k:'name',label:'Nome completo',ph:'Ex.: Maria João Cumbane'},
      {k:'role',label:'Profissão ou título (opcional)',ph:'Ex.: Assistente Administrativa'},
      {k:'phone',label:'Telefone / WhatsApp',ph:'Ex.: +258 84 000 0000'},
      {k:'email',label:'E-mail',ph:'Ex.: nome@email.com'},
      {k:'address',label:'Morada',ph:'Ex.: Bairro da Polana, Maputo'}]},
    {titulo:'2. Dados pessoais (opcionais)',ajuda:'Preenche só o que queres mostrar na carta.',campos:[
      {k:'bi',label:'Bilhete de identidade n.º',ph:'Ex.: 110100123456A'},
      {k:'nacionalidade',label:'Nacionalidade',ph:'Ex.: moçambicana'},
      {k:'idade',label:'Idade',ph:'Ex.: 28 anos'},
      {k:'filiacao',label:'Filiação',ph:'Ex.: filha de João Cumbane e de Maria Mabunda'}]},
    {titulo:'3. Local e data',campos:[
      {k:'place',label:'Local',ph:'Ex.: Maputo'},
      {k:'date',label:'Data',ph:'Ex.: 30 de Outubro de 2026'}]},
    {titulo:'4. Destinatário',campos:[
      {k:'destCargo',label:'Cargo do destinatário',ph:'Ex.: Director de Recursos Humanos'},
      {k:'destInst',label:'Instituição ou empresa',ph:'Ex.: Empresa ABC, Lda'},
      {k:'destCidade',label:'Cidade',ph:'Ex.: Maputo'},
      {k:'ref',label:'Referência da vaga (opcional)',ph:'Ex.: Vaga de Assistente Administrativa'}]},
    {titulo:'5. Assunto e saudação',campos:[
      {k:'subject',label:'Assunto',ph:'Ex.: Candidatura à vaga de Assistente Administrativa'},
      {k:'greeting',label:'Saudação',ph:'Ex.: Exmos Senhores,'}]},
    {titulo:'6. Texto da carta',ajuda:'Escreve em frases curtas e verdadeiras. Se um parágrafo não for preciso, deixa-o vazio.',campos:[
      {k:'p1',label:'Parágrafo 1: apresentação',tipo:'area',ph:'Quem és e a que vaga te candidatas.'},
      {k:'p2',label:'Parágrafo 2: formação e experiência',tipo:'area',ph:'O que estudaste e onde já trabalhaste.'},
      {k:'p3',label:'Parágrafo 3: motivação',tipo:'area',ph:'Porque queres este trabalho.'},
      {k:'p4',label:'Parágrafo 4: fecho',tipo:'area',ph:'Anexos e disponibilidade para entrevista.'}]},
    {titulo:'7. Despedida e assinatura',campos:[
      {k:'closing',label:'Despedida',ph:'Ex.: Com os melhores cumprimentos,'},
      {k:'signature',label:'Nome na assinatura',ph:'Se ficar vazio, usa o teu nome'}]}
  ],
  declaracoes:[
    {titulo:'1. Identificação',campos:[
      {k:'name',label:'Nome completo',ph:'Ex.: Maria João Cumbane'},
      {k:'sexo',label:'Sexo (para escrever filho/filha, nascido/nascida)',tipo:'sexo'},
      {k:'father',label:'Nome do pai',ph:'Nome completo do pai'},
      {k:'mother',label:'Nome da mãe',ph:'Nome completo da mãe'},
      {k:'birthplace',label:'Naturalidade',ph:'Ex.: Xai-Xai, Província de Gaza'},
      {k:'birthdate',label:'Data de nascimento',ph:'Ex.: 12 de Março de 1998'}]},
    {titulo:'2. Bilhete de identidade',campos:[
      {k:'bi',label:'Bilhete de identidade n.º',ph:'Ex.: 110100123456A'},
      {k:'biDate',label:'Data de emissão',ph:'Ex.: 5 de Maio de 2021'},
      {k:'biPlace',label:'Cidade de emissão',ph:'Ex.: Maputo'}]},
    {titulo:'3. Outros dados (opcionais)',ajuda:'Só aparecem na declaração se preencheres.',campos:[
      {k:'nationality',label:'Nacionalidade',ph:'Ex.: moçambicana'},
      {k:'address',label:'Morada',ph:'Ex.: Bairro da Polana, Maputo'},
      {k:'profession',label:'Profissão',ph:'Ex.: estudante'}]},
    {titulo:'4. Declarações',ajuda:'Escreve o que declaras, uma ideia em cada caixa. Podes acrescentar, apagar e mudar a ordem.',campos:[],lista:'items'},
    {titulo:'5. Local, data e assinatura',campos:[
      {k:'place',label:'Local',ph:'Ex.: Maputo'},
      {k:'date',label:'Data',ph:'Ex.: 30 de Outubro de 2026'},
      {k:'signature',label:'Nome na assinatura',ph:'Se ficar vazio, usa o teu nome'}]}
  ]
};


// ---------- Textos-modelo das cartas ----------
// Usam o nome, a profissão e a instituição que a pessoa já escreveu.
// O que a pessoa ainda tem de preencher aparece entre [ ].
const pl=(v:string|undefined,f:string)=>v&&v.trim()?v.trim():`[${f}]`;

export interface TextoCarta{id:string;nome:string;gerar:(d:Carta)=>Partial<Carta>}

export const TEXTOS_CARTA:TextoCarta[]=[
  {id:'vaga',nome:'Candidatura a uma vaga anunciada',gerar:d=>{
    const nome=pl(d.name,'o teu nome'),vaga=pl(d.role,'nome da vaga'),inst=d.destInst&&d.destInst.trim()?d.destInst.trim():'V. Exas.';
    return {subject:`Candidatura à vaga de ${vaga}`,greeting:'Exmos Senhores,',
      p1:`Chamo-me ${nome} e venho, por este meio, candidatar-me à vaga de ${vaga}, anunciada por ${inst}.`,
      p2:'Possuo formação em [a tua formação] e experiência em [as tuas funções ou áreas de trabalho]. Tenho sentido de responsabilidade, facilidade em trabalhar em equipa e vontade de aprender.',
      p3:'Considero que o meu perfil corresponde ao que procuram e gostaria de contribuir para o trabalho da vossa instituição.',
      p4:'Junto o meu currículo em anexo e fico à disposição para uma entrevista, no dia e hora que considerarem mais convenientes.',
      closing:'Com os melhores cumprimentos,'}}},
  {id:'espontanea',nome:'Emprego espontâneo (sem vaga anunciada)',gerar:d=>{
    const nome=pl(d.name,'o teu nome'),prof=pl(d.role,'a tua profissão'),inst=pl(d.destInst,'nome da instituição');
    return {subject:'Candidatura espontânea',greeting:'Exmos Senhores,',
      p1:`Chamo-me ${nome}, sou ${prof} e venho, por este meio, apresentar a minha candidatura espontânea para integrar a equipa de ${inst}, caso exista, agora ou no futuro, uma vaga adequada ao meu perfil.`,
      p2:'Tenho formação em [a tua formação] e experiência em [as tuas funções ou áreas de trabalho]. Procuro uma oportunidade para pôr em prática o que aprendi e continuar a desenvolver-me profissionalmente.',
      p3:'Sou uma pessoa responsável, pontual e disponível para aprender. Acredito que posso contribuir para os objectivos da vossa instituição.',
      p4:'Junto o meu currículo em anexo e fico à disposição para qualquer esclarecimento ou entrevista.',
      closing:'Com os melhores cumprimentos,'}}},
  {id:'estagio',nome:'Pedido de estágio',gerar:d=>{
    const nome=pl(d.name,'o teu nome'),inst=pl(d.destInst,'nome da instituição');
    return {subject:'Pedido de estágio profissional',greeting:'Exmos Senhores,',
      p1:`Chamo-me ${nome}, sou [estudante ou finalista] do curso de [nome do curso] na [nome da instituição de ensino] e venho solicitar a V. Exas. a oportunidade de realizar um estágio profissional em ${inst}.`,
      p2:'O estágio permitir-me-ia aplicar na prática os conhecimentos adquiridos durante a formação e conhecer melhor o dia a dia da profissão.',
      p3:'Comprometo-me a cumprir o horário e as regras da instituição e a dedicar-me com seriedade às tarefas que me forem confiadas.',
      p4:'Junto o meu currículo em anexo e fico à disposição para qualquer esclarecimento.',
      closing:'Com os melhores cumprimentos,'}}},
  {id:'pedido',nome:'Pedido de emprego',gerar:d=>{
    const nome=pl(d.name,'o teu nome'),funcao=pl(d.role,'função pretendida'),inst=pl(d.destInst,'nome da instituição');
    return {subject:'Pedido de emprego',greeting:'Exmo. Senhor Director,',
      p1:`Chamo-me ${nome} e venho, respeitosamente, solicitar a V. Exa. um lugar de trabalho em ${inst}, na função de ${funcao}.`,
      p2:'Tenho formação em [a tua formação] e experiência em [as tuas funções ou áreas de trabalho].',
      p3:'Estou disponível para começar de imediato e comprometo-me a desempenhar as funções com seriedade, pontualidade e dedicação.',
      p4:'Na expectativa de uma resposta favorável, subscrevo-me com elevada estima e consideração.',
      closing:'Atenciosamente,'}}},
  {id:'concurso',nome:'Concurso público',gerar:d=>{
    const nome=pl(d.name,'o teu nome'),vaga=pl(d.role,'nome da vaga'),inst=pl(d.destInst,'nome da instituição');
    return {subject:`Candidatura ao concurso público para ${vaga}`,greeting:'Exmos Senhores,',
      p1:`Chamo-me ${nome} e venho, por este meio, candidatar-me ao concurso público para o preenchimento da vaga de ${vaga}, aberto por ${inst} e anunciado em [jornal, rádio ou local do anúncio], no dia [data do anúncio].`,
      p2:'Declaro que reúno os requisitos exigidos no anúncio, nomeadamente [os requisitos principais do anúncio].',
      p3:'Junto, para o efeito, os documentos exigidos: [lista dos documentos, por exemplo, currículo, cópia do BI e certificado de habilitações].',
      p4:'Fico a aguardar a análise da minha candidatura e coloco-me à disposição para qualquer esclarecimento adicional.',
      closing:'Com os melhores cumprimentos,'}}}
];

// Verdadeiro se ainda há partes entre [ ] por preencher no texto da carta.
export const temPlaceholders=(d:any)=>/\[[^\]]+\]/.test([d.subject,d.greeting,d.p1,d.p2,d.p3,d.p4].join('\n'));
