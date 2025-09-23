import { Component } from '@angular/core';
import { BaseService } from 'src/app/shared/services/base.service';

@Component({
  selector: 'app-product-statistics-dashboard',
  templateUrl: './product-statistics-dashboard.component.html',
  styleUrls: ['./product-statistics-dashboard.component.scss']
})
export class ProductStatisticsDashboardComponent {
  model:any;
  constructor(private baseService:BaseService) { }

  ngOnInit(): void {
  }

 
}
