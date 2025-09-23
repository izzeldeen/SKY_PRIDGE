import { NgModule } from '@angular/core';
import { SalesInvoiceFormComponent } from './sales-invoice-list/sales-invoice-form/sales-invoice-form.component';
import { SalesInvoiceListComponent } from './sales-invoice-list/sales-invoice-list.component';
import { RouterModule, Routes } from '@angular/router';
import { PendingDeliveryInvoicesComponent } from './pending-delivery-invoices/pending-delivery-invoices.component';
import { InvoiceInstallmentComponent } from './invoice-installment/invoice-installment.component';
import { QuotationInvoiceFormComponent } from './quotation-invoice-list/quotation-invoice-form/quotation-invoice-form.component';
import { QuotationInvoiceListComponent } from './quotation-invoice-list/quotation-invoice-list.component';
import { ConvertQuotationComponent } from './convert-quotation/convert-quotation.component';
import { InvoiceViewComponent } from './invoice-view/invoice-view.component';




const routes: Routes =
  [
    { path: 'sales-invoice', component: SalesInvoiceListComponent },
    { path: 'sales-invoice/form', component: SalesInvoiceFormComponent },
    { path: 'sales-invoice/form/:id', component: SalesInvoiceFormComponent },
    { path: 'sales-invoice/pending-delivery-invoices', component: PendingDeliveryInvoicesComponent },
    { path: 'sales-invoice/installments', component: InvoiceInstallmentComponent },
    { path: 'quotation', component: QuotationInvoiceListComponent },
    { path: 'quotation/form', component: QuotationInvoiceFormComponent },
    { path: 'quotation/form/:id', component: QuotationInvoiceFormComponent },
    { path: 'quotation/convert', component: ConvertQuotationComponent },
    { path: 'invoice/view/:id', component: InvoiceViewComponent },
    { path: 'invoice/view/:id/:type', component: InvoiceViewComponent }




    


  ];


@NgModule
  (
    {
      imports: [RouterModule.forChild(routes)],
      exports: [RouterModule]
    }
  )
export class InvoiceManagementRoutingModule { }
