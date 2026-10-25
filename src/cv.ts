export interface CV{name:string;role:string;summary:string;phone:string;email:string;location:string;photo?:string;
education:{inst?:string;course?:string;period?:string}[];experience:{org?:string;role?:string;period?:string;desc?:string}[];
skills:string[];languages:{name?:string;level?:string}[];courses:string[]}
export const DEMO:CV={name:'Nome Completo Fictício',role:'Profissão pretendida',summary:'Profissional responsável e organizado, com vontade de aprender e de contribuir para os resultados da equipa.',phone:'+258 84 000 0000',email:'exemplo@email.com',location:'Maputo, Moçambique',
education:[{inst:'Universidade Exemplo',course:'Licenciatura em Gestão',period:'2018 – 2022'}],
experience:[{org:'Empresa Exemplo, Lda',role:'Assistente Administrativo',period:'2023 – Presente',desc:'Atendimento ao cliente, organização de documentos e apoio à direcção.'}],
skills:['Microsoft Word e Excel','Comunicação','Trabalho em equipa'],languages:[{name:'Português',level:'Fluente'},{name:'Inglês',level:'Médio'}],courses:['Informática na óptica do utilizador – 2022']}
