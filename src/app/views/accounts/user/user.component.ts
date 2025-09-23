import { Component, HostListener, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from "@angular/router";
import {
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import Validation from 'src/app/utils/validation-confirmation-password';
import { passwordValidator } from 'src/app/utils/validation-password';

@Component({
  selector: 'app-accounts',
  templateUrl: './user.component.html',
})
export class UserComponent implements OnInit {
  active = 'Administrator permissions';

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  userEditForm!: FormGroup;
  isSubmittedUserEditForm = false;

  userPermissionsAddForm!: FormGroup;
  isSubmittedUserPermissionsAddForm = false;

  ngOnInit(): void {
    this.userEditForm = this.formBuilder.group({
      UserName: ['', Validators.required],
      FullName: ['', Validators.required],
      Email: ['', [Validators.required, Validators.email]],
      Phone: ['', Validators.required],
      Password: ['', [Validators.required, passwordValidator()]],
      PasswordConfirm: ['', [Validators.required]],
      Role: ['', Validators.required],
      UserType: ['', Validators.required],
      ActiveUser: [''],
    }, 
    {
      validators: [Validation.match('Password', 'PasswordConfirm')],
      updateOn: 'blur',
    });

    this.userPermissionsAddForm = this.formBuilder.group({
      ShowPermissions: [false],
      Service: ['', Validators.required],
      Permission: ['', Validators.required],
    }, {updateOn: 'blur'});
  }

  handleModal(modal) {
    this.modalService.open(modal, { 
			modalDialogClass: 'side-modal', 
			backdrop : 'static',
			keyboard : false,
		});
  }
  

  @HostListener('document:keypress', ['$event'])

  onSubmit(event: KeyboardEvent) {  
    const userEdit = document.querySelector('#userEditForm');  
    const userPermissions = document.querySelector('#userPermissionsAddForm');  

    if (event.key === 'Enter') {
      if (userEdit) {
        this.submitUserEditForm();
      } else if (userPermissions) {
        this.submitUserPermissionsAddForm()
      }
    }
  }

  resetUserEditForm(phoneInput) {
    console.log('reset');

    this.userEditForm.reset();
    this.userEditForm.controls.Phone.patchValue(' ');
    phoneInput.preferredCountries = [];
    phoneInput.ngOnInit();
    this.userEditForm.controls.Role.patchValue('');
    this.userEditForm.controls.UserType.patchValue('');
  }

  submitUserEditForm() {
    console.log(this.userEditForm.value);
    this.isSubmittedUserEditForm = true;
  }

  resetUserPermissionsAddForm() {
    this.userPermissionsAddForm.reset();
    this.userPermissionsAddForm.controls.Service.patchValue('');
    this.userPermissionsAddForm.controls.Permission.patchValue('');
  }

  submitUserPermissionsAddForm() {
    console.log(this.userPermissionsAddForm.value);
    this.isSubmittedUserPermissionsAddForm = true;
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