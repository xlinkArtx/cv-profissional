import {doc,setDoc,serverTimestamp} from 'firebase/firestore';import {db} from './firebase';import {CV} from './cv';
// Guarda apenas conteúdo do CV. O estado de pagamento NUNCA é escrito pelo cliente (será feito por Cloud Functions).
export const saveCV=(uid:string,cvId:string,cv:CV,templateId:string)=>setDoc(doc(db,'users',uid,'cvs',cvId),{...cv,templateId,updatedAt:serverTimestamp()},{merge:true});
