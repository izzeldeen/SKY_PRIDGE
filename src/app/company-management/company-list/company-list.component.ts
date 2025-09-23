import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/shared/services/auth.service';
import { BaseService } from 'src/app/shared/services/base.service';
import { LanguageService } from 'src/app/shared/services/language.service';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent {
   columns: any[] = [
    { name: "companyManagement.code", field: "code" },
    { name: "companyManagement.nameEn", field: "nameEn" },
    { name: "companyManagement.nameAr", field: "nameAr" },
    { name: "companyManagement.mobile", field: "nameEn" },
    { name: "companyManagement.subscriptionStart", field: "subscriptionStartDate" , type:'date' },
    { name: "companyManagement.subscriptionEnd", field: "subscriptionEndDate" , type:'date' },
     { name: "companyManagement.status", field: "isActive" }
  ];
    actionList: any[] = [
    { name: "common.info", icon: "change", permission: "Company-List" },
    { name: "common.edit", icon: "change", permission: "Company-List" },
    { name: 'common.updatestatus', icon: 'change' , permission: 'Admin-Change-Status'}
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
    public languageService : LanguageService,
    private router: Router
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
    this.baseService.Post('Company', 'List', this.baseSearch).subscribe
    ( res => 
      {
        this.dataSource = (res as any).entities
        this.totalCount = (res as any).totalCount
      }
    )
  }
  //#endregion
  //#region Actions Handler
  onAddCompany (modal: any) 
  {
    const modalRef = this.modalService.open
    (modal, { modalDialogClass: 'side-modal', backdrop: 'static', keyboard: false });
    modalRef.result.then((result) => { this.getList(); })
  }
  onEditCompany (entity: any, modal: any) 
  {
    this.id = entity.id;
    const modalRef = this.modalService.open
    (modal, { modalDialogClass: 'side-modal', backdrop: 'static', keyboard: false });
    modalRef.result.then((result) => { this.getList(); });
  }
  //#endregion
  //#region Filtering and Searching
  onSearch(event) {
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
         case "common.info":
        {
           this.onInfo(event.data);
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
    this.baseService.Get('Company', `UpdateStatus/${entity.id}`).subscribe
    ( res => { this.getList() } )
  }

   onInfo(event) {
        this.router.navigate(['/company-management/companies/' + event.id])
    }

}
