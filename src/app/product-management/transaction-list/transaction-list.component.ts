import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { transactionTypes } from 'src/app/shared/models/enum';
import { AuthService } from 'src/app/shared/services/auth.service';
import { BaseService } from 'src/app/shared/services/base.service';
import { LanguageService } from 'src/app/shared/services/language.service';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent {
 columns: any[] = [
    { name: "transaction.type", field: "type" , isTranslate:true },
    { name: "transaction.warehouse", field: "warehouseName" },
    { name: "transaction.section", field: "sectionName" },
    { name: "transaction.branch", field: "branchName" },
    { name: "transaction.towarehouse", field: "toWarehouseName" },
    { name: "transaction.tosection", field: "toSectionName" },
    { name: "transaction.tobranch", field: "toBranchName" },
    { name: "transaction.CreationDate", field: "creationDate" , type:'date' },

    
  ];
    actionList: any[] = [
    { name: "common.info", icon: "change", permission: "Transaction-list" },
  ];
warehouses:any;
sections:any;
types:any[]  = transactionTypes;
dataSource: any[] = [];
  totalCount: number = 0
  id: number = null
  public searchForm = new FormGroup
  (
    {
      status: new FormControl(),
      searchValue: new FormControl(),
      warehouseId:new FormControl(null),
      warehouseSectionId:new FormControl(null),
      type:new FormControl(null),
      transactionDateFrom:new FormControl(null),
      transactionDateTo:new FormControl(null),

    }
  )
  baseSearch = 
  {
    pageSize: 25,
    pageNumber: 0,
    warehouseId:null,
    warehouseSectionId:null,
    type:null,
    transactionDateFrom:null,
    transactionDateTo:null,
  }
  //#endregion
  constructor 
  ( 
    private modalService: NgbModal,
    public authService : AuthService,
    private baseService: BaseService,
    public languageService : LanguageService,
    private router: Router
  ) 
  {}
  ngOnInit() : void 
  {
    this.getList()
    this.onSearch();
    // this.getWarehouses();
  }
  //#region Getters
  private getList () 
  {
    this.baseService.Post('Transaction', 'List', this.baseSearch).subscribe
    ( res => 
      {
        this.dataSource = (res as any).entities
        this.totalCount = (res as any).totalCount
      }
    )
  }
  //#endregion
  //#region Actions Handler
  onAddTransaction (modal: any) 
  {
    const modalRef = this.modalService.open
    (modal, { modalDialogClass: 'side-modal', backdrop: 'static', keyboard: false });
    modalRef.result.then((result) => { this.getList(); })
  }

  
  onEditTransaction (entity: any, modal: any) 
  {
    this.id = entity.id;
    const modalRef = this.modalService.open
    (modal, { modalDialogClass: 'side-modal', backdrop: 'static', keyboard: false });
    modalRef.result.then((result) => { this.getList(); });
  }
  //#endregion
  //#region Filtering and Searching
  onSearch() {
    let searchFormValue = this.searchForm?.getRawValue();
    let pad = (n: number) => n.toString().padStart(2, '0');
      if(searchFormValue.transactionDateFrom){
           this.baseSearch.transactionDateFrom = `${searchFormValue.transactionDateFrom.year}-${pad(searchFormValue.transactionDateFrom.month)}-${pad(searchFormValue.transactionDateFrom.day)}`;
    }
     if(searchFormValue.transactionDateTo){
           this.baseSearch.transactionDateTo = `${searchFormValue.transactionDateTo.year}-${pad(searchFormValue.transactionDateTo.month)}-${pad(searchFormValue.transactionDateTo.day)}`;
    }

    if(searchFormValue){
    this.baseSearch.type = searchFormValue.type;
    this.baseSearch.warehouseId = searchFormValue.warehouseId;
    this.baseSearch.warehouseSectionId = searchFormValue.warehouseSectionId;
    }
      this.baseSearch.pageNumber = 0;
      this.getList();
  }
  onPageChange (event: any): void 
  {
    this.baseSearch.pageNumber = event.PageIndex - 1;
    this.baseSearch.pageSize = event.pageSize;
    this.getList();
  }
  //#endregion

    onHandleAction(event, modal) {
    switch (event.action.name) {
         case "common.info":
        {
           this.onInfo(event.data);
        }
        break;
    }
  }


    onEdit(data, modal) {
    this.id = data.id;
    const modalRef = this.modalService.open(modal, {
      modalDialogClass: "side-modal",
      backdrop: "static",
      keyboard: false,
    });
    modalRef.result.then((result) => {
      this.getList();
    });
  }


  onChageStatus (entity) 
  {
    this.baseService.Get('Transaction', `UpdateStatus/${entity.id}`).subscribe
    ( res => { this.getList() } )
  }

   onInfo(event) {
        this.router.navigate(['/product-management/transaction/' + event.id])
    }

    //   getWarehouses(){
    //   this.baseService.Get('Warehouse' , 'GetAll').subscribe(res => {
    //     this.warehouses = res; 
    //   })
    // }

//     onWarehouseChange(warehouseId:number){
//    this.getWarehouseSections(warehouseId);
//     }
//     getWarehouseSections(warehouseId:number){
//       if(warehouseId > 0){
// this.baseService.Get('WarehouseSections' , 'GetSectionsByWarehouseId/' + warehouseId ).subscribe(res => {
//   this.sections = res;
// })}}

  resetSearchForm(){
      this.searchForm.reset();
      this.onSearch();
     }
   
}
