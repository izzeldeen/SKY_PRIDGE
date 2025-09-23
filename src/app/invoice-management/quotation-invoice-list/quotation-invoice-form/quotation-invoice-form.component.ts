import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { OverlayContainer, ToastrService } from 'ngx-toastr';
import { Installment } from 'src/app/data/installment';
import { ProductLineItem } from 'src/app/data/product-line-item';
import { SelectItem } from 'src/app/data/select-item';
import { InstallmentComponent } from 'src/app/shared/components/installment/installment.component';
import { ProductLineItemsComponent } from 'src/app/shared/components/product-line-items/product-line-items.component';
import { ClientType, paymentMethods, sourceTypes , SourceType, InvoiceType, InvoiceStatus, PaymentMethod } from 'src/app/shared/models/enum';
import { AuthService } from 'src/app/shared/services/auth.service';
import { BaseService } from 'src/app/shared/services/base.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-quotation-invoice-form',
  templateUrl: './quotation-invoice-form.component.html',
  styleUrls: ['./quotation-invoice-form.component.scss']
})
export class QuotationInvoiceFormComponent {
invoiceId:number;
isInvoiceHeaderFormSubmitted:boolean = false;
  additionalAttachmentFile:any;
  additionalAttachmentPath:any;
  baseUrl = environment.attachmentUrl;
  invoiceStatusDraft = InvoiceStatus.Draft;
  currencies:any[];
  transactionItems:any[] = [
  ];
  type:number;
  creditLimitModelMessage:string;
  showWarehouseSections:boolean = false;
    isEditMood: boolean = false
    id: number
    private entity: any = null;
   warehouses:any;
   toWarehouses:any;
   sections:any;
   toSections:any;
   filteredCustomers:any;
   branchies:any;
   customers:any;
   products:any;
   invoiceProducts:ProductLineItem[] = [];
   sourceTypes:any[]  = sourceTypes;
   warehouseSourceType = SourceType.Warehouse;
  steps = [];
  activeIndex: number = 0;
   filteredProducts:any;
   sourceId:number;
   sourceType:number;
    invoiceHeaderForm = new FormGroup
    (
      {
        id: new FormControl(0),
        invoiceDate: new FormControl(null , [Validators.required]),
        isCustomer:new FormControl(false),
        customerId:new FormControl(null),
        customerName:new FormControl(null, [Validators.required]),
        sourceType: new FormControl(1, [Validators.required]),
        note:new FormControl(null),
        additionalAttachmentFile:new FormControl(null),
        warehouseId:new FormControl(null),
        warehouseSectionId:new FormControl(null),
        type:new FormControl(InvoiceType.QuotationInvoice)
      }
    );

  @ViewChild('installment') installmentComponent!: InstallmentComponent;
  @ViewChild('productLine') productLineComponent!: ProductLineItemsComponent;

    //#endregion
    constructor
    (
      private baseService: BaseService,
      public authSerivce: AuthService,
      private overlay: OverlayContainer,
      private toastr: ToastrService,
      private translate: TranslateService,
      private route:ActivatedRoute,
      private router:Router,
      private modalService: NgbModal
    ) 
    {

       this.route.params.subscribe((params) => {
      this.id = params["id"];
    });
    }
    ngOnInit (): void 
    {
            this.steps = [
    { label: this.translate.instant('quotation.quotationHeader'), command: () => (this.activeIndex = 0) },
    { label: this.translate.instant('quotation.product-line-items'), command: () => (this.activeIndex = 1) },
    { label: this.translate.instant('quotation.final-quotation-summary'), command: () => (this.activeIndex = 2) }
      ]

      if (this.id > 0) {
        this.GetById();
       
      }else {
        let date = new Date();
        this.invoiceHeaderForm.get('invoiceDate').setValue({
                          year: date.getFullYear(),
                          month: date.getMonth() + 1, // Note: JS months are 0-based
                          day: date.getDate()
                        })
      }

       this.getCustomerSelectItemList('')

    }
    //#region Functions
    resetForm () 
    {
       this.invoiceHeaderForm.reset();
    }
    submitInvoiceHeaderForm (): void 
    {
        this.isInvoiceHeaderFormSubmitted = true
    if (this.invoiceHeaderForm.invalid)
    {
      this.invoiceHeaderForm.markAllAsTouched()
      return;
    }

    const ApiPath =  'Post';
    const ControllerPath = 'Invoice'
    
    let form = this.invoiceHeaderForm.getRawValue();
    let date = form.invoiceDate;
    form.id  = this.id;
       let pad = (n: number) => n.toString().padStart(2, '0');
       form.invoiceDate = `${date.year}-${pad(date.month)}-${pad(date.day)}`;
    form.additionalAttachmentFile = this.additionalAttachmentFile;
    this.baseService.postItemFromForm(ControllerPath , ApiPath , form).subscribe
    ( res => { 
        this.id = res as number;
        this.GetById();
        this.getProductLineItems(this.id);
       this.toastr.success(
       this.translate.instant( 'success'),
       this.translate.instant("success"),
    { timeOut: 3000 }
  );
    this.activeIndex++;

     }
    )
 
    }

      private GetById() {
    this.baseService.Get('Invoice', `Get/${this.id}`).subscribe
      (res => {
        this.entity = res;
         if(this.entity.type != InvoiceType.QuotationInvoice){
          this.router.navigate(['others/404'])
        }
        if(this.entity?.isBalanceUpdated){
         this.disableForm()
        }
       

        const date = new Date(this.entity.invoiceDate);
        const deliveryDate = this.entity.deliveryDate ?  new Date(this.entity.deliveryDate) : null;
        this.sourceType = this.entity.sourceType;
         this.sourceId = this.entity.sourceType == SourceType.Warehouse ? this.entity.warehouseSectionId : this.entity.branchId;
        if(this.entity.sourceType == SourceType.Warehouse){
          this.getWarehouseSections();
        }
        if(this.entity.isCustomer){
          this.getCustomers(ClientType.Customer);
          let customerNameControl = this.invoiceHeaderForm.get('customerName');
           customerNameControl.clearValidators();
           customerNameControl.updateValueAndValidity();
        }
         if(this.entity?.additionalAttachment) {
        this.additionalAttachmentPath = `${this.baseUrl}/${this.entity.additionalAttachment}`;

         }
        this.invoiceHeaderForm.patchValue
          (
            {
                id: this.entity.id,
                isCustomer:this.entity.isCustomer,
                customerId: this.entity.customerId,
                customerName: this.entity.isCustomer ? null : this.entity.customerName,
                sourceType: this.entity.sourceType,
                note:this.entity.note,
                additionalAttachmentFile:this.additionalAttachmentFile,
                warehouseSectionId:this.entity.warehouseSectionId,
                invoiceDate: {
                          year: date.getFullYear(),
                          month: date.getMonth() + 1, // Note: JS months are 0-based
                          day: date.getDate()
                        },
                        type:InvoiceType.QuotationInvoice

            }
          );

          if(this.entity.status != InvoiceStatus.Draft){
            this.invoiceHeaderForm.get('sourceType').disable();
            this.invoiceHeaderForm.get('warehouseSectionId').disable();
          }
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
    if(!this.entity?.isBalanceUpdated){
    if(this.activeIndex == 0){
         this.submitInvoiceHeaderForm();
        }else if(this.activeIndex == 1){
          if(this.productLineComponent.productItems?.every(item => item.quantity > 0 && item.unitPrice > 0 && item.total > 0 && (typeof item.product === 'object' ? item.product.id > 0 : item.product != null ) )){
              this.submitProductItems();
          }else {
              this.toastr.error(
       this.translate.instant('error'),
       this.translate.instant('sales-invoice.MustSelectProduct'),
           { timeOut: 3000 })
          }
          
        } else if(this.activeIndex == 2){
            this.onSubmitInvoice();
            }

    
        }else {
          switch(this.activeIndex){
            case 0:
            this.getProductLineItems(this.entity.id);
            break;
          }
           this.activeIndex++;
        }
    
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



    getWarehouses(){
      this.baseService.Get('Warehouse' , 'GetAll').subscribe(res => {
        this.warehouses = res; 
      })
    }

  
    getWarehouseSections(){
this.baseService.Get('WarehouseSections' , 'GetWarehouseSectionsByLoggedInUser').subscribe(res => {
  this.sections = res;
    })
  
  }




  


 getBranchies(){
      this.baseService.Get('Branch' , 'GetAll').subscribe(res => {
        this.branchies  = res;
      });
    }
    

    filterProducts(event: any) {
    const query = event.query.toLowerCase();
    this.getSelectItemList(query);
  }

  getSelectItemList(query){
    
    this.baseService.Get('Product' , 'GetSelectItemsList?query=' + query ).subscribe(res => {
      this.filteredProducts = (res as SelectItem[]).filter(product =>
  this.transactionItems.every(item => item.product?.id !== product.id)
);
    })
  }



  getCustomers(type:ClientType){
        this.baseService.Get('Customers' , 'GetAll?type='   + type ).subscribe(res => {
          this.customers  = res;
        });
      }


      onSourceTypeChange(sourceType:number){
        if(sourceType == SourceType.Branch){
          this.showWarehouseSections = false;
          this.getBranchies();
        }else {
           this.showWarehouseSections = true;
          this.getWarehouseSections();
        }
      }

      onIsCustomerChange(){
        let value = this.invoiceHeaderForm.get('isCustomer').value;
          let customerNameControl = this.invoiceHeaderForm.get('customerName');
          let customerIdControl = this.invoiceHeaderForm.get('customerId');

        if(value){
        this.getCustomers(ClientType.Customer);
        customerNameControl.setValue(null);
        customerNameControl.clearValidators();
        customerNameControl.updateValueAndValidity();
        customerIdControl.setValidators(Validators.required);
       
        }else {
          customerIdControl.setValue(null);
          customerNameControl.setValidators(Validators.required);
          customerIdControl.clearValidators();
          customerIdControl.updateValueAndValidity();
        }
      }

      onFileChange(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    this.additionalAttachmentFile = input.files[0];
        }
  }

  
  getProductLineItems(invoiceid:number){
    this.baseService.Get('Invoice' , 'GetProductLineItems/' + invoiceid).subscribe(res => {
      if(res){
      this.invoiceProducts = res as ProductLineItem[];
      }
    })
  }



  submitProductItems(){
    let form =  {
      invoiceId: this.id,
       Products: this.productLineComponent.productItems.map(x => ({
    id: x.id,
    quantity: x.quantity,
    unitPrice: x.unitPrice,
    discount: x.discount,
    tax: x.tax,
    feesAmount: x.feesAmount,
    total: x.total,
    reserve: x.reserve,
    index: x.index,
    productId: typeof x.product === 'object' ? x.product.id : null,
    productName: typeof x.product === 'string' ? x.product : null,
    unitOfMeasureId: typeof x.unitMeasure === 'object' ? x.unitMeasure.id : null,
    unitMeasure: typeof x.unitMeasure === 'string' ? x.unitMeasure : null,
    maxQuantity: x.maxQuantity,
    quantityDb: x.quantityDb,
    reserveDb: x.reserveDb,
    isInValid: x.isInValid,
    type: x.type,
    unitOfMeasures:null
  }))
    }
    this.baseService.Post('Invoice' , 'SubmitQuotationProductItems' , form).subscribe(res => {
      this.GetById();
      this.getProductLineItems(this.id);
       this.toastr.success(
       this.translate.instant('success'),
       this.translate.instant('sales-invoice.productItemUpdatedSuccessfly'),
    { timeOut: 3000 })
     this.activeIndex++;
    })
  }




  onSubmitInvoice(){
     this.baseService.Post('Invoice' , 'SubmitQuotation' , this.id).subscribe(res => {
      this.router.navigate(['/invoice-management/quotation'])
       this.toastr.success(
       this.translate.instant('success'),
       this.translate.instant('sales-invoice.invoiceSubmitted'),
    { timeOut: 3000 })
    })
  }



  disableForm(){
     this.invoiceHeaderForm.get('isCustomer').disable();
     this.invoiceHeaderForm.get('customerId').disable();
     this.invoiceHeaderForm.get('customerName').disable();
     this.invoiceHeaderForm.get('sourceType').disable();
     this.invoiceHeaderForm.get('note').disable();
     this.invoiceHeaderForm.get('invoiceDate').disable();
     this.invoiceHeaderForm.get('additionalAttachmentFile').disable();
     this.invoiceHeaderForm.get('warehouseId').disable();
     this.invoiceHeaderForm.get('warehouseSectionId').disable();
  }


 

  backToTransactionList(){
    this.router.navigate(['/invoice-management/quotation'])
  }

     filterCustomers(event: any) {
    const query = event.query.toLowerCase();
    this.getCustomerSelectItemList(query);
  
  }

    getCustomerSelectItemList(query){
      this.baseService.Get('Customers' , 'GetSelectItemsList/' + ClientType.Customer + '/?query=' + query ).subscribe(res => {
        this.filteredCustomers = res 
    })
    }

         onAddCustomers(modal: any) {
    const modalRef = this.modalService.open
      (modal, { modalDialogClass: 'side-modal', backdrop: 'static', keyboard: false });
    modalRef.result.then((result) => { this.getCustomerSelectItemList(''); })
  }
}
