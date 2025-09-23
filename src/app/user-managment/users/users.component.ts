import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/shared/services/auth.service';
import { BaseService } from 'src/app/shared/services/base.service';
@Component
(
  {
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
  }
)
export class UsersComponent implements OnInit
{
  //#region Variables
  columns: any[] = 
  [
    { name: '#', field: 'id', },
    { name: 'userManagment.fullName', field: 'fullName' },
    { name: 'userManagment.phoneNumber', field: 'mobileNumber' },
    { name: 'userManagment.email', field: 'email' },
    { name: 'userManagment.roles', field: 'roles' },
    { name: 'userManagment.isActive', field: 'isActive' }
  ]
  dataSource: any[] = []
  actionList: any[] = 
  [
    { name: 'common.edit', icon: 'edit', permission: 'Update-Admin' },
    { name: 'userManagment.changeStatus', icon: 'change' , permission: 'Admin-Change-Status'},
    { name: 'userManagment.ChangePassword', icon: 'change', permission: 'Admin-Change-Password' }
  ]
  baseSearch = 
  {
    pageSize: 25,
    PageNumber: 0,
    name: null,
    mobileNumber: null,
    email: null
  }
  totalCount: number ;
  userId: number = null
  FullName :string = ''
  //#endregion
  constructor
  (
    private baseService: BaseService,
    private modalService: NgbModal,
    public authSerivce: AuthService
  ) 
  {}
  ngOnInit() : void 
  {
    this.GetUsers()
  }
  //#region Getters
  GetUsers () 
  {
    this.baseService.Post('Users', 'GetList', this.baseSearch).subscribe
    ( res => 
      {
        this.dataSource = (res as any).entities;
        this.totalCount = (res as any).totalCount
      }
    )
  }
  //#endregion 
  //#region Actions Handler
  onHandleAction (event, modal: any , changePasswordModal : any) 
  {
    switch (event.action.name) 
    {
      case 'common.edit': { this.onEditUser(event.data, modal) } break;
      case 'userManagment.changeStatus': { this.onChageStatus(event.data) } break;
      case 'userManagment.ChangePassword' : { this.onChangePasswordForUser(event.data , changePasswordModal) }
    }
  }
  onAddNewUser (modal: any) 
  {
    const modalRef = this.modalService.open
    ( modal, { modalDialogClass: 'side-modal', backdrop: 'static', keyboard: false } );
    modalRef.result.then((result) => { this.GetUsers() })
  }
  onEditUser (entity: any, modal: any) 
  {
    this.userId = entity.id
    const modalRef = this.modalService.open
    ( modal, { modalDialogClass: 'side-modal', backdrop: 'static', keyboard: false });
    modalRef.result.then((result) => { this.GetUsers() })
  }
  onChageStatus (entity) 
  {
    this.baseService.Get('Users', `UpdateUserStatus/${entity.id}`).subscribe
    ( res => { this.GetUsers() } )
  }
  onChangePasswordForUser (entity, modal)
  {
    this.userId = entity.id;
    this.FullName = entity.fullName;
    this.modalService.open
    ( modal, { modalDialogClass: 'side-modal', backdrop: 'static', keyboard: false });
  }
  //#endregion
  //#region Filtering and Searching
  onPageChange (event: any) 
  {
    this.baseSearch.PageNumber = event.PageIndex - 1;
    this.baseSearch.pageSize = event.pageSize;
    this.GetUsers()
  }
  onSearch (event) 
  {
    this.baseSearch.name = event.target.value
    this.baseSearch.mobileNumber = event.target.value
    this.baseSearch.email = event.target.value
    this.GetUsers()
  }
  //#endregion
}