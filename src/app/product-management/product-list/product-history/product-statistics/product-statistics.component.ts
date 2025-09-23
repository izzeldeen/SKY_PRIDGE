import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BaseService } from 'src/app/shared/services/base.service';

@Component({
  selector: 'app-product-statistics',
  templateUrl: './product-statistics.component.html',
  styleUrls: ['./product-statistics.component.scss']
})
export class ProductStatisticsComponent implements OnChanges {
  @Input() productId:any;
  statisticsModel:any;
public searchForm = new FormGroup
  (
    {
      dateFrom:new FormControl(null),
      dateTo:new FormControl(null)

    }
  )
 baseSearch = 
  {
    dateFrom:null,
    dateTo:null,
    productId:null
  }

  constructor(private baseService:BaseService){}
  ngOnChanges(changes: SimpleChanges): void {
    if(this.productId > 0){
      this.onSearch();
    }
  }
  onSearch(){
    this.baseSearch.productId = this.productId;
     let searchFormValue = this.searchForm?.getRawValue();
    if(searchFormValue){
   
    
let pad = (n: number) => n.toString().padStart(2, '0');
   if(searchFormValue.dateFrom){
       this.baseSearch.dateFrom = `${searchFormValue.dateFrom.year}-${pad(searchFormValue.dateFrom.month)}-${pad(searchFormValue.dateFrom.day)}`;
    }
     if(searchFormValue.dateTo){
             this.baseSearch.dateTo = `${searchFormValue.dateTo.year}-${pad(searchFormValue.dateTo.month)}-${pad(searchFormValue.dateTo.day)}`;
    }

  }

  this.baseService.Post('Product' , 'GetProductStatistics' , this.baseSearch).subscribe(res => {
    this.statisticsModel = res;
  })
  }
  resetSearchForm(){
    this.searchForm.reset();
    this.baseSearch.dateFrom= null;
    this.baseSearch.dateTo = null;
  }
}
