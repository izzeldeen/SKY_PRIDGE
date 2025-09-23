import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SelectItem } from 'src/app/data/select-item';
import { BaseService } from 'src/app/shared/services/base.service';
import { DirectionService } from 'src/app/shared/services/change-language.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-warehouse-balance-list',
  templateUrl: './warehouse-balance-list.component.html',
  styleUrls: ['./warehouse-balance-list.component.scss']
})
export class WarehouseBalanceListComponent {
 columns: any[] = [
    { name: "warehouse-balance.warehouse", field: "warehouseName" },
    { name: "warehouse-balance.section", field: "sectionName" },
    { name: "warehouse-balance.branch", field: "branchName" },
    { name: "warehouse-balance.product", field: "productName" },
    { name: "warehouse-balance.balance", field: "balance" , type:'number' },
    { name: "warehouse-balance.reserved", field: "reserved" , type:'number' },
    
  ];
  locale:string;
    actionList: any[] = [];
    searchProduct:string;
products:any[];
branchies:any[];
sections:any;
warehouses:any;
dataSource: any[] = [];
filteredProducts:SelectItem[];
  totalCount: number = 0
  id: number = null
  public searchForm = new FormGroup
  (
    {
      warehouseId:new FormControl(null),
      branchId:new FormControl(null),
      productId:new FormControl(null),
      sectionId:new FormControl(null),
      product:new FormControl(null)
    }
  )
  baseSearch = 
  {
    warehouseId: null,
    branchId:null,
    productId:null,
    sectionId:null,
    pageSize: 25,
    pageNumber: 0,
  }
  //#endregion
  constructor 
  ( 
    private baseService: BaseService,
    public directionService: DirectionService,
    private translate: TranslateService
  ) 
  {}
  ngOnInit() : void 
  {
    this.getList()
    this.onSearch()
    this.getProducts();
    this.getWarehouseSections();
    this.locale =  this.directionService.getCurrentLanguage();
    this.searchProduct = this.translate.instant('transaction.seasrch-product')

  }
  //#region Getters
  private getList () 
  {
    this.baseService.Post('WarehouseBalance', 'List', this.baseSearch).subscribe
    ( res => 
      {
        this.dataSource = (res as any).entities
        this.totalCount = (res as any).totalCount
      }
    )
    
  }
  //#endregion
  //#region Actions Handler
 
  //#endregion
  //#region Filtering and Searching
  onSearch() {
    let form = this.searchForm.getRawValue();
    if(form){
      this.baseSearch.branchId = form.branchId;
      this.baseSearch.warehouseId = form.warehouseId;
      this.baseSearch.sectionId = form.sectionId;
      if(form.product){
      this.baseSearch.productId = form.product.id;
      }
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

 
      onHandleAction(event) {
    switch (event.action.name) {
      case "common.edit":
        {
           
        }
         break;
        case "common.updatestatus":
        {
        }
        break;
         case "common.info":
        {
        }
        break;
    }
  }


  getProducts(){
    this.baseService.Get('Product' , 'GetAll').subscribe(res => {
      this.products = res as any[];;
    })
  }

  getBranchies(){
    this.baseService.Get('Branch' , 'GetAll').subscribe(res => {
      this.branchies = res as any[];
    })
  }


    getWarehouses(){
      this.baseService.Get('Warehouse' , 'GetAll').subscribe(res => {
        this.warehouses = res; 
      })
    }

  getWarehouseSections(){
this.baseService.Get('WarehouseSections' , 'GetWarehouseSectionsByLoggedInUser').subscribe(res => {
  this.sections = res;
})}

     resetSearchForm(){
      this.searchForm.reset();
      this.onSearch();
     }

      filterProducts(event: any) {
         const query = event.query.toLowerCase();
         this.getSelectItemList(query);
         // this.filteredProducts = this.products.filter(product =>
         //   product.name.toLowerCase().includes(query)
         // );
       }
     
       getSelectItemList(query){
         
         this.baseService.Get('Product' , 'GetSelectItemsList?query=' + query ).subscribe(res => {
           this.filteredProducts = res as SelectItem[];
         })
       }


      
}
