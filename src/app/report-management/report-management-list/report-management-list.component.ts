import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { invoiceStatues, SourceType, sourceTypes } from 'src/app/shared/models/enum';
import { AuthService } from 'src/app/shared/services/auth.service';
import { BaseService } from 'src/app/shared/services/base.service';
import { LanguageService } from 'src/app/shared/services/language.service';


@Component({
  selector: 'app-report-management-list',
  templateUrl: './report-management-list.component.html',
  styleUrls: ['./report-management-list.component.scss']
})
export class ReportManagementListComponent {
columns: any[] = [
    { name: "sales-invoice.invoiceNumber", field: "invoiceNumber" },
    { name: "sales-invoice.InvoiceDate", field: "invoiceDate" , type:'date' },
    { name: "sales-invoice.customerName", field: "customer" },
    { name: "sales-invoice.createdUser", field: "createdUser" },
    { name: "sales-invoice.status", field: "statusName" ,  isTranslate:true },
    { name: "sales-invoice.totalAmount", field: "totalAmount" , type:'number' }
  ];
warehouses:any;
sections:any;
dataSource: any[] = [];
invoiceStatues:any[]  = invoiceStatues;
sourceTypes:any[]  = sourceTypes;
createdUsers:any;
  totalCount: number = 0
  id: number = null;
  public searchForm = new FormGroup
  (
    {
      invoiceDateFrom:new FormControl(null),
      invoiceDateTo:new FormControl(null),
      invoiceNumber:new FormControl(null),
      customerName:new FormControl(null),
      status:new FormControl(null),
      createdById:new FormControl(null),
      warehouseId:new FormControl(null),
      branchId:new FormControl(null)
    }
  )
  baseSearch = 
  {
    pageSize: 25,
    pageNumber: 0,
    invoiceDateFrom:null,
    invoiceDateTo:null,
    customerName:null,
    status:null,
    createdById:null,
    warehouseId:null,
    branchId:null
  }
showWarehouse:boolean = false;
showBranch:boolean = false;
branchies:any;
  //#endregion
  constructor 
  ( 
    public authService : AuthService,
    private baseService: BaseService,
    public languageService : LanguageService
  ) 
  {
  //  const date = new Date();
  //   const newDate = {
  //                         year: date.getFullYear(),
  //                         month: date.getMonth() + 1, 
  //                         day: date.getDate()
  //                       }
  //   this.searchForm.get('invoiceDateFrom').setValue(newDate);
  //    this.searchForm.get('invoiceDateTo').setValue(newDate);

  }
  ngOnInit() : void 
  {
    this.onSearch();
    this.getUsersCompanies();
    this.getWarehouses();
    this.getBranchies();
  }
  //#region Getters
  private getList () 
  {
    this.baseService.Post('Report', 'GetSalesInvoiceList', this.baseSearch).subscribe
    ( res => 
      {
        this.dataSource = (res as any).entities
        this.totalCount = (res as any).totalCount
      }
    )
  }

  onSearch() {
    
    let searchFormValue = this.searchForm?.getRawValue();
    if(searchFormValue){

let pad = (n: number) => n.toString().padStart(2, '0');
   if(searchFormValue.invoiceDateFrom){
       this.baseSearch.invoiceDateFrom = `${searchFormValue.invoiceDateFrom.year}-${pad(searchFormValue.invoiceDateFrom.month)}-${pad(searchFormValue.invoiceDateFrom.day)}`;
    }
     if(searchFormValue.invoiceDateTo){
             this.baseSearch.invoiceDateTo = `${searchFormValue.invoiceDateTo.year}-${pad(searchFormValue.invoiceDateTo.month)}-${pad(searchFormValue.invoiceDateTo.day)}`;
    }

    
    }
      this.baseSearch.pageNumber = 0;
      if(searchFormValue.status)
      this.baseSearch.status = Number(searchFormValue.status);
      else 
      this.baseSearch.status = null;
     if(searchFormValue.createdById)
      this.baseSearch.createdById = Number(searchFormValue.createdById);
      else 
      this.baseSearch.createdById = null;
      if(searchFormValue.warehouseId)
      this.baseSearch.warehouseId = Number(searchFormValue.warehouseId);
      else 
      this.baseSearch.warehouseId = null;

           if(searchFormValue.branchId)
      this.baseSearch.branchId = Number(searchFormValue.branchId);
      else 
      this.baseSearch.branchId = null;


      this.baseSearch.customerName = searchFormValue.customerName;
      
      this.getList();
  }
  onPageChange (event: any): void 
  {
    this.baseSearch.pageNumber = event.PageIndex - 1;
    this.baseSearch.pageSize = event.pageSize;
    this.getList();
  }
  //#endregion

  resetSearchForm(){
      this.searchForm.reset();
      this.baseSearch.invoiceDateTo = null;
      this.baseSearch.invoiceDateFrom = null;
      this.onSearch();
     }

        filterInvoices(event: any) {
    const query = event.query.toLowerCase();
  
  }


  getUsersCompanies(){
    this.baseService.Get('Users' , 'GetCompanyUsers').subscribe(res => {
      this.createdUsers = res;
    })
  }

  onSelectSourceType(value){
   this.resetWarehouseAndBranch();
    if(value == SourceType.Warehouse){
      this.showWarehouse = true;
      this.showBranch = false;
    }else if(value == SourceType.Branch) {
      this.showWarehouse = false;
      this.showBranch = true;
    }else {
       this.showWarehouse = false;
      this.showBranch = false;
    }
    
  }

    getWarehouses(){
      this.baseService.Get('Warehouse' , 'GetAll').subscribe(res => {
        this.warehouses = res; 
      })
    }
   getBranchies(){
      this.baseService.Get('Branch' , 'GetAll').subscribe(res => {
        this.branchies = res; 
      })
    }

    resetWarehouseAndBranch(){
      this.searchForm.get('warehouseId').setValue(null);
      this.searchForm.get('branchId').setValue(null);
      this.baseSearch.branchId = null;
      this.baseSearch.warehouseId = null;
    }


downloadReport() {
  this.baseService.generatePDF('Report', 'GenerateSalesInvoicePDF', this.baseSearch)
    .subscribe((blob: Blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Sales Report.pdf'; // 👈 change the filename as needed
      a.click();
      window.URL.revokeObjectURL(url);
    }, error => {
      console.error('PDF download failed:', error);
    });
}

}


