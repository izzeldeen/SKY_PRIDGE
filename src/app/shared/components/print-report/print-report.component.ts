import { Component, Input } from '@angular/core';
import { reportTypes} from 'src/app/shared/models/enum';
import { BaseService } from '../../services/base.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-print-report',
  templateUrl: './print-report.component.html',
  styleUrls: ['./print-report.component.scss']
})
export class PrintReportComponent {
@Input() invoiceId:number;
@Input() modal:any; 
@Input() invoice:any;

reportTypes = reportTypes;
reportType:number;
lang:string;
constructor(private baseService:BaseService,
  private toastr: ToastrService,
      private translate: TranslateService
)
{
  this.lang = this.translate.currentLang

}
printReport(){
  console.log(this.invoice)
  if(this.invoice?.invoiceStatus != 'Draft') {
 this.modal.dismiss('Cross click')
this.baseService.printReport('Invoice' , 'PrintInvoiceReport/' + this.invoiceId + '/' + this.reportType + '?lang=' + this.lang);
  } else {
     this.toastr.error(
       this.translate.instant('error'),
       this.translate.instant('errors.InvalidInvoiceStatus'),
    { timeOut: 3000 })
  }
 
}


}
