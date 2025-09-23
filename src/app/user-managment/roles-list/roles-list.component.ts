import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl } from '@angular/forms';
import { BaseService } from 'src/app/shared/services/base.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LanguageService } from 'src/app/shared/services/language.service';
@Component
	(
		{
			selector: 'app-roles-list',
			templateUrl: './roles-list.component.html',
			styleUrls: ['./roles-list.component.scss']
		}
	)
export class RolesListComponent implements OnInit 
{
	//#region Variables
	dataSource: any[] = [];
	totalCount: number = 0
	RoleID: number = null
	public searchForm = new FormGroup
	(
		{
			status: new FormControl(),
			searchValue: new FormControl()
		}
	)
	baseSearch = 
	{
		name: '',
		pageSize: 25,
		pageNumber: 0,
	}
	//#endregion
	constructor 
	( 
		private modalService: NgbModal,
		public authService : AuthService,
		private baseService: BaseService,
		public languageService : LanguageService
	) 
	{}
	ngOnInit() : void 
	{
		this.getList()
		this.onSearch()
	}
	//#region Getters
	private getList () 
	{
		this.baseService.Post('Roles', 'GetList', this.baseSearch).subscribe
		( res => 
			{
				this.dataSource = (res as any).entities
				this.totalCount = (res as any).totalCount
			}
		)
	}
	//#endregion
	//#region Actions Handler
	onAddRole (modal: any) 
	{
		const modalRef = this.modalService.open
		(modal, { modalDialogClass: 'side-modal', backdrop: 'static', keyboard: false });
		modalRef.result.then((result) => { this.getList(); })
	}
	onEditRole (entity: any, modal: any) 
	{
		this.RoleID = entity.id;
		const modalRef = this.modalService.open
		(modal, { modalDialogClass: 'side-modal', backdrop: 'static', keyboard: false });
		modalRef.result.then((result) => { this.getList(); });
	}
	//#endregion
	//#region Filtering and Searching
	onSearch () 
	{
		this.baseSearch.name = this.searchForm.get('searchValue')?.value;
		this.getList();
	}
	onPageChange (event: any): void 
	{
		this.baseSearch.pageNumber = event.PageIndex - 1;
		this.baseSearch.pageSize = event.pageSize;
		this.getList();
	}
	//#endregion
}