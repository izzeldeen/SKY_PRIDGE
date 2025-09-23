import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { NgbDatepickerModule, NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxMatIntlTelInputComponent } from 'ngx-mat-intl-tel-input';
import { MultiSelectModule } from 'primeng/multiselect';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { DropdownModule } from 'primeng/dropdown';
import { ProductManagementRoutingModule } from './product-management-routing.module';
import { FormWizardModule } from '../shared/components/form-wizard/form-wizard.module';
import { StepsModule } from 'primeng/steps';
import { WarehouseBalanceListComponent } from './warehouse-balance-list/warehouse-balance-list.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { TransactionFormComponent } from './transaction-list/transaction-form/transaction-form.component';
import { WarehouseFormComponent } from './warehouse-list/warehouse-form/warehouse-form.component';
import { WarehouseListComponent } from './warehouse-list/warehouse-list.component';
import { WarehouseSectionsListComponent } from './warehouse-sections-list/warehouse-sections-list.component';
import { WarehouseSectionsFormComponent } from './warehouse-sections-list/warehouse-sections-form/warehouse-sections-form.component';
import { TransactionInfoComponent } from './transaction-list/transaction-info/transaction-info.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { InventoryCountingComponent } from './inventory-counting/inventory-counting.component';
import { TabViewModule } from 'primeng/tabview';
import { ProductHistoryComponent } from './product-list/product-history/product-history.component';
import { ProductStatisticsComponent } from './product-list/product-history/product-statistics/product-statistics.component';
import { ProductSalesCustomerComponent } from './product-list/product-history/product-sales-customer/product-sales-customer.component';
import { ProductPurchaseSupplierComponent } from './product-list/product-history/product-purchase-supplier/product-purchase-supplier.component';
import { UnitOfMeasureListComponent } from './unit-of-measure-list/unit-of-measure-list.component';
import { UnitOfMeasureFormComponent } from './unit-of-measure-list/unit-of-measure-form/unit-of-measure-form.component';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductFormComponent,
    WarehouseBalanceListComponent,
    TransactionListComponent,
    TransactionFormComponent,
    WarehouseFormComponent,
    WarehouseListComponent,
    WarehouseSectionsListComponent,
    WarehouseSectionsFormComponent,
    TransactionInfoComponent,
    InventoryCountingComponent,
    ProductHistoryComponent,
    ProductStatisticsComponent,
    ProductSalesCustomerComponent,
    ProductPurchaseSupplierComponent,
    UnitOfMeasureListComponent,
    UnitOfMeasureFormComponent
  ],
  imports: [
    CommonModule,
    NgbNavModule,
    NgxPaginationModule,
    SharedModule,
    ReactiveFormsModule,
    NgxMatIntlTelInputComponent,
    ProductManagementRoutingModule,
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
    TabViewModule
  ],
  exports:[]
})
export class ProductManagementModule { }
