import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClientType, InvoiceType } from 'src/app/shared/models/enum';
import { AuthService } from 'src/app/shared/services/auth.service';
import { BaseService } from 'src/app/shared/services/base.service';
import { LanguageService } from 'src/app/shared/services/language.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-purchase-pending-invoice',
  templateUrl: './purchase-pending-invoice.component.html',
  styleUrls: ['./purchase-pending-invoice.component.scss']
})
export class PurchasePendingInvoiceComponent {
columns: any[] = [
    { name: "purchase-invoice.invoiceNumber", field: "invoiceNumber" },
    { name: "purchase-invoice.InvoiceDate", field: "invoiceDate" , type:'date' },
    { name: "purchase-invoice.supplierName", field: "customerName" },
    { name: "purchase-invoice.sourceType", field: "sourceTypeName" , isTranslate:true },
    { name: "purchase-invoice.totalAmount", field: "totalAmount" , type:'number' },
    { name: "purchase-invoice.deliveryDate", field: "deliveryDate" , type:'date' },
    { name: "purchase-invoice.status", field: "invoiceStatus" ,  isTranslate:true }
  ];
    actionList: any[] = [
    { name: "purchase-invoice.view", icon: "change", permission: "Purchase-Delivery-Invoices" },
    { name: "purchase-invoice.changereceivedate", icon: "change", permission: "Purchase-Delivery-Invoices" },
    { name: "purchase-invoice.markasdreceived", icon: "change", permission: "Purchase-Delivery-Invoices" }
  ];
warehouses:any;
sections:any;
dataSource: any[] = [];
deliveryDate:any;
  totalCount: number = 0
  id: number = null;
  filteredInvoices:any;
  searchInvoices:string;
  filteredCustomers:any;
  public searchForm = new FormGroup
  (
    {
      invoiceDateFrom:new FormControl(null),
      invoiceDateTo:new FormControl(null),
      invoiceNumber:new FormControl(null),
      customerId:new FormControl(null)

    }
  )
  baseSearch = 
  {
    pageSize: 25,
    pageNumber: 0,
    type:InvoiceType.PurchaseInvoice,
    invoiceDateFrom:null,
    invoiceDateTo:null,
    invoiceId:null,
    customerId:null,
    isDelivered:false
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
    this.getSupplierSelectItemList('');
    this.onSearch();
    this.searchInvoices = this.translate.instant('sales-invoice.seasrch-invoice')

  }
  //#region Getters
  private getList () 
  {
    this.baseService.Post('Invoice', 'DeliveryDate', this.baseSearch).subscribe
    ( res => 
      {
        this.dataSource = (res as any).entities
        this.totalCount = (res as any).totalCount
      }
    )
  }
  //#endregion
  //#region Actions Handler
  onAddSalesInvoice () 
  {
    this.router.navigate(['invoice-management/sales-invoice/form']);
  }

  
  onEditInvoice (entity: any, modal: any) 
  {
    this.id = entity.id;
    this.router.navigate(['/invoice-management/sales-invoice/form/' + this.id])
  }
  //#endregion
  //#region Filtering and Searching
  onSearch() {
    
    let searchFormValue = this.searchForm?.getRawValue();
    if(searchFormValue){
    if(searchFormValue.invoiceNumber)
    this.baseSearch.invoiceId = searchFormValue.invoiceNumber.id;
    this.baseSearch.customerId = searchFormValue.customerId;
      let pad = (n: number) => n.toString().padStart(2, '0');
   if(searchFormValue.invoiceDateFrom){
        this.baseSearch.invoiceDateFrom = `${searchFormValue.invoiceDateFrom.year}-${pad(searchFormValue.invoiceDateFrom.month)}-${pad(searchFormValue.invoiceDateFrom.day)}`;
    }
     if(searchFormValue.invoiceDateTo){
              this.baseSearch.invoiceDateTo = `${searchFormValue.invoiceDateTo.year}-${pad(searchFormValue.invoiceDateTo.month)}-${pad(searchFormValue.invoiceDateTo.day)}`;
    }

    
    }
      this.baseSearch.pageNumber = 0;
      this.baseSearch.type = InvoiceType.PurchaseInvoice;
      this.baseSearch.isDelivered = false;
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
         case "common.edit":
        {
           this.onEdit(event.data);
        }
        break;
           case "purchase-invoice.changereceivedate":
        {
           this.onChangeDeliveryDate(event.data);
        }
         break;
           case "purchase-invoice.markasdreceived":
        {
           this.onMarkAsDelivered(event.data);
        }
        
        break;
        case "purchase-invoice.view":
        {
            this.onView(event.data);
        }
         break;
    }
  }


    onEdit(data) {
    this.id = data.id;
        this.router.navigate(['invoice-management/sales-invoice/form/' + this.id]);
  }

  onChangeDeliveryDate(data){
    this.id = data.id;
    this.modalService.open(this.changeDeliveryDateComp, {
      windowClass: 'change-password-popup',
      ariaLabelledBy: 'modal-basic-title', 
      size: 'md',
      centered: true
    })
    .result.then((result) => {
      console.log(result);
    }, (reason) => {
      console.log('Err!', reason);
    });
  }

  submitDeliveryDate(){

    if(!this.deliveryDate){
    this.toastr.error(
       this.translate.instant('error'),
       this.translate.instant('error.deliverdateisrequired'),
    { timeOut: 3000 })
   
    return;
    }
    let pad = (n: number) => n.toString().padStart(2, '0');
    let form ={
      invoiceId: this.id,
      deliveryDate:this.deliveryDate ? `${this.deliveryDate.year}-${pad(this.deliveryDate.month)}-${pad(this.deliveryDate.day)}`: null,
    }
    this.baseService.Post('Invoice' , 'ChangeDeliveryDate' , form).subscribe(res => {
      if(res){
      this.toastr.success(
       this.translate.instant('success'),
       this.translate.instant('purchase-invoice.receivedatechanged'),
    { timeOut: 3000 })
      }
    })
  }

    onMarkAsDelivered(data:any){
    this.id = data.id;
    this.baseService.Get('Invoice' , 'MarkAsDelivered/' +this.id).subscribe(res => {
      if(res ){
     this.toastr.success(
       this.translate.instant('success'),
       this.translate.instant('purchase-invoice.markedAsDeliverdsucess'),
    { timeOut: 3000 })
        this.onSearch();
      }  
    })
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

     onView(data) {
    this.id = data.id;
        this.router.navigate(['invoice-management/invoice/view/' + this.id + '/pending']);
  }


       getSupplierSelectItemList(query){
            this.baseService.Get('Customers' , 'GetSelectItemsList/' + ClientType.Supplier + '/?query=' + query ).subscribe(res => {
              this.filteredCustomers = res 
          })
          }
}
