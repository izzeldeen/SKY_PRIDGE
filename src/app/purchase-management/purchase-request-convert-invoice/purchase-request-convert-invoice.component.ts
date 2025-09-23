import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InvoiceType } from 'src/app/shared/models/enum';
import { AuthService } from 'src/app/shared/services/auth.service';
import { BaseService } from 'src/app/shared/services/base.service';
import { LanguageService } from 'src/app/shared/services/language.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-purchase-request-convert-invoice',
  templateUrl: './purchase-request-convert-invoice.component.html',
  styleUrls: ['./purchase-request-convert-invoice.component.scss']
})
export class PurchaseRequestConvertInvoiceComponent {
columns: any[] = [
    { name: "purchase-invoice.invoiceNumber", field: "invoiceNumber" },
    { name: "purchase-invoice.InvoiceDate", field: "invoiceDate" , type:'date' },
    { name: "purchase-invoice.supplier", field: "customerName" },
    { name: "purchase-invoice.sourceType", field: "sourceTypeName" , isTranslate:true },
    { name: "purchase-invoice.totalAmount", field: "totalAmount" , type:'number' },
    { name: "purchase-invoice.status", field: "invoiceStatus" ,  isTranslate:true }
  ];
    actionList: any[] = [
    { name: "sales-invoice.view", icon: "change", permission: "Convert-Quotation" },
    { name: "purchase-invoice.convert-purchase-request-invoice", icon: "change", permission: "Convert-Quotation" },
    { name: "purchase-invoice.cancel", icon: "change", permission: "Convert-Quotation" }
  ];
warehouses:any;
sections:any;
dataSource: any[] = [];
deliveryDate:any;
  totalCount: number = 0
  id: number = null;
  filteredInvoices:any;
  searchInvoices:string;
  public searchForm = new FormGroup
  (
    {
      invoiceDateFrom:new FormControl(null),
      invoiceDateTo:new FormControl(null),
      invoiceNumber:new FormControl(null),
      customerName:new FormControl(null)

    }
  )
  baseSearch = 
  {
    pageSize: 25,
    pageNumber: 0,
    type:InvoiceType.PurchaseRequestInvoice,
    invoiceDateFrom:null,
    invoiceDateTo:null,
    invoiceId:null,
    customerName:null,
    isConvertPage:true
  }
  @ViewChild('changeDeliveryDate') changeDeliveryDateComp:TemplateRef<any>;
  //#endregion
  constructor 
  ( 
    private modalService: NgbModal,
    public authService : AuthService,
    private baseService: BaseService,
    public languageService : LanguageService,
    private router: Router,
    private translate: TranslateService,
    private toastr: ToastrService
    
  ) 
  {
   const date = new Date();
    const newDate = {
                          year: date.getFullYear(),
                          month: date.getMonth() + 1, 
                          day: date.getDate()
                        }
    this.searchForm.get('invoiceDateFrom').setValue(newDate);
     this.searchForm.get('invoiceDateTo').setValue(newDate);

  }
  ngOnInit() : void 
  {
    this.onSearch();
    this.searchInvoices = this.translate.instant('sales-invoice.seasrch-invoice')

  }
  //#region Getters
  private getList () 
  {
    this.baseService.Post('Invoice', 'List', this.baseSearch).subscribe
    ( res => 
      {
        this.dataSource = (res as any).entities
        this.totalCount = (res as any).totalCount
      }
    )
  }
  //#endregion
  //#region Actions Handler
  onAddPurchaseRequestInvoice () 
  {
    this.router.navigate(['purchase-management/purchase-request-invoice/form']);
  }

  

  //#endregion
  //#region Filtering and Searching
  onSearch() {
    
    let searchFormValue = this.searchForm?.getRawValue();
    if(searchFormValue){
    if(searchFormValue.invoiceNumber)
    this.baseSearch.invoiceId = searchFormValue.invoiceNumber.id;
    this.baseSearch.customerName = searchFormValue.customerName;
let pad = (n: number) => n.toString().padStart(2, '0');
   if(searchFormValue.invoiceDateFrom){
       this.baseSearch.invoiceDateFrom = `${searchFormValue.invoiceDateFrom.year}-${pad(searchFormValue.invoiceDateFrom.month)}-${pad(searchFormValue.invoiceDateFrom.day)}`;
    }
     if(searchFormValue.invoiceDateTo){
             this.baseSearch.invoiceDateTo = `${searchFormValue.invoiceDateTo.year}-${pad(searchFormValue.invoiceDateTo.month)}-${pad(searchFormValue.invoiceDateTo.day)}`;
    }

    
    }
      this.baseSearch.pageNumber = 0;
      this.baseSearch.type = InvoiceType.PurchaseRequestInvoice;
      this.baseSearch.isConvertPage = true;
      this.getList();
  }
  onPageChange (event: any): void 
  {
    this.baseSearch.pageNumber = event.PageIndex - 1;
    this.baseSearch.pageSize = event.pageSize;
    this.getList();
  }
  //#endregion

    onHandleAction(event) {
    switch (event.action.name) {
         case "purchase-invoice.convert-purchase-request-invoice":
        {
           this.onConvertPurchaseRequest(event.data);
        }
        break;
         case "sales-invoice.view":
        {
            this.onView(event.data);
        }
         break;
            case "purchase-invoice.cancel":
        {
            this.onCancelInvoice(event.data);
        }
         break;
    }
  }



    onView(data) {
        this.id = data.id;
        this.router.navigate(['invoice-management/invoice/view/' + this.id]);
  }


 

  onChageStatus (entity) 
  {
    this.baseService.Get('Invoice', `UpdateStatus/${entity.id}`).subscribe
    ( res => { this.getList() } )
  }


  resetSearchForm(){
      this.searchForm.reset();
      this.baseSearch.invoiceDateTo = null;
      this.baseSearch.invoiceDateFrom = null;
      this.baseSearch.invoiceId = null;
      this.onSearch();
     }

        filterInvoices(event: any) {
    const query = event.query.toLowerCase();
    this.getSelectItemList(query);
  
  }

    getSelectItemList(query){
      this.baseService.Get('Invoice' , 'GetSelectItemsList?query=' + query ).subscribe(res => {
        this.filteredInvoices = res 
    })
    }

    onCancelInvoice(data){
      this.id = data.id;
      this.baseService.Post('Invoice' , 'CancelInvoice' , this.id).subscribe(res => {
          this.toastr.success(
       this.translate.instant('success'),
       this.translate.instant('sales-invoice.cancelInvoice'),
    { timeOut: 3000 })
    this.onSearch();
      })
    }

    


      onConvertPurchaseRequest(data){
      this.id = data.id;
      this.baseService.Post('Invoice' , 'ConvertToInvoice' , this.id).subscribe(id => {
         this.router.navigate(['purchase-management/purchase-invoice/form/' + id]);
          this.toastr.success(
       this.translate.instant('success'),
       this.translate.instant('purchase-invoice.convertedsuccess'),
    { timeOut: 3000 })
    this.onSearch();
      })
    }
}
