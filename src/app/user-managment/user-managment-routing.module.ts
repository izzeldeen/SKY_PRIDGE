import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { RolesListComponent } from './roles-list/roles-list.component';
import { PermissionsListComponent } from './permissions-list/permissions-list.component';
const routes: Routes = 
[
  { path: 'users', component: UsersComponent },
  { path: 'roles', component: RolesListComponent },
  { path: 'permissions', component: PermissionsListComponent },
];
@NgModule
(
  {
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  }
)
export class UserManagmentRoutingModule {}