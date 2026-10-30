import Pagina from './Pagina';import {Carta,DocTpl} from './registry-docs';
const has=(s?:string)=>!!(s&&s.trim());
// Fase 1: um modelo de teste (carta formal moçambicana simples).
export default function CartaRender({d,t,wm}:{d:Carta;t:DocTpl;wm?:boolean|'p'}){
const sig='carta|'+t.id+'|'+JSON.stringify(d);
return <Pagina sig={sig} wm={wm} size={16}>{k=>{
const g=Math.round(14*k);
const contactos=[d.phone,d.email].filter(has).join('  ·  ');
const dados=[has(d.bi)?`BI n.º ${d.bi.trim()}`:'',has(d.nacionalidade)?`Nacionalidade: ${d.nacionalidade.trim()}`:'',has(d.idade)?`Idade: ${d.idade.trim()}`:'',has(d.filiacao)?`Filiação: ${d.filiacao.trim()}`:''].filter(Boolean);
const dest=[d.destCargo,d.destInst,d.destCidade].filter(has);
const paras=[d.p1,d.p2,d.p3,d.p4].filter(has);
const localData=[d.place,d.date].filter(has).join(', ');
return <>
<div style={{borderBottom:`2px solid ${t.primary}`,paddingBottom:g*.7,marginBottom:g*1.2}}>
{has(d.name)&&<div style={{fontWeight:700,fontSize:'1.45em',color:t.primary,lineHeight:1.2}}>{d.name}</div>}
{has(d.role)&&<div style={{fontStyle:'italic'}}>{d.role}</div>}
{has(d.address)&&<div>{d.address}</div>}
{has(contactos)&&<div>{contactos}</div>}
{dados.length>0&&<div style={{fontSize:'.92em',marginTop:3}}>{dados.join('  ·  ')}</div>}
</div>
{has(localData)&&<div style={{textAlign:'right',marginBottom:g}}>{localData}</div>}
{dest.length>0&&<div style={{marginBottom:g}}>{dest.map((x,i)=><div key={i} style={{fontWeight:i===0?700:400}}>{x}</div>)}</div>}
{has(d.ref)&&<div style={{marginBottom:g*.6}}>Ref.: {d.ref}</div>}
{has(d.subject)&&<div style={{marginBottom:g*1.1,fontWeight:700,textDecoration:'underline'}}>Assunto: {d.subject}</div>}
{has(d.greeting)&&<div style={{marginBottom:g*.8}}>{d.greeting}</div>}
{paras.map((p,i)=><p key={i} style={{margin:0,marginBottom:g*.8,textAlign:'justify',textIndent:Math.round(34*k),lineHeight:1.5}}>{p}</p>)}
{has(d.closing)&&<div style={{marginTop:g*1.2}}>{d.closing}</div>}
<div style={{marginTop:Math.round(46*k),width:Math.round(250*k),textAlign:'center'}}>
<div style={{borderTop:'1px solid #111',paddingTop:4}}>{has(d.signature)?d.signature:d.name}</div></div>
</>}}</Pagina>}