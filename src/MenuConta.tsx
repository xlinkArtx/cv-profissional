import {useEffect,useState} from 'react';import {Link,useLocation} from 'react-router-dom';
import {onAuthStateChanged,signOut,User} from 'firebase/auth';import {auth} from './firebase';

// Botão do cabeçalho (onde aparece a conta): escolher entre editar CV, carta ou declaração.
const ITENS=[
  {to:'/editor',nome:'Editar currículo (CV)'},
  {to:'/cartas',nome:'Editar carta de apresentação'},
  {to:'/declaracoes',nome:'Editar declaração de honra'}
];

export default function MenuConta(){
const [user,setUser]=useState<User|null>(null);const [aberto,setAberto]=useState(false);const {pathname}=useLocation();
useEffect(()=>onAuthStateChanged(auth,setUser),[]);
useEffect(()=>{setAberto(false)},[pathname]);
return <div className="relative text-sm">
<button onClick={()=>setAberto(!aberto)} aria-expanded={aberto} className="flex items-center gap-1 max-w-[220px]"><span className="truncate underline">{user?user.email:'Menu'}</span><span>▾</span></button>
{aberto&&<>
<div className="fixed inset-0 z-40" onClick={()=>setAberto(false)}/>
<div className="absolute right-0 top-full mt-2 w-64 rounded-xl bg-white text-navy shadow-xl z-50 overflow-hidden">
<div className="px-3 py-2 text-xs font-bold tracking-wide text-slate-500 border-b">O QUE QUERES EDITAR?</div>
{ITENS.map(i=><Link key={i.to} to={i.to} className={`block px-3 py-3 font-semibold border-b ${pathname===i.to?'bg-orange-50 text-brand':''}`}>{i.nome}</Link>)}
{user
?<button className="block w-full text-left px-3 py-3 text-red-600 font-semibold" onClick={()=>{signOut(auth);setAberto(false)}}>Sair da conta</button>
:<Link to="/entrar" className="block px-3 py-3 font-semibold">Entrar com Google</Link>}
</div></>}
</div>}
