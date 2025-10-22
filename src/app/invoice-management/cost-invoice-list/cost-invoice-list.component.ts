import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/shared/services/auth.service';
import { BaseService } from 'src/app/shared/services/base.service';
import { LanguageService } from 'src/app/shared/services/language.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NgxSpinnerService } from 'ngx-spinner';
import { Invoice } from 'src/app/shared/models/invoice.model';
import { CostInvoicesService } from 'src/app/shared/services/cost.service';

@Component({
  selector: 'app-cost-invoice-list',
  templateUrl: './cost-invoice-list.component.html',
  styleUrls: ['./cost-invoice-list.component.scss']
})
export class CostInvoiceListComponent {
columns: any[] = [
    { name: "Description", field: "description" },
    { name: "Amount", field: "amount" },
    { name: "Date", field: "createdAt" , type:'date' }

  ];
    actionList: any[] = [
     { name: "Delete Invoice", icon: "delete" }
  ];
  invoiceId:number;

  model:any;
allInvoices:Invoice[];
filteredList:Invoice[];
searchKeyWord:string;
warehouses:any;
modal:any;
dataSource: any[] = [];
allItems: any[] = [];
deliveryDate:any;
selectedInvoice:any;
  totalCount: number = 0
  id: number = null;
  invoice:any;
  filteredInvoices:any;
  searchInvoices:string;
  loading:boolean  = false;
  public searchForm = new FormGroup
  (
    {
      description:new FormControl(null),

    }
  )
  baseSearch = 
  {
    pageSize: 25,
    pageNumber: 0,
    description:null
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
    private costInvoiceService:CostInvoicesService ,
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


  }
  async ngOnInit()  
  {
    this.onSearch();
   
  }
  //#region Getters
private getList() {

 this.spinner.show();
  this.costInvoiceService.listInvoicesWithCount(this.searchKeyWord).subscribe(res => {
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

    onHandleAction(event) {
    switch (event.action.name) {
      case "Delete Invoice":
        {
          debugger;
            this.onDeleteInvoice(event.data);
        }
         break;
       
         
    }
  }





 

   
 

 

  onChageStatus (entity) 
  {
    this.baseService.Get('Invoice', `UpdateStatus/${entity.id}`).subscribe
    ( res => { this.getList() } )
  }


  resetSearchForm(){
      this.searchForm.reset();
       this.searchKeyWord = null;
      this.onSearch();
     }

      onAddCostInvoice(modal: any) {
    const modalRef = this.modalService.open
      (modal, { modalDialogClass: 'side-modal', backdrop: 'static', keyboard: false });
    modalRef.result.then((result) => { this.getList(); })
  }

    onViewInvoice(modal) {
        
    const modalRef = this.modalService.open
      (modal, { modalDialogClass: 'side-modal', backdrop: 'static', keyboard: false });
    modalRef.result.then((result) => { this.getList(); })
  }


  
  




getPagedData(pageNumber: number, pageSize: number) : any {
  const startIndex = pageNumber * pageSize;
  const endIndex = startIndex + pageSize;
  return this.allItems.slice(startIndex, endIndex);
}

onDeleteInvoice(data){
   
      this.spinner.show();
  this.costInvoiceService.deleteCostInvoice(data.id).then(res => {
       this.toastr.success(
       this.translate.instant( 'Invoice Deleted  Successfully'),
       this.translate.instant("Success"),
    { timeOut: 3000 }
  );
       this.spinner.hide();
  })
}

}
