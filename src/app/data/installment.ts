export class Installment {
    id:number;
    invoiceId:number;
    sequence:number;
    dueDate:any;
    amount:number;
    status:number;
    paidDate:any;
    chequeNumber:string;
    paidDateControl?:any;
    dueDateControl?:any;
}