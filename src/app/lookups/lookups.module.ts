import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LookupsListComponent } from './lookups-list/lookups-list.component';
import { AddEditLookupsComponent } from './lookups-list/add-edit-lookups/add-edit-lookups.component';
import { SharedModule } from '../shared/shared.module';
import { LookupsRoutingModule } from './lookups-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule
(
  {
    declarations: 
    [
      LookupsListComponent,
      AddEditLookupsComponent,
    ],
    imports: 
    [
      CommonModule,
      SharedModule,
      LookupsRoutingModule,
      ReactiveFormsModule
    ]
  }
)
export class LookupsModule {}