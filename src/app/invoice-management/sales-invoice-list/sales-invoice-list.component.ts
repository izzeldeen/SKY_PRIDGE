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
import { InvoicesService } from 'src/app/shared/services/invoice.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { lastValueFrom } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { Invoice } from 'src/app/shared/models/invoice.model';

@Component({
  selector: 'app-sales-invoice-list',
  templateUrl: './sales-invoice-list.component.html',
  styleUrls: ['./sales-invoice-list.component.scss']
})
export class SalesInvoiceListComponent {
columns: any[] = [
    { name: "Invoice Number", field: "number" },
    { name: "Client", field: "customer" },
    { name: "Spplier", field: "supplier"  },
    { name: "Total Amount", field: "saleAmount" , type:'number' },
    { name: "Purchase Amount", field: "purchaseAmount" , type:'number'},
    { name: "Net Amount", field: "netAmount" , type:'number' },
    { name: "Employee", field: "employee"   },
    { name: "Commission %", field: "commissionPerc" , type:'number' },
    { name: "Commission", field: "commission"  , type:'number'},
    { name: "Status", field: "status" },
    { name: "Date", field: "createdAt" , type:'date' }
  ];
    actionList: any[] = [
    { name: "View", icon: "change" },
    { name: "Change Status", icon: "change" },
        { name: "Cancel Invoice", icon: "cancel" }

  ];
  @ViewChild('ChangeInvoiceStatus') changeInvoiceStatusComp:TemplateRef<any>;

  model:any;
allInvoices:Invoice[];
filteredList:Invoice[];
searchKeyWord:string;
warehouses:any;
modal:any;
sections:any;
dataSource: any[] = [];
allItems: any[] = [];
deliveryDate:any;
selectedInvoice:any;
  totalCount: number = 0
  id: number = null;
  filteredInvoices:any;
  searchInvoices:string;
  loading:boolean  = false;
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
    type:InvoiceType.SalesInvoice,
    invoiceDateFrom:null,
    invoiceDateTo:null,
    invoiceId:null,
    customerName:null
  }


  //#endregion
  constructor 
  ( 
    private modalService: NgbModal,
    public authService : AuthService,
    private baseService: BaseService,
    public languageService : LanguageService,
    private router: Router,
    private translate: TranslateService,
    private toastr: ToastrService,
    private invoiceService:InvoicesService ,
    private afAuth: AngularFireAuth, private storage: AngularFireStorage,
    private spinner: NgxSpinnerService
    
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
  async ngOnInit()  
  {
    this.onSearch();
    this.searchInvoices = this.translate.instant('sales-invoice.seasrch-invoice')
  }
  //#region Getters
private getList() {
 this.spinner.show();
  this.invoiceService.listInvoicesWithCount(this.searchKeyWord).subscribe(res => {
    debugger;
    this.allItems = res.entities;
    this.dataSource = this.getPagedData(this.baseSearch.pageNumber , this.baseSearch.pageSize);
    this.totalCount = res.totalCount;
   this.spinner.hide();
  });
}

loadPage(pageNumber: number, pageSize: number) {
 
}
  //#endregion
  //#region Actions Handler



  //#endregion
  //#region Filtering and Searching
  onSearch() {
    
 
      
      this.getList();
  }
  onPageChange (event: any): void 
  {
    this.baseSearch.pageNumber = event.PageIndex - 1;
    this.baseSearch.pageSize = event.pageSize;
    this.dataSource =  this.getPagedData(this.baseSearch.pageNumber , this.baseSearch.pageSize);
  }
  //#endregion

    onHandleAction(event , viewInvoice , changeInvoiceStatus ) {
      debugger;
    switch (event.action.name) {
       case "View":
        {
          debugger;
            this.onView(event.data , viewInvoice);
        }
         break;
            case "Change Status":
        {
          debugger;
            this.onChangeInvoiceStatus(event.data , changeInvoiceStatus);
        }
         break;
         break;
            case "Cancel Invoice":
        {
          debugger;
            this.CancelInvoiceStatus(event.data);
        }
         break;

         
    }
  }





    onEdit(data) {
    this.id = data.id;
        this.router.navigate(['invoice-management/sales-invoice/form/' + this.id]);
  }

    onView(data , modal) {
    this.model = data;
    this.onViewInvoice(modal);
  }

  submitDeliveryDate(){

    if(!this.deliveryDate){
    this.toastr.error(
       this.translate.instant('error'),
       this.translate.instant('error.deliverdateisrequired'),
    { timeOut: 3000 })
   
    return;
    }
    let form ={
      invoiceId: this.id,
      deliveryDate:this.deliveryDate ? new Date(this.deliveryDate.year, this.deliveryDate.month - 1, this.deliveryDate.day): null,
    }

    this.baseService.Post('Invoice' , 'ChangeDeliveryDate' , form).subscribe(res => {
      if(res){

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
 

      onAddSalesInvoice(modal: any) {
        debugger;
    const modalRef = this.modalService.open
      (modal, { modalDialogClass: 'side-modal', backdrop: 'static', keyboard: false });
    modalRef.result.then((result) => { this.getList(); })
  }

    onViewInvoice(modal) {
        
    const modalRef = this.modalService.open
      (modal, { modalDialogClass: 'side-modal', backdrop: 'static', keyboard: false });
    modalRef.result.then((result) => { this.getList(); })
  }


   onChangeInvoiceStatus(data , modal) {
       if(data.status == 'Settled' || data.status == 'Cancel') {
            this.toastr.error(
       this.translate.instant('error'),
       this.translate.instant('InValid Invoice Status'),
    { timeOut: 3000 })


       }else {
          this.model = data;
     this.modalService.open(this.changeInvoiceStatusComp, {
      windowClass: 'change-password-popup',
      ariaLabelledBy: 'modal-basic-title', 
      size: 'md',
      centered: true
    })
       }
      

  }

  
    
  CancelInvoiceStatus(data){
    if(data.status == 'Draft') {
      this.spinner.show();
  this.invoiceService.updateInvoiceStatus(data.id , 'Cancel').then(res => {
       this.toastr.success(
       this.translate.instant( 'Invoice Canceled  Successfully'),
       this.translate.instant("Success"),
    { timeOut: 3000 }
  );
       this.spinner.hide();
  })
    } else {
         this.toastr.error(
       this.translate.instant('error'),
       this.translate.instant('Cancellation is only allowed for Draft invoices.'),
    { timeOut: 3000 })
    }
    
}


getPagedData(pageNumber: number, pageSize: number) : any {
  const startIndex = pageNumber * pageSize;
  const endIndex = startIndex + pageSize;
  return this.allItems.slice(startIndex, endIndex);
}


}
