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
  selector: 'app-warehouse-form',
  templateUrl: './warehouse-form.component.html',
  styleUrls: ['./warehouse-form.component.scss']
})
export class WarehouseFormComponent implements OnInit {
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


  form = new FormGroup({
    id: new FormControl(null),
    nameAr: new FormControl('', [
      Validators.required,
      arabicTextWithNumbersValidator(),
      noWhitespaceValidator(),
      Validators.maxLength(100)
    ]),
    nameEn: new FormControl('', [
      Validators.required,
      englishTextWithNumbersValidator,
      noWhitespaceValidator(),
      Validators.maxLength(100)
    ]),
    locationEn: new FormControl('', [Validators.maxLength(250)]),
    locationAr: new FormControl('', [Validators.maxLength(250)]),
    isMain: new FormControl(false),
    actAsBranch: new FormControl(false),
    isActive: new FormControl(true),
    warehouseBranchesIds: new FormControl([]),
  });

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
    this.getBranchesList()
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
    const ControllerPath = 'warehouse'

    let form = this.form.getRawValue();

    form.warehouseBranchesIds = Array.isArray(form.warehouseBranchesIds) ? form.warehouseBranchesIds : [form.warehouseBranchesIds];

    this.baseService.Post(ControllerPath, ApiPath, form).subscribe
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
    this.baseService.Get('warehouse', `Get/${this.id}`).subscribe
      (res => {
        this.entity = res;

        this.form.patchValue({
          id: this.entity.id,
          nameAr: this.entity.nameAr,
          nameEn: this.entity.nameEn,
          locationEn: this.entity.locationEn,
          locationAr: this.entity.locationAr,
          isMain: this.entity.isMain ?? false,
          actAsBranch: this.entity.actAsBranch,
          isActive: this.entity.isActive ?? true,
          warehouseBranchesIds: this.entity.warehouseBranchesIds || [],
        });

      })
  }

  onActAsBranchChange(event: Event): void {
    this.form.patchValue({
      warehouseBranchesIds: null
    });
  }

  private getBranchesList() {
    this.baseService.Get('Branch', 'GetAll').subscribe
      (res => {
        this.branchesList = (res as any);
      })
  }

}
