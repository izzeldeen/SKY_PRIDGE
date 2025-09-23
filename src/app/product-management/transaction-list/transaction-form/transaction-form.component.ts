import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { OverlayContainer, ToastrService } from 'ngx-toastr';
import { SelectItem } from 'src/app/data/select-item';

import { ClientType, TransactionTypes, transactionTypes } from 'src/app/shared/models/enum';
import { AuthService } from 'src/app/shared/services/auth.service';
import { BaseService } from 'src/app/shared/services/base.service';
import { LanguageService } from 'src/app/shared/services/language.service';


@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss']
})
export class TransactionFormComponent {
  isEnglish:boolean;
 isFormSubmitted:boolean = false;
  logoFile:any;
  currencies:any[];
  transactionItems:any[] = [
  ];

  transferType = TransactionTypes.Transfer;
  exportToBranchType = TransactionTypes.ExportToBranch;
  recivingType = TransactionTypes.Reciving;
  issueanceType = TransactionTypes.Issueance;
  type:number;

    @Input() modal: any = null
    @Input() isEditMood: boolean = false
    @Input() id: number
    private entity: any = null;
   warehouses:any;
   toWarehouses:any;
   sections:any;
   toSections:any;
   types:any[]  = transactionTypes;
   branchies:any;
   customers:any;
   products:any;
  steps = [];
  activeIndex: number = 0;
filteredProducts:any;
filteredCustomers:any;
searchProduct:string;
searchCustomer:string;
    form = new FormGroup
    (
      {
        id: new FormControl(0),
        orderId : new FormControl(null),
        type: new FormControl(null, [Validators.required]),
        customerId: new FormControl(null ),
        warehouseId:new FormControl(null),
        warehouseSectionId:new FormControl(null),
        toWarehouseId: new FormControl(null),
        toSectionId:new FormControl(null),
        toBranchId:new FormControl(null),
        notes:new FormControl(null),
        transactionProducts:new FormControl()
      }
    );
    //#endregion
    constructor
    (
      private baseService: BaseService,
      private languageService: LanguageService,
      public authSerivce: AuthService,
      private overlay: OverlayContainer,
      private toastr: ToastrService,
      private translate: TranslateService
    ) 
    {
       
    }
    ngOnInit (): void 
    {
            this.steps = [
    { label: this.translate.instant('transaction.transaction'), command: () => (this.activeIndex = 0) },
    { label: this.translate.instant('transaction.transactionitems'), command: () => (this.activeIndex = 1) }
      ]

      if (this.isEditMood && this.id) 
        this.GetById()
      else {
        this.transactionItems = [
  {index: 0 ,productId:0 , orderedQuantity: 0 , quantity:0}
  ];
      }
      this.getProducts();
      this.getWarehouses();
      this.searchProduct = this.translate.instant('transaction.seasrch-product')
    }
    //#region Functions
    resetForm () 
    {
       this.form.reset();
    }
    submitForm (): void 
    {
        this.isFormSubmitted = true
    if (this.form.invalid)
    {
      this.form.markAllAsTouched()
      return;
    }
  
    const allProductsValid = this.transactionItems.every(
        item =>  item.product  && item.quantity > 0 && (item.orderedQuantity > 0 || this.type !=   TransactionTypes.Reciving)
            );
            if(!allProductsValid){
               this.toastr.error(this.translate.instant('transaction.oneOfTheProductInvalid'))
               return;
            }
   this.transactionItems = this.transactionItems.map(x=> {
    x.productId = x.product.id;
    return x;
   });


    const ApiPath = this.isEditMood ? 'Update' : 'Post';
    const ControllerPath = 'Transaction'
    
    let form = this.form.getRawValue();
    form.transactionProducts = this.transactionItems;
    form.type = Number(form.type);
    form.customerId = form?.customerId?.id;
    this.baseService.Post(ControllerPath , ApiPath , form).subscribe
    ( res => { this.modal.close();

       this.toastr.success(
       this.translate.instant(this.isEditMood ? 'successUpdated' : "successAdded"),
       this.translate.instant("success"),
    { timeOut: 3000 }
  );
     }
    )
 
    }

      private GetById() {
    this.baseService.Get('Branch', `Get/${this.id}`).subscribe
      (res => {
        this.entity = res;
        this.form.patchValue
          (
            {
                id: this.entity.id,
                warehouseSectionId:this.entity.warehouseSectionId,
            }
          );
      }
      )
  }

 
  getProducts(){
      this.baseService.Get('Product' , 'GetAll').subscribe(res => {
        this.products  = res;
      });
    }


    next() {
      if(this.activeIndex < this.steps.length - 1) {
    this.activeIndex++;
      }
  }

  previous() {
    if (this.activeIndex > 0) {
      this.activeIndex--;
    }
  }

   addRow(){
      this.transactionItems.push(
      {index: this.transactionItems.length, productId:0 , orderedQuantity: 0 , quantity:0}
      )
    }
removeRow(index){
  this.transactionItems = this.transactionItems.filter(x=> x.index != index);
  let i = 0;
  this.transactionItems = this.transactionItems.map(item => {
    item.index = i;
    i++;
    return item;
  })
}

 onTypeChange(type:any){
  this.type = type;
  if( type == TransactionTypes.Reciving ||  type == TransactionTypes.Issueance){
      let clientType = type == TransactionTypes.Reciving ? ClientType.Supplier :  ClientType.Customer;
      this.baseService.Get('Customers' , 'GetAll?type='   + clientType ).subscribe(res => {
        this.customers  = res;
      });
  } 
  let searchName =  this.type == this.recivingType ?   "Suppliers.Suppliers"  :   "customers.customers";
  this.searchCustomer = this.translate.instant(searchName);
    }

    getWarehouses(){
      this.baseService.Get('Warehouse' , 'GetAll').subscribe(res => {
        this.warehouses = res; 
      })
    }

    onWarehouseChange(warehouseId:number){
   this.getWarehouseSections(warehouseId);
   if(this.type == this.exportToBranchType){
    this.getBranchies(warehouseId);
    }
    else if(this.form.get('type').value == this.transferType){
      // this.toWarehouses = this.warehouses.filter(x=> x.id != warehouseId);
    }


    }
    getWarehouseSections(warehouseId:number){
      if(warehouseId > 0){
this.baseService.Get('WarehouseSections' , 'GetSectionsByWarehouseId/' + warehouseId ).subscribe(res => {
  this.sections = res;
})}}


   getWarehouseToSections(){
      let warehouseId = this.form.get('toWarehouseId').value;
      if(warehouseId > 0){
this.baseService.Get('WarehouseSections' , 'GetSectionsByWarehouseId/' + warehouseId ).subscribe(res => {
  this.toSections = res as any[];
  let sectionId = this.form.get('warehouseSectionId').value;
  this.toSections = this.toSections.filter(x=> x.id != sectionId)
})}}


 getBranchies(warehouseId:number){
      this.baseService.Get('Branch' , 'GetAll?warehouseId=' + warehouseId).subscribe(res => {
        this.branchies  = res;
      });
    }
    

    filterProducts(event: any) {
    const query = event.query.toLowerCase();
    this.getSelectItemList(query);
  
  }

  getSelectItemList(query){
    this.baseService.Get('Product' , 'GetSelectItemsList?query=' + query + '&isPurchase=true' ).subscribe(res => {
      this.filteredProducts = (res as SelectItem[]).filter(product =>
  this.transactionItems.every(item => item.product?.id !== product.id)
);
    })
  }


   onSectionChange(sectionId){
       if(this.type == this.transferType){
        this.form.get('toSectionId').setValue(null);
        this.getWarehouseToSections();
       }
     }


      filterCustomers(event: any) {
    const query = event.query.toLowerCase();
    this.getCustomersSelectItemList(query);
  
  }

  getCustomersSelectItemList(query){
    this.baseService.Get('Customers' , 'GetSelectItemsList/' + 
      (this.type ==  this.recivingType ? ClientType.Supplier  : ClientType.Customer)+ '/?query=' + query ).subscribe(res => {
        this.filteredCustomers = res 
    })
  }

}
