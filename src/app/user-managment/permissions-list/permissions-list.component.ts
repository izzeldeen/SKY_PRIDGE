import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BaseService } from 'src/app/shared/services/base.service';
@Component
(
  {
    selector: 'app-permissions-list',
    templateUrl: './permissions-list.component.html',
    styleUrls: ['./permissions-list.component.scss']
  }
)
export class PermissionsListComponent implements OnInit 
{
  //#region Variables
  dataSource :any[] = [];
	totalCount: number = 0;
  columns :any[] = 
  [
    { name: 'permissionsManagment.id', field: 'id' },
    { name: 'permissionsManagment.categoryName', field: 'categoryName' },
    { name: 'permissionsManagment.categoryNameAR', field: 'categoryNameAr' },
    { name: 'permissionsManagment.permissionEn', field: 'permissionEn' },
    { name: 'permissionsManagment.permissionAr', field: 'permissionAR', }
  ]
  actionList: any[] = [];
  public searchForm = new FormGroup
	(
		{
			status: new FormControl(),
			searchValue: new FormControl()
		}	
	)
	baseSearch  = 
	{
    name: '',
		pageSize: 25,
		pageNumber: 0,
	}
  //#endregion
  constructor
  (	
    private baseService: BaseService,
  ) 
  {}
  ngOnInit (): void 
  {
    this.getList()
  }
  //#region Getters
	private getList () 
	{
		this.baseService.getList('/Permissions/', this.baseSearch).subscribe
    ( res => 
			{
				this.dataSource = (res as any).entities
				this.totalCount = (res as any).totalCount
			}
		)
	}
  //#endregion
  //#region Filtering and Searching
  onPageChange (event: any): void 
  {
    this.baseSearch.pageNumber = event.PageIndex - 1;
    this.baseSearch.pageSize = event.pageSize;
    this.getList();
  }
  onSearch () 
	{
    this.baseSearch.name = this.searchForm.get('searchValue')?.value;
    this.baseSearch.pageNumber = 0;
    this.getList();
	}
  //#endregion
}