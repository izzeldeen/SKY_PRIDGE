import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolesListComponent } from './roles-list/roles-list.component';
import { AddEditRolesComponent } from './roles-list/add-edit-roles/add-edit-roles.component';
import { UsersComponent } from './users/users.component';
import { AddEditUsersComponent } from './users/add-edit-users/add-edit-users.component';
import { SharedModule } from '../shared/shared.module';
import { UserManagmentRoutingModule } from './user-managment-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMatIntlTelInputComponent } from 'ngx-mat-intl-tel-input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MultiSelectModule } from 'primeng/multiselect';
import { ChangePasswordComponent } from './users/change-password/change-password.component';
import { NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { PermissionsListComponent } from './permissions-list/permissions-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { DropdownModule } from 'primeng/dropdown';
@NgModule
(
  {
    declarations: 
    [
      RolesListComponent,
      AddEditRolesComponent,
      UsersComponent,
      AddEditUsersComponent,
      ChangePasswordComponent,
      PermissionsListComponent,
    ],
    imports: 
    [
      CommonModule,
      NgbNavModule,
      NgxPaginationModule,
      SharedModule,
      ReactiveFormsModule,
      NgxMatIntlTelInputComponent,
      UserManagmentRoutingModule,
      MultiSelectModule,
      NgbModule,
      MatFormFieldModule,
      MatSelectModule,
      DropdownModule
    ]
  }
)
export class UserManagmentModule {}