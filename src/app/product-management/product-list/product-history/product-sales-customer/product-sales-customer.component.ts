import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { BaseService } from 'src/app/shared/services/base.service';
import { LanguageService } from 'src/app/shared/services/language.service';

@Component({
  selector: 'app-product-sales-customer',
  templateUrl: './product-sales-customer.component.html',
  styleUrls: ['./product-sales-customer.component.scss']
})
export class ProductSalesCustomerComponent {
columns: any[] = [
    { name: "product-history.customerName", field: "customerName" },
    { name: "product-history.soldQuantity", field: "soldQuantity" , type:'number'  },
    { name: "product-history.minSoldPrice", field: "minSoldPrice" , type:'currency' },
    { name: "product-history.maxSoldPrice", field: "maxSoldPrice" , type:'currency'},
    { name: "product-history.avgSoldPrice", field: "avgSoldPrice" , type:'currency' }

  ];
 
dataSource: any[] = [];
createdUsers:any;
  totalCount: number = 0
  id: number = null;
   
  public searchForm = new FormGroup
  (
    {
      invoiceDateFrom:new FormControl(null),
      invoiceDateTo:new FormControl(null),
      customerId:new FormControl(null)
    }
  )
  baseSearch = 
  {
    pageSize: 25,
    pageNumber: 0,
    invoiceDateFrom:null,
    invoiceDateTo:null,
    productId:0

  }
showWarehouse:boolean = false;
showBranch:boolean = false;
branchies:any;
@Input()  productId:any;
  //#endregion
  constructor 
  ( 
    public authService : AuthService,
    private baseService: BaseService,
    public languageService : LanguageService,
    private route:ActivatedRoute
  ) 
  {

  }
  ngOnInit() : void 
  {
     this.route.params.subscribe((params) => {
      this.productId = params["id"];
      this.onSearch();
    });
  }
  //#region Getters
  private getList () 
  {
    this.baseService.Post('Product', 'GetSalesProductByCustomer', this.baseSearch).subscribe
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
      this.baseSearch.productId =this.productId;
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


}
