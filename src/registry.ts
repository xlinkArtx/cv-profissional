export type Layout='SL'|'SR'|'TB'|'SG'|'TC'|'FR';
export type Family='classico'|'moderno'|'executivo'|'academico'|'minimalista'|'criativo';
export interface Tpl{id:string;family:Family;name:string;layout:Layout;nameS:'band'|'box'|'plain'|'spaced'|'cv';head:'icon'|'ul'|'shade'|'caps'|'spaced'|'tick'|'ribbon';photo:'c'|'s'|'m'|'n';tone:'d'|'l';primary:string;accent:string}
const P=[['#0b2f5b','#f97316'],['#1f2937','#eab308'],['#14532d','#f59e0b'],['#7f1d1d','#0ea5e9'],['#312e81','#ec4899'],['#0f766e','#f97316'],['#374151','#38bdf8'],['#831843','#facc15'],['#1e3a8a','#22c55e'],['#292524','#ef4444']];
export const FAMILIES:Record<Family,{label:string}>={classico:{label:'Clássico'},moderno:{label:'Moderno'},executivo:{label:'Executivo'},academico:{label:'Académico'},minimalista:{label:'Minimalista'},criativo:{label:'Criativo'}};
// Cada linha: layout nome cabeçalhos foto tom  (SL/SR=barra lateral, TB=faixa topo, SG=coluna única, TC=duas colunas, FR=moldura)
const D:Record<Family,string[]>={
classico:['FR cv shade n','FR cv ul n','SG cv shade n','SG plain ul n','FR cv caps n','SG box icon c','TB plain ul s','SL band shade c l','SG spaced ul n','TC plain shade n'],
moderno:['SL band icon c d','SL band icon c l','SR band icon c d','SL box ul m d','SL band tick c d','SL plain icon n l','SR box icon s l','SL band ribbon c d','SL band caps m l','SL box tick c d'],
executivo:['TB plain ribbon s','TB plain icon c','TB plain caps n','SL band ribbon s d','SR band icon n d','TB plain ul c','SL box icon s l','TB plain tick n','TC spaced caps c','SL band caps s d'],
academico:['SG plain ul n','TC plain ul n','SG cv shade n','FR cv ul n','SG plain caps s','TC box icon n','SR plain ul n l','SG spaced ul c','TC plain tick s','FR plain shade n'],
minimalista:['SG spaced spaced c','TC spaced spaced c','SG spaced spaced n','SR spaced spaced c l','TC plain spaced n','SG plain spaced s','SL spaced spaced c l','TC spaced caps n','SG spaced tick c','TC spaced spaced s'],
criativo:['SL band tick c d','SR band ribbon m d','TB plain tick c','SL box ribbon m d','SL band icon s d','TB plain ribbon m','SR box tick c l','SL band ribbon c l','TB plain icon c','SL box tick m d']};
export const TEMPLATES:Tpl[]=(Object.keys(D) as Family[]).flatMap((f,fi)=>D[f].map((s,i)=>{const a=s.split(' ');const p=P[(i+fi*3)%10];
return{id:`${f}-${i+1}`,family:f,name:`${FAMILIES[f].label} ${i+1}`,layout:a[0] as Layout,nameS:a[1] as any,head:a[2] as any,photo:a[3] as any,tone:(a[4]||'d') as any,primary:p[0],accent:p[1]}}));
export const byId=(id:string)=>TEMPLATES.find(t=>t.id===id)||TEMPLATES[0];
