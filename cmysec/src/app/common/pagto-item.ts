export interface PagtoItem {
    type: string; // pix
    amount: number;
    date: number; // data emissão
    datePay: number; // data pagamento - 0 == not paid
    data1: string; // qrcode
    data2: string; // payload
}
