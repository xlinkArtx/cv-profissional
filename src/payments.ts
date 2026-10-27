// Pagamento manual por WhatsApp.
export const WHATSAPP='258877264329';
export const PRECO='250 MT';

const mensagemPagamento=(email:string,uid:string)=>`Olá! Quero pagar ${PRECO} para ter acesso a todos os modelos do CV Profissional.\nE-mail: ${email}\nCódigo: ${uid}\nComo faço para pagar com e-Mola ou M-Pesa?`;

export const linkPagamento=(email:string,uid:string)=>`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(mensagemPagamento(email,uid))}`;

// Mantém compatibilidade com o botão existente no Editor.
export const linkMais=(email:string,uid:string,_limite?:number)=>`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(mensagemPagamento(email,uid))}`;
