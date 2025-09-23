import { NgModule } from '@angular/core';
import { PurchaseInvoiceListComponent } from './purchase-invoice-list/purchase-invoice-list.component';
import { PurchaseInvoiceFormComponent } from './purchase-invoice-list/purchase-invoice-form/purchase-invoice-form.component';
import { RouterModule, Routes } from '@angular/router';
import { PurchasePendingInvoiceComponent } from './purchase-pending-invoice/purchase-pending-invoice.component';
import { PurchaseInstallmentComponent } from './purchase-installment/purchase-installment.component';
import { PurchaseRequestInvoiceComponent } from './purchase-request-invoice/purchase-request-invoice.component';
import { PurchaseRequestInvoiceFormComponent } from './purchase-request-invoice/purchase-request-invoice-form/purchase-request-invoice-form.component';
import { PurchaseRequestConvertInvoiceComponent } from './purchase-request-convert-invoice/purchase-request-convert-invoice.component';


const routes: Routes =
  [
    { path: 'purchase-invoice', component: PurchaseInvoiceListComponent },
    { path: 'purchase-invoice/form', component: PurchaseInvoiceFormComponent },
    { path: 'purchase-invoice/form/:id', component: PurchaseInvoiceFormComponent },
    { path: 'purchase-invoice/pending', component: PurchasePendingInvoiceComponent },
    { path: 'purchase-invoice/installments', component: PurchaseInstallmentComponent },
    { path: 'purchase-request-invoice', component: PurchaseRequestInvoiceComponent },
    { path: 'purchase-request-invoice/form', component: PurchaseRequestInvoiceFormComponent },
    { path: 'purchase-request-invoice/form/:id', component: PurchaseRequestInvoiceFormComponent },
    { path: 'purchase-request-convert-invoice', component: PurchaseRequestConvertInvoiceComponent }




  ];

@NgModule
  (
    {
      imports: [RouterModule.forChild(routes)],
      exports: [RouterModule]
    }
  )
export class PurchaseManagementRoutingModule { }
