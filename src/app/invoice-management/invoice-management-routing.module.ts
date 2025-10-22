import { NgModule } from '@angular/core';
import { SalesInvoiceListComponent } from './sales-invoice-list/sales-invoice-list.component';
import { RouterModule, Routes } from '@angular/router';
import { CostInvoiceListComponent } from './cost-invoice-list/cost-invoice-list.component';





const routes: Routes =
  [
    { path: 'sales-invoice', component: SalesInvoiceListComponent },
    { path: 'cost-invoice', component: CostInvoiceListComponent }
  ];


@NgModule
  (
    {
      imports: [RouterModule.forChild(routes)],
      exports: [RouterModule]
    }
  )
export class InvoiceManagementRoutingModule { }
