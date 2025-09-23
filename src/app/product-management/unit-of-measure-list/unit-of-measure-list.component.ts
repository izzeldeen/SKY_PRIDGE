import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/shared/services/auth.service';
import { BaseService } from 'src/app/shared/services/base.service';
import { LanguageService } from 'src/app/shared/services/language.service';

@Component({
  selector: 'app-unit-of-measure-list',
  templateUrl: './unit-of-measure-list.component.html',
  styleUrls: ['./unit-of-measure-list.component.scss']
})
export class UnitOfMeasureListComponent {
columns: any[] = [
    { name: "unitOfMeasure.templateName", field: "templateName" },
    { name: "unitOfMeasure.code", field: "code" },
    { name: "status", field: "isActive" }
  ];
   actionList: any[] = [
    { name: "common.edit", icon: "change", permission: "UnitOfMeasure-Form" },
    { name: 'common.updatestatus', icon: 'change' , permission: 'UnitOfMeasure-Form'}
  ];


dataSource: any[] = [];
  totalCount: number = 0
  id: number = null
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
    this.onSearch(null)
  }
  //#region Getters
  private getList () 
  {
    this.baseService.Post('UnitOfMeasure', 'List', this.baseSearch).subscribe
    ( res => 
      {
        this.dataSource = (res as any).entities
        this.totalCount = (res as any).totalCount
      }
    )
  }
  //#endregion
  //#region Actions Handler
  onAddUnitOfMeasure (modal: any) 
  {
    const modalRef = this.modalService.open
    (modal, { modalDialogClass: 'side-modal', backdrop: 'static', keyboard: false });
    modalRef.result.then((result) => { this.getList(); })
  }
 
  //#endregion
  //#region Filtering and Searching
  onSearch(event) {
    if(event?.target)
      this.baseSearch.name = event.target.value;
      this.baseSearch.pageNumber = 0;
      this.getList();
  }
  onPageChange (event: any): void 
  {
    this.baseSearch.pageNumber = event.PageIndex - 1;
    this.baseSearch.pageSize = event.pageSize;
    this.getList();
  }
  //#endregion

    onHandleAction(event, modal) {
    switch (event.action.name) {
      case "common.edit":
        {
           this.onEdit(event.data, modal);
        }
         break;
        case "common.updatestatus":
        {
           this.onChageStatus(event.data);
        }
        break;
    }
  }


    onEdit(data, modal) {
    this.id = data.id;
    const modalRef = this.modalService.open(modal, {
      modalDialogClass: "side-modal",
      backdrop: "static",
      keyboard: false,
    });
    modalRef.result.then((result) => {
      this.getList();
    });
  }


  onChageStatus (entity) 
  {
    this.baseService.Get('UnitOfMeasure', `UpdateStatus/${entity.id}`).subscribe
    ( res => { this.getList() } )
  }
}
