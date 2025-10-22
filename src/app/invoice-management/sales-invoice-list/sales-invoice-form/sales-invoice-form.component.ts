import {  Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { InvoicesService } from 'src/app/shared/services/invoice.service';
import { Invoice } from '../../../shared/models/invoice.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StatusArr } from 'src/app/shared/models/enum';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { StorageService, StoredFile } from 'src/app/shared/services/storge.service';
import { firstValueFrom } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { EmployeeService } from 'src/app/shared/services/employee.service';
import { Employee } from 'src/app/shared/models/employee.model';


@Component({
  selector: 'app-sales-invoice-form',
  templateUrl: './sales-invoice-form.component.html',
  styleUrls: ['./sales-invoice-form.component.scss']
})
export class SalesInvoiceFormComponent implements OnChanges {
    @Input() modal: any = null;
    @Input() id: number;
    @Input() entity:any;
    isEditMode = false;
    isFormSubmitted:boolean = false;
    salesInvoiceFile:any;
    purchaseInvoiceFile:any;
    employees:Employee[];
       form = new FormGroup
        (
          {
            id: new FormControl(0),
            customer:new FormControl('', [Validators.required ]),
            supplier:new FormControl('', [Validators.required]),
            employeeId:new FormControl(null, [Validators.required]),
            saleAmount:new FormControl(0, [Validators.required , Validators.min(0)]),
            purchaseAmount:new FormControl(0, [Validators.required  , Validators.min(0)]),
            netAmount:new FormControl(0),
            commissionPerc:new FormControl(0, [Validators.required , Validators.max(100)  ]),
            commission:new FormControl(0),
            salePDF:new FormControl(''),
            purchasePDF:new FormControl('')
          }
        );

    statues = StatusArr;
        
  constructor(private invoicesService:InvoicesService,
       private translate: TranslateService,
        private toastr: ToastrService,
        private storageService:StorageService,
        private spinner: NgxSpinnerService,
        private employeeService:EmployeeService
  ) {
this.getEmployees();

      
  }
  ngOnChanges(changes: SimpleChanges): void {
    
    if(this.entity){
    this.isEditMode = true;
         this.form.patchValue
          (
            {
                id: this.entity.id,
                customer: this.entity.customer,
                supplier: this.entity.supplier,
                saleAmount: this.entity.saleAmount,
                purchaseAmount: this.entity.purchaseAmount,
                employeeId:this.entity.employeeId,
                commissionPerc: this.entity.commissionPerc
            }
          );

    }


  }
    


     
  async updateInvoice(){
     let data = this.form.value as any;
    if(this.entity.status != 'Settled') {
      this.spinner.show();
  const saleAmount = data.saleAmount;
  const purchaseAmount = data.purchaseAmount;
  const commissionPerc = data.commissionPerc; // %
  const netAmount = +(saleAmount - purchaseAmount).toFixed(2);
  const commission = +((commissionPerc / 100) * netAmount).toFixed(2);
  data.netAmount = netAmount;
  data.commission = commission;
  let saleUpload: StoredFile | undefined;
  let purchaseUpload: StoredFile | undefined;
  const tasks: Promise<void>[] = [];

  if (this.salesInvoiceFile) {
  tasks.push((async () => {
    const { progress$, whenDone } = this.storageService.uploadInvoiceFile(data.number, this.salesInvoiceFile);
    const uploaded = await whenDone;
    saleUpload = uploaded;
    if(saleUpload) {
     data.salePDF =   saleUpload ? saleUpload.url : this.entity.salePDF;
}

  })());
}
  if (this.purchaseInvoiceFile) {
  tasks.push((async () => {
    const { progress$, whenDone } = this.storageService.uploadInvoiceFile(data.number, this.purchaseInvoiceFile);
    const uploaded = await whenDone;
    purchaseUpload = uploaded;
    if(purchaseUpload){
      data.purchasePDF =  purchaseUpload ?  purchaseUpload.url : this.entity.purchasePDF;
    }


  })());
}
      await Promise.all(tasks);
     this.invoicesService.updateInvoice(data.id , data).then(res => {
       this.toastr.success(
       this.translate.instant('Invoice Updated Successfully'),
       this.translate.instant("Success"),
    { timeOut: 3000 }
  );
       this.modal.close();
       this.spinner.hide();
  })
    } else {
       this.spinner.hide();
        this.modal.close();
         this.toastr.error(
       this.translate.instant('error'),
       this.translate.instant('Update Invoice is not  allowed for Settled invoices.'),
    { timeOut: 3000 })
    }
    
}


  
   
async seedInvoice() {
  // base numbers
   this.isFormSubmitted = true;
  if(this.form.valid){
  let number = this.makeInvoiceNumber();
 

  let saleUpload: StoredFile | undefined;
  let purchaseUpload: StoredFile | undefined;
  this.spinner.show();
  try {
    const tasks: Promise<void>[] = [];

if (this.salesInvoiceFile) {
  tasks.push((async () => {
    const { progress$, whenDone } = this.storageService.uploadInvoiceFile(number, this.salesInvoiceFile);

    // optional: subscribe to progress
    progress$.subscribe(p => console.log('Upload progress %:', p));

    // wait for upload to finish
    const uploaded = await whenDone;

    // uploaded has { path, url, size, contentType, createdAt, ... }
    saleUpload = uploaded;
  })());
}
  if (this.purchaseInvoiceFile) {
  tasks.push((async () => {
    const { progress$, whenDone } = this.storageService.uploadInvoiceFile(number, this.purchaseInvoiceFile);

    progress$.subscribe(p => console.log('Purchase upload progress %:', p));

    const uploaded = await whenDone;
    purchaseUpload = uploaded;
  })());
}

    if (tasks.length) {
      await Promise.all(tasks);
  let values = this.form.value;
  const saleAmount = values.saleAmount;
  const purchaseAmount = values.purchaseAmount;
  const commissionPerc = values.commissionPerc; // %

  // derived
  const netAmount = +(saleAmount - purchaseAmount).toFixed(2);
  const commission = +((commissionPerc / 100) * netAmount).toFixed(2);
    debugger;
    console.log(this.employees);
   const employeeName = this.employees.filter(x=> x.id == values.employeeId)[0]?.name;

  const invoice: Omit<Invoice, 'createdAt'> = {
    number: number,
    customer: values.customer,
    supplier: values.supplier,
    employee: employeeName,
    employeeId:values.employeeId,
    saleAmount,
    purchaseAmount,
    netAmount,
    commissionPerc,
    commission,
    salePDF:  saleUpload ? saleUpload.url :null ,
    purchasePDF: purchaseUpload ?  purchaseUpload.url : null,
    status: 'Draft',
    searchKeyWords:[values.customer.toLowerCase() , values.supplier.toLowerCase() , number.toLowerCase()]
  };
    const ref = await this.invoicesService.addInvoice(invoice);
    this.modal.close();
     this.spinner.hide();
       this.toastr.success(
       this.translate.instant( 'Invoice added successfully'),
       this.translate.instant("Success"),
    { timeOut: 3000 }
  );
      
    }
  } catch (e) {
    console.error('Upload failed:', e);
    this.toastr.error(this.translate.instant('File upload failed'), this.translate.instant('Error'), { timeOut: 3000 });
    this.spinner.hide();
    return; // stop if uploads failed
  }
  


  
  }
 
}


private makeInvoiceNumber() {
  // e.g. INV-2025-09-16-001
  const uniquePart = Date.now();
  return `INV-${uniquePart}`;
}


  onSalesInvoiceFileChange(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    this.salesInvoiceFile = input.files[0];
        }
  }

   onPurchaseInvoiceFileChange(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    this.purchaseInvoiceFile = input.files[0];
        }
  }


  getEmployees(){
    this.employeeService.getAllEmployees().subscribe(employees => {
   this.employees = employees;
});
  }

       


}
