import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { NgbDatepickerModule, NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxMatIntlTelInputComponent } from 'ngx-mat-intl-tel-input';
import { MultiSelectModule } from 'primeng/multiselect';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { DropdownModule } from 'primeng/dropdown';
import { FormWizardModule } from '../shared/components/form-wizard/form-wizard.module';
import { StepsModule } from 'primeng/steps';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { TabViewModule } from 'primeng/tabview';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ReportManagementListComponent } from './report-management-list/report-management-list.component';
import { ReportManagementRoutingModule } from './report-management-routing.module';
import { ProductBarcodesComponent } from '../reports/product-barcodes/product-barcodes.component';
import { SalesPeriodReportComponent } from './sales-period-report/sales-period-report.component';
import { SalesCustomerReportComponent } from './sales-customer-report/sales-customer-report.component';
import { SalesInstallmentFollowupComponent } from './sales-installment-followup/sales-installment-followup.component';
import { PurchaseStatusReportComponent } from './purchase-status-report/purchase-status-report.component';
import { PurchaseSupplierReportComponent } from './purchase-supplier-report/purchase-supplier-report.component';
import { PurchaseInstallmentFollowupComponent } from './purchase-installment-followup/purchase-installment-followup.component';
import { PurchasePeriodReportComponent } from './purchase-period-report/purchase-period-report.component';



@NgModule({
  declarations: [
    ReportManagementListComponent,
    ProductBarcodesComponent,
    SalesPeriodReportComponent,
    SalesCustomerReportComponent,
    SalesInstallmentFollowupComponent,
    PurchaseStatusReportComponent,
    PurchaseSupplierReportComponent,
    PurchaseInstallmentFollowupComponent,
    PurchasePeriodReportComponent
  ],
  imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        NgxPaginationModule,
        NgxDatatableModule,
        NgbModule,
        NgbNavModule,
        ReactiveFormsModule,
        NgbModule,
        FormsModule,
        StepsModule,
        NgxMatIntlTelInputComponent,
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
        TabViewModule,
        ReportManagementRoutingModule
  ]
})
export class ReportManagementModule { }
