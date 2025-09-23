import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { OverlayContainer, ToastrService } from 'ngx-toastr';
import { Installment } from 'src/app/data/installment';
import { ProductLineItem } from 'src/app/data/product-line-item';
import { SelectItem } from 'src/app/data/select-item';
import { InstallmentComponent } from 'src/app/shared/components/installment/installment.component';
import { ProductLineItemsComponent } from 'src/app/shared/components/product-line-items/product-line-items.component';
import { ClientType, paymentMethods, sourceTypes , SourceType, InvoiceType, InvoiceStatus } from 'src/app/shared/models/enum';
import { AuthService } from 'src/app/shared/services/auth.service';
import { BaseService } from 'src/app/shared/services/base.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-purchase-invoice-form',
  templateUrl: './purchase-invoice-form.component.html',
  styleUrls: ['./purchase-invoice-form.component.scss']
})
export class PurchaseInvoiceFormComponent {
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
   invoiceInstallments:Installment[] = [];
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
        customerId:new FormControl(null,[Validators.required]),
        sourceType: new FormControl(1, [Validators.required]),
        isDeliveredOrReceived:new FormControl(false),
        note:new FormControl(null),
        additionalAttachmentFile:new FormControl(null),
        warehouseId:new FormControl(null),
        warehouseSectionId:new FormControl(null),
        deliveryDate:new FormControl(null),
        type:new FormControl(InvoiceType.PurchaseInvoice),
        isCustomer:new FormControl(true)
      }
    );

  @ViewChild('installment') installmentComponent!: InstallmentComponent;
  @ViewChild('productLine') productLineComponent!: ProductLineItemsComponent;
  @ViewChild('modalCustomerCreditLimit') customerCreditLimitModel!: TemplateRef<any>;

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

    
      this.getSupplierSelectItemList('');
    }
    ngOnInit (): void 
    {
            this.steps = [
    { label: this.translate.instant('sales-invoice.invoiceHeader'), command: () => (this.activeIndex = 0) },
    { label: this.translate.instant('sales-invoice.product-line-items'), command: () => (this.activeIndex = 1) },
    { label: this.translate.instant('sales-invoice.installment-plan-setup'), command: () => (this.activeIndex = 2) },
    { label: this.translate.instant('sales-invoice.final-invoice-summary'), command: () => (this.activeIndex = 3) }
      ]

     
      if (this.id > 0) {
        this.GetById();
        this.getSupplierSelectItemList('')
      }else {
        let date = new Date();
        this.invoiceHeaderForm.get('invoiceDate').setValue({
                          year: date.getFullYear(),
                          month: date.getMonth() + 1, // Note: JS months are 0-based
                          day: date.getDate()
                        })
      }
     
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
      form.isCustomer = true;
       let pad = (n: number) => n.toString().padStart(2, '0');
       form.invoiceDate = `${date.year}-${pad(date.month)}-${pad(date.day)}`;
      let deliveryDate = form.deliveryDate;
      if(form.deliveryDate){
        let pad = (n: number) => n.toString().padStart(2, '0');
       form.deliveryDate = `${deliveryDate.year}-${pad(deliveryDate.month)}-${pad(deliveryDate.day)}`;
      }
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
        if(this.entity.type != InvoiceType.PurchaseInvoice){
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
          this.getCustomers(ClientType.Supplier);
         if(this.entity?.additionalAttachment) {
        this.additionalAttachmentPath = `${this.baseUrl}/${this.entity.additionalAttachment}`;

         }
        this.invoiceHeaderForm.patchValue
          (
            {
                id: this.entity.id,
                customerId: this.entity.customerId,
                sourceType: this.entity.sourceType,
                isDeliveredOrReceived:this.entity.isDeliveredOrReceived,
                note:this.entity.note,
                additionalAttachmentFile:this.additionalAttachmentFile,
                warehouseSectionId:this.entity.warehouseSectionId,
                invoiceDate: {
                          year: date.getFullYear(),
                          month: date.getMonth() + 1, // Note: JS months are 0-based
                          day: date.getDate()
                        },
                        deliveryDate: deliveryDate ?  {
                          year: deliveryDate.getFullYear(),
                          month: deliveryDate.getMonth() + 1, // Note: JS months are 0-based
                          day: deliveryDate.getDate()
                        } : null,
                        type:InvoiceType.PurchaseInvoice

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
         if(this.productLineComponent.productItems?.every(item => item.quantity > 0 && item.unitPrice > 0 && item.total > 0 && item.id > 0 ))
          {
              this.submitProductItems();
          }
          else {
              this.toastr.error(
       this.translate.instant('error'),
       this.translate.instant('sales-invoice.MustSelectProduct'),
           { timeOut: 3000 })
          }
          
        } else if(this.activeIndex == 2){
          if(this.installmentComponent?.installments?.length > 0 && this.installmentComponent.paymentMethod > 0 ){
this.submitInvoiceInstallments();
this.GetById();
          }else {
             this.toastr.error(
       this.translate.instant('error'),
       this.translate.instant('sales-invoice.oneInstallment'),
           { timeOut: 3000 })
          }
    }

    
        }else {
          switch(this.activeIndex){
            case 0:
            this.getProductLineItems(this.entity.id);
            break;
            case 1:
              this.getInvoiceInstallments(this.entity.id);
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

   getInvoiceInstallments(invoiceid:number){
    this.baseService.Get('Invoice' , 'GetInvoiceInstallments/' + invoiceid).subscribe(res => {
     
      this.invoiceInstallments = res as Installment[];
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
    type: x.type
  }))
    }
    this.baseService.Post('Invoice' , 'SubmitProductItems' , form).subscribe(res => {
      this.GetById();
      this.getInvoiceInstallments(this.id);
      this.getProductLineItems(this.id);
       this.toastr.success(
       this.translate.instant('success'),
       this.translate.instant('sales-invoice.productItemUpdatedSuccessfly'),
    { timeOut: 3000 })
     this.activeIndex++;
    })
  }

submitInvoiceInstallments(validateCredit = true){
 
    let pad = (n: number) => n.toString().padStart(2, '0');
    let form =  {
      invoiceId: this.id,
      invoiceType:InvoiceType.PurchaseInvoice,
      paymentMethod:Number(this.installmentComponent.paymentMethod),
      installments: this.installmentComponent.installments.map(installment => {
        installment.dueDate = installment.dueDateControl ? `${installment.dueDateControl.year}-${pad(installment.dueDateControl.month)}-${pad(installment.dueDateControl.day)}`   : new Date();
        installment.paidDate = installment.paidDateControl ?  `${installment.paidDateControl.year}-${pad(installment.paidDateControl.month)}-${pad(installment.paidDateControl.day)}` : null;
        installment.status = Number(installment.status);
        return installment;
      })
    }
    
    if(this.entity.customerId && validateCredit){
      let validateCustomerCreditForm = form as any;
      validateCustomerCreditForm.customerId = this.entity.customerId;
  this.baseService.Post('Invoice' , 'ValidateCustomerCreditLimit' , form).subscribe(res => {
    let response = res as any;
     if(response.isSuccess) {
        this.PostInvoiceInstallment(form);
    }else {
         this.creditLimitModelMessage = response.message;
         this.openOpenCustomerCreditLimit();
    }
    })
    } 
    else {
    this.PostInvoiceInstallment(form);
    }
  }


  onSubmitInvoice(){
     this.baseService.Post('Invoice' , 'SubmitPurchaseInvoice' , this.id).subscribe(res => {
      this.router.navigate(['/purchase-management/purchase-invoice'])
       this.toastr.success(
       this.translate.instant('success'),
       this.translate.instant('sales-invoice.invoiceSubmitted'),
    { timeOut: 3000 })
    })
  }



  disableForm(){
     this.invoiceHeaderForm.get('isCustomer').disable();
     this.invoiceHeaderForm.get('customerId').disable();
     this.invoiceHeaderForm.get('sourceType').disable();
     this.invoiceHeaderForm.get('isDeliveredOrReceived').disable();
     this.invoiceHeaderForm.get('note').disable();
     this.invoiceHeaderForm.get('invoiceDate').disable();
     this.invoiceHeaderForm.get('additionalAttachmentFile').disable();
     this.invoiceHeaderForm.get('warehouseId').disable();
     this.invoiceHeaderForm.get('warehouseSectionId').disable();
     this.invoiceHeaderForm.get('deliveryDate').disable();
  }

  PostInvoiceInstallment(form){
    this.baseService.Post('Invoice' , 'SubmitInvoiceInstallments' , form).subscribe(res => {
      this.invoiceInstallments = res as Installment[];
      this.GetById();
       this.toastr.success(
       this.translate.instant('success'),
       this.translate.instant('sales-invoice.invoiceInstallmentUpdateSuccessfully'),
    { timeOut: 3000 })
     this.activeIndex++;
    })
  }

  openOpenCustomerCreditLimit() {
  this.modalService.open(this.customerCreditLimitModel, {
      windowClass: 'change-password-popup',
      ariaLabelledBy: 'modal-basic-title', 
      size: 'md',
      centered: true
    })
    .result.then((result) => {
      console.log(result);
    }, (reason) => {
      console.log('Err!', reason);
    });
  }

  backToTransactionList(){
    this.router.navigate(['/purchase-management/purchase-invoice'])
  }

     filterSupplier(event: any) {
    const query = event.query.toLowerCase();
    this.getSupplierSelectItemList(query);
  
  }

    getSupplierSelectItemList(query){
      this.baseService.Get('Customers' , 'GetSelectItemsList/' + ClientType.Supplier + '/?query=' + query ).subscribe(res => {
        this.filteredCustomers = res 
    })
    }

          onAddCustomers(modal: any) {
    const modalRef = this.modalService.open
      (modal, { modalDialogClass: 'side-modal', backdrop: 'static', keyboard: false });
    modalRef.result.then((result) => { this.getSupplierSelectItemList(''); })
  }


}
