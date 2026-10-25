export type Layout='sidebar-left'|'sidebar-right'|'top-band'|'single'|'two-col';
export type Family='classico'|'moderno'|'executivo'|'academico'|'minimalista'|'criativo';
export interface Tpl{id:string;family:Family;name:string;layout:Layout;primary:string;accent:string;font:string;head:'bar'|'underline'|'caps'|'pill'|'plain';photo:'circle'|'square'|'none'}
const P=[['#0b2f5b','#f97316'],['#1f2937','#eab308'],['#14532d','#f59e0b'],['#7f1d1d','#0ea5e9'],['#312e81','#ec4899'],['#0f766e','#f97316'],['#374151','#38bdf8'],['#831843','#facc15'],['#1e3a8a','#22c55e'],['#292524','#ef4444']];
const F=['Georgia,serif','Arial,sans-serif',"'Trebuchet MS',sans-serif","'Palatino Linotype',serif",'Verdana,sans-serif'];
type H=Tpl['head'];
export const FAMILIES:Record<Family,{label:string;layouts:Layout[];fonts:number[];heads:H[]}>={
classico:{label:'Clássico',layouts:['single','top-band','sidebar-left'],fonts:[0,3],heads:['underline','plain','caps']},
moderno:{label:'Moderno',layouts:['sidebar-left','sidebar-right','top-band'],fonts:[1,2,4],heads:['bar','pill','underline']},
executivo:{label:'Executivo',layouts:['top-band','sidebar-left','two-col'],fonts:[3,1],heads:['caps','underline','bar']},
academico:{label:'Académico',layouts:['single','two-col','sidebar-right'],fonts:[0,3,1],heads:['underline','plain','bar']},
minimalista:{label:'Minimalista',layouts:['single','two-col','sidebar-right'],fonts:[1,4],heads:['caps','plain','underline']},
criativo:{label:'Criativo',layouts:['sidebar-left','sidebar-right','top-band'],fonts:[2,4,1],heads:['pill','bar','caps']}};
const ph=['circle','square','circle','none'] as const;
export const TEMPLATES:Tpl[]=(Object.keys(FAMILIES) as Family[]).flatMap(f=>{const c=FAMILIES[f];
return P.map((p,i)=>({id:`${f}-${i+1}`,family:f,name:`${c.label} ${i+1}`,layout:c.layouts[i%3],primary:p[0],accent:p[1],font:F[c.fonts[i%c.fonts.length]],head:c.heads[(i+Math.floor(i/3))%3],photo:ph[i%4]}))});
export const byId=(id:string)=>TEMPLATES.find(t=>t.id===id)||TEMPLATES[0];
