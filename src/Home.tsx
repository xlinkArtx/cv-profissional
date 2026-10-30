import {ReactNode as N} from 'react';import {Link} from 'react-router-dom';import {FAMILIES,TEMPLATES,Family} from './registry';import CVRender from './CVRender';import {DEMO} from './cv';
import {docTemplates,DEMOS} from './registry-docs';import CartaRender from './CartaRender';import DeclRender from './DeclRender';import {PRODUTOS} from './payments';

// Uma linha: título, "Ver todos" e miniaturas (página inteira, escala automática).
function Fila({titulo,ver,itens}:{titulo:string;ver:string;itens:{id:string;to:string;nome:string;mini:N}[]}){
return <section className="mb-7"><div className="flex justify-between items-center mb-2"><h2 className="font-bold text-navy text-xl">{titulo}</h2><Link className="text-brand font-semibold text-sm" to={ver}>Ver todos →</Link></div>
<div className="flex gap-3 overflow-x-auto pb-2">{itens.map(i=><Link key={i.id} to={i.to} className="shrink-0"><div className="shadow rounded overflow-hidden bg-white" style={{width:120,height:170}}><div style={{zoom:.151}}>{i.mini}</div></div><div className="text-xs text-slate-600 mt-1 text-center">{i.nome}</div></Link>)}</div></section>}

export default function Home(){
// CVs: o primeiro modelo de cada família.
const cvs=(Object.keys(FAMILIES) as Family[]).map(f=>TEMPLATES.find(t=>t.family===f)!).map(t=>({id:t.id,to:`/editor?t=${t.id}`,nome:t.name,mini:<CVRender cv={DEMO} t={t}/>}));
const cartas=docTemplates('cartas').map(t=>({id:t.id,to:`${PRODUTOS.cartas.rota}?t=${t.id}`,nome:t.name,mini:<CartaRender d={DEMOS.cartas} t={t}/>}));
const decls=docTemplates('declaracoes').map(t=>({id:t.id,to:`${PRODUTOS.declaracoes.rota}?t=${t.id}`,nome:t.name,mini:<DeclRender d={DEMOS.declaracoes} t={t}/>}));
return <div className="min-h-screen bg-slate-50">
<header className="bg-navy text-white flex justify-between items-center px-4 py-3"><b className="text-lg">CV <span className="text-brand">Profissional</span></b><Link to="/entrar" className="btn-o !border-white !text-white">Entrar</Link></header>
<section className="bg-navy text-white px-5 pb-10 pt-6"><h1 className="text-3xl font-extrabold">Currículos, cartas e declarações prontos em minutos</h1>
<p className="mt-2 opacity-90">Preenche os teus dados, escolhe um modelo e descarrega em PDF, direto no telemóvel.</p><Link to="/editor" className="btn mt-5">Criar currículo</Link></section>
<main className="p-4">
<Fila titulo={PRODUTOS.cvs.nome} ver="/editor" itens={cvs}/>
<Fila titulo={PRODUTOS.cartas.nome} ver={`${PRODUTOS.cartas.rota}?aba=modelos`} itens={cartas}/>
<Fila titulo={PRODUTOS.declaracoes.nome} ver={`${PRODUTOS.declaracoes.rota}?aba=modelos`} itens={decls}/>
</main>
<footer className="text-center text-sm text-slate-500 p-6">© CV Profissional · Moçambique · Pagamentos: M-Pesa e e-Mola (em breve)</footer></div>}