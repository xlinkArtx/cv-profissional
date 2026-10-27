// Pagamento manual por WhatsApp. O desbloqueio é feito pelo dono no Firebase (campo "paid" = true).
// PENDENTE (futuro): integração automática M-Pesa/e-Mola via Cloud Functions.
export const WHATSAPP='258877264329';
export const PRECO='250 MT';
export const linkPagamento=(email:string,uid:string)=>`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`Olá! Quero pagar ${PRECO} para desbloquear todos os modelos do CV Profissional e descarregar o meu CV sem marca de água.\nE-mail: ${email}\nCódigo: ${uid}\nComo posso pagar por e-Mola ou M-Pesa?`)}`;
export const linkMais=(email:string,uid:string,limite:number)=>`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`Olá! Já usei as minhas ${limite} exportações sem marca de água no CV Profissional e quero libertar mais.\nE-mail: ${email}\nCódigo: ${uid}`)}`;
