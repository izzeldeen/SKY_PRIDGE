import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClientType, LookpusType } from 'src/app/shared/models/enum';
import { AuthService } from 'src/app/shared/services/auth.service';
import { BaseService } from 'src/app/shared/services/base.service';
import { LanguageService } from 'src/app/shared/services/language.service';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.scss']
})
export class CustomersListComponent {
  columns: any[] = [
    { name: "customers.nameAr", field: "nameAr" },
    { name: "customers.nameEn", field: "nameEn" },
    { name: "customers.customerTypeId", field: "customerTypeTitle" },
    { name: "customers.mobileNumber", field: "mobileNumber" },
    { name: "status", field: "isActive" }
  ];
  actionList: any[] = [
    { name: "common.edit", icon: "change", permission: "Update-Customers" },
    { name: 'common.updatestatus', icon: 'change', permission: 'Update-Customers' },
    { name: 'customers.viewcustomerhistory', icon: 'change', permission: 'Update-Customers' }

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
      type: ClientType.Customer
    }
  //#endregion
  constructor
    (
      private modalService: NgbModal,
      public authService: AuthService,
      private baseService: BaseService,
      public languageService: LanguageService,
      private router: Router
    ) { }
  ngOnInit(): void {
    this.getList()
    this.onSearch(null)
  }
  //#region Getters
  private getList() {
    this.baseService.Post('customers', 'List', this.baseSearch).subscribe
      (res => {
        this.dataSource = (res as any).entities
        this.totalCount = (res as any).totalCount
      }
      )
  }
  //#endregion
  //#region Actions Handler
  onAddCustomers(modal: any) {
    const modalRef = this.modalService.open
      (modal, { modalDialogClass: 'side-modal', backdrop: 'static', keyboard: false });
    modalRef.result.then((result) => { this.getList(); })
  }
  onEditcustomers(entity: any, modal: any) {
    this.id = entity.id;
    const modalRef = this.modalService.open
      (modal, { modalDialogClass: 'side-modal', backdrop: 'static', keyboard: false });
    modalRef.result.then((result) => { this.getList(); });
  }
  //#endregion
  //#region Filtering and Searching
  onSearch(event) {
    if (event?.target)
      this.baseSearch.name = event.target.value;
    this.baseSearch.pageNumber = 0;
    this.getList();
  }
  onPageChange(event: any): void {
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
        case "customers.viewcustomerhistory":
        {
          this.onViewCustomerHistory(event.data);
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


  onChageStatus(entity) {
    this.baseService.Get('customers', `UpdateStatus/${entity.id}`).subscribe
      (res => { this.getList() })
  }
  onViewCustomerHistory(event) {
        this.router.navigate(['/company-management/customers/history/'  + event.id])
    }

}
