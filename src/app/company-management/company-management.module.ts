import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyListComponent } from './company-list/company-list.component';
import { CompanyFormComponent } from './company-list/company-form/company-form.component';
import { CompanyManagementRoutingModule } from './company-management-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { NgbDatepickerModule, NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxMatIntlTelInputComponent } from 'ngx-mat-intl-tel-input';
import { MultiSelectModule } from 'primeng/multiselect';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { DropdownModule } from 'primeng/dropdown';
import { BranchListComponent } from './branch-list/branch-list.component';
import { BranchFormComponent } from './branch-list/branch-form/branch-form.component';
import { CompanyInfoComponent } from './company-list/company-info/company-info.component';
import { CustomersListComponent } from './customers-list/customers-list.component';
import { CustomersFormComponent } from './customers-list/customers-form/customers-form.component';
import { SuppliersListComponent } from './suppliers-list/suppliers-list.component';
import { SuppliersFormComponent } from './suppliers-list/suppliers-form/suppliers-form.component';
import { CustomerHistoryComponent } from './customers-list/customer-history/customer-history.component';
import { TabViewModule } from 'primeng/tabview';
import { CustomerHistoryInvoiceComponent } from './customers-list/customer-history/customer-history-invoice/customer-history-invoice.component';
import { CustomerHistoryTransactionComponent } from './customers-list/customer-history/customer-history-transaction/customer-history-transaction.component';
import { CustomerHistoryInstallmentComponent } from './customers-list/customer-history/customer-history-installment/customer-history-installment.component';
import { SupplierHistoryComponent } from './suppliers-list/supplier-history/supplier-history.component';
import { SupplierHistoryInvoiceComponent } from './suppliers-list/supplier-history/supplier-history-invoice/supplier-history-invoice.component';
import { SupplierHistoryTransactionComponent } from './suppliers-list/supplier-history/supplier-history-transaction/supplier-history-transaction.component';
import { SupplierHistoryInstallmentsComponent } from './suppliers-list/supplier-history/supplier-history-installments/supplier-history-installments.component';

@NgModule({
  declarations: [
    CompanyListComponent,
    CompanyFormComponent,
    BranchListComponent,
    BranchFormComponent,
    CompanyInfoComponent,
    CustomersListComponent,
    CustomersFormComponent,
    SuppliersListComponent,
    SuppliersFormComponent,
    CustomerHistoryComponent,
    CustomerHistoryInvoiceComponent,
    CustomerHistoryTransactionComponent,
    CustomerHistoryInstallmentComponent,
    SupplierHistoryComponent,
    SupplierHistoryInvoiceComponent,
    SupplierHistoryTransactionComponent,
    SupplierHistoryInstallmentsComponent
  ],
  imports: [
    CommonModule,
    NgbNavModule,
    NgxPaginationModule,
    SharedModule,
    ReactiveFormsModule,
    NgxMatIntlTelInputComponent,
    CompanyManagementRoutingModule,
    MultiSelectModule,
    NgbModule,
    MatFormFieldModule,
    MatSelectModule,
    DropdownModule,
    NgbDatepickerModule,
    TabViewModule
  ],
  exports:[CompanyFormComponent , CustomersFormComponent , SuppliersFormComponent]
})
export class CompanyManagementModule { }
