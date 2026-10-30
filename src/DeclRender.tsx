import Pagina from './Pagina';import {Decl,DocTpl} from './registry-docs';
const has=(s?:string)=>!!(s&&s.trim());
// Campo vazio: mostra reticências, para a pessoa poder preencher à mão se quiser.
const v=(s?:string)=>has(s)?s!.trim():'…………………………';

// 8 modelos de declaração: mudam o título, a moldura, a numeração e a posição da assinatura.
interface Est{al:'center'|'left';sz:string;up?:boolean;ul?:boolean;sp?:string;frame?:'thin'|'double';num:'1.'|'a)'|'1)';sig:'center'|'right'|'left';reg?:'rule'|'lines';cor?:boolean}
const EST:Record<string,Est>={
  simples:{al:'center',sz:'1.45em',num:'1.',sig:'center'},
  sublinhado:{al:'center',sz:'1.4em',up:true,ul:true,num:'1.',sig:'right'},
  moldura:{al:'center',sz:'1.45em',frame:'thin',num:'1.',sig:'center'},
  moldura2:{al:'center',sz:'1.35em',up:true,sp:'.06em',frame:'double',num:'a)',sig:'center'},
  grande:{al:'center',sz:'1.9em',sp:'.03em',num:'1.',sig:'center'},
  esquerda:{al:'left',sz:'1.5em',reg:'rule',num:'1.',sig:'left'},
  linhas:{al:'center',sz:'1.25em',up:true,sp:'.14em',reg:'lines',num:'1)',sig:'right'},
  azul:{al:'center',sz:'1.5em',reg:'rule',cor:true,num:'1.',sig:'center'}
};
const rotulo=(n:Est['num'],i:number)=>n==='a)'?String.fromCharCode(97+(i%26))+')':n==='1)'?`${i+1})`:`${i+1}.`;

export default function DeclRender({d,t,wm}:{d:Decl;t:DocTpl;wm?:boolean|'p'}){
const E=EST[t.style]||EST.simples;
const sig='decl|'+t.id+'|'+JSON.stringify(d);
return <Pagina sig={sig} wm={wm} size={17} pad={E.frame?'96px 104px':'80px 90px'}>{k=>{
const g=Math.round(16*k);const P=t.primary;
const m=d.sexo==='m',f=d.sexo==='f';
const filho=m?'filho':f?'filha':'filho/a',nasc=m?'nascido':f?'nascida':'nascido/a',port=m?'portador':f?'portadora':'portador/a';
const extra=[has(d.nationality)?`de nacionalidade ${d.nationality.trim()}`:'',has(d.profession)?`de profissão ${d.profession.trim()}`:'',has(d.address)?`residente em ${d.address.trim()}`:''].filter(Boolean);
const itens=(d.items||[]).filter(has);
const localData=[d.place,d.date].filter(has).join(', ');
const nomeAss=has(d.signature)?d.signature:has(d.name)?d.name:'Assinatura';
const titulo:any={margin:0,marginBottom:g*1.6,textAlign:E.al,fontSize:E.sz,fontWeight:700,color:E.cor?P:undefined,
  textTransform:E.up?'uppercase':undefined,textDecoration:E.ul?'underline':undefined,letterSpacing:E.sp};
if(E.reg==='rule'){titulo.borderBottom=`2px solid ${E.cor?P:'#000'}`;titulo.paddingBottom=g*.5}
if(E.reg==='lines'){titulo.borderTop='1px solid #000';titulo.borderBottom='1px solid #000';titulo.padding=`${g*.6}px 0`}
const assin=<div style={{display:'inline-block',minWidth:Math.round(280*k),borderTop:'1px solid #000',paddingTop:4,textAlign:'center'}}>{nomeAss}</div>;
return <>
{E.frame&&<div style={{position:'absolute',left:30,right:30,top:30,bottom:30,border:E.frame==='double'?'4px double #000':'1px solid #000',pointerEvents:'none'}}/>}
<h1 style={titulo}>Declaração de Compromisso de Honra</h1>
<p style={{margin:0,marginBottom:g,textAlign:'justify',textIndent:Math.round(36*k),lineHeight:1.6}}>
Eu, <b>{v(d.name)}</b>, {filho} de {v(d.father)} e de {v(d.mother)}, natural de {v(d.birthplace)}, {nasc} aos {v(d.birthdate)}, {extra.length>0?extra.join(', ')+', ':''}{port} do Bilhete de Identidade n.º {v(d.bi)}, emitido aos {v(d.biDate)} pelo Arquivo de Identificação Civil de {v(d.biPlace)}, declaro sob compromisso de honra que:</p>
{itens.map((x,i)=><div key={i} style={{display:'flex',gap:10,marginBottom:g*.7,lineHeight:1.6}}><span style={{minWidth:24}}>{rotulo(E.num,i)}</span><span style={{textAlign:'justify'}}>{x}</span></div>)}
{E.sig==='right'
?<div style={{marginTop:g*2.4,display:'flex',justifyContent:'space-between',alignItems:'flex-end',gap:16}}><div>{localData}</div>{assin}</div>
:<>{has(localData)&&<div style={{marginTop:g*2,textAlign:E.sig==='left'?'left':'center'}}>{localData}</div>}
<div style={{marginTop:Math.round(50*k),textAlign:E.sig==='left'?'left':'center'}}>{assin}</div></>}
</>}}</Pagina>}
