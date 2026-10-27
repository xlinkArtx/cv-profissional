// Pagamento manual por WhatsApp.
export const WHATSAPP='258877264329';
export const PRECO='250 MT';
export const linkPagamento=(email:string,uid:string)=>`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`Olá! Quero pagar ${PRECO} para desbloquear todos os modelos do CV Profissional e descarregar o meu CV sem marca de água.\nE-mail: ${email}\nCódigo: ${uid}\nComo posso pagar por e-Mola ou M-Pesa?`)}`;
export const linkMais=(email:string,uid:string,_limite?:number)=>`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`Olá! Preciso de ajuda com a exportação do meu CV Profissional.\nE-mail: ${email}\nCódigo: ${uid}\nObrigado(a)!`)}`;
