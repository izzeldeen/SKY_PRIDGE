import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseService } from 'src/app/shared/services/base.service';

@Component({
  selector: 'app-customer-history',
  templateUrl: './customer-history.component.html',
  styleUrls: ['./customer-history.component.scss']
})
export class CustomerHistoryComponent {
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

  navigateToList(){

  }
}
