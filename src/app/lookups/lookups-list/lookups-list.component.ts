import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { TranslateService } from "@ngx-translate/core";
import { LookupsTypeArr } from "src/app/shared/models/enum";
import { AuthService } from "src/app/shared/services/auth.service";
import { BaseService } from "src/app/shared/services/base.service";
import { LanguageService } from "src/app/shared/services/language.service";
@Component({
  selector: "app-lookups-list",
  templateUrl: "./lookups-list.component.html",
  styleUrls: ["./lookups-list.component.scss"],
})
export class LookupsListComponent implements OnInit {
  //#region Variables
  Lookup: any;
  columns: any[] = [
    // { name: "#", field: "id" },
    { name: "Lookups.title", field: "title" },
    { name: "Lookups.value", field: "valueText" },
    { name: "Lookups.status", field: "isActive" },
  ];
  dataSource: any[] = [];
  actionList: any[] = [
    { name: "common.edit", icon: "change", permission: "Lookups-Edit" },
  ];
  baseSearch = {
    pageSize: 25,
    PageNumber: 0,
    typeId: null,
    name: null,
  };
  LookupsArray: any[] = LookupsTypeArr;
  totalCount: number = 0;
  TypeId = null;
  lookupId: number = null;
  //#endregion
  constructor(
    private baseService: BaseService,
    private modalService: NgbModal,
    public languageService: LanguageService,
    private activatedRoute: ActivatedRoute,
    public authService: AuthService,
    private translateService: TranslateService
  ) {}
  ngOnInit(): void {
    this.fetshRouterParam();
    this.getLookup();
    this.detectLanguageChange();
  }

  detectLanguageChange(){
    this.translateService.onLangChange.subscribe((event) => {
      setTimeout(() => {
        this.getLookup(); // Ensure the language change is fully applied
      }, 0); 
    });
  }
  fetshRouterParam(): void {
    this.activatedRoute.params.subscribe((param) => {
      this.TypeId = +param["typeId"];
      this.Lookup = this.LookupsArray.find((x) => x.id === this.TypeId);
    });
  }
  //#region Getters
  getLookup() {
    this.baseSearch.typeId = this.TypeId;
    this.baseService
      .Post("Lookups", "List", this.baseSearch)
      .subscribe((res) => {
        this.dataSource = (res as any).entities;
        this.totalCount = (res as any).totalCount;
      });
  }
  //#endregion
  //#region Actions Handler
  onHandleAction(event, modal) {
    switch (event.action.name) {
      case "common.edit":
        {
          this.onEditLookups(event.data, modal);
        }
        break;
    }
  }
  onEditLookups(data, modal) {
    this.lookupId = data.id;
    const modalRef = this.modalService.open(modal, {
      modalDialogClass: "side-modal",
      backdrop: "static",
      keyboard: false,
    });
    modalRef.result.then((result) => {
      this.getLookup();
    });
  }
  //#endregion
  //#region Functions
  onAddNewLookups(modal) {
    const modalRef = this.modalService.open(modal, {
      modalDialogClass: "side-modal",
      backdrop: "static",
      keyboard: false,
    });
    modalRef.result.then((result) => {
      this.getLookup();
    });
  }
  //#endregion
  //#region Filtering and Searching
  onSearch(event) {
      this.baseSearch.name = event.target.value;
      this.baseSearch.PageNumber = 0;
    this.getLookup();
  }
  onPageChange(event) {
    this.baseSearch.PageNumber = event.PageIndex - 1;
    this.baseSearch.pageSize = event.pageSize;
    this.getLookup();
  }
  //#endregion
}
