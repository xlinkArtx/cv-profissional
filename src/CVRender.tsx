import {CSSProperties as C,ReactNode as N} from 'react';import {CV} from './cv';import {Tpl} from './registry';
export default function CVRender({cv,t,wm}:{cv:CV;t:Tpl;wm?:boolean}){
const P=t.primary,A=t.accent,tint=P+'1f',lt=t.tone==='l',sbBg=lt?tint:P,sbFg=lt?'#111':'#fff';
const dl=t.layout==='TC'||t.head==='spaced';const mark=t.family==='classico'||t.family==='academico'?'❖':'•';
const per=(cv.personal||[]).filter(p=>p.k||p.v),refs=cv.refs||[];
const cl=[['☎',cv.phone],['✉',cv.email],['⌂',cv.location]].filter(x=>x[1]);
const sk=cv.skills.filter(Boolean),co=cv.courses.filter(Boolean);
const H=(s:string,dk:boolean)=>{const b:C={fontWeight:700,textTransform:'uppercase',fontSize:13.5,margin:0,color:dk?'#fff':P};
switch(t.head){
case 'icon':return <div style={{...b,background:dk?'rgba(255,255,255,.16)':tint,borderLeft:`4px solid ${A}`,padding:'3px 8px'}}>{s}</div>;
case 'ul':return <div style={{...b,borderBottom:`2px solid ${dk?A:P}`,paddingBottom:2}}>{s}</div>;
case 'shade':return <div style={{...b,background:dk?'rgba(255,255,255,.2)':'#d6d6d6',color:dk?'#fff':'#000',textDecoration:'underline',padding:'1px 6px'}}>{s}</div>;
case 'caps':return <div style={{...b,letterSpacing:3,borderBottom:`1px solid ${dk?'rgba(255,255,255,.4)':'#bbb'}`,paddingBottom:2}}>{s}</div>;
case 'spaced':return <div><div style={{...b,fontWeight:400,fontSize:15,letterSpacing:4,color:dk?'#fff':'#666'}}>{s}</div><div style={{width:34,height:3,background:A,marginTop:3}}/></div>;
case 'tick':return <div><div style={{width:30,height:4,background:A,marginBottom:3}}/><div style={b}>{s}</div></div>;
default:return <div style={{...b,background:dk?A:P,color:dk?'#111':'#fff',padding:'3px 12px',width:'88%',clipPath:'polygon(0 0,100% 0,calc(100% - 10px) 50%,100% 100%,0 100%)'}}>{s}</div>}};
const S=(s:string,body:N,dk=false)=><div style={{marginBottom:14}}>{H(s,dk)}<div style={{marginTop:6}}>{body}</div></div>;
const B=(x:string)=>{const l=(x||'').split('\n').filter(Boolean);return l.length?<ul style={{margin:'2px 0 0',paddingLeft:18}}>{l.map((y,i)=><li key={i}>{y}</li>)}</ul>:null};
const E=(d:string,ti:string,sub:string,body:N,i:number)=>dl?
<div key={i} style={{display:'grid',gridTemplateColumns:'78px 1fr',gap:8,marginBottom:9}}><div style={{fontSize:11.5,fontWeight:700}}>{d}</div><div><b>{ti}</b>{sub&&<div style={{fontStyle:'italic'}}>{sub}</div>}{body}</div></div>:
<div key={i} style={{marginBottom:9}}><div style={{display:'flex',justifyContent:'space-between',gap:8}}><b>{ti}</b><span style={{fontSize:12,whiteSpace:'nowrap'}}>{d}</span></div>{sub&&<div style={{fontStyle:'italic'}}>{sub}</div>}{body}</div>;
const profile=cv.summary?S('Resumo profissional',<p style={{margin:0,textAlign:'justify'}}>{cv.summary}</p>):null;
const exp=cv.experience.length?S('Experiência profissional',cv.experience.map((e,i)=>E(e.period||'',(e.role||'').toUpperCase(),e.org||'',B(e.desc||''),i))):null;
const edu=cv.education.length?S('Formação académica',cv.education.map((e,i)=>E(e.period||'',(e.course||'').toUpperCase(),e.inst||'',null,i))):null;
const cur=co.length?S('Cursos e certificados',B(co.join('\n'))):null;
const skl=(dk:boolean,cols=false)=>sk.length?S('Competências',<div style={cols?{columns:2,columnGap:24}:{}}>{B(sk.join('\n'))}</div>,dk):null;
const lg=(dk:boolean)=>cv.languages.length?S('Idiomas',cv.languages.map((g,i)=><div key={i}><b>{g.name}</b>{g.level&&`: ${g.level}`}</div>),dk):null;
const rf=refs.length?S('Referências',refs.map((r,i)=><div key={i} style={{marginBottom:6}}><b>{r.name}</b>{r.role&&<div>{r.role}</div>}{r.contact&&<div>{r.contact}</div>}</div>)):null;
const data=(dk:boolean)=>S('Dados pessoais',<div style={{fontSize:12.5}}>{cl.map((c,i)=><div key={i} style={{marginBottom:3,wordBreak:'break-word'}}>{c[0]} {c[1]}</div>)}{per.map((p,i)=><div key={'p'+i} style={{marginBottom:3}}><b>{p.k}:</b> {p.v}</div>)}</div>,dk);
const table=S('Dados pessoais',<div>{[['Nome',cv.name],['Residência',cv.location],['Telefone',cv.phone],['E-mail',cv.email],...per.map(p=>[p.k,p.v])].filter(r=>r[1]).map((r,i)=><div key={i} style={{display:'flex',marginBottom:2}}><span style={{width:190}}>{mark} {r[0]}</span><span style={{flex:1}}>{r[1]}</span></div>)}</div>);
const ini=cv.name.split(' ').filter(Boolean).slice(0,2).map(w=>w[0]).join('').toUpperCase();
const ph=(z:number)=>t.photo==='m'?<div style={{width:z,height:z,borderRadius:'50%',background:A,color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',fontSize:z/2.4,fontWeight:700,border:`4px solid ${lt?P:'#fff'}`,flexShrink:0}}>{ini}</div>:cv.photo&&t.photo!=='n'?<img src={cv.photo} style={{width:z,height:z,objectFit:'cover',borderRadius:t.photo==='c'?'50%':6,border:`4px solid ${lt?P:'#fff'}`,flexShrink:0}}/>:null;
const side=t.layout==='SL'||t.layout==='SR';
const nm=()=>{const n=t.nameS==='band'&&!side?'plain':t.nameS;
if(n==='cv')return <div style={{textAlign:'center',fontSize:30,fontWeight:700,textDecoration:'underline',marginBottom:14}}>CURRICULUM VITAE</div>;
if(n==='band')return <div style={{background:P,color:'#fff',padding:'18px 28px',margin:'-28px -28px 18px'}}><div style={{fontSize:26,fontWeight:700,letterSpacing:1,textTransform:'uppercase'}}>{cv.name}</div><div style={{color:A,filter:'brightness(1.35)',fontWeight:700,fontSize:15}}>{cv.role}</div></div>;
if(n==='box')return <div style={{background:tint,border:`2px solid ${P}`,padding:'10px 14px',textAlign:'center',marginBottom:16}}><div style={{fontSize:26,fontWeight:700,color:P,textTransform:'uppercase'}}>{cv.name}</div><div style={{fontSize:14,color:'#444'}}>{cv.role}</div></div>;
if(n==='spaced')return <div style={{marginBottom:16,borderBottom:'1px solid #ccc',paddingBottom:10}}><div style={{fontSize:28,letterSpacing:6,textTransform:'uppercase'}}>{cv.name}</div><div style={{letterSpacing:4,color:'#777',textTransform:'uppercase',fontSize:12,marginTop:4}}>{cv.role}</div></div>;
return <div style={{marginBottom:16}}><div style={{fontSize:32,fontWeight:700,color:P,lineHeight:1.1}}>{cv.name}</div><div style={{fontSize:16,color:'#444',marginTop:3}}>{cv.role}</div><div style={{width:60,height:4,background:A,marginTop:6}}/></div>};
const line=[cv.phone,cv.email,cv.location,...per.map(p=>p.k&&p.v?`${p.k}: ${p.v}`:'')].filter(Boolean).join('  •  ');
let body:N;const p120=ph(120);
if(side){body=<div style={{display:'flex',flexDirection:t.layout==='SL'?'row':'row-reverse',minHeight:1123}}>
<div style={{width:255,background:sbBg,color:sbFg,padding:22,flexShrink:0,fontSize:12.5}}>{p120&&<div style={{display:'flex',justifyContent:'center',marginBottom:16}}>{p120}</div>}{data(!lt)}{lg(!lt)}{skl(!lt)}</div>
<div style={{flex:1,padding:28}}>{nm()}{profile}{exp}{edu}{cur}{rf}</div></div>}
else if(t.layout==='TB'){body=<div><div style={{background:P,color:'#fff',padding:'24px 30px',display:'flex',justifyContent:'space-between',alignItems:'center',gap:16}}><div><div style={{fontSize:30,fontWeight:700,letterSpacing:1,textTransform:'uppercase'}}>{cv.name}</div><div style={{fontSize:16,fontWeight:700,color:A,filter:'brightness(1.4)',marginTop:2}}>{cv.role}</div></div>{p120}</div>
<div style={{display:'grid',gridTemplateColumns:'1fr 235px',gap:22,padding:'20px 30px'}}><div>{profile}{exp}{edu}{rf}</div><div style={{background:tint,padding:14,fontSize:12.5}}>{data(false)}{lg(false)}{skl(false)}{cur}</div></div></div>}
else if(t.layout==='TC'){body=<div style={{padding:30,minHeight:1123}}>{nm()}<div style={{display:'grid',gridTemplateColumns:'235px 1fr',gap:26}}><div style={{borderRight:'1px solid #ddd',paddingRight:18,fontSize:12.5}}>{p120&&<div style={{marginBottom:14}}>{p120}</div>}{data(false)}{profile}{lg(false)}{skl(false)}</div><div>{exp}{edu}{cur}{rf}</div></div></div>}
else{const inner=<div style={{padding:t.layout==='FR'?22:34}}><div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',gap:16}}><div style={{flex:1}}>{nm()}</div>{p120}</div>
{t.nameS==='cv'?table:<div style={{fontSize:12.5,marginBottom:12}}>{line}</div>}{profile}{exp}{edu}{skl(false,true)}{lg(false)}{cur}{rf}</div>;
body=t.layout==='FR'?<div style={{border:`3px double ${P}`,margin:16,minHeight:1091}}>{inner}</div>:inner}
return <div style={{width:794,minHeight:1123,background:'#fff',fontFamily:"'Times New Roman',Times,serif",fontSize:13.5,lineHeight:1.35,color:'#111',position:'relative',overflow:'hidden'}}>{body}
{wm&&<><div style={{position:'absolute',left:0,right:0,bottom:0,height:'50%',backdropFilter:'blur(4px)',WebkitBackdropFilter:'blur(4px)'}}/>
<div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',pointerEvents:'none'}}><div style={{transform:'rotate(-30deg)',fontSize:38,fontWeight:800,color:'rgba(249,115,22,.35)',textAlign:'center'}}>CV PROFISSIONAL<br/>PRÉ-VISUALIZAÇÃO</div></div></>}</div>}
