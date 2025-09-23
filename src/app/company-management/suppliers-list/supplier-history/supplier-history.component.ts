import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseService } from 'src/app/shared/services/base.service';

@Component({
  selector: 'app-supplier-history',
  templateUrl: './supplier-history.component.html',
  styleUrls: ['./supplier-history.component.scss']
})
export class SupplierHistoryComponent {
customerId:number;
customer:any;


constructor(private route: ActivatedRoute,private baseService:BaseService,public router:Router) {
  
  this.route.params.subscribe((params) => {
      this.customerId = params["id"];
      this.GetCustomer();
    });
}

 private GetCustomer() {
    this.baseService.Get('customers', `Get/${this.customerId}`).subscribe
      (res => {
        this.customer = res;
      })
  }
}
