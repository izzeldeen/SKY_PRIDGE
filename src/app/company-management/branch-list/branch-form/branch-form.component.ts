import { Component, Input, OnInit } from '@angular/core';
import { GlobalStatusArr, LookpusType } from 'src/app/shared/models/enum';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { arabicTextWithNumbersValidator, englishTextWithNumbersValidator } from 'src/app/utils/validation-text';
import { noWhitespaceValidator } from 'src/app/utils/validation-white-space';
import { BaseService } from 'src/app/shared/services/base.service';
import { LanguageService } from 'src/app/shared/services/language.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { OverlayContainer, ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-branch-form',
  templateUrl: './branch-form.component.html',
  styleUrls: ['./branch-form.component.scss']
})
export class BranchFormComponent implements OnInit {
  isFormSubmitted:boolean = false;
  logoFile:any;
  currencies:any[];
  public status = GlobalStatusArr
    @Input() modal: any = null
    @Input() isEditMood: boolean = false
    @Input() id: number
    private entity: any = null;
   
    form = new FormGroup
    (
      {
        id: new FormControl(0),
        descriptionEn : new FormControl('', [Validators.required,englishTextWithNumbersValidator,noWhitespaceValidator() , Validators.maxLength(100)]),
        descriptionAr: new FormControl('', [Validators.required, arabicTextWithNumbersValidator(), noWhitespaceValidator() ]),
        address: new FormControl(null ),
        startWorkingHour:new FormControl(null,Validators.required),
        endWorkingHour:new FormControl(null,Validators.required),
        isActive: new FormControl(false),
        currencyId:new FormControl(null,Validators.required)
      }
    );
    //#endregion
    constructor
    (
      private baseService: BaseService,
      private languageService: LanguageService,
      public authSerivce: AuthService,
      private overlay: OverlayContainer,
      private toastr: ToastrService,
      private translate: TranslateService
    ) 
    {}
    ngOnInit (): void 
    {
      
      if (this.isEditMood && this.id) 
        this.GetById()
      this.getCurcencies();
    }
    //#region Functions
    resetForm () 
    {
       this.form.reset();
    }
    submitForm (): void 
    {
        this.isFormSubmitted = true
    if (this.form.invalid)
    {
      this.form.markAllAsTouched()
      return;
    }
    const ApiPath = this.isEditMood ? 'Update' : 'Post';
    const ControllerPath = 'Branch'
    
    let form = this.form.getRawValue();
    form.startWorkingHour = `${String(form.startWorkingHour.hour).padStart(2, '0')}:${String(form.startWorkingHour.minute).padStart(2, '0')}:00`;
    form.endWorkingHour = `${String(form.endWorkingHour.hour).padStart(2, '0')}:${String(form.endWorkingHour.minute).padStart(2, '0')}:00`

    this.baseService.Post(ControllerPath , ApiPath , form).subscribe
    ( res => { this.modal.close();

       this.toastr.success(
       this.translate.instant(this.isEditMood ? 'successUpdated' : "successAdded"),
       this.translate.instant("success"),
    { timeOut: 3000 }
  );
     }
    )
 
    }

      private GetById() {
    this.baseService.Get('Branch', `Get/${this.id}`).subscribe
      (res => {
        this.entity = res;
        const [startHour, startMinute, startSecond] = this.entity.startWorkingHour.split(':').map(Number);
        const [endHour, endMinute, endSecond] = this.entity.endWorkingHour.split(':').map(Number);
        
        this.form.patchValue
          (
            {
                id: this.entity.id,
                descriptionEn: this.entity.descriptionEn,
                descriptionAr: this.entity.descriptionAr,
                address:this.entity.address,
                startWorkingHour: { hour:startHour, minute:startMinute,sec:startSecond },
                endWorkingHour: { hour:endHour, minute:endMinute, sec:endSecond },
                isActive: this.entity.status == 1  ? true : false,
                currencyId:this.entity.currencyId
            }
          );
      }
      )
  }

getCurcencies(){
    this.baseService.getLookupsByType(LookpusType.Currency).subscribe(res => {
      this.currencies = res;
    });
  }

}
