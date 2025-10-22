import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Cost } from 'src/app/shared/models/cost.model';
import { CostInvoicesService } from 'src/app/shared/services/cost.service';

@Component({
  selector: 'app-cost-invoice-form',
  templateUrl: './cost-invoice-form.component.html',
  styleUrls: ['./cost-invoice-form.component.scss']
})
export class CostInvoiceFormComponent {
    @Input() modal: any = null;
    isFormSubmitted :boolean = false;
     form = new FormGroup
            (
              {
                id: new FormControl(0),
                description:new FormControl('', [Validators.required ]),
                amount:new FormControl(0, [Validators.required , Validators.min(0)])
              }
            );
    
            constructor(  private translate: TranslateService,
                    private toastr: ToastrService,
                    private spinner: NgxSpinnerService,
                  private costService:CostInvoicesService){
                      
                    }
            

       onAddCostInvoice(){
        this.isFormSubmitted  = true;
        if(this.form.valid){
          this.spinner.show();
         let values = this.form.value;
    const description = values.description || '';
  const searchKeywords = description
    .toLowerCase()
    .split(/\s+/) // split by any whitespace
    .filter(word => word.trim() !== '');

         const cost: Omit<Cost, 'createdAt'> = {
         description:values.description,
         amount:values.amount,
         searchKeyWords:searchKeywords
         };
        this.costService.addCostInvoice(cost).then(res => {
                 this.modal.close();
                this.spinner.hide();
                  this.toastr.success(
                  this.translate.instant( 'Cost invoice added successfully'),
                  this.translate.instant("Success"),
               { timeOut: 3000 })
        })
        }
       }
}
