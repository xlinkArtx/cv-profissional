import {createRoot} from 'react-dom/client';import {BrowserRouter,Routes,Route} from 'react-router-dom';
import './index.css';import Home from './Home';import Login from './Login';import Editor from './Editor';
createRoot(document.getElementById('root')!).render(<BrowserRouter><Routes><Route path="/" element={<Home/>}/><Route path="/entrar" element={<Login/>}/><Route path="/editor" element={<Editor/>}/></Routes></BrowserRouter>);
