import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { WarehouseBalanceListComponent } from './warehouse-balance-list/warehouse-balance-list.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { WarehouseListComponent } from './warehouse-list/warehouse-list.component';
import { WarehouseSectionsListComponent } from './warehouse-sections-list/warehouse-sections-list.component';
import { TransactionInfoComponent } from './transaction-list/transaction-info/transaction-info.component';
import { InventoryCountingComponent } from './inventory-counting/inventory-counting.component';
import { ProductHistoryComponent } from './product-list/product-history/product-history.component';
import { UnitOfMeasureListComponent } from './unit-of-measure-list/unit-of-measure-list.component';


const routes: Routes =
  [
    { path: 'unit-measure', component: UnitOfMeasureListComponent },
    { path: 'warehouse', component: WarehouseListComponent },
    { path: 'warehouse-sections', component: WarehouseSectionsListComponent },
    { path: 'products', component: ProductListComponent },
    {path:'products/history/:id' , component:ProductHistoryComponent},
    { path: 'warehouse-balance', component: WarehouseBalanceListComponent },
    { path: 'transaction', component: TransactionListComponent },
    { path: 'transaction/:id', component: TransactionInfoComponent },
    { path: 'inventory-counting', component: InventoryCountingComponent }
   
    
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductManagementRoutingModule { }
