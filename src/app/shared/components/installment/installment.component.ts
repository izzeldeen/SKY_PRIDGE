import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Installment } from 'src/app/data/installment';
import { InstallmentStatus, installmentStatus, PaymentMethod, paymentMethods } from '../../models/enum';

@Component({
  selector: 'app-installment',
  templateUrl: './installment.component.html',
  styleUrls: ['./installment.component.scss']
})
export class InstallmentComponent  implements OnChanges {

installmentNumber:number = 1;
@Input() installments:Installment[];
@Input() invoice;
chequePaymentMethodType:PaymentMethod.Cheque;
installmentStatus= installmentStatus;
disableGenerateInstallmentButton:boolean = false;
paymentMethods:any[]  = paymentMethods;
paymentMethod?:number= null;
paymentMethodCash = PaymentMethod.Cash;



ngOnChanges(changes: SimpleChanges): void {
 
  if(this.installments?.length > 0 &&  this.installments?.every(f=> f.id > 0)){
        this.fetchInstallmentTable();
  }

  if(this.invoice?.paymentMethod > 0){
    this.paymentMethod = this.invoice.paymentMethod;
  }
}

fetchInstallmentTable(){
   this.installmentNumber = this.installments.length;
    this.installments = this.installments.map(ins => {
       const dueDate = new Date(ins.dueDate);
      ins.dueDateControl = {
  year: dueDate.getFullYear(),
  month: dueDate.getMonth() + 1,
  day: dueDate.getDate()
};
if(ins.paidDate){
  const paidDate =  new Date(ins.paidDate);
      ins.paidDateControl = {
  year: paidDate.getFullYear(),
  month: paidDate.getMonth() + 1,
  day: paidDate.getDate()
};
}
return ins;
    })
}


generateInstallments(){
  const amount =  (this.invoice.totalAmount as number / this.installmentNumber).toFixed(3);
  this.installments = [];
  for(let i = 1; i <= this.installmentNumber; i++){
    let installment = new Installment();
    installment.sequence = i;
    installment.amount = Number(amount);
    installment.status = InstallmentStatus.UnPaid;
    let dueDate = new Date(); // base date
    dueDate.setMonth(dueDate.getMonth() + 1);
    installment.dueDateControl =  {
  year: dueDate.getFullYear(),
  month: dueDate.getMonth() + i - 1,
  day: dueDate.getDate()
};
    this.installments.push(installment);
  }
}


generateCashInstallments(){
  this.disableGenerateInstallmentButton = true;
  const amount =  (this.invoice.totalAmount as number / this.installmentNumber).toFixed(3);
  this.installments = [];
    let installment = new Installment();
    installment.sequence = 1;
    installment.amount = Number(amount);
    installment.status = InstallmentStatus.Paid;
    let dueDate = new Date(); // base date
    dueDate.setMonth(dueDate.getMonth() + 1);
    let todayDate = {
  year: dueDate.getFullYear(),
  month: dueDate.getMonth() + 1 - 1,
  day: dueDate.getDate()};
    installment.dueDateControl =  todayDate;
   installment.paidDateControl =  todayDate;
  this.installments.push(installment);
  
}

onPaymentMethodChange(){
  if(this.paymentMethod == PaymentMethod.Cash && !(this.installments?.length > 0)){
    this.generateCashInstallments();
  }
}

}
