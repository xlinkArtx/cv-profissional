import Pagina from './Pagina';import {Carta,DocTpl} from './registry-docs';
const has=(s?:string)=>!!(s&&s.trim());
const SANS="'Segoe UI',Roboto,Helvetica,Arial,sans-serif";
const FORMAIS=['formal','formal2','titulo','moldura'];
const PAD:Record<string,string>={formal:'64px 76px',formal2:'72px 84px',titulo:'64px 80px',moldura:'80px 92px',
  faixa:'56px 64px',lateral:'0',topo:'0',geo:'60px 68px',timbre:'56px 68px',minimal:'72px 84px',rodape:'56px 64px 112px',duascol:'56px 64px'};

// Cartas de apresentação: 12 modelos (4 formais e 8 modernos). Cada um encolhe a letra até caber numa folha A4.
export default function CartaRender({d,t,wm}:{d:Carta;t:DocTpl;wm?:boolean|'p'}){
const S=t.style;const sans=!FORMAIS.includes(S);
const sig='carta|'+t.id+'|'+JSON.stringify(d);
return <Pagina sig={sig} wm={wm} size={sans?15:16} pad={PAD[S]||'60px 70px'}>{k=>{
const g=Math.round(14*k);const P=t.primary,A=t.accent;
const nome=has(d.name)?d.name.trim():'';
const partes=nome.split(/\s+/).filter(Boolean);const primeiro=partes[0]||'',resto=partes.slice(1).join(' ');
const ini=partes.map(x=>x[0]).slice(0,2).join('').toUpperCase();
const todos=[d.address,d.phone,d.email].filter(has).map(x=>x.trim());
const contactos=[d.phone,d.email].filter(has).map(x=>x.trim());
const dados=[has(d.bi)?`BI n.º ${d.bi.trim()}`:'',has(d.nacionalidade)?`Nacionalidade: ${d.nacionalidade.trim()}`:'',has(d.idade)?`Idade: ${d.idade.trim()}`:'',has(d.filiacao)?`Filiação: ${d.filiacao.trim()}`:''].filter(Boolean) as string[];
const dadosLinha=dados.join('  ·  ');
const dest=[d.destCargo,d.destInst,d.destCidade].filter(has).map(x=>x.trim());
const paras=[d.p1,d.p2,d.p3,d.p4].filter(has);
const localData=[d.place,d.date].filter(has).join(', ');
const sigNome=has(d.signature)?d.signature.trim():nome;
// Frase de identificação (modelos formais): nome, filiação, nacionalidade, idade e BI.
const partesLead=[has(d.filiacao)?d.filiacao.trim():'',has(d.nacionalidade)?`de nacionalidade ${d.nacionalidade.trim()}`:'',has(d.idade)?`com ${d.idade.trim()}`:'',has(d.bi)?`portador do Bilhete de Identidade n.º ${d.bi.trim()}`:''].filter(Boolean);

const assunto=(est:'ul'|'bold'|'cor')=>has(d.subject)&&<div style={{marginBottom:g*1.1,fontWeight:700,color:est==='cor'?P:undefined,textDecoration:est==='ul'?'underline':'none'}}>Assunto: {d.subject}</div>;

type O={data?:'right'|'left'|'fim'|'no';dest?:boolean;ass?:'ul'|'bold'|'cor';lead?:boolean;indent?:boolean;linha?:boolean;contFim?:boolean;lh?:number};
// Corpo da carta: data, destinatário, assunto, saudação, parágrafos, despedida e assinatura.
const corpo=(o:O={})=>{const data=o.data||'right';const lh=o.lh||1.5;
return <>
{(data==='right'||data==='left')&&has(localData)&&<div style={{textAlign:data==='right'?'right':'left',marginBottom:g}}>{localData}</div>}
{o.dest!==false&&dest.length>0&&<div style={{marginBottom:g}}>{dest.map((x,i)=><div key={i} style={{fontWeight:i===0?700:400}}>{x}</div>)}</div>}
{has(d.ref)&&<div style={{marginBottom:g*.6}}>Ref.: {d.ref}</div>}
{assunto(o.ass||'bold')}
{has(d.greeting)&&<div style={{marginBottom:g*.8}}>{d.greeting}</div>}
{o.lead&&partesLead.length>0&&<p style={{margin:0,marginBottom:g*.8,textAlign:'justify',textIndent:o.indent?Math.round(34*k):0,lineHeight:lh}}><b>{nome}</b>, {partesLead.join(', ')}.</p>}
{paras.map((p,i)=><p key={i} style={{margin:0,marginBottom:g*.8,textAlign:sans?'left':'justify',textIndent:o.indent?Math.round(34*k):0,lineHeight:lh}}>{p}</p>)}
{has(d.closing)&&<div style={{marginTop:g*1.2}}>{d.closing}</div>}
{o.linha
?<div style={{marginTop:Math.round(46*k),display:'flex',justifyContent:'space-between',alignItems:'flex-end',gap:16}}>
<div style={{width:Math.round(250*k),textAlign:'center'}}><div style={{borderTop:'1px solid #111',paddingTop:4}}>{sigNome}</div></div>
{data==='fim'&&has(localData)&&<div>{localData}</div>}</div>
:<div style={{marginTop:Math.round(34*k)}}><div style={{fontWeight:700,color:P}}>{sigNome}</div>{data==='fim'&&has(localData)&&<div style={{marginTop:2}}>{localData}</div>}</div>}
{o.contFim&&(todos.length>0||dados.length>0)&&<div style={{marginTop:g*1.4,fontSize:'.88em',color:'#334155',borderTop:'1px solid #cbd5e1',paddingTop:6,lineHeight:1.5}}>{todos.length>0&&<div>{todos.join('  ·  ')}</div>}{o.lead?null:dados.length>0&&<div>{dadosLinha}</div>}</div>}
</>};

const caixa=(titulo:string,linhas:string[])=>linhas.length>0&&<div style={{marginBottom:g*1.2}}>
<div style={{fontWeight:700,letterSpacing:'.1em',fontSize:'.85em',borderBottom:`2px solid ${A}`,paddingBottom:3,marginBottom:6}}>{titulo}</div>
{linhas.map((x,i)=><div key={i} style={{marginBottom:5,wordBreak:'break-word'}}>{x}</div>)}</div>;

let corpoCarta:any;
switch(S){
// 1. Formal com cabeçalho
case 'formal':corpoCarta=<>
<div style={{borderBottom:`2px solid ${P}`,paddingBottom:g*.7,marginBottom:g*1.2}}>
{has(nome)&&<div style={{fontWeight:700,fontSize:'1.45em',color:P,lineHeight:1.2}}>{nome}</div>}
{has(d.role)&&<div style={{fontStyle:'italic'}}>{d.role}</div>}
{has(d.address)&&<div>{d.address}</div>}
{contactos.length>0&&<div>{contactos.join('  ·  ')}</div>}
{dados.length>0&&<div style={{fontSize:'.92em',marginTop:3}}>{dadosLinha}</div>}
</div>
{corpo({data:'right',ass:'ul',indent:true,linha:true})}</>;break;
// 2. Formal moçambicana: sem cabeçalho, identificação no texto, data junto à assinatura
case 'formal2':corpoCarta=<>
{corpo({data:'fim',ass:'ul',lead:true,linha:true,contFim:true})}</>;break;
// 3. Formal com título e blocos De / Para
case 'titulo':corpoCarta=<>
<div style={{textAlign:'center',fontWeight:700,letterSpacing:'.12em',fontSize:'1.1em',marginBottom:g*1.2}}>CARTA DE APRESENTAÇÃO</div>
<div style={{display:'flex',justifyContent:'space-between',gap:20,marginBottom:g*.8,fontSize:'.95em'}}>
<div><div style={{fontWeight:700}}>De:</div>{has(nome)&&<div>{nome}</div>}{has(d.role)&&<div style={{fontStyle:'italic'}}>{d.role}</div>}{todos.map((x,i)=><div key={i}>{x}</div>)}</div>
{dest.length>0&&<div style={{textAlign:'right'}}><div style={{fontWeight:700}}>Para:</div>{dest.map((x,i)=><div key={i}>{x}</div>)}</div>}
</div>
<div style={{borderTop:`1px solid ${A}`,marginBottom:g}}/>
{corpo({data:'right',dest:false,ass:'bold',lead:true,indent:true,linha:true})}</>;break;
// 4. Formal com moldura dupla
case 'moldura':corpoCarta=<>
<div style={{position:'absolute',left:28,right:28,top:28,bottom:28,border:`4px double ${P}`,pointerEvents:'none'}}/>
<div style={{textAlign:'center',borderBottom:`1px solid ${P}`,paddingBottom:g*.7,marginBottom:g*1.2}}>
{has(nome)&&<div style={{fontWeight:700,fontSize:'1.4em',color:P,letterSpacing:'.08em',textTransform:'uppercase'}}>{nome}</div>}
{has(d.role)&&<div style={{fontStyle:'italic'}}>{d.role}</div>}
{todos.length>0&&<div style={{fontSize:'.92em'}}>{todos.join('  ·  ')}</div>}
{dados.length>0&&<div style={{fontSize:'.88em',marginTop:2}}>{dadosLinha}</div>}
</div>
{corpo({data:'right',ass:'ul',indent:true,linha:true})}</>;break;
// 5. Nome grande e faixa de contactos
case 'faixa':corpoCarta=<>
<div style={{fontWeight:800,fontSize:'2.1em',lineHeight:1.1,textTransform:'uppercase',marginBottom:g*.5}}><span>{primeiro}</span>{resto&&<span style={{color:A}}> {resto}</span>}</div>
{has(d.role)&&<div style={{color:'#475569',marginBottom:g*.5}}>{d.role}</div>}
{todos.length>0&&<div style={{background:P,color:'#fff',padding:'7px 12px',fontSize:'.82em',fontWeight:700,marginBottom:g*.6}}>{todos.join('  |  ')}</div>}
{dados.length>0&&<div style={{fontSize:'.8em',color:'#64748b',marginBottom:g}}>{dadosLinha}</div>}
<div style={{height:g*.6}}/>
{corpo({data:'left',ass:'bold',lh:1.55})}</>;break;
// 6. Barra lateral colorida
case 'lateral':corpoCarta=<>
<div style={{position:'absolute',left:0,top:0,bottom:0,width:210,background:P,color:'#fff',padding:'56px 20px',fontSize:'.85em',lineHeight:1.45}}>
{has(nome)&&<div style={{fontWeight:800,fontSize:'1.5em',lineHeight:1.15,marginBottom:6}}>{nome}</div>}
{has(d.role)&&<div style={{color:A,fontWeight:700,marginBottom:g*1.4}}>{d.role}</div>}
{caixa('CONTACTO',todos)}{caixa('DADOS',dados)}</div>
<div style={{padding:'56px 56px 56px 254px'}}>{corpo({data:'left',ass:'cor',lh:1.55})}</div></>;break;
// 7. Topo colorido
case 'topo':corpoCarta=<>
<div style={{background:P,color:'#fff',padding:'44px 64px 26px',borderBottom:`6px solid ${A}`}}>
{has(nome)&&<div style={{fontWeight:800,fontSize:'2em',lineHeight:1.1}}>{nome}</div>}
{has(d.role)&&<div style={{color:A,fontWeight:700,marginTop:4,letterSpacing:'.04em'}}>{d.role}</div>}</div>
<div style={{padding:'20px 64px 56px'}}>
{todos.length>0&&<div style={{fontSize:'.85em',color:'#475569'}}>{todos.join('   ·   ')}</div>}
{dados.length>0&&<div style={{fontSize:'.8em',color:'#64748b',marginTop:2}}>{dadosLinha}</div>}
<div style={{height:g*1.2}}/>
{corpo({data:'left',ass:'cor',lh:1.55})}</div></>;break;
// 8. Geométrica: triângulos discretos nos cantos
case 'geo':corpoCarta=<>
<div style={{position:'absolute',right:0,top:0,width:190,height:160,background:P,clipPath:'polygon(0 0,100% 0,100% 100%)',zIndex:0}}/>
<div style={{position:'absolute',right:0,top:0,width:110,height:92,background:A,clipPath:'polygon(0 0,100% 0,100% 100%)',zIndex:0}}/>
<div style={{position:'absolute',left:0,bottom:0,width:110,height:90,background:P,opacity:.85,clipPath:'polygon(0 0,0 100%,100% 100%)',zIndex:0}}/>
<div style={{position:'relative',zIndex:1}}>
<div style={{marginRight:140,marginBottom:g*1.4}}>
{has(nome)&&<div style={{fontWeight:800,fontSize:'1.9em',color:P,lineHeight:1.1}}>{nome}</div>}
{has(d.role)&&<div style={{color:'#475569',fontWeight:600}}>{d.role}</div>}
<div style={{width:70,height:4,background:A,margin:'8px 0'}}/>
{todos.length>0&&<div style={{fontSize:'.85em',color:'#475569'}}>{todos.join('  ·  ')}</div>}
{dados.length>0&&<div style={{fontSize:'.8em',color:'#64748b',marginTop:2}}>{dadosLinha}</div>}</div>
{corpo({data:'left',ass:'bold',lh:1.55})}</div></>;break;
// 9. Monograma (iniciais num círculo, como um logótipo simples)
case 'timbre':corpoCarta=<>
<div style={{textAlign:'center',marginBottom:g*1.4}}>
{has(ini)&&<div style={{width:Math.round(62*k),height:Math.round(62*k),borderRadius:'50%',background:P,color:'#fff',margin:'0 auto 8px',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:'1.4em'}}>{ini}</div>}
{has(nome)&&<div style={{fontWeight:700,fontSize:'1.25em',letterSpacing:'.16em',textTransform:'uppercase',color:P}}>{nome}</div>}
{has(d.role)&&<div style={{color:'#64748b',fontSize:'.9em'}}>{d.role}</div>}
<div style={{width:60,height:3,background:A,margin:'8px auto'}}/>
{todos.length>0&&<div style={{fontSize:'.82em',color:'#475569'}}>{todos.join('  ·  ')}</div>}
{dados.length>0&&<div style={{fontSize:'.78em',color:'#64748b',marginTop:2}}>{dadosLinha}</div>}</div>
{corpo({data:'right',ass:'bold',lh:1.55})}</>;break;
// 10. Minimalista
case 'minimal':corpoCarta=<>
<div style={{display:'flex',justifyContent:'space-between',gap:20,alignItems:'flex-start',marginBottom:g*1.6}}>
<div>{has(nome)&&<div style={{fontWeight:600,fontSize:'1.1em',letterSpacing:'.2em',textTransform:'uppercase',color:P}}>{nome}</div>}
{has(d.role)&&<div style={{color:'#64748b',fontSize:'.88em',marginTop:2}}>{d.role}</div>}
<div style={{width:40,height:3,background:A,marginTop:8}}/></div>
<div style={{textAlign:'right',fontSize:'.8em',color:'#64748b',lineHeight:1.6}}>{todos.map((x,i)=><div key={i}>{x}</div>)}{dados.map((x,i)=><div key={'d'+i}>{x}</div>)}</div></div>
{corpo({data:'left',ass:'bold',lh:1.7})}</>;break;
// 11. Rodapé colorido com os contactos
case 'rodape':corpoCarta=<>
<div style={{marginBottom:g*1.3,paddingBottom:g*.6,borderBottom:'1px solid #cbd5e1'}}>
{has(nome)&&<div style={{fontWeight:800,fontSize:'1.9em',color:P,lineHeight:1.1}}>{nome}</div>}
{has(d.role)&&<div style={{color:'#475569',fontWeight:600}}>{d.role}</div>}
{dados.length>0&&<div style={{fontSize:'.8em',color:'#64748b',marginTop:3}}>{dadosLinha}</div>}</div>
{corpo({data:'left',ass:'cor',lh:1.55})}
{todos.length>0&&<div style={{position:'absolute',left:0,right:0,bottom:0,background:P,borderTop:`5px solid ${A}`,color:'#fff',fontSize:'.82em',padding:'11px 64px',textAlign:'center',zIndex:1}}>{todos.join('   ·   ')}</div>}</>;break;
// 12. Duas colunas: contactos e destinatário à esquerda, texto à direita
default:corpoCarta=<>
<div style={{marginBottom:g*1.2}}>
{has(primeiro)&&<div style={{fontSize:'2.3em',lineHeight:1.05,color:'#111827'}}>{primeiro}</div>}
{has(resto)&&<div style={{fontSize:'2.3em',lineHeight:1.05,color:P}}>{resto}</div>}
{has(d.role)&&<div style={{fontWeight:700,marginTop:g*.6,fontSize:'1.05em'}}>{d.role}</div>}</div>
<div style={{borderTop:`2px solid ${P}`,display:'flex',alignItems:'stretch'}}>
<div style={{width:200,flexShrink:0,paddingRight:18,paddingTop:g,textAlign:'right',fontSize:'.86em',color:'#334155',lineHeight:1.5}}>
{todos.length>0&&<div style={{marginBottom:g}}><div style={{fontWeight:700,color:P}}>Contacto</div>{todos.map((x,i)=><div key={i}>{x}</div>)}</div>}
{dados.length>0&&<div style={{marginBottom:g}}><div style={{fontWeight:700,color:P}}>Dados</div>{dados.map((x,i)=><div key={i}>{x}</div>)}</div>}
{dest.length>0&&<div style={{marginBottom:g}}><div style={{fontWeight:700,color:P}}>Destinatário</div>{dest.map((x,i)=><div key={i}>{x}</div>)}</div>}
{has(localData)&&<div><div style={{fontWeight:700,color:P}}>Data</div><div>{localData}</div></div>}</div>
<div style={{borderLeft:`2px solid ${P}`,paddingLeft:20,paddingTop:g,flex:1,minWidth:0}}>{corpo({data:'no',dest:false,ass:'bold',lh:1.55})}</div></div></>;
}
return <div style={{fontFamily:sans?SANS:undefined}}>{corpoCarta}</div>}}</Pagina>}
