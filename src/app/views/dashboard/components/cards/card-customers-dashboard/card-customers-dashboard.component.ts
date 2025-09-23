import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseService } from 'src/app/shared/services/base.service';
import { InvoicesService } from 'src/app/shared/services/invoice.service';

@Component({
  selector: 'app-card-customers-dashboard',
  templateUrl: './card-customers-dashboard.component.html',
  styleUrls: ['./card-customers-dashboard.component.scss']
})
export class CardCustomersDashboardComponent implements OnInit {
  model:any;
  constructor(private baseService:BaseService,
    private invoiceService:InvoicesService,
        private spinner: NgxSpinnerService,
    private router:Router) { }

  ngOnInit(): void {
  this.getInvoiceStatistics();
  }

  getInvoiceStatistics(){
    this.spinner.show();
      this.invoiceService.getInvoicesTotals().subscribe(res => {
        this.model = res;
        this.spinner.hide();
      })
  }

  


}
