import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LookupsListComponent } from './lookups-list/lookups-list.component';
const routes: Routes =
  [
    { path: 'nationality/:typeId', component: LookupsListComponent },
    { path: 'currency/:typeId', component: LookupsListComponent },
    { path: 'preferred-language/:typeId', component: LookupsListComponent },
    { path: 'tax-management/:typeId', component: LookupsListComponent },
    { path: 'category/:typeId', component: LookupsListComponent },
    { path: 'unitOfMeasure/:typeId', component: LookupsListComponent },
    { path: 'customerType/:typeId', component: LookupsListComponent },
    { path: 'sectionType/:typeId', component: LookupsListComponent },
    { path: 'brand/:typeId', component: LookupsListComponent }

  ];
@NgModule
  (
    {
      imports: [RouterModule.forChild(routes)],
      exports: [RouterModule]
    }
  )
export class LookupsRoutingModule { }