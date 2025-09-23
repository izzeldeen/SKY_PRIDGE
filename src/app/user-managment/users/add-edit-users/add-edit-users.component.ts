import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LookpusType, onlyCountries } from 'src/app/shared/models/enum';
import { AuthService } from 'src/app/shared/services/auth.service';
import { BaseService } from 'src/app/shared/services/base.service';
import { LanguageService } from 'src/app/shared/services/language.service';
import Validation from 'src/app/utils/validation-confirmation-password';
import { emailValidator } from 'src/app/utils/validation-email';
import { passwordValidator } from 'src/app/utils/validation-password';
@Component
(
  {
    selector: 'app-add-edit-users',
    templateUrl: './add-edit-users.component.html',
    styleUrls: ['./add-edit-users.component.scss']
  }
)
export class AddEditUsersComponent implements OnInit 
{
  //#region Variables
  preferredLanguages:any[];
  branchies:any;
  @Input() modal: any = null
  @Input() UserId: number
  @Input() isEditMood: boolean = false
  private User : any = null;
  isSubmittedUserAddForm = false;
  public onlyCountries = onlyCountries;
  Roles: any[] = []
  userAddForm = new FormGroup
  (
    {
      id: new FormControl(0),
      email: new FormControl('', [Validators.required, emailValidator()]),
      phoneNumber: new FormControl('', [Validators.required]),
      fullName: new FormControl('', [Validators.required]),
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, passwordValidator()]),
      PasswordConfirm: new FormControl('', [Validators.required]),
      isActive: new FormControl(true, Validators.required),
      roles: new FormControl(null, [Validators.required]),
      address: new FormControl(null),
      jobDescription: new FormControl(null),
      preferredLanguageId: new FormControl(null),
      branchId: new FormControl(null),
      warehouseId: new FormControl(null)

    }, 
    {
      validators: [Validation.match('password', 'PasswordConfirm')],
      updateOn: 'blur',
    }
  );
  warehouseies:any;
  //#endregion
  constructor
  ( 
    private baseService: BaseService, 
    public authSerivce: AuthService,
    public languageService : LanguageService
  ) 
  {}
  ngOnInit (): void 
  {
    this.GetAllRoles();
    if (this.isEditMood && this.UserId)
      this.GetById();
    this.getPreferredLanguges();
    this.getWarehouses();
    this.getBranchies();
  }
  //#region Functions
  FetchData (object:any)
  {
    this.userAddForm.patchValue
					({
				
          id: object.id,
          email: object.email,
          phoneNumber: object.phoneNumber,
          fullName: object.fullName,
          userName: object.userName,
          isActive: object.isActive,
          roles: object.roles,
          address: object.address,
          jobDescription: object.jobDescription,
          preferredLanguageId: object.preferredLanguageId,
          branchId: object.branchId,
          warehouseId:object.warehouseId
});

    this.removeValidators('password')
    this.removeValidators('PasswordConfirm')
  }
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
  removeValidators (formControlName )
  {
    this.userAddForm.get(formControlName).clearValidators()
    this.userAddForm.get(formControlName).updateValueAndValidity()
  }
  submitUserAddForm () 
  {
    this.isSubmittedUserAddForm = true;
    if (this.userAddForm.invalid) 
    {
      this.userAddForm.markAllAsTouched();
      return;
    }
    const form : any = this.userAddForm.getRawValue();
    

    form.isActive = JSON.parse(form.isActive );
      const ApiAction = this.isEditMood ? 'UpdateUserProfile' : 'CreateUser';
   
    this.baseService.Post('Users', ApiAction , form).subscribe
    ( res => { this.modal.close(); } )
  }

  getPreferredLanguges(){
      this.baseService.getLookupsByType(LookpusType.PreferredLanguage).subscribe(res => {
        this.preferredLanguages = res;
      });
    }

    
 getBranchies(){
 this.baseService.Get('Branch' , 'GetAll').subscribe(res => {
        this.branchies  = res;
      });
    }
      getWarehouses(){
      this.baseService.Get('Warehouse' , 'GetAll').subscribe(res => {
        this.warehouseies = res; 
      })
    }


  //#endregion
  //#region Getters
  private GetAllRoles() 
  {
    this.baseService.Get('Roles', 'GetAllRoles').subscribe
    ( res => { this.Roles = res as any })
  }
  private GetById ()
  {
    this.baseService.Get('Users',`GetUserProfileById/${this.UserId}`).subscribe
    ( res => { 
      this.User = res as any;
       this.FetchData(this.User);
      })
  }
  //#endregion



}