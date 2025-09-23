import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductBarcodesComponent } from '../reports/product-barcodes/product-barcodes.component';
import { ReportManagementListComponent } from './report-management-list/report-management-list.component';
import { SalesPeriodReportComponent } from './sales-period-report/sales-period-report.component';
import { SalesCustomerReportComponent } from './sales-customer-report/sales-customer-report.component';
import { SalesInstallmentFollowupComponent } from './sales-installment-followup/sales-installment-followup.component';
import { PurchaseStatusReportComponent } from './purchase-status-report/purchase-status-report.component';
import { PurchaseSupplierReportComponent } from './purchase-supplier-report/purchase-supplier-report.component';
import { PurchaseInstallmentFollowupComponent } from './purchase-installment-followup/purchase-installment-followup.component';
import { PurchasePeriodReportComponent } from './purchase-period-report/purchase-period-report.component';


const routes: Routes =
  [
    { path: 'productBarcodes', component: ProductBarcodesComponent },
    { path: 'sales-invoice-report', component: ReportManagementListComponent },
    { path: 'sales-period-report', component: SalesPeriodReportComponent },
    { path: 'sales-customer-report', component: SalesCustomerReportComponent },
    { path: 'sales-installment-followup-report', component: SalesInstallmentFollowupComponent },
    { path: 'purchase-status-report', component: PurchaseStatusReportComponent },
    { path: 'purchase-supplier-report', component: PurchaseSupplierReportComponent },
    { path: 'purchase-installment-followup-report', component: PurchaseInstallmentFollowupComponent },
    { path: 'purchase-period-report', component: PurchasePeriodReportComponent }


    


  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportManagementRoutingModule { }
