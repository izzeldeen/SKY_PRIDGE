import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OthersRoutingModule } from './others-routing.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { AttachmentsComponent } from './attachments/attachments.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import {AttachmentItemComponent } from './attachments/attachment-item/attachment-item.component';

const components = [
    AttachmentItemComponent
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    OthersRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [NotFoundComponent, AttachmentsComponent, AttachmentItemComponent],
  exports: components
})
export class OthersModule { }
