import {ReactNode as N,useLayoutEffect,useRef,useState} from 'react';
// Folha A4 (794 x 1122 px) usada pelas cartas e declarações.
// Faz o mesmo que o CVRender: encolhe a letra até o texto caber numa folha e,
// antes do pagamento, põe a marca de água e desfoca a metade inferior do conteúdo de cada página.
// A altura do conteúdo (ch) é medida para que o desfoque comece a meio do texto, mesmo quando o documento é curto.
export const PG=1122;
const FITS=new Map<string,{k:number;pages:number;ch:number}>();

export default function Pagina({sig,wm,size,min=.6,pad='64px 76px',children}:{sig:string;wm?:boolean|'p';size:number;min?:number;pad?:string;children:(k:number)=>N}){
const ref=useRef<HTMLDivElement>(null);const inner=useRef<HTMLDivElement>(null);
const cached=FITS.get(sig);
const init=()=>({sig,k:cached?cached.k:1,pages:cached?cached.pages:1,ch:cached?cached.ch:PG,done:!!cached});
const [st,setSt]=useState(init);const [hidden,setHidden]=useState(false);
const cur=st.sig===sig?st:init();
// Quando está escondida (área de impressão), usa o ajuste já calculado na pré-visualização.
const eff=hidden&&cached?{sig,k:cached.k,pages:cached.pages,ch:cached.ch,done:true}:cur;
useLayoutEffect(()=>{const el=ref.current;if(!el)return;
if(st.sig!==sig){setSt(cur);return}
const r=el.getBoundingClientRect();
if(r.width===0){if(!hidden)setHidden(true);return}
if(hidden)setHidden(false);
if(cur.done)return;
const esc=r.width/794;
const h=r.height/esc;
if(h>PG+1&&cur.k>min+.001){setSt({...cur,k:+(cur.k-.03).toFixed(2)});return}
const n=Math.max(1,Math.ceil((h-1)/PG));
const inn=inner.current;
const ch=inn?Math.min(n*PG,Math.max(120,(inn.getBoundingClientRect().bottom-r.top)/esc)):n*PG;
FITS.set(sig,{k:cur.k,pages:n,ch});setSt({...cur,done:true,pages:n,ch})});
const K=eff.k,PGS=eff.pages,CH=eff.ch;
return <div ref={ref} style={{width:794,minHeight:PGS*PG,background:'#fff',fontFamily:"'Times New Roman',Times,serif",fontSize:size*K,lineHeight:1.4,color:'#111',position:'relative',overflow:'hidden',isolation:'isolate',overflowWrap:'anywhere',padding:pad}}>
<div ref={inner} style={{display:'flow-root'}}>{children(K)}</div>
{wm&&<>{Array.from({length:PGS}).map((_,n)=>{const e=Math.min(PG,Math.max(0,CH-n*PG));if(e<=0)return null;const top=n*PG+e*.5;return <div key={n} style={{position:'absolute',left:0,right:0,top,height:(n+1)*PG-top,backdropFilter:'blur(6px)',WebkitBackdropFilter:'blur(6px)',background:'rgba(255,255,255,.38)',zIndex:4}}/>})}
<div style={{position:wm==='p'?'fixed':'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',pointerEvents:'none',zIndex:5}}><div style={{transform:'rotate(-30deg)',fontSize:wm==='p'?46:38,fontWeight:800,color:wm==='p'?'rgba(249,115,22,.28)':'rgba(249,115,22,.35)',textAlign:'center'}}>CV PROFISSIONAL<br/>PRÉ-VISUALIZAÇÃO</div></div></>}
</div>}