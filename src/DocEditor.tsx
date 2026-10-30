import {useEffect,useState} from 'react';import {createPortal} from 'react-dom';import {Link,useSearchParams} from 'react-router-dom';
import {onAuthStateChanged,signInWithPopup,GoogleAuthProvider,User} from 'firebase/auth';
import {onSnapshot,doc,runTransaction,setDoc,serverTimestamp} from 'firebase/firestore';import {auth,db} from './firebase';
import {PRODUTOS,ADMIN_EMAIL,linkPagamentoProduto,precoTxt} from './payments';
import {ProdutoDoc,DocTpl,docTemplates,docById,DEMOS,VAZIOS,FORMS,Campo,TEXTOS_CARTA,temPlaceholders} from './registry-docs';
import CartaRender from './CartaRender';import DeclRender from './DeclRender';

// Desenha o documento certo para cada produto (função normal, não componente, para não recriar a folha a cada alteração).
const desenhar=(p:ProdutoDoc,dd:any,t:DocTpl,wm?:boolean|'p')=>p==='cartas'?<CartaRender d={dd} t={t} wm={wm}/>:<DeclRender d={dd} t={t} wm={wm}/>;

export default function DocEditor({produto}:{produto:ProdutoDoc}){
const P=PRODUTOS[produto];const preco=precoTxt(produto);const [q]=useSearchParams();
const [d,setD]=useState<any>(()=>{try{return {...DEMOS[produto],...JSON.parse(localStorage.getItem(P.rascunho)||'')}}catch{return DEMOS[produto]}});
const [tid,setTid]=useState(docById(produto,q.get('t')||'').id);
const [tab,setTab]=useState<'dados'|'modelo'|'ver'>(q.get('aba')==='modelos'?'modelo':'dados');
const [user,setUser]=useState<User|null>(null);const [msg,setMsg]=useState('');const [paid,setPaid]=useState(false);const [used,setUsed]=useState(0);
const [printClean,setPrintClean]=useState(false);const [busy,setBusy]=useState(false);
useEffect(()=>onAuthStateChanged(auth,setUser),[]);
useEffect(()=>{if(!user){setPaid(false);setUsed(0);return}
const ref=doc(db,'users',user.uid,P.colecao,P.docId);
const stopC=onSnapshot(ref,s=>{const x:any=s.data()||{};setPaid(x[P.campoPago]===true);setUsed(Number.isInteger(x.downloadsUsed)&&x.downloadsUsed>=0?x.downloadsUsed:0)},()=>{setPaid(false)});
runTransaction(db,async tx=>{const sn=await tx.get(ref);const x:any=sn.data()||{};const patch:any={};if(!Number.isInteger(x.downloadsUsed)||x.downloadsUsed<0)patch.downloadsUsed=0;if(x.downloadsLimit!==P.limite)patch.downloadsLimit=P.limite;if(Object.keys(patch).length)tx.set(ref,patch,{merge:true})}).catch(err=>console.error('Não foi possível inicializar o contador de downloads:',err));
return()=>{stopC()}},[user]);
useEffect(()=>{try{localStorage.setItem(P.rascunho,JSON.stringify(d))}catch{}},[d]);

const set=(k:string,v:any)=>setD({...d,[k]:v});const t=docById(produto,tid);
const ilimitado=user?.email?.toLowerCase()===ADMIN_EMAIL;const livre=ilimitado||(paid&&used<P.limite);const atingiu=paid&&!ilimitado&&used>=P.limite;

const entrar=async()=>{setMsg('');try{await signInWithPopup(auth,new GoogleAuthProvider())}catch(x:any){setMsg(x.code==='auth/unauthorized-domain'?'Falta autorizar este endereço no Firebase (Domínios autorizados).':x.code==='auth/popup-closed-by-user'?'Entrada cancelada.':'Não foi possível entrar com Google: '+(x.code||'erro'))}};
const save=async()=>{if(!user){setMsg('Entra na conta para guardar.');return}try{await setDoc(doc(db,'users',user.uid,P.colecao,P.docId),{...d,templateId:tid,updatedAt:serverTimestamp()},{merge:true});setMsg('Guardado.')}catch{setMsg('Erro ao guardar. Verifica o Firebase (regras publicadas).')}};
const pagar=()=>{if(!user){setMsg('Entra com a tua conta Google antes de pagar, para ligarmos o pagamento ao teu acesso.');return}window.location.href=linkPagamentoProduto(produto,user.email||'',user.uid)};
const pdf=async()=>{if(busy)return;
if(produto==='cartas'&&temPlaceholders(d)&&!window.confirm('Ainda há partes entre [ ] por preencher no texto da carta. Descarregar o PDF mesmo assim?'))return;
setBusy(true);let limpo=false;
if(user&&ilimitado){limpo=true}
else if(user&&paid){try{limpo=await runTransaction(db,async tx=>{const ref=doc(db,'users',user.uid,P.colecao,P.docId);const sn=await tx.get(ref);const x:any=sn.data()||{};const usedNow=Number.isInteger(x.downloadsUsed)&&x.downloadsUsed>=0?x.downloadsUsed:0;if(x[P.campoPago]!==true||usedNow>=P.limite)return false;tx.set(ref,{downloadsUsed:usedNow+1,downloadsLimit:P.limite},{merge:true});return true});if(!limpo)setMsg(`Atingiste os ${P.limite} downloads sem marca de água. Os próximos PDFs terão marca de água.`)}catch{setMsg('Não foi possível confirmar o download. O PDF será exportado com marca de água; tenta novamente.')}}
setPrintClean(limpo);const old=document.title;document.title=P.ficheiro+'_'+(d.name||'documento').trim().replace(/\s+/g,'_');
const fim=()=>{setPrintClean(false);document.title=old;setBusy(false)};window.addEventListener('afterprint',fim,{once:true});setTimeout(()=>{window.print()},250);setTimeout(fim,300000)};

const campo=(c:Campo)=><div key={c.k}><div className="text-sm font-semibold text-navy mb-1">{c.label}</div>
{c.tipo==='area'?<textarea rows={3} className="inp" placeholder={c.ph||c.label} value={d[c.k]||''} onChange={e=>set(c.k,e.target.value)}/>
:c.tipo==='sexo'?<select className="inp" value={d[c.k]||''} onChange={e=>set(c.k,e.target.value)}><option value="">Não indicar (escreve filho/a)</option><option value="m">Masculino</option><option value="f">Feminino</option></select>
:<input className="inp" placeholder={c.ph||c.label} value={d[c.k]||''} onChange={e=>set(c.k,e.target.value)}/>}</div>;
const lista=(k:string)=>{const it:string[]=d[k]||[];const mover=(i:number,j:number)=>{if(j<0||j>=it.length)return;const n=[...it];[n[i],n[j]]=[n[j],n[i]];set(k,n)};
return <div>{it.map((x,i)=><div key={i} className="border rounded-xl p-2 mb-2 bg-white"><div className="text-xs font-semibold text-slate-600 mb-1">Declaração {i+1}</div>
<textarea rows={2} className="inp" placeholder="Ex.: Todas as informações que prestei são verdadeiras." value={x} onChange={e=>set(k,it.map((y,j)=>j===i?e.target.value:y))}/>
<div className="flex gap-4 text-sm"><button className="text-navy" onClick={()=>mover(i,i-1)}>↑ Subir</button><button className="text-navy" onClick={()=>mover(i,i+1)}>↓ Descer</button><button className="text-red-600" onClick={()=>set(k,it.filter((_,j)=>j!==i))}>Remover</button></div></div>)}
<button className="btn-o" onClick={()=>set(k,[...it,''])}>+ Adicionar declaração</button></div>};

const scale=Math.min(1,(Math.min(window.innerWidth,900)-24)/794);
const painel=!ilimitado&&(!paid||atingiu)&&<div className="rounded-2xl border-2 border-brand bg-orange-50 p-4 text-center shadow-lg mb-3">
<div className="text-xs font-bold tracking-widest text-brand">{paid?'CONTINUA A DESCARREGAR SEM MARCA DE ÁGUA':P.chamada}</div>
<div className="text-4xl font-extrabold text-navy my-1">{preco}</div>
<div className="text-sm text-navy mb-3">{paid?`Atingiste o limite de ${P.limite} downloads sem marca de água. Paga novamente para solicitar mais acesso sem marca de água.`:<>Paga {preco} e descarrega {P.oQue} em PDF, <b>sem marca de água</b>. Inclui até {P.limite} downloads sem marca de água.</>}</div>
{user?<button className="w-full rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-extrabold text-lg py-4 shadow-xl active:scale-95" onClick={pagar}>💳 Pagar {preco} com E-Mola / M-Pesa</button>
:<button className="w-full rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-extrabold text-lg py-4 shadow-xl active:scale-95" onClick={entrar}>Entrar com Google para pagar</button>}
<div className="text-xs text-slate-600 mt-2">O pagamento é combinado por WhatsApp. Depois de confirmarmos o pagamento, o acesso será atualizado.</div></div>;

return <div className="min-h-screen bg-slate-100"><header className="bg-navy text-white flex justify-between items-center px-4 py-3"><Link to="/" className="font-bold">CV <span className="text-brand">Profissional</span></Link>{user?<span className="text-sm">{user.email}</span>:<button onClick={entrar} className="text-sm underline">Entrar</button>}</header>
<nav className="flex bg-white shadow sticky top-0 z-10">{(['dados','modelo','ver'] as const).map(x=><button key={x} onClick={()=>setTab(x)} className={`flex-1 py-3 font-semibold ${tab===x?'text-brand border-b-4 border-brand':'text-navy'}`}>{x==='dados'?'Dados':x==='modelo'?'Modelos':'Pré-visualizar'}</button>)}</nav>
<div className="p-3 max-w-3xl mx-auto">
<h1 className="font-extrabold text-navy text-xl mb-2">{P.nome}</h1>
{painel}
{paid&&!ilimitado&&!atingiu&&<p className="text-sm font-semibold text-green-700 mb-2">Acesso confirmado ✓ · Downloads sem marca de água: <b>{Math.min(used,P.limite)} de {P.limite}</b> utilizados.</p>}
{ilimitado&&<p className="text-sm text-green-700 mb-2">Acesso ilimitado a downloads sem marca de água.</p>}
{tab==='dados'&&<div>
<div className="rounded-xl bg-blue-50 border border-blue-200 p-3 mb-3 text-sm text-navy">Os dados que vês são de <b>exemplo</b>. Substitui-os pelos teus.<button className="btn-o ml-2 !py-1" onClick={()=>{if(window.confirm('Apagar os dados de exemplo e começar com os campos vazios?'))setD(VAZIOS[produto]())}}>Limpar exemplo</button></div>
{produto==='cartas'&&<div className="rounded-xl bg-white border p-3 mb-3"><h3 className="font-bold text-navy mb-1">Não sabes o que escrever?</h3><div className="text-sm text-slate-600 mb-2">Toca num texto-modelo. Ele preenche o assunto e os parágrafos (secções 5 e 6) com o teu nome, a tua profissão e a instituição. Depois edita à vontade e confirma o nome da vaga.</div><div className="grid gap-2">{TEXTOS_CARTA.map(x=><button key={x.id} className="btn-o text-left" onClick={()=>{if(window.confirm('Isto substitui o assunto, a saudação e os parágrafos atuais. Continuar?')){setD({...d,...x.gerar(d)});setMsg('Texto-modelo aplicado. Substitui o que estiver entre [ ].')}}}>{x.nome}</button>)}</div></div>}
{produto==='cartas'&&temPlaceholders(d)&&<div className="rounded-xl bg-orange-50 border border-orange-300 p-3 mb-3 text-sm text-navy">Ainda há partes entre <b>[ ]</b> por preencher. Substitui-as pelo teu texto antes de descarregar.</div>}
{FORMS[produto].map(g=><div key={g.titulo} className="rounded-xl bg-white border p-3 mb-3"><h3 className="font-bold text-navy mb-2">{g.titulo}</h3>{g.ajuda&&<div className="text-sm text-slate-600 mb-2">{g.ajuda}</div>}{g.lista?lista(g.lista):g.campos.map(campo)}</div>)}
</div>}
{tab==='modelo'&&<div className="grid grid-cols-2 sm:grid-cols-3 gap-3">{docTemplates(produto).map(x=>{const thumbScale=Math.min(0.36,Math.max(0.12,((Math.min(window.innerWidth,900)-(window.innerWidth<640?68:72))/(window.innerWidth<640?2:3))/794));return <button key={x.id} onClick={()=>{setTid(x.id);setTab('ver')}} className={`bg-white rounded-xl p-2 shadow text-left ${tid===x.id?'ring-4 ring-brand':''}`}><div style={{height:Math.round(1122*thumbScale),width:'100%',overflow:'hidden',display:'flex',justifyContent:'center',background:'#f8fafc'}}><div style={{zoom:thumbScale,flexShrink:0,transformOrigin:'top center'}}>{desenhar(produto,d,x)}</div></div><div className="text-sm font-semibold mt-2 text-navy">{x.name}</div></button>})}</div>}
{tab==='ver'&&<div><div className="shadow-lg mx-auto bg-white" style={{width:794*scale,overflow:'hidden'}}><div style={{zoom:scale}}>{desenhar(produto,d,t,!livre)}</div></div>
<div className="mt-3 grid gap-2"><button className={livre?'btn':'btn-o'} onClick={pdf}>{livre?'Descarregar PDF':'Descarregar PDF (com marca de água)'}</button>
{atingiu&&<p className="rounded-xl bg-orange-50 border border-orange-300 p-3 text-sm text-navy">Atingiste os {P.limite} downloads sem marca de água. Os próximos PDFs terão marca de água.</p>}
<button className="btn-o" onClick={save}>Guardar na minha conta</button></div></div>}
<p className="text-sm text-navy mt-3">{msg}</p></div>
{createPortal(<div id="print-area">{desenhar(produto,d,t,printClean?undefined:'p')}</div>,document.body)}</div>}