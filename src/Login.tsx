import {useState} from 'react';import {useNavigate} from 'react-router-dom';import {signInWithEmailAndPassword,createUserWithEmailAndPassword,sendPasswordResetEmail,signInWithPopup,GoogleAuthProvider} from 'firebase/auth';import {auth} from './firebase';
export default function Login(){const [e,setE]=useState('');const [p,setP]=useState('');const [msg,setMsg]=useState('');const [novo,setNovo]=useState(false);const [mais,setMais]=useState(false);const nav=useNavigate();
const google=async()=>{try{await signInWithPopup(auth,new GoogleAuthProvider());nav('/editor')}catch(x:any){setMsg(x.code==='auth/unauthorized-domain'?'Falta autorizar este endereço no Firebase (Domínios autorizados).':'Não foi possível entrar com Google: '+(x.code||'erro'))}};
const go=async()=>{try{novo?await createUserWithEmailAndPassword(auth,e,p):await signInWithEmailAndPassword(auth,e,p);nav('/editor')}catch(x:any){setMsg('Não foi possível entrar: '+(x.code||'erro'))}};
const rec=async()=>{try{await sendPasswordResetEmail(auth,e);setMsg('Enviámos um e-mail de recuperação.')}catch{setMsg('Escreve o teu e-mail primeiro.')}};
return <div className="max-w-sm mx-auto p-6"><h1 className="text-2xl font-bold text-navy mb-4">Entrar</h1>
<button className="btn w-full" onClick={google}>Continuar com Google</button>
<button className="text-navy underline text-sm mt-4 block" onClick={()=>setMais(!mais)}>{mais?'Esconder e-mail e palavra-passe':'Usar e-mail e palavra-passe'}</button>
{mais&&<div className="mt-3"><input className="inp" type="email" placeholder="E-mail" value={e} onChange={x=>setE(x.target.value)}/><input className="inp" type="password" placeholder="Palavra-passe (mín. 6)" value={p} onChange={x=>setP(x.target.value)}/>
<button className="btn-o w-full" onClick={go}>{novo?'Registar':'Entrar'}</button>
<button className="text-navy underline text-sm mt-3 block" onClick={()=>setNovo(!novo)}>{novo?'Já tenho conta':'Criar conta nova'}</button><button className="text-navy underline text-sm mt-2" onClick={rec}>Recuperar palavra-passe</button></div>}
<p className="text-sm text-red-600 mt-3">{msg}</p></div>}
