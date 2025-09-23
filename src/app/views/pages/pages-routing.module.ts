import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ProductTypeComponent } from './product-type/product-type.component';
import { AirwaybillsComponent } from './airwaybills/airwaybills.component'
import { WaybillComponent } from './waybill/waybill.component'
import { ContainersComponent } from './containers/containers.component'
import { ContainerComponent } from './container/container.component'
import { ShipmentsComponent } from './shipments/shipments.component'
import { ShipmentDetailComponent } from './shipment-detail/shipment-detail.component'
import { BulkUploadComponent } from './bulk-upload/bulk-upload.component'
import { ShipmentNewComponent } from './shipment-new/shipment-new.component';
import { FileNameComponent } from './file-name/file-name.component'
import { EventMappingComponent } from './event-mapping/event-mapping.component'
import { EventMappingNewComponent } from './event-mapping/event-mapping-new/event-mapping-new.component'
import { EventMappingSupplierComponent } from './event-mapping/event-mapping-supplier/event-mapping-supplier.component'
import { EventMappingEditComponent } from './event-mapping/event-mapping-edit/event-mapping-edit.component'

const routes: Routes = [
    {
        path: 'profile',
        component: UserProfileComponent
    },
    {
        path: 'product-type',
        component: ProductTypeComponent
    },
    {
        path: 'shipments',
        component: ShipmentsComponent
    },
    {
        path: 'shipments/shipment-detail',
        component: ShipmentDetailComponent
    },
    {
        path: 'airwaybills',
        component: AirwaybillsComponent
    },
    {
        path: 'airwaybills/waybill',
        component: WaybillComponent
    },
    {
        path: 'containers',
        component: ContainersComponent
    },
    {
        path: 'containers/container',
        component: ContainerComponent
    },
    {
        path: 'shipments/bulk-upload',
        component: BulkUploadComponent
    },
    {
        path: 'shipments/shipment-new',
        component: ShipmentNewComponent
    },
    {
        path: 'shipments/file-name',
        component: FileNameComponent
    },
    {
        path: 'event-mapping',
        component: EventMappingComponent
    },
    {
        path: 'event-mapping-new',
        component: EventMappingNewComponent
    },
    {
        path: 'event-mapping-supplier',
        component: EventMappingSupplierComponent
    },
    {
        path: 'event-mapping-supplier/event-mapping-edit',
        component: EventMappingEditComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
