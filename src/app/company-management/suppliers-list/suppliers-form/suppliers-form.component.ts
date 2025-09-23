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
  selector: 'app-suppliers-form',
  templateUrl: './suppliers-form.component.html',
  styleUrls: ['./suppliers-form.component.scss']
})
export class SuppliersFormComponent implements OnInit {
  isFormSubmitted: boolean = false;
  logoFile: any;
  customerTypesList: any[];
  public status = GlobalStatusArr
  @Input() modal: any = null
  @Input() isEditMood: boolean = false
  @Input() id: number
  private entity: any = null;
  public onlyCountries = onlyCountries;

  form = new FormGroup({
    id: new FormControl(null),
    nameAr: new FormControl('', [Validators.required, arabicTextWithNumbersValidator(), noWhitespaceValidator(), Validators.maxLength(100)]),
    nameEn: new FormControl('', [englishTextWithNumbersValidator, noWhitespaceValidator(), Validators.maxLength(100)]),
    customerTypeId: new FormControl(null),
    initialBalance: new FormControl(0, [Validators.required, Validators.min(0)]),
    address: new FormControl(''),
    mobileNumber: new FormControl('', [Validators.pattern(/^(\+?\d{7,15})?$/)]), // simple mobile validation
    debitLimit: new FormControl(0, [Validators.min(0)]),
    periodInDays: new FormControl(0, [Validators.min(0)]),
    discount: new FormControl(0, [Validators.min(0), Validators.max(100)]),
    accountNumber: new FormControl('', [Validators.maxLength(50)]),
    notes: new FormControl('', [Validators.maxLength(500)]),
    isActive: new FormControl(true),
    type: new FormControl(ClientType.Supplier),
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

    if (this.isEditMood && this.id)
      this.GetById()
    this.getCustomerTypes();
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
    const ControllerPath = 'customers'

    let form = this.form.getRawValue();

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
    this.baseService.Get('customers', `Get/${this.id}`).subscribe
      (res => {
        this.entity = res;

        this.form.patchValue({
          id: this.entity.id,
          nameAr: this.entity.nameAr,
          nameEn: this.entity.nameEn,
          customerTypeId: this.entity.customerTypeId,
          initialBalance: this.entity.initialBalance,
          address: this.entity.address,
          mobileNumber: this.entity.mobileNumber,
          debitLimit: this.entity.debitLimit,
          periodInDays: this.entity.periodInDays,
          discount: this.entity.discount,
          accountNumber: this.entity.accountNumber,
          notes: this.entity.notes,
          isActive: this.entity.isActive == 1 ? true : false,
          type: ClientType.Supplier,
        });
      })
  }

  getCustomerTypes() {
    this.baseService.getLookupsByType(LookpusType.CustomersType).subscribe(res => {
      this.customerTypesList = res;
    });
  }

}
