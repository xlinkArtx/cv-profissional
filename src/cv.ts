export interface CV{name:string;role:string;summary:string;phone:string;email:string;location:string;photo?:string;
personal:{k?:string;v?:string}[];education:{inst?:string;course?:string;period?:string}[];experience:{org?:string;role?:string;period?:string;desc?:string}[];
skills:string[];languages:{name?:string;level?:string}[];courses:string[];refs:{name?:string;role?:string;contact?:string}[]}
export const DEMO:CV={name:'Ana Paula Fictícia',role:'Assistente Administrativa',
summary:'Profissional com mais de 3 anos de experiência em administração e atendimento ao cliente. Organizada, responsável e com forte capacidade de comunicação, procura uma oportunidade para contribuir para os resultados da empresa e crescer profissionalmente.',
phone:'+258 84 000 0000',email:'exemplo@email.com',location:'Cidade de Maputo, Moçambique',
personal:[{k:'Data de nascimento',v:'15 de Julho de 1995'},{k:'Estado civil',v:'Solteira'},{k:'Nacionalidade',v:'Moçambicana'}],
education:[{inst:'Universidade Exemplo',course:'Licenciatura em Gestão',period:'2018 – 2022'},{inst:'Escola Secundária Exemplo',course:'12.ª classe',period:'2016'}],
experience:[
{org:'Empresa Exemplo, Lda',role:'Assistente Administrativa',period:'2023 – Presente',desc:'Atendimento ao cliente e gestão de chamadas\nOrganização de documentos e arquivo\nApoio à direcção na elaboração de relatórios'},
{org:'Comércio Exemplo, SA',role:'Recepcionista',period:'2021 – 2023',desc:'Recepção e encaminhamento de visitas\nControlo de entradas e saídas de documentos'},
{org:'Serviços Exemplo',role:'Estagiária',period:'2020 – 2021',desc:'Apoio administrativo e digitação de documentos'}],
skills:['Microsoft Word, Excel e PowerPoint','Boa comunicação e atendimento','Organização e gestão do tempo','Trabalho em equipa','Capacidade de trabalhar sob pressão','Sentido de responsabilidade'],
languages:[{name:'Português',level:'Fluente'},{name:'Inglês',level:'Médio'},{name:'Changana',level:'Fluente'}],
courses:['Informática na óptica do utilizador – 2022','Atendimento ao cliente – 2021','Técnicas de secretariado – 2020'],
refs:[{name:'Nome Fictício',role:'Director Geral, Empresa Exemplo',contact:'+258 84 111 1111'}]}
