import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountsRoutingModule } from './accounts-routing.module';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './user/user.component';
import { RolesComponent } from './roles/roles.component';
import { RoleComponent } from './role/role.component';
import { PermissionsComponent } from './permissions/permissions.component';
import { NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMatIntlTelInputComponent } from 'ngx-mat-intl-tel-input';
import { TableComponent } from 'src/app/shared/components/table/table.component';
import { SharedComponentsModule } from 'src/app/shared/components/shared-components.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    UsersComponent,
    UserComponent,
    RolesComponent,
    RoleComponent,
    PermissionsComponent
  ],
  imports: [
    CommonModule,
    AccountsRoutingModule,
    NgbModule,
    NgbNavModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMatIntlTelInputComponent,
  ],
})
export class AccountsModule { }