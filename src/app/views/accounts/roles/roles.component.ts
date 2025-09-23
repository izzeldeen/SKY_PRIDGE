import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
	selector: 'app-accounts',
	templateUrl: './roles.component.html'
})

export class RolesComponent implements OnInit {
	active = 'Default roles';

	constructor(
		private modalService: NgbModal,
		private formBuilder: FormBuilder,
	) { }

	roleAddForm!: FormGroup;
	isSubmittedRoleAddForm = false;

	ngOnInit(): void {
		this.roleAddForm = this.formBuilder.group({
			RoleName: [null],
			Description: [null],
			ActiveRole: ['checked']
		}, {updateOn: 'blur'});
	}

	handleModal(AddRolePopup) {
		this.modalService.open(AddRolePopup, { 
			modalDialogClass: 'side-modal', 
			backdrop : 'static',
			keyboard : false 
		});
	}

	resetRoleAddForm() {
		this.roleAddForm.reset();
	}

	submitRoleAddForm() {
		console.log(this.roleAddForm.value);
		this.isSubmittedRoleAddForm = true;
	}
}