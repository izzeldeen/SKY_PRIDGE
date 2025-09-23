import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {  periodTypes } from 'src/app/shared/models/enum';
import { AuthService } from 'src/app/shared/services/auth.service';
import { BaseService } from 'src/app/shared/services/base.service';
import { LanguageService } from 'src/app/shared/services/language.service';

@Component({
  selector: 'app-purchase-period-report',
  templateUrl: './purchase-period-report.component.html',
  styleUrls: ['./purchase-period-report.component.scss']
})
export class PurchasePeriodReportComponent {
columns: any[] = [
    { name: "sales-period-report.period", field: "period" },
    { name: "sales-period-report.invoicesCount", field: "invoicesCount" , type:'number' },
    { name: "purchase-period-report.purchase-total-amount", field: "totalAmount"  , type:'number'},
    { name: "sales-period-report.maxInvoiceAmount", field: "maxInvoiceAmount" , type:'number' },
    { name: "sales-period-report.minInvoiceAmount", field: "minInvoiceAmount" , type:'number'},
    { name: "sales-period-report.avgInvoiceAmount", field: "avgInvoiceAmount" , type:'number' }
  ];
 
warehouses:any;
sections:any;
dataSource: any[] = [];
periods:any[]  = periodTypes;

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
      period:new FormControl(0),
     
    }
  )
  baseSearch = 
  {
    pageSize: 25,
    pageNumber: 0,
    invoiceDateFrom:null,
    invoiceDateTo:null,
    period:0

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
    this.baseService.Post('Report', 'GetPurchasePeriodReport', this.baseSearch).subscribe
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
      this.baseSearch.period = Number(searchFormValue.period);
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
  this.baseService.generatePDF('Report', 'GeneratePurchasePeriodInvoicePDF', this.baseSearch)
    .subscribe((blob: Blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Purchase Period Report.pdf'; // 👈 change the filename as needed
      a.click();
      window.URL.revokeObjectURL(url);
    }, error => {
      console.error('PDF download failed:', error);
    });
}
}
