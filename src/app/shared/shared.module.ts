import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchModule } from './components/search/search.module';
import { SharedComponentsModule } from './components/shared-components.module';
import { SharedDirectivesModule } from './directives/shared-directives.module';
import { SharedPipesModule } from './pipes/shared-pipes.module';
import {  HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TableComponent } from './components/table/table.component';
import { PaggerComponent } from './components/pagger/pagger.component';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { NotDataComponent } from './components/not-data/not-data.component';
import { ProductLineItemsComponent } from './components/product-line-items/product-line-items.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { InstallmentComponent } from './components/installment/installment.component';
import { PrintReportComponent } from './components/print-report/print-report.component';
import { TooltipModule } from 'primeng/tooltip';
import { AddProductPopupComponent } from './components/add-product-popup/add-product-popup.component';
import { StepsModule } from 'primeng/steps';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    TableComponent,
    PaggerComponent,
    NotDataComponent,
    ProductLineItemsComponent,
    InstallmentComponent,
    PrintReportComponent,
    AddProductPopupComponent
  ],
  imports: [
    CommonModule,
    // PerfectScrollbarModule,
    SearchModule,
    NgbModule,
    SharedComponentsModule,
    SharedDirectivesModule,
    SharedPipesModule,
    ReactiveFormsModule,
    FormsModule,
    NgbNavModule,
    RouterModule,
        AutoCompleteModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      isolate: false
    }),
    TooltipModule,
     StepsModule
  ],
  exports: [TableComponent, TranslateModule,PaggerComponent , ProductLineItemsComponent ,InstallmentComponent , PrintReportComponent,AddProductPopupComponent],
  providers: [JwtHelperService, 
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    
  ]
})
export class SharedModule { }
