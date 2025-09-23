import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GlobalStatusArr } from 'src/app/shared/models/enum';
import { AuthService } from 'src/app/shared/services/auth.service';
import { BaseService } from 'src/app/shared/services/base.service';
import { LanguageService } from 'src/app/shared/services/language.service';
import { arabicTextWithNumbersValidator, englishTextWithNumbersValidator } from 'src/app/utils/validation-text';
import { noWhitespaceValidator } from 'src/app/utils/validation-white-space';
import { OverlayContainer } from '@angular/cdk/overlay';

@Component
	(
		{
			selector: 'app-add-edit-roles',
			templateUrl: './add-edit-roles.component.html',
			styleUrls: ['./add-edit-roles.component.scss']
		}
	)
export class AddEditRolesComponent implements OnInit 
{
	//#region Variables
	public status = GlobalStatusArr
	@Input() modal: any = null
	@Input() isEditMood: boolean = false
	@Input() RoleID: number
	private Role: any = null;
	isSubmittedRoleAddForm = false;
	allPermissions: any[] = [];
	rolesAddForm = new FormGroup
	(
		{
			id: new FormControl(0),
			viewName: new FormControl('', [Validators.required,englishTextWithNumbersValidator,noWhitespaceValidator() , Validators.maxLength(100)]),
			nameAr: new FormControl('', [Validators.required, arabicTextWithNumbersValidator(), noWhitespaceValidator() ]),
			normalizedName: new FormControl(''),
			permissions: new FormControl([],[Validators.required]),
			status: new FormControl(1, Validators.required),
		}
	);
	//#endregion
	constructor
	(
		private baseService: BaseService,
		private languageService: LanguageService,
		public authSerivce: AuthService,
		private overlay: OverlayContainer
	) 
	{}
	ngOnInit (): void 
	{
		
		if (this.isEditMood && this.RoleID) 
			this.GetById()
		this.fetchPermissions();
	}
	//#region Functions
	resetRoleAddForm () 
	{
		const currentId = this.rolesAddForm.get('id')?.value;
		this.rolesAddForm.reset();
		this.rolesAddForm.get('id')?.setValue(currentId);
	}
	submitRoleAddForm (): void 
	{
		this.isSubmittedRoleAddForm = true;
		if (this.rolesAddForm.invalid) 
		{
			this.rolesAddForm.markAllAsTouched();
			return;
		}
		const form = this.rolesAddForm.getRawValue();
		form.normalizedName = form.viewName.toUpperCase();
		form.permissions = form.permissions.map
			( permissionId => ( { PermissionId: permissionId } ) );
		this.baseService.Post('Roles', this.isEditMood ? 'UpdateRoles' : 'AddRoles', form).subscribe
			( res => { this.modal.close(); }, );
	}
	//#endregion
	//#region Getters
	fetchPermissions (): void 
	{
		this.baseService.Get('Permissions', 'GetPermissionTreeNode').subscribe
		( (res: any) => 
		{
				this.allPermissions = (res.map(group => ({
					label: this.languageService.getCurrentLanguage() === 'en' ? group.name : group.nameAR,
					items: group.children ? group.children.map(child => ({
						label: this.languageService.getCurrentLanguage() === 'en' ? child.name : child.nameAR ,
						value: child.id
					})) : []
				})));
			}
		);
	}
	private GetById() {
		this.baseService.Get('Roles', `GetRole/${this.RoleID}`).subscribe
			(res => {
				this.Role = res;
				console.log(this.Role.permissions);
				this.rolesAddForm.patchValue
					(
						{
							id: this.Role.id,
							viewName: this.Role.viewName,
							normalizedName: this.Role.normalizedName,
							permissions: this.Role.permissions.map(per => per.permissionId),
							status: this.Role.status,
							nameAr : this.Role?.nameAr
						}
					);

				console.log(this.rolesAddForm.get('permissions').value)

			}
			)
	}
	//#endregion
}