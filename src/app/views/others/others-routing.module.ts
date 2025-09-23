import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { AttachmentsComponent } from './attachments/attachments.component';

const routes: Routes = [
    {
        path: '404',
        component: NotFoundComponent
    },
    {
        path: 'attachments',
        component: AttachmentsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OthersRoutingModule { }
