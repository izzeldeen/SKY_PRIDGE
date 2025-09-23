import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { invoiceStatues, StatusArr } from 'src/app/shared/models/enum';
import { Invoice } from 'src/app/shared/models/invoice.model';
import { BaseService } from 'src/app/shared/services/base.service';
import { EmployeeService } from 'src/app/shared/services/employee.service';
import { InvoicesService } from 'src/app/shared/services/invoice.service';

@Component({
  selector: 'app-change-invoice-status',
  templateUrl: './change-invoice-status.component.html',
  styleUrls: ['./change-invoice-status.component.scss']
})
export class ChangeInvoiceStatusComponent {
@Input() invoice:any;
@Input() modal:any; 
status:any;
invoiceStatus = StatusArr.filter(x=> x.id != 'Draft');
lang:string;
constructor(private baseService:BaseService,
  private toastr: ToastrService,
      private translate: TranslateService,
     private  invoicesService:InvoicesService,
     private employeeService:EmployeeService
)
{
  this.lang = this.translate.currentLang

}
changeInvoiceStatus(){
  this.invoicesService.updateInvoiceStatus(this.invoice.id , this.status).then(res => {
       this.toastr.success(
       this.translate.instant( 'Status Changes Successfully'),
       this.translate.instant("Success"),
    { timeOut: 3000 }
  );
  if(this.status == 'Settled') {
      this.employeeService.addCommissionOnInvoiceSettled(this.invoice.employeeId , this.invoice.commission).then(res => {
    console.log('Commission Updated');
  })
  }

  })
}


}
