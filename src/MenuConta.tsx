import {useEffect,useState} from 'react';import {Link,useLocation} from 'react-router-dom';
import {onAuthStateChanged,signOut,User} from 'firebase/auth';import {auth} from './firebase';

// O botão "Mais" abre as opções para criar CV, carta e declaração.
const ITENS=[
  {to:'/editor',nome:'Criar currículo (CV)'},
  {to:'/cartas',nome:'Criar carta de apresentação'},
  {to:'/declaracoes',nome:'Criar declaração de honra'}
];

export default function MenuConta(){
const [user,setUser]=useState<User|null>(null);const [aberto,setAberto]=useState(false);const {pathname}=useLocation();
useEffect(()=>onAuthStateChanged(auth,setUser),[]);
useEffect(()=>{setAberto(false)},[pathname]);
return <div className="relative flex flex-col items-end text-right">
<button type="button" onClick={()=>setAberto(!aberto)} aria-expanded={aberto} aria-haspopup="true" className="flex items-center gap-2 rounded-lg bg-brand px-4 py-2 text-sm font-bold text-white shadow-sm hover:opacity-90">
<span>Mais</span><span aria-hidden="true">{aberto?'▴':'▾'}</span>
</button>
{user?.email&&<span className="mt-1 max-w-[150px] truncate text-[9px] leading-tight text-white/70">{user.email}</span>}
{aberto&&<>
<div className="fixed inset-0 z-40" onClick={()=>setAberto(false)}/>
<div className="absolute right-0 top-full mt-2 w-64 rounded-xl bg-white text-navy shadow-xl z-50 overflow-hidden">
<div className="px-3 py-2 text-xs font-bold tracking-wide text-slate-500 border-b">O QUE QUERES CRIAR?</div>
{ITENS.map(i=><Link key={i.to} to={i.to} className={`block px-3 py-3 font-semibold border-b hover:bg-orange-50 ${pathname===i.to?'bg-orange-50 text-brand':''}`}>{i.nome}</Link>)}
{user
?<button className="block w-full text-left px-3 py-3 text-red-600 font-semibold" onClick={()=>{signOut(auth);setAberto(false)}}>Sair da conta</button>
:<Link to="/entrar" className="block px-3 py-3 font-semibold">Entrar com Google</Link>}
</div></>}
</div>}
