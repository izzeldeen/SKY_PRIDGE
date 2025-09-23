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
import { ReportsRoutingModule } from './reports-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgxDatatableModule,
    NgbModule,
    ReportsRoutingModule,
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
    TabViewModule
  ],
  declarations: [
  ]
})

export class ReportsModule { }
