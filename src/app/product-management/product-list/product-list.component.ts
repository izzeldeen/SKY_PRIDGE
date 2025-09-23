import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { productTypes, productTypesDll } from 'src/app/shared/models/enum';
import { AuthService } from 'src/app/shared/services/auth.service';
import { BaseService } from 'src/app/shared/services/base.service';
import { LanguageService } from 'src/app/shared/services/language.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
 columns: any[] = [
    { name: "product-management.code", field: "barCode" },
    { name: "product-management.nameEn", field: "nameEn" },
    { name: "product-management.nameAr", field: "nameAr" },
    { name: "product-management.purchasePrice", field: "purchasePrice" , type:'number' },
    { name: "product-management.sellPrice", field: "sellPrice"  , type:'number' },
    { name: "product-management.status", field: "isActive"  }
  ];
    actionList: any[] = [
    { name: "product-management.view-history", icon: "change", permission: "Product-Form" },
    { name: "common.edit", icon: "change", permission: "Product-Form" },
    { name: 'common.updatestatus', icon: 'change' , permission: 'Product-Form'}
  ];

dataSource: any[] = [];
  totalCount: number = 0
  id: number = null;
  types:any[]  = productTypesDll;
  
  public searchForm = new FormGroup
  (
    {
      status: new FormControl(),
      searchValue: new FormControl(),
      type:new FormControl()
    }
  )
  baseSearch = 
  {
    name: '',
    pageSize: 25,
    pageNumber: 0,
    type:null
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
    this.onSearch()
  }
  //#region Getters
  private getList () 
  {
    this.baseService.Post('Product', 'List', this.baseSearch).subscribe
    ( res => 
      {
        this.dataSource = (res as any).entities
        this.totalCount = (res as any).totalCount
      }
    )
  }
  //#endregion
  //#region Actions Handler
  onAddProduct (modal: any) 
  {
    const modalRef = this.modalService.open
    (modal, { modalDialogClass: 'side-modal', backdrop: 'static', keyboard: false });
    modalRef.result.then((result) => { this.getList(); })
  }

  //#endregion
  //#region Filtering and Searching
  onSearch() {
      let searchFormValue = this.searchForm.getRawValue();
      this.baseSearch.name =searchFormValue?.searchValue;
      if(searchFormValue?.type){
        this.baseSearch.type = searchFormValue?.type == 2 ? Number(0) : Number(searchFormValue?.type);
      }else {
        this.baseSearch.type = null;
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
      case "common.edit":
        {
           this.onEdit(event.data, modal);
        }
         break;
        case "common.updatestatus":
        {
           this.onChageStatus(event.data);
        }
        break;
         case "common.info":
        {
           this.onInfo(event.data);
        }
        break;
            case "product-management.view-history":
        {
           this.onViewProductHistory(event.data);
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
    this.baseService.Get('Product', `UpdateStatus/${entity.id}`).subscribe
    ( res => { this.getList() } )
  }

   onInfo(event) {
        this.router.navigate(['/product-management/products/' + event.id])
    }
 onViewProductHistory(event) {
        this.router.navigate(['/product-management/products/history/' + event.id])
    }
    
    resetSearchForm(){
      this.searchForm.reset();
      this.onSearch();
    }
}
