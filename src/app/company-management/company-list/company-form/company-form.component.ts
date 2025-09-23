import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { OverlayContainer, ToastrService } from 'ngx-toastr';
import { GlobalStatusArr, LookpusType, onlyCountries } from 'src/app/shared/models/enum';
import { AuthService } from 'src/app/shared/services/auth.service';
import { BaseService } from 'src/app/shared/services/base.service';
import { LanguageService } from 'src/app/shared/services/language.service';
import { arabicTextWithNumbersValidator, englishTextWithNumbersValidator } from 'src/app/utils/validation-text';
import { noWhitespaceValidator } from 'src/app/utils/validation-white-space';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.scss']
})
export class CompanyFormComponent  {
    isFormSubmitted:boolean = false;
    logoFile:any;
    public status = GlobalStatusArr
    currencies:any[];
    baseUrl = environment.attachmentUrl;
    @Input() isCompanyUser:boolean = false;
    @Input() modal: any = null
    @Input() isEditMood: boolean = false
    @Input() id: number
    entity: any = null;
    public onlyCountries = onlyCountries;
    logoPath:string;
   
    form = new FormGroup
    (
      {
        id: new FormControl(0),
        code:new FormControl('', [Validators.required , Validators.maxLength(100)]),
        nameEn: new FormControl('', [Validators.required,englishTextWithNumbersValidator,noWhitespaceValidator() , Validators.maxLength(100)]),
        nameAr: new FormControl('', [Validators.required, arabicTextWithNumbersValidator(), noWhitespaceValidator() ]),
        address: new FormControl('' , [Validators.required]),
        mainAccountEmail: new FormControl('', [Validators.required , Validators.email]),
        mobile: new FormControl(''),
        endDate: new FormControl<any>('' ,[Validators.required]),
        isActive: new FormControl(false),
        subscriptionEndDate:new FormControl(''),
        logoFile:new FormControl(null),
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
      private translate: TranslateService,
    ) 
    {
      this.getCurcencies();
    }
    ngOnInit (): void 
    {
      if (this.isEditMood && this.id) 
        this.GetById()
      
      if(this.isCompanyUser){
        this.form.get('code')?.disable();
        this.form.get('endDate')?.disable();
      }
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
    const ControllerPath = 'Company'
 
    let form = this.form.getRawValue()
    const date = this.form.value.endDate;
    form.logoFile = this.logoFile;
    if(!this.isCompanyUser) {
    form.subscriptionEndDate = new Date(date.year, date.month - 1, date.day).toISOString().split('T')[0];
    }
    this.baseService.postItemFromForm(ControllerPath , ApiPath , form).subscribe
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
		this.baseService.Get('Company', `Get/${this.id}`).subscribe
			(res => {
				this.entity = res;
        const date = new Date(this.entity.subscriptionEndDate);
        if(this.entity?.logoPath)
        this.logoPath = `${this.baseUrl}/${this.entity.logoPath}`;
				this.form.patchValue
					(
						{
							  id: this.entity.id,
                code:this.entity.code,
                nameEn: this.entity.nameEn,
                nameAr: this.entity.nameAr,
                address:this.entity.address,
                mainAccountEmail: this.entity.mainAccountEmail,
                mobile: this.entity.mobile,
                isActive: this.entity.isActive,
                endDate: {
                          year: date.getFullYear(),
                          month: date.getMonth() + 1, // Note: JS months are 0-based
                          day: date.getDate()
                        },
                currencyId:this.entity.currencyId                   
                  }
					);
			}
			)
	}

  onFileChange(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    this.logoFile = input.files[0];
        }
  }

  getCurcencies(){
      this.baseService.getLookupsByType(LookpusType.Currency).subscribe(res => {
        this.currencies = res;
      });
    }
    
    //#endregion
    
}
