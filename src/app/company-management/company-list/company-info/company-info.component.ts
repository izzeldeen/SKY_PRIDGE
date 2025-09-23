import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseService } from 'src/app/shared/services/base.service';

@Component({
  selector: 'app-company-info',
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.scss']
})
export class CompanyInfoComponent  implements OnInit {
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
    this.baseService.Get("Company", "Get/" + id).subscribe((res) => {
      this.entity = res;
    });
  }


}
