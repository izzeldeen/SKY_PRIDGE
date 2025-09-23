import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductBarcodesComponent } from './product-barcodes/product-barcodes.component';

const routes: Routes =
  [
    { path: '', component: ProductBarcodesComponent },
    { path: 'productBarcodes', component: ProductBarcodesComponent },
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { } 
