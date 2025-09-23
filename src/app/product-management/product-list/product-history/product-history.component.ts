import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseService } from 'src/app/shared/services/base.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-product-history',
  templateUrl: './product-history.component.html',
  styleUrls: ['./product-history.component.scss']
})
export class ProductHistoryComponent {
productId:any;
product:any;
baseUrl = environment.attachmentUrl;
imageLogoPath:string;
constructor(private route: ActivatedRoute,private baseService:BaseService,public router:Router) {
  
  this.route.params.subscribe((params) => {
      this.productId = params["id"];
      this.getProduct();
    });
}

 private getProduct() {
    this.baseService.Get('Product', `Get/${this.productId}`).subscribe
      (res => {
        this.product = res as any;
        this.imageLogoPath = this.baseUrl +  this.product.imagePath;
      })
  }
}
