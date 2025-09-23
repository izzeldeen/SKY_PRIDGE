import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesInvoiceListComponent } from './sales-invoice-list/sales-invoice-list.component';
import { SalesInvoiceFormComponent } from './sales-invoice-list/sales-invoice-form/sales-invoice-form.component';
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
import { InvoiceManagementRoutingModule } from './invoice-management-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PendingDeliveryInvoicesComponent } from './pending-delivery-invoices/pending-delivery-invoices.component';
import { InvoiceInstallmentComponent } from './invoice-installment/invoice-installment.component';
import { QuotationInvoiceListComponent } from './quotation-invoice-list/quotation-invoice-list.component';
import { QuotationInvoiceFormComponent } from './quotation-invoice-list/quotation-invoice-form/quotation-invoice-form.component';
import { ConvertQuotationComponent } from './convert-quotation/convert-quotation.component';
import { InvoiceViewComponent } from './invoice-view/invoice-view.component';
import { CompanyManagementModule } from '../company-management/company-management.module';
import { InvoicesService } from '../shared/services/invoice.service';
import { SalesInvoiceViewComponent } from './sales-invoice-list/sales-invoice-view/sales-invoice-view.component';
import { ChangeInvoiceStatusComponent } from './sales-invoice-list/change-invoice-status/change-invoice-status.component';



@NgModule({
  declarations: [
    SalesInvoiceListComponent,
    SalesInvoiceFormComponent,
    PendingDeliveryInvoicesComponent,
    InvoiceInstallmentComponent,
    QuotationInvoiceListComponent,
    QuotationInvoiceFormComponent,
    ConvertQuotationComponent,
    InvoiceViewComponent,
    SalesInvoiceViewComponent,
    ChangeInvoiceStatusComponent
  ],
  imports: [
       CommonModule,
        NgbNavModule,
        NgxPaginationModule,
        SharedModule,
        ReactiveFormsModule,
        NgxMatIntlTelInputComponent,
        InvoiceManagementRoutingModule,
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
        CompanyManagementModule
  ],
  exports:[InvoiceViewComponent],
  providers:[InvoicesService]
})
export class InvoiceManagementModule { }
