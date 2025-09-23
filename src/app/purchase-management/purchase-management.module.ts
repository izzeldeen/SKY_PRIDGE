import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDatepickerModule, NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMatIntlTelInputComponent } from 'ngx-mat-intl-tel-input';
import { MultiSelectModule } from 'primeng/multiselect';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { DropdownModule } from 'primeng/dropdown';
import { FormWizardModule } from '../shared/components/form-wizard/form-wizard.module';
import { StepsModule } from 'primeng/steps';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { SharedModule } from '../shared/shared.module';
import { PurchaseManagementRoutingModule } from './purchase-management-routing.module';
import { PurchaseInvoiceListComponent } from './purchase-invoice-list/purchase-invoice-list.component';
import { PurchaseInvoiceFormComponent } from './purchase-invoice-list/purchase-invoice-form/purchase-invoice-form.component';
import { PurchasePendingInvoiceComponent } from './purchase-pending-invoice/purchase-pending-invoice.component';
import { PurchaseInstallmentComponent } from './purchase-installment/purchase-installment.component';
import { PurchaseRequestInvoiceComponent } from './purchase-request-invoice/purchase-request-invoice.component';
import { PurchaseRequestInvoiceFormComponent } from './purchase-request-invoice/purchase-request-invoice-form/purchase-request-invoice-form.component';
import { PurchaseRequestConvertInvoiceComponent } from './purchase-request-convert-invoice/purchase-request-convert-invoice.component';
import { CompanyManagementModule } from '../company-management/company-management.module';
import { InvoiceManagementModule } from '../invoice-management/invoice-management.module';




@NgModule({
  declarations: [
 PurchaseInvoiceListComponent,
 PurchaseInvoiceFormComponent,
 PurchasePendingInvoiceComponent,
 PurchaseInstallmentComponent,
 PurchaseRequestInvoiceComponent,
 PurchaseRequestInvoiceFormComponent,
 PurchaseRequestConvertInvoiceComponent
  ],
  imports: [
       CommonModule,
        NgbNavModule,
        NgxPaginationModule,
        SharedModule,
        ReactiveFormsModule,
        NgxMatIntlTelInputComponent,
        PurchaseManagementRoutingModule,
        MultiSelectModule,
        NgbModule,
        MatFormFieldModule,
        MatSelectModule,
        DropdownModule,
        NgbDatepickerModule,
        FormWizardModule,
        FormsModule,
        StepsModule,
        AutoCompleteModule,
        CompanyManagementModule,
        InvoiceManagementModule
  ]
})
export class PurchaseManagementModule { }
