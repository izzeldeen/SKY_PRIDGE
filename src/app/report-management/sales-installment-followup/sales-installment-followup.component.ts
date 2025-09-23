import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {  invoiceStatues, periodTypes } from 'src/app/shared/models/enum';
import { AuthService } from 'src/app/shared/services/auth.service';
import { BaseService } from 'src/app/shared/services/base.service';
import { LanguageService } from 'src/app/shared/services/language.service';

@Component({
  selector: 'app-sales-installment-followup',
  templateUrl: './sales-installment-followup.component.html',
  styleUrls: ['./sales-installment-followup.component.scss']
})
export class SalesInstallmentFollowupComponent {
columns: any[] = [
    { name: "sales-followup-report.invoiceNumber", field: "invoiceNumber" },
    { name: "sales-followup-report.invoiceDate", field: "invoiceDate" , type:'date' },
    { name: "sales-followup-report.customer", field: "customerName" },
    { name: "sales-followup-report.dueDate", field: "dueDate" , type:'date' },
    { name: "sales-followup-report.totalAmount", field: "totalAmount"  , type:'number'},
    { name: "sales-followup-report.paidAmount", field: "paidAmount" , type:'number' },
    { name: "sales-followup-report.unPaidAmount", field: "unPaidAmount" , type:'number'},
    { name: "sales-followup-report.collectedRate", field: "collectedRate" , type:'number' },
    { name: "sales-followup-report.status", field: "statusName",  isTranslate:true }

  ];
 
warehouses:any;
sections:any;
dataSource: any[] = [];
statuses:any[]  = invoiceStatues;

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
      status:new FormControl(null)
     
    }
  )
  baseSearch = 
  {
    pageSize: 25,
    pageNumber: 0,
    invoiceDateFrom:null,
    invoiceDateTo:null,
    customerName:null,
    status:null

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
  }
  //#region Getters
  private getList () 
  {
    this.baseService.Post('Report', 'GetSalesInstallmentsFollowUpReport', this.baseSearch).subscribe
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
    if(searchFormValue.status)
      this.baseSearch.status = Number(searchFormValue.status);
      this.baseSearch.pageNumber = 0;
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








downloadReport() {
  this.baseService.generatePDF('Report', 'GetSalesInstallmentFollowUpReportePDF', this.baseSearch)
    .subscribe((blob: Blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Sales Installment Follow-Up Report.pdf'; // 👈 change the filename as needed
      a.click();
      window.URL.revokeObjectURL(url);
    }, error => {
      console.error('PDF download failed:', error);
    });
}
}
