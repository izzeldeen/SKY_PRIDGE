import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product.service';
import { FormControl, FormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { BaseService } from 'src/app/shared/services/base.service';
import { DirectionService } from 'src/app/shared/services/change-language.service';
import { TranslateService } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LanguageService } from 'src/app/shared/services/language.service';
import { LookpusType, sourceTypes } from 'src/app/shared/models/enum';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-product-barcode',
  templateUrl: './product-barcodes.component.html',
  styleUrls: ['./product-barcodes.component.scss']
})
export class ProductBarcodesComponent implements OnInit {
  searchControl: UntypedFormControl = new UntypedFormControl();
  products: any[] = [];
  filteredProducts: any[] = [];
  locale: string;
  actionList: any[] = [];
  searchProduct: string;
  branchies: any[];
  sections: any;
  warehouses: any;
  dataSource: any[] = [];
  totalCount: number = 0
  id: number = null
  sourceTypes: any[] = sourceTypes;
  categories: any;
  selectedIds: number[] = []; // or long[], based on your Id type
  baseSearch =
    {
      categoryId: 0,
      name: '',
      pageSize: 25,
      pageNumber: 0,
    }

  constructor(
    private baseService: BaseService,
    public directionService: DirectionService,
    private translate: TranslateService,
    private modalService: NgbModal,
    public languageService: LanguageService,
    private toastr: ToastrService,
    private productService: ProductService
  ) {

  }

  public form = new FormGroup
    (
      {
        categoryId: new FormControl(null, Validators.required),
        searchControl: new FormControl(null),
      });

  ngOnInit() {
    this.getCategories()
    this.locale = this.directionService.getCurrentLanguage();
    this.searchProduct = this.translate.instant('transaction.seasrch-product')
  }

  onCheckboxChange(event: Event, id: number) {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      if (!this.selectedIds.includes(id)) this.selectedIds.push(id);
    } else {
      this.selectedIds = this.selectedIds.filter(x => x !== id);
    }
  }

  isAllSelected(): boolean {
    return this.filteredProducts.length > 0 && this.selectedIds.length === this.filteredProducts.length;
  }

  // Check if some but not all rows are selected (for indeterminate state)
  isIndeterminate(): boolean {
    return this.selectedIds.length > 0 && this.selectedIds.length < this.filteredProducts.length;
  }

  // Toggle Select All checkbox
  toggleSelectAll(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      // Select all filtered products IDs
      this.selectedIds = this.filteredProducts.map(p => p.id);
    } else {
      // Deselect all
      this.selectedIds = [];
    }
  }

  downloadSelectedBarcodes() {
    if (this.selectedIds.length === 0) return;

    this.baseService.Post('Product', 'DownloadBarcodesPdf', this.selectedIds)
      .subscribe(res => {
        const base64String = (res as any).fileContents
        const byteCharacters = atob(base64String);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: "application/pdf" });

        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);

        const dateStr = this.getLocalDateString();  // Your existing method that returns formatted date
        link.download = `barcodes ${dateStr}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });

  }

  getLocalDateString(): string {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  getCategories() {
    this.baseService.getLookupsByType(LookpusType.Category).subscribe(res => {
      this.categories = res;
    });
  }


  onSearch(event) {
    if (this.form.invalid) {
      this.form.markAllAsTouched(); // show all validation errors
      return;
    }
    if (event?.target) {
      this.baseSearch.name = event.target.value;
      this.baseSearch.name = event.target.value;
      this.baseSearch.pageNumber = 0;
    }
    let form = this.form.getRawValue();
    this.baseSearch.categoryId = form.categoryId;
    this.baseSearch.name = form.searchControl;
    this.baseService.Post('Product', 'GetAllByCategory', this.baseSearch).subscribe(res => {
      this.products = [...res as any[]];
      this.filteredProducts = [...res as any[]];
    })
  }

}