import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxPaginationModule } from 'ngx-pagination';

import { PagesRoutingModule } from './pages-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormWizardModule } from 'src/app/shared/components/form-wizard/form-wizard.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ProductTypeComponent } from './product-type/product-type.component';
import { AirwaybillsComponent } from './airwaybills/airwaybills.component'
import { WaybillComponent } from './waybill/waybill.component'
import { ContainersComponent } from './containers/containers.component'
import { ContainerComponent } from './container/container.component'
import { ShipmentsComponent } from './shipments/shipments.component'
import { ShipmentDetailComponent } from './shipment-detail/shipment-detail.component';
import { BulkUploadComponent } from './bulk-upload/bulk-upload.component';
import { ShipmentNewComponent } from './shipment-new/shipment-new.component';
import { FileNameComponent } from './file-name/file-name.component'
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { AttachmentModalItemComponent } from './shipment-detail/components/attachment-modal-item/attachment-modal-item.component';
import { AttachmentStepItemComponent } from './shipment-new/components/attachment-step-item/attachment-step-item.component';
import { EventMappingStep2Component } from './event-mapping/components/event-mapping-step2/event-mapping-step2.component';
import { EventMappingComponent } from './event-mapping/event-mapping.component';
import { EventMappingNewComponent } from './event-mapping/event-mapping-new/event-mapping-new.component';
import { EventMappingSupplierComponent } from './event-mapping/event-mapping-supplier/event-mapping-supplier.component';
import { EventMappingEditComponent } from './event-mapping/event-mapping-edit/event-mapping-edit.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarModule } from 'primeng/calendar';
import { MatSelectCountryModule } from "@angular-material-extensions/select-country";
import { HttpClientModule } from '@angular/common/http';
import { NgxMatIntlTelInputComponent } from 'ngx-mat-intl-tel-input';
import { SharedModule } from 'src/app/shared/shared.module';
import { CompanyManagementModule } from 'src/app/company-management/company-management.module';

@NgModule({
  imports: [
    CommonModule,
    NgxDatatableModule,
    NgxPaginationModule,
    PagesRoutingModule,
    FormWizardModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    CalendarModule,
    MatSelectCountryModule.forRoot('en'),
    NgxMatIntlTelInputComponent,
    HttpClientModule,
    CompanyManagementModule
  ],
  declarations: [
    EventMappingNewComponent,
    UserProfileComponent, 
    ProductTypeComponent, 
    AirwaybillsComponent, 
    WaybillComponent, 
    ContainersComponent,
    ContainerComponent,
    ShipmentsComponent, 
    ShipmentDetailComponent,
    BulkUploadComponent,
    ShipmentNewComponent,
    FileNameComponent,
    AttachmentModalItemComponent,
    AttachmentStepItemComponent,
    ProgressBarComponent,
    EventMappingStep2Component,
    EventMappingComponent,
    EventMappingSupplierComponent,
    EventMappingEditComponent
  ]
})
export class PagesModule { }