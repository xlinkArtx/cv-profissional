import {ReactNode as N,useLayoutEffect,useRef,useState} from 'react';
// Folha A4 (794 x 1122 px) usada pelas cartas e declarações.
// Faz o mesmo que o CVRender: encolhe a letra até o texto caber numa folha e,
// antes do pagamento, põe a marca de água e desfoca a metade inferior de cada página.
export const PG=1122;
const FITS=new Map<string,{k:number;pages:number}>();

export default function Pagina({sig,wm,size,min=.6,pad='64px 76px',children}:{sig:string;wm?:boolean|'p';size:number;min?:number;pad?:string;children:(k:number)=>N}){
const ref=useRef<HTMLDivElement>(null);
const cached=FITS.get(sig);
const init=()=>({sig,k:cached?cached.k:1,pages:cached?cached.pages:1,done:!!cached});
const [st,setSt]=useState(init);const [hidden,setHidden]=useState(false);
const cur=st.sig===sig?st:init();
// Quando está escondida (área de impressão), usa o ajuste já calculado na pré-visualização.
const eff=hidden&&cached?{sig,k:cached.k,pages:cached.pages,done:true}:cur;
useLayoutEffect(()=>{const el=ref.current;if(!el)return;
if(st.sig!==sig){setSt(cur);return}
const r=el.getBoundingClientRect();
if(r.width===0){if(!hidden)setHidden(true);return}
if(hidden)setHidden(false);
if(cur.done)return;
const h=r.height/(r.width/794);
if(h>PG+1&&cur.k>min+.001){setSt({...cur,k:+(cur.k-.03).toFixed(2)});return}
const n=Math.max(1,Math.ceil((h-1)/PG));
FITS.set(sig,{k:cur.k,pages:n});setSt({...cur,done:true,pages:n})});
const K=eff.k,PGS=eff.pages;
return <div ref={ref} style={{width:794,minHeight:PGS*PG,background:'#fff',fontFamily:"'Times New Roman',Times,serif",fontSize:size*K,lineHeight:1.4,color:'#111',position:'relative',overflow:'hidden',isolation:'isolate',overflowWrap:'anywhere',padding:pad}}>
{children(K)}
{wm&&<>{Array.from({length:PGS}).map((_,n)=><div key={n} style={{position:'absolute',left:0,right:0,top:(n+1)*PG-PG/2,height:PG/2,backdropFilter:'blur(6px)',WebkitBackdropFilter:'blur(6px)',background:'rgba(255,255,255,.38)',zIndex:4}}/>)}
<div style={{position:wm==='p'?'fixed':'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',pointerEvents:'none',zIndex:5}}><div style={{transform:'rotate(-30deg)',fontSize:wm==='p'?46:38,fontWeight:800,color:wm==='p'?'rgba(249,115,22,.28)':'rgba(249,115,22,.35)',textAlign:'center'}}>CV PROFISSIONAL<br/>PRÉ-VISUALIZAÇÃO</div></div></>}
</div>}