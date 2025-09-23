import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LookpusType, LookupsTypeArr, StatusArr } from 'src/app/shared/models/enum';
import { AuthService } from 'src/app/shared/services/auth.service';
import { BaseService } from 'src/app/shared/services/base.service';
import { LanguageService } from 'src/app/shared/services/language.service';
import { arabicTextWithNumbersValidator, englishTextWithNumbersValidator } from 'src/app/utils/validation-text';
import { TranslateService } from "@ngx-translate/core";
import { ToastrService } from 'ngx-toastr';
@Component
(
  {
    selector: 'app-add-edit-lookups',
    templateUrl: './add-edit-lookups.component.html',
    styleUrls: ['./add-edit-lookups.component.scss']
  }
)
export class AddEditLookupsComponent implements OnInit 
{
  //#region Variables
  @Input() Id
  @Input() TypeId
  @Input() modal: any = null
  @Input() isEditMood: boolean = false
  public Title = ''
  public ParentLookup = []
  public status = StatusArr
  public showParent: boolean = false;
  private parentId
  private LookupEntity: any = null
  private LoookupArray = LookupsTypeArr
  isSubmittedLookupAddForm = false;
  lookupAddForm = new FormGroup
  (
    {
      id: new FormControl(0),
      titleEn: new FormControl('', [Validators.required , englishTextWithNumbersValidator()]),
      titleAr: new FormControl('', [Validators.required , arabicTextWithNumbersValidator()]),
      valueEn: new FormControl('', [englishTextWithNumbersValidator()]),
      valueAr: new FormControl('' , [arabicTextWithNumbersValidator()]),
      numValue: new FormControl(),
      typeId: new FormControl('', [Validators.required]),
      dateValue: new FormControl(),
      status: new FormControl(1, [Validators.required])
    }
  );
  //#endregion
  constructor
  (
    private baseService: BaseService , 
    private languageService : LanguageService, 
    public authService:AuthService,
     private toastr: ToastrService,
        private translate: TranslateService,
  ) 
  {}
  ngOnInit (): void 
  {
    this.lookupAddForm.get('typeId').setValue(this.TypeId)
    if (this.isEditMood && this.Id != null)
      this.getLookupById();
    
  }
  //#region Getters
  getLookupById () 
  {
    this.baseService.Get('Lookups', 'GetById/' + this.Id).subscribe
    ( res => 
      { 
        this.LookupEntity = res as any;
        this.fetchFormData(this.LookupEntity);
      }
    )
  }
  fetchFormData (entity) 
  {
    this.lookupAddForm.patchValue(entity)
  }
  //#endregion
  //#region Functions
  submitLookup () 
  {
    this.isSubmittedLookupAddForm = true
    if (this.lookupAddForm.invalid)
    {
      this.lookupAddForm.markAllAsTouched()
      return;
    }
    const ApiPath = this.isEditMood ? 'Update' : 'Post';
    const ControllerPath = 'Lookups'
    const form = this.lookupAddForm.getRawValue()
    this.baseService.Post(ControllerPath , ApiPath , form).subscribe
    ( res => { this.modal.close(); 

  this.toastr.success(
    this.translate.instant(this.isEditMood ? 'Lookups.successUpdated' : "Lookups.successAdded"),
    this.translate.instant("Lookups.success"),
    { timeOut: 3000 }
  );}
    )

    
  }
  //#endregion
}