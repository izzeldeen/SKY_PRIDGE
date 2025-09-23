import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { BaseService } from 'src/app/shared/services/base.service';
import Validation from 'src/app/utils/validation-confirmation-password';
import { passwordValidator } from 'src/app/utils/validation-password';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
@Component
(
  {
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.scss']
  }
)
export class ChangePasswordComponent implements OnInit
{
  //#region Variables
  @Input() UserId 
  @Input() modal 
  @Input() FullName 
  isSubmittedPasswordForm = false;
  public changePasswordForm = new FormGroup
  (
    {
      userId:new FormControl('' , Validators.required),
      password: new FormControl('', [Validators.required, passwordValidator()]),
      PasswordConfirm: new FormControl('', [Validators.required]),
    }, 
    {
      validators: [Validation.match('password', 'PasswordConfirm')],
      updateOn: 'blur',
    }
  )
  //#endregion
  constructor
  ( 
    private baseService : BaseService,
    public authSerivce: AuthService,
    private toastr: ToastrService,
    private translate: TranslateService,
  )
  {}
  ngOnInit (): void 
  {
    this.changePasswordForm.get('userId').setValue(this.UserId)
  }
  //#region Functions
  triggerShowPass (e) 
  {
    if (!e.target.classList.contains('show')) 
    {
      e.target.classList.add('show');
      e.target.previousElementSibling.type = 'text';
    } 
    else 
    {
      e.target.classList.remove('show');
      e.target.previousElementSibling.type = 'password';
    }
  }
  onChangePassword ()
  {
    this.isSubmittedPasswordForm = true
    if (this.changePasswordForm.invalid)
    { 
      this.changePasswordForm.markAllAsTouched()
      return;
    }
    const passwordForm = this.changePasswordForm.getRawValue()
    this.baseService.Post('Users' , 'ChangeUserPassword' , passwordForm).subscribe
    ( res => 
      {  
        this.modal.dismiss('Cross click');
        this.toastr.success(this.translate.instant('userManagment.ChangeSuccess'), this.translate.instant('common.success'), { timeOut: 3000 });
      } 
    )
  }
  //#endregion
}