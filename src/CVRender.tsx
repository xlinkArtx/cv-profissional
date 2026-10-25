import {CSSProperties,ReactNode} from 'react';import {CV} from './cv';import {Tpl} from './registry';
export default function CVRender({cv,t,wm}:{cv:CV;t:Tpl;wm?:boolean}){
const H=(light:boolean):CSSProperties=>{const b:CSSProperties={fontWeight:700,fontSize:12,letterSpacing:1,textTransform:'uppercase',margin:'0 0 6px',color:light?'#fff':t.primary};
if(t.head==='bar')return{...b,borderLeft:`4px solid ${t.accent}`,paddingLeft:6};
if(t.head==='underline')return{...b,borderBottom:`2px solid ${t.accent}`,paddingBottom:2};
if(t.head==='pill')return{...b,background:t.accent,color:'#fff',padding:'2px 10px',borderRadius:99,display:'inline-block'};
if(t.head==='caps')return{...b,letterSpacing:3,fontWeight:500};return b};
const S=(title:string,body:ReactNode,light=false)=><div style={{marginBottom:14}}><h3 style={H(light)}>{title}</h3>{body}</div>;
const sk=cv.skills.filter(Boolean),co=cv.courses.filter(Boolean);
const contact=<div>{[cv.phone,cv.email,cv.location].filter(Boolean).map((x,i)=><div key={i} style={{wordBreak:'break-word'}}>{x}</div>)}</div>;
const photo=cv.photo&&t.photo!=='none'?<img src={cv.photo} style={{width:120,height:120,objectFit:'cover',borderRadius:t.photo==='circle'?'50%':8,border:`3px solid ${t.accent}`}}/>:null;
const profile=cv.summary&&S('Perfil',<p style={{margin:0}}>{cv.summary}</p>);
const exp=cv.experience.length>0&&S('Experiência profissional',cv.experience.map((e,i)=><div key={i} style={{marginBottom:8}}><b>{e.role}</b>{e.org&&` — ${e.org}`}<div style={{fontSize:10,opacity:.7}}>{e.period}</div><div>{e.desc}</div></div>));
const edu=cv.education.length>0&&S('Formação académica',cv.education.map((e,i)=><div key={i} style={{marginBottom:6}}><b>{e.course}</b><div>{e.inst}</div><div style={{fontSize:10,opacity:.7}}>{e.period}</div></div>));
const cur=co.length>0&&S('Cursos',<ul style={{margin:0,paddingLeft:16}}>{co.map((c,i)=><li key={i}>{c}</li>)}</ul>);
const skl=(l:boolean)=>sk.length>0&&S('Competências',<ul style={{margin:0,paddingLeft:16}}>{sk.map((c,i)=><li key={i}>{c}</li>)}</ul>,l);
const lg=(l:boolean)=>cv.languages.length>0&&S('Idiomas',cv.languages.map((g,i)=><div key={i}>{g.name}{g.level&&` — ${g.level}`}</div>),l);
const title=<div style={{marginBottom:16}}><div style={{fontSize:28,fontWeight:800,color:t.primary,lineHeight:1.1}}>{cv.name}</div><div style={{fontSize:14,color:t.accent,fontWeight:600}}>{cv.role}</div></div>;
let body:ReactNode;
if(t.layout==='sidebar-left'||t.layout==='sidebar-right'){
body=<div style={{display:'flex',flexDirection:t.layout==='sidebar-left'?'row':'row-reverse',minHeight:1123}}>
<div style={{width:250,background:t.primary,color:'#fff',padding:22}}><div style={{marginBottom:16}}>{photo}</div>{S('Contactos',contact,true)}{skl(true)}{lg(true)}</div>
<div style={{flex:1,padding:28}}>{title}{profile}{exp}{edu}{cur}</div></div>}
else if(t.layout==='top-band'){
body=<div><div style={{background:t.primary,color:'#fff',padding:'26px 30px',display:'flex',justifyContent:'space-between',alignItems:'center',gap:16}}>
<div><div style={{fontSize:28,fontWeight:800}}>{cv.name}</div><div style={{color:t.accent,fontWeight:700,fontSize:14,marginBottom:8}}>{cv.role}</div><div style={{fontSize:10.5}}>{[cv.phone,cv.email,cv.location].filter(Boolean).join('  •  ')}</div></div>{photo}</div>
<div style={{padding:'20px 30px'}}>{profile}{exp}{edu}{skl(false)}{lg(false)}{cur}</div></div>}
else if(t.layout==='two-col'){
body=<div style={{padding:30}}>{title}<div style={{height:3,background:t.accent,marginBottom:16}}/><div style={{display:'grid',gridTemplateColumns:'2fr 1fr',gap:24}}><div>{profile}{exp}{edu}</div><div>{photo&&<div style={{marginBottom:14}}>{photo}</div>}{S('Contactos',contact)}{skl(false)}{lg(false)}{cur}</div></div></div>}
else{body=<div style={{padding:32}}><div style={{display:'flex',justifyContent:'space-between',alignItems:'center',borderBottom:`3px solid ${t.accent}`,paddingBottom:12,marginBottom:16}}>{title}{photo}</div><div style={{fontSize:10.5,marginBottom:14}}>{[cv.phone,cv.email,cv.location].filter(Boolean).join('  •  ')}</div>{profile}{exp}{edu}{skl(false)}{lg(false)}{cur}</div>}
return <div style={{width:794,minHeight:1123,background:'#fff',fontFamily:t.font,fontSize:11.5,lineHeight:1.4,color:'#222',position:'relative',overflow:'hidden'}}>{body}
{wm&&<><div style={{position:'absolute',left:0,right:0,bottom:0,height:'50%',backdropFilter:'blur(4px)',WebkitBackdropFilter:'blur(4px)'}}/>
<div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',pointerEvents:'none'}}><div style={{transform:'rotate(-30deg)',fontSize:38,fontWeight:800,color:'rgba(249,115,22,.35)',textAlign:'center'}}>CV PROFISSIONAL<br/>PRÉ-VISUALIZAÇÃO</div></div></>}</div>}
