import Pagina from './Pagina';import {Decl,DocTpl} from './registry-docs';
const has=(s?:string)=>!!(s&&s.trim());
// Campo vazio: mostra reticências, para a pessoa poder preencher à mão se quiser.
const v=(s?:string)=>has(s)?s!.trim():'…………………………';
// Fase 1: um modelo de teste (A4, texto preto, Times).
export default function DeclRender({d,t,wm}:{d:Decl;t:DocTpl;wm?:boolean|'p'}){
const sig='decl|'+t.id+'|'+JSON.stringify(d);
return <Pagina sig={sig} wm={wm} size={17} pad="80px 90px">{k=>{
const g=Math.round(16*k);
const m=d.sexo==='m',f=d.sexo==='f';
const filho=m?'filho':f?'filha':'filho/a',nasc=m?'nascido':f?'nascida':'nascido/a',port=m?'portador':f?'portadora':'portador/a';
const extra=[has(d.nationality)?`de nacionalidade ${d.nationality.trim()}`:'',has(d.profession)?`de profissão ${d.profession.trim()}`:'',has(d.address)?`residente em ${d.address.trim()}`:''].filter(Boolean);
const itens=(d.items||[]).filter(has);
const localData=[d.place,d.date].filter(has).join(', ');
return <>
<h1 style={{margin:0,marginBottom:g*1.6,textAlign:'center',fontSize:'1.45em',fontWeight:700}}>Declaração de Compromisso de Honra</h1>
<p style={{margin:0,marginBottom:g,textAlign:'justify',textIndent:Math.round(36*k),lineHeight:1.6}}>
Eu, <b>{v(d.name)}</b>, {filho} de {v(d.father)} e de {v(d.mother)}, natural de {v(d.birthplace)}, {nasc} aos {v(d.birthdate)}, {extra.length>0?extra.join(', ')+', ':''}{port} do Bilhete de Identidade n.º {v(d.bi)}, emitido aos {v(d.biDate)} pelo Arquivo de Identificação Civil de {v(d.biPlace)}, declaro sob compromisso de honra que:</p>
{itens.map((x,i)=><div key={i} style={{display:'flex',gap:10,marginBottom:g*.7,lineHeight:1.6}}><span style={{minWidth:22}}>{i+1}.</span><span style={{textAlign:'justify'}}>{x}</span></div>)}
{has(localData)&&<div style={{marginTop:g*2,textAlign:'center'}}>{localData}</div>}
<div style={{marginTop:Math.round(50*k),textAlign:'center'}}>
<div style={{display:'inline-block',minWidth:Math.round(280*k),borderTop:'1px solid #000',paddingTop:4}}>{has(d.signature)?d.signature:has(d.name)?d.name:'Assinatura'}</div></div>
</>}}</Pagina>}