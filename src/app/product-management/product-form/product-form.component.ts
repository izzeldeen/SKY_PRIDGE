import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { OverlayContainer, ToastrService } from 'ngx-toastr';
import { SelectItem } from 'primeng/api';
import { GlobalStatus, GlobalStatusArr, LookpusType, ProductTypeEnum, productTypes } from 'src/app/shared/models/enum';
import { AuthService } from 'src/app/shared/services/auth.service';
import { BaseService } from 'src/app/shared/services/base.service';
import { arabicTextWithNumbersValidator, englishTextWithNumbersValidator } from 'src/app/utils/validation-text';
import { noWhitespaceValidator } from 'src/app/utils/validation-white-space';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent {
  imageUrl:string = '';
  activeIndex: number = 0;
  translateS:any;
  showFollowItemDiv:boolean = false;
  isCompleted: boolean;
  isFormSubmitted:boolean = false;
  isDetailsFormSubmitted:boolean = false;
  imageFile:any;
  public status = GlobalStatusArr
  public productTypes = productTypes;
isProductService:boolean = false;
searchUnitOfMeasuer:any
brands:any[];
  categories:any[];
  unitOfMeasures:any[];
  followTypes:any[];
  baseUrl = environment.attachmentUrl;
  warehouses:any;
  sections:any;
  filteredUnitOfMeasuers:any[];
  filteredCategories:any[];
  filteredBrands:any[];

    @Input() isCompanyUser:boolean = false;
    @Input() modal: any = null
    @Input() isEditMood: boolean = false
    @Input() id: number
    private entity: any = null;

    basicForm = new FormGroup
    (
      {
        id: new FormControl(0),
        barCode:new FormControl(null),
        nameEn: new FormControl('', [Validators.required,englishTextWithNumbersValidator,noWhitespaceValidator() , Validators.maxLength(100)]),
        nameAr: new FormControl(''),
        purchasePrice: new FormControl(null),
        sellPrice: new FormControl(null, [Validators.required ]),
        unitOfMeasureId:new FormControl(null),
        categoryId:new FormControl(null),
        isActive: new FormControl(false),
        hasBarCode:new FormControl(false),
        type:new FormControl(0),
        brandId:new FormControl(null)
      }
    );
     detailsForm = new FormGroup ({
     descriptionEn: new FormControl('', [englishTextWithNumbersValidator,noWhitespaceValidator() , Validators.maxLength(100)]),
     descriptionAr: new FormControl('', [arabicTextWithNumbersValidator(), noWhitespaceValidator() ]),
     salesTax: new FormControl(0),
     discount: new FormControl(0),
     Image:new FormControl(),
     followItem: new FormControl(false),
     onlyDefault: new FormControl(false),
     followType:new FormControl(null),
     quantityValue:new FormControl(0),
     expDate:new FormControl(),
     expirationDays: new FormControl(),
     currentStock:new FormControl(null),
     defaultWarehouseId:new FormControl(null),
     warehouseSectionId: new FormControl(null),
     purchaseTax:new FormControl(0),
     purchaseDiscount:new FormControl(0)
    })
   followForm = new FormGroup({

   })
  steps = [];
   constructor
    (
      private baseService: BaseService,
      public authSerivce: AuthService,
      private overlay: OverlayContainer,
      private toastr: ToastrService,
      private translate: TranslateService,
    ) 
    {
      this.translateS = this.translate;
    }
    ngOnInit (): void 
    {
      
      if (this.isEditMood && this.id) {
        this.GetById()
        this.basicForm.get('barCode').disable();
      }
      this.getWarehouses();
      this.onProductTypeChange(ProductTypeEnum.Product);
      this.steps = [
    { label: this.translate.instant('product-management.basicInfo'), command: () => (this.activeIndex = 0) },
    { label: this.translate.instant('product-management.details'), command: () => (this.activeIndex = 1) }
      ]

      this.followTypes = [
        { id:0 , title:this.translate.instant('product-management.quantity')},
        { id:1 , title:this.translate.instant('product-management.expiry')},
        { id:2 , title:this.translate.instant('product-management.both')}
      ]

       this.detailsForm.get('followType').disable();

       this.searchUnitOfMeasuer = this.translate.instant('unitOfMeasure.unitOfMeasure')
    }
  
    

    next() {
      if(this.activeIndex  == 0){
        this.isFormSubmitted = true;
        this.isDetailsFormSubmitted = true;
        this.basicForm.markAllAsTouched();
        if(this.basicForm.valid){
        this.activeIndex++;
        }
      }else if(this.activeIndex == 1 ){
        this.detailsForm.markAllAsTouched();
        if(this.detailsForm.valid){
          this.submitForm();
        }
      }
  }

  previous() {
    if (this.activeIndex > 0) {
      this.activeIndex--;
    }
  }
  

    //#endregion
    
    //#region Functions
    resetForm () 
    {
       this.basicForm.reset();
    }
    submitForm (): void 
    {
     this.isFormSubmitted = true
    if (this.basicForm.invalid || this.detailsForm.invalid)
    {
      this.basicForm.markAllAsTouched()
      this.detailsForm.markAllAsTouched()
      return;
    }
    const ApiPath = this.isEditMood ? 'Update' : 'Post';
    const ControllerPath = 'Product'
    let date = this.detailsForm.value.expDate;
    if(this.detailsForm?.value?.expDate && !this.isCompanyUser) {
     date = new Date(date.year, date.month - 1, date.day).toISOString().split('T')[0];
    }

   const combinedData = {
    ...this.basicForm.getRawValue(),
    ...this.detailsForm.getRawValue(),
    imageFile: this.imageFile,
    status: this.basicForm?.value?.isActive ? GlobalStatus.Active : GlobalStatus.Inactive,
    expirationDate:date,
    UnitOfMeasureName:null,
    categoryName:null,
    brandName:null
  };
  if(!this.isProductService){
 if(typeof combinedData.unitOfMeasureId === 'object'){
    combinedData.unitOfMeasureId =  combinedData.unitOfMeasureId.id;
  }else {
    combinedData.UnitOfMeasureName =  combinedData.unitOfMeasureId;
    combinedData.unitOfMeasureId = null;
  }

    if(typeof combinedData.categoryId === 'object'){
    combinedData.categoryId =  combinedData.categoryId.id;
  }else {
    combinedData.categoryName =  combinedData.categoryId;
    combinedData.categoryId = null;
  }

     if(typeof combinedData.brandId === 'object'){
    combinedData.brandId =  combinedData.brandId.id;
  }else {
    combinedData.brandName =  combinedData.brandId;
    combinedData.brandId = null;
  }
  }
 



    this.baseService.postItemFromForm(ControllerPath , ApiPath , combinedData).subscribe
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
    this.baseService.Get('Product', `Get/${this.id}`).subscribe
      (res => {
        this.entity = res;
        if(this.entity?.imagePath)
        this.entity.imagePath = `${this.baseUrl}/${this.entity.imagePath}`; 
        this.onProductTypeChange(this.entity.type);

        this.basicForm.patchValue
          (
            {
                id: this.entity.id,
                barCode:this.entity.barCode,
                nameEn: this.entity.nameEn,
                nameAr: this.entity.nameAr,
                isActive: this.entity.isActive,
                categoryId:{id:this.entity.categoryId , name:this.entity.categroy},
                unitOfMeasureId:{id:this.entity.unitOfMeasureId , name:this.entity.unitOfMeasureName},
                sellPrice:this.entity.sellPrice,
                purchasePrice:this.entity.purchasePrice,
                type:this.entity.type,
                brandId:{id:this.entity.brandId , name:this.entity.brand}
             }
          );
       const date = this.entity.expirationDate ?  new Date(this.entity.expirationDate) : null;
       this.onFollowItemChange(this.entity.followItem);
       this.detailsForm.patchValue
          (
            {
                descriptionAr:this.entity.descriptionAr,
                descriptionEn: this.entity.descriptionEn,
                followType:this.entity.followType,
                followItem: this.entity.followItem,
                onlyDefault: this.entity.onlyDefault,
                expirationDays:this.entity.expirationDays,
                quantityValue:this.entity.quantityValue,
                salesTax:this.entity.salesTax,
                discount:this.entity.discount,
                purchaseTax:this.entity.purchaseTax,
                purchaseDiscount:this.entity.purchaseDiscount,
                currentStock:this.entity.currentStock,
                defaultWarehouseId:this.entity.DefaultWarehouseId,
                warehouseSectionId: this.entity.WarehouseSectionId,
                expDate: date ? {
                          year: date.getFullYear(),
                          month: date.getMonth() + 1, // Note: JS months are 0-based
                          day: date.getDate()
                        } : null,
                  

             }
          );


      }
      )
  }

  onFileChange(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files?.length > 0) {
    this.imageFile = input.files[0];
        }
  }



    
    filterUnitOfMeauers(event: any) {
    const query = event.query.toLowerCase();
    this.getSelectUnitOfMeauerItemList(query);
  
  }

  filterCategories(event: any) {
    const query = event.query.toLowerCase();
    this.getSelectCategoriesrItemList(query , LookpusType.Category);
  
  }


    filterBrands(event: any) {
    const query = event.query.toLowerCase();
    this.getSelectBrandsItemList(query , LookpusType.Brand);
  
  }


     getSelectUnitOfMeauerItemList(query){
       this.baseService.Get('UnitOfMeasure' , 'GetSelectItemsList?query=' + query ).subscribe(res => {
         this.filteredUnitOfMeasuers = res as SelectItem[];
       })
     }

        getSelectCategoriesrItemList(query , typeId){
       this.baseService.Get('Lookups' , 'GetSelectItemsList?query=' + query  + '&typeId=' + typeId ).subscribe(res => {
         this.filteredCategories = res as SelectItem[];
       })
     }

       getSelectBrandsItemList(query , typeId){
       this.baseService.Get('Lookups' , 'GetSelectItemsList?query=' + query  + '&typeId=' + typeId ).subscribe(res => {
         this.filteredBrands = res as SelectItem[];
       })
     }


  onHasBarCodeChange() {
  const barCodeControl = this.basicForm.get('barCode');
  if (this.basicForm.get('hasBarCode')?.value) {
    barCodeControl?.setValidators(Validators.required);
  } else {
    barCodeControl.setValue(null);
    barCodeControl?.clearValidators();
  }
  barCodeControl?.updateValueAndValidity(); // This is essential
}

    getWarehouses(){
      this.baseService.Get('Warehouse' , 'GetAll').subscribe(res => {
        this.warehouses = res; 
      })
    }

      onWarehouseChange(warehouseId:number){
   this.getWarehouseSections(warehouseId);
   if(warehouseId > 0){
    this.detailsForm.get('warehouseSectionId').setValidators(Validators.required);
    this.detailsForm.get('currentStock').setValidators(Validators.required);
   }else {
    this.detailsForm.get('warehouseSectionId')?.clearValidators();
    this.detailsForm.get('currentStock')?.clearValidators();
   }
  }

      getWarehouseSections(warehouseId:number){
      if(warehouseId > 0){
this.baseService.Get('WarehouseSections' , 'GetSectionsByWarehouseId/' + warehouseId ).subscribe(res => {
  this.sections = res;
})}}


onFollowItemChange(value){
  if(value){
    this.detailsForm.get('followType').setValue(0);
    this.basicForm.get('purchasePrice').setValidators(Validators.required);
    this.detailsForm.get('quantityValue').setValidators([Validators.min(1) , Validators.required])
    this.detailsForm.updateValueAndValidity();
  }else {
    this.detailsForm.get('followType').setValue(null);
     this.basicForm.get('purchasePrice').clearValidators();
     this.basicForm.updateValueAndValidity();
  }
}

onProductTypeChange(value: ProductTypeEnum) {
  const uom = this.basicForm.get('unitOfMeasureId');
  const cat = this.basicForm.get('categoryId');

  if (value == ProductTypeEnum.Service) {
    this.isProductService = true;

    // 1) remove ALL validators on the controls
    uom?.clearValidators();
    cat?.clearValidators();
    uom?.clearAsyncValidators();
    cat?.clearAsyncValidators();

    // 2) clear any manually-set/stale errors
    uom?.setErrors(null);
    cat?.setErrors(null);

    // 3) re-evaluate the controls themselves
    uom?.updateValueAndValidity({ onlySelf: true, emitEvent: false });
    cat?.updateValueAndValidity({ onlySelf: true, emitEvent: false });
  } else {
    this.isProductService = false;

    // 1) add required
    uom?.setValidators([Validators.required]);
    cat?.setValidators([Validators.required]);

    // 2) re-evaluate the controls
    uom?.updateValueAndValidity({ onlySelf: true });
    cat?.updateValueAndValidity({ onlySelf: true });
  }

  // finally re-evaluate the group (in case you have group-level validators)
  this.basicForm.updateValueAndValidity({ emitEvent: false });
}


}
