import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
	selector: 'app-accounts',
	templateUrl: './role.component.html',
})

export class RoleComponent implements OnInit {
	active = 'Configuration';

	constructor(
		private modalService: NgbModal,
		private formBuilder: FormBuilder,
	) { }

	roleEditForm!: FormGroup;
	isSubmittedRoleEditForm = false;

	ngOnInit(): void {
		this.roleEditForm = this.formBuilder.group({
			RoleName: ['Administrator'],
			Description: ['Lorem ipsum dolor sit amet consectetur. In feugiat eu leo purus tortor enim. Aliquet eu dui ut auctor. Consequat lectus a justo quisque nunc lorem. Scelerisque volutpat nisi diam.'],
			ActiveRole: ['checked']
		}, {updateOn: 'blur'});
	}

	toggleClass(element: any) {
		element.closest('.parent-toggle').classList.toggle('active');
	}

	handleModal(AddRolePopup) {
		this.modalService.open(AddRolePopup, { 
			modalDialogClass: 'side-modal', 
			backdrop : 'static',
			keyboard : false 
		});
	}

	resetRoleEditForm() {
		this.roleEditForm.reset();
	}

	submitRoleEditForm() {
		console.log(this.roleEditForm.value);
		this.isSubmittedRoleEditForm = true;
	}
}