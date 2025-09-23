import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { arabicTextWithNumbersValidator, englishTextWithNumbersValidator } from 'src/app/utils/validation-text';
import { noWhitespaceValidator } from 'src/app/utils/validation-white-space';
import { BaseService } from 'src/app/shared/services/base.service';
import { LanguageService } from 'src/app/shared/services/language.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { OverlayContainer, ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { ClientType, GlobalStatusArr, LookpusType, onlyCountries } from 'src/app/shared/models/enum';

@Component({
  selector: 'app-warehouse-sections-form',
  templateUrl: './warehouse-sections-form.component.html',
  styleUrls: ['./warehouse-sections-form.component.scss']
})
export class WarehouseSectionsFormComponent implements OnInit {
  isFormSubmitted: boolean = false;
  logoFile: any;
  customerTypesList: any[];
  branchesList: any[];
  public status = GlobalStatusArr
  @Input() modal: any = null
  @Input() isEditMood: boolean = false
  @Input() id: number
  private entity: any = null;
  public onlyCountries = onlyCountries;

  xxxx: any;

  form = new FormGroup({
    id: new FormControl(null),
    warehouseId: new FormControl(null, [Validators.required]),
    nameEn: new FormControl('', [
      Validators.required,
      englishTextWithNumbersValidator,
      noWhitespaceValidator(),
      Validators.maxLength(100)
    ]),
    nameAr: new FormControl('', [
      Validators.required,
      arabicTextWithNumbersValidator(),
      noWhitespaceValidator(),
      Validators.maxLength(100)
    ]),
    sectionTypeId: new FormControl(null),
    note: new FormControl('', [Validators.maxLength(500)]), // Adjust max length if needed
    isActive: new FormControl(true),
  });
  sectionTypeList: any;
  warehouseList: any;
  ControllerPath = 'WarehouseSections'


  //#endregion
  constructor
    (
      private baseService: BaseService,
      private languageService: LanguageService,
      public authSerivce: AuthService,
      private overlay: OverlayContainer,
      private toastr: ToastrService,
      private translate: TranslateService
    ) { }
  ngOnInit(): void {
    this.getSectionTypeList();
    this.getwarehouseList();

    if (this.isEditMood && this.id)
      this.GetById()
  }
  //#region Functions
  resetForm() {
    this.form.reset();
  }
  submitForm(): void {
    this.isFormSubmitted = true
    if (this.form.invalid) {
      this.form.markAllAsTouched()
      return;
    }
    const ApiPath = this.isEditMood ? 'Update' : 'Post';

    let form = this.form.getRawValue();
    form.sectionTypeId = form.sectionTypeId == "null" ? null : form.sectionTypeId,
      this.baseService.Post(this.ControllerPath, ApiPath, form).subscribe
        (res => {
          this.modal.close();

          this.toastr.success(
            this.translate.instant(this.isEditMood ? 'successUpdated' : "successAdded"),
            this.translate.instant("success"),
            { timeOut: 3000 }
          );
        }
        )

  }

  private GetById() {
    this.baseService.Get(this.ControllerPath, `Get/${this.id}`).subscribe
      (res => {
        this.entity = res;

        this.form.patchValue({
          id: this.entity.id,
          warehouseId: this.entity.warehouseId,
          nameEn: this.entity.nameEn,
          nameAr: this.entity.nameAr,
          sectionTypeId: this.entity.sectionTypeId,
          note: this.entity.note,
          isActive: this.entity.isActive
        });
      })
  }

  private getSectionTypeList() {
    this.baseService.getLookupsByType(LookpusType.SectionType).subscribe(res => {
      this.sectionTypeList = res;
    });
  }

  private getwarehouseList() {
    this.baseService.Get('Warehouse', 'GetAll').subscribe
      (res => {
        this.warehouseList = (res as any);
      })
  }
}
