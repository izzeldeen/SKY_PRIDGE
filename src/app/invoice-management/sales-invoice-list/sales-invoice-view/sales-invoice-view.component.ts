import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-sales-invoice-view',
  templateUrl: './sales-invoice-view.component.html',
  styleUrls: ['./sales-invoice-view.component.scss']
})
export class SalesInvoiceViewComponent  {
@Input() entity:any;
@Input() modal: any = null;




}
