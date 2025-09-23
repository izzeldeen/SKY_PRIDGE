import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseService } from 'src/app/shared/services/base.service';

@Component({
  selector: 'app-transaction-info',
  templateUrl: './transaction-info.component.html',
  styleUrls: ['./transaction-info.component.scss']
})
export class TransactionInfoComponent {
Id:number;
entity:any;
    constructor(
      private baseService: BaseService,
      public router: Router,
      private route: ActivatedRoute
    ) {}


    ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.Id = params["id"];
        this.getById(this.Id);
    });
  }
    getById(id) {
    this.baseService.Get("Transaction", "Get/" + id).subscribe((res) => {
      this.entity = res;
    });
  }
}
