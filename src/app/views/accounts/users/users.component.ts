import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from "@angular/router";
import {
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import Validation from 'src/app/utils/validation-confirmation-password';
import { passwordValidator } from 'src/app/utils/validation-password';
import { emailValidator } from 'src/app/utils/validation-email';

@Component({
  selector: 'app-accounts',
  templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit {

  columns :any[] = [
    {
      name: 'user.id',
      field: 'id',
    },
    {
      name: 'user.username',
      field: 'username',
    },
    {
      name: 'user.fullname',
      field: 'fullname',
    },
    {
      name: 'user.email',
      field: 'email',
    },

    {
      name: 'user.phoneNumber',
      field: 'publishDate',
    },
    {
      name: 'user.role',
      field: 'role',
    },
    {
      name: 'user.status',
      field: 'status',
    },
  ]

  dataSource : any =[
    {id:1 ,role:'Manager'  ,email:'jehadsami98@gmail.com' ,fullname:'Jehad Hammad' ,username:'JehadH' },
    {id:2 ,role:'Account-Manager'  ,email:'Rami@gmail.com' ,fullname:'Rami Hammad' ,username:'RamiH' },
  ]

  actionList: any[] = [
    {
      name: 'edit',
      icon: 'edit',
      permission: 'Update-Episodes'
    },
    {
      name: 'delete',
      icon: 'delete',
      permission: 'Delete-Episodes'
    },
  ];

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  userAddForm!: FormGroup;
  isSubmittedUserAddForm = false;

  userEditForm!: FormGroup;
  isSubmittedUserEditForm = false;

  userPermissionsAddForm!: FormGroup;
  isSubmittedUserPermissionsAddForm = false;

  serviceArray = ['Configuration'];

  ngOnInit(): void {
    this.userAddForm = this.formBuilder.group({
      UserName: ['', Validators.required],
      FullName: ['', Validators.required],
      Email: ['', [Validators.required, emailValidator()]],
      Phone: ['', Validators.required],
      Password: ['', [Validators.required, passwordValidator()]],
      PasswordConfirm: ['', [Validators.required]],
      Role: ['', Validators.required],
      UserType: ['', Validators.required],
      ActiveUser: [''],
    }, {
      validators: [Validation.match('Password', 'PasswordConfirm')],
      updateOn: 'blur',
    });

    this.userEditForm = this.formBuilder.group({
      UserName: ['', Validators.required],
      FullName: ['', Validators.required],
      Email: ['', [Validators.required, emailValidator()]],
      Phone: ['', Validators.required],
      Password: ['', [Validators.required, passwordValidator()]],
      PasswordConfirm: ['', [Validators.required]],
      Role: ['', Validators.required],
      UserType: ['', Validators.required],
      ActiveUser: [''],
    }, {
      validators: [Validation.match('Password', 'PasswordConfirm')],
      updateOn: 'blur'});

    this.userPermissionsAddForm = this.formBuilder.group({
      ShowPermissions: [false],
      Service: ['', Validators.required],
      Permission: ['', Validators.required],
    }, {
      updateOn: 'blur',
    });
  }

  handleModal(modal) {
    this.modalService.open(modal, { 
			modalDialogClass: 'side-modal', 
			backdrop : 'static',
			keyboard : false 
		});
  }
  @ViewChild('continueSaveChangesPopup', { static: true }) continueSaveChangesPopup: any;

  @HostListener('document:keypress', ['$event'])

  onSubmit(event: KeyboardEvent) {  
    const userAdd = document.querySelector('#userAddForm');  
    const userEdit = document.querySelector('#userEditForm');  
	  const saveChangesPopup = document.querySelector('#continueSaveChangesPopup');  
    const notificationPopup = document.querySelector('#permissionsNotificationPopup');  
     
    if (event.key === 'Enter') {      
      if (userAdd) {
        this.submitUserAddForm();
      } else if (!saveChangesPopup && !notificationPopup && userEdit) {
        this.submitUserEditForm(this.continueSaveChangesPopup);
      }
    }
  }

  clearServiceArray() {
    this.serviceArray = ['Configuration'];
  }

  deleteService(i: number) {
    this.serviceArray = [...this.serviceArray].filter((_, index) => i !== index);
  }

  resetUserAddForm(phoneInput) {
    this.isSubmittedUserAddForm = false;
    this.userAddForm.reset();
    this.userAddForm.controls['Phone'].patchValue(' ');
    phoneInput.preferredCountries = [];
    phoneInput.ngOnInit();
    this.userAddForm.controls['Role'].setValue('');
    this.userAddForm.controls['UserType'].setValue('');
  }

  submitUserAddForm() {
    console.log(this.userAddForm.value);
    this.isSubmittedUserAddForm = true;
  }

  resetUserEditForm(phoneInput) {
    this.isSubmittedUserEditForm = false;
    this.userEditForm.reset();
    this.userEditForm.controls['Phone'].patchValue(' ');
    phoneInput.preferredCountries = [];
    phoneInput.ngOnInit();
    this.userEditForm.controls['Role'].setValue('');
    this.userEditForm.controls['UserType'].setValue('');
    this.userPermissionsAddForm.reset();
    this.userPermissionsAddForm.controls['Service'].setValue('');
    this.userPermissionsAddForm.controls['Permission'].setValue('');
  }

  submitUserEditForm(continueSaveChangesPopup) {
    this.isSubmittedUserEditForm = true;

    if (this.userEditForm.status == 'VALID' && this.userPermissionsAddForm.status == 'VALID') {
      this.modalService.open(continueSaveChangesPopup, { 
        windowClass: 'continue-save-changes-popup',
        size: 'md', 
        centered: true 
      }).result.then((result) => {
        if (result !== true) {
          return false;
        }
      }, (reason) => {
      });
    }
  }

  resetUserPermissionsForm() {
    this.isSubmittedUserPermissionsAddForm = false;
    this.userPermissionsAddForm.controls['Service'].setValue('');
    this.userPermissionsAddForm.controls['Permission'].setValue('');
  }

  submitUserPermissionsAddForm(permissionsNotificationPopup) {
    this.isSubmittedUserPermissionsAddForm = true;

    if (this.userPermissionsAddForm.status == 'INVALID') {
      this.modalService.open(permissionsNotificationPopup, { 
        windowClass: 'permissions-note-popup',
        size: 'md', 
        centered: true 
      });
    } else {
      if (this.userPermissionsAddForm.controls['Service'].value) {
        this.serviceArray = [...this.serviceArray, this.userPermissionsAddForm.controls['Service'].value]
      }
      this.resetUserPermissionsForm();
      this.userPermissionsAddForm.controls['ShowPermissions'].setValue(true);
    } 
  }

  triggerShowPass(e) {
    if (!e.target.classList.contains('show')) {
      e.target.classList.add('show');
      e.target.previousElementSibling.type = 'text';
    } else {
      e.target.classList.remove('show');
      e.target.previousElementSibling.type = 'password';
    }
  }

  redirect(event: Event) {
    const target = event.target as HTMLInputElement;
    
    if (!target.closest('.dropdown')) {
      this.router.navigateByUrl(target.closest('tr').dataset.link);
    }
  }
}