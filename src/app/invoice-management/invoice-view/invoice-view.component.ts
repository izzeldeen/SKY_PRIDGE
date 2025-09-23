import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Installment } from 'src/app/data/installment';
import { ProductLineItem } from 'src/app/data/product-line-item';
import { InvoiceType } from 'src/app/shared/models/enum';
import { BaseService } from 'src/app/shared/services/base.service';

@Component({
  selector: 'app-invoice-view',
  templateUrl: './invoice-view.component.html',
  styleUrls: ['./invoice-view.component.scss']
})
export class InvoiceViewComponent implements OnChanges {
entity:any;
id:number;
@Input() invoiceId:number;
products:ProductLineItem[];
installments:Installment[];
hideQuotationValues:boolean = false;
isPurchase:boolean;
isNotDeliveredPage:boolean = false;
invoicePage:boolean = true;
lang:string;
  constructor
      (
        private route:ActivatedRoute,
        private baseService: BaseService,
        private toastr: ToastrService,
        private translate: TranslateService,
      private router:Router)
      {
        
             this.route.params.subscribe((params) => {
      this.id = params["id"];
      if(this.id){
      this.GetById();
      this.getProductLineItems(this.id);
      this.getInvoiceInstallments(this.id);
      let type = params["type"];
      if(type == 'pending'){
        this.isNotDeliveredPage = true;
       }
      }
   
    });
 this.lang = this.translate.currentLang
      }
  ngOnChanges(changes: SimpleChanges): void {
    if(this.invoiceId){
      this.id = this.invoiceId;
      this.invoicePage = false;
      this.GetById();
      this.getProductLineItems(this.id);
      this.getInvoiceInstallments(this.id);
    }
  }
      private GetById() {
    this.baseService.Get('Invoice', `View/${this.id}`).subscribe
      (res => {
        this.entity = res;
        //Quotation & Purchase Request
        if(this.entity.type == 3 || this.entity.type == 4){
          this.hideQuotationValues = true;
        }
        this.isPurchase = this.entity.type == InvoiceType.PurchaseInvoice || this.entity.type == InvoiceType.PurchaseRequestInvoice;
      })
    }

      getProductLineItems(invoiceid:number){
        this.baseService.Get('Invoice' , 'GetProductLineItems/' + invoiceid).subscribe(res => {
          if(res){
          this.products = res as ProductLineItem[];
          }
        })
      }

         getInvoiceInstallments(invoiceid:number){
          this.baseService.Get('Invoice' , 'GetInvoiceInstallments/' + invoiceid).subscribe(res => {
            this.installments = res as Installment[];
          })
        }

        navigate(){
          if(this.isNotDeliveredPage) {
             if(this.entity.type == InvoiceType.SalesInvoice){
              this.router.navigate(['/invoice-management/sales-invoice/pending-delivery-invoices'])
             } else  {
               this.router.navigate(['/purchase-management/purchase-invoice/pending'])
             }
          }else {
             switch(this.entity.type){
            case InvoiceType.QuotationInvoice:
            this.router.navigate(['/invoice-management/quotation'])
            break;
             case InvoiceType.SalesInvoice:
            this.router.navigate(['/invoice-management/sales-invoice'])
            break;
             case InvoiceType.PurchaseRequestInvoice:
            this.router.navigate(['/purchase-management/purchase-request-invoice'])
            break;
             default:
            this.router.navigate(['/purchase-management/purchase-invoice'])
            break;
          }
          }
         
        }

          onSubmitInvoice(printReport){
            let actionName = ''
     switch(this.entity.type)
    {
             case InvoiceType.QuotationInvoice:
             actionName =  'SubmitQuotation';
            break;
             case InvoiceType.SalesInvoice:
            actionName =  'SubmitInvoice';
            break;
             case InvoiceType.PurchaseRequestInvoice:
           actionName =  'SubmitPurchaseInvoice';
            break;
             default:
            actionName =  'SubmitPurchaseInvoice';
            break;
    }
    this.submitInvoice(actionName , printReport);
  
  }

  submitInvoice(actionName , printReport){
       this.baseService.Post('Invoice' , actionName , this.id).subscribe(res => {
       this.toastr.success(
       this.translate.instant('success'),
       this.translate.instant('sales-invoice.invoiceSubmitted'),
    { timeOut: 3000 })
    if(printReport){
      setTimeout(() => this.navigate(), 2000 )
    }else {
      this.navigate()
    }
    if(printReport){
      this.printReport(true);
    }
    })
  }

  

  printReport(printReport){
  if(this.entity?.statusName != 'Draft' || printReport) {
this.baseService.printReport('Invoice' , 'PrintInvoiceReport/' + this.id + '/' + 1 + '?lang=' + this.lang);
  } else {
     this.toastr.error(
       this.translate.instant('error'),
       this.translate.instant('errors.InvalidInvoiceStatus'),
    { timeOut: 3000 })
  }
 
}


  
}
