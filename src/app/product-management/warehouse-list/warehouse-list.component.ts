import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClientType, LookpusType } from 'src/app/shared/models/enum';
import { AuthService } from 'src/app/shared/services/auth.service';
import { BaseService } from 'src/app/shared/services/base.service';
import { LanguageService } from 'src/app/shared/services/language.service';

@Component({
  selector: 'app-warehouse-list',
  templateUrl: './warehouse-list.component.html',
  styleUrls: ['./warehouse-list.component.scss']
})
export class WarehouseListComponent {
  columns: any[] = [
    { name: "warehouse.nameEn", field: "nameEn" },
    { name: "warehouse.nameAr", field: "nameAr" },
    { name: "warehouse.locationEn", field: "locationEn" },
    { name: "warehouse.locationAr", field: "locationAr" },
    { name: "warehouse.branchesDescription", field: "branchesDescription" },
    { name: "status", field: "isActive" }
  ];
  actionList: any[] = [
    { name: "common.edit", icon: "change", permission: "Warehouse-Form" },
    { name: 'common.updatestatus', icon: 'change', permission: "Warehouse-Form" }
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
      public languageService: LanguageService
    ) { }
  ngOnInit(): void {
    this.getList()
    this.onSearch(null)
  }
  //#region Getters
  private getList() {
    this.baseService.Post('warehouse', 'List', this.baseSearch).subscribe
      (res => {
        this.dataSource = (res as any).entities
        this.totalCount = (res as any).totalCount
      }
      )
  }
  //#endregion
  //#region Actions Handler
  onAddWarehouse(modal: any) {
    const modalRef = this.modalService.open
      (modal, { modalDialogClass: 'side-modal', backdrop: 'static', keyboard: false });
    modalRef.result.then((result) => { this.getList(); })
  }
  onEditwarehouse(entity: any, modal: any) {
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
    this.baseService.Get('warehouse', `UpdateStatus/${entity.id}`).subscribe
      (res => { this.getList() })
  }


}
