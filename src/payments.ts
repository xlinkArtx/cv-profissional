// Pagamento manual por WhatsApp. O desbloqueio é feito pelo dono no Firebase (campo "paid" = true no CV).
// PENDENTE (futuro): integração automática M-Pesa/e-Mola via Cloud Functions.
export const WHATSAPP='258877264329';
export const linkPagamento=(email:string,uid:string,modelo:string)=>`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`Olá! Quero pagar o meu CV (modelo ${modelo}) para descarregar sem marca de água.\nE-mail: ${email}\nCódigo: ${uid}\nQual é o valor e como posso pagar por e-Mola ou M-Pesa?`)}`;
