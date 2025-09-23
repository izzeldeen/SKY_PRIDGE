import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagger',
  templateUrl: './pagger.component.html',
  styleUrls: ['./pagger.component.scss']
})
export class PaggerComponent implements OnInit{

  @Input() pageSize: number = 25;
  @Input() pageIndex: number = 1;
  @Input() TotalRecords : number = 100
  @Input() pageSizeOptions: number[] = [1, 5, 10, 25, 100];

  @Output() PageChange : EventEmitter<any> = new EventEmitter<any>()

  selectedPageSize: number; // Variable to store the selected page size

  ngOnInit(): void {
    this.selectedPageSize = this.pageSize;
  }

  constructor() {
    
  }

  OnPageChange(page:number){
    this.pageSize = page
    this.PageChange.emit({
      pageSize : this.pageSize,
      PageIndex : this.pageIndex
    })
  }

  pageIndexChange(pageIndex : number){
    this.pageIndex = pageIndex
    this.PageChange.emit({
      pageSize : this.pageSize,
      PageIndex : this.pageIndex
    })
  }

  getPageNumbers(): (number | string)[]
  {
    const totalPages = Math.ceil(this.TotalRecords / this.pageSize);
    const currentPage = this.pageIndex;
    const maxPages = 10;
    let pages: (number | string)[] = [];

    if (totalPages <= maxPages) 
    {
      pages = Array.from({ length: totalPages }, (_, index) => index + 1);
    } 
    else 
    {
      const startPage = Math.max(1, currentPage - Math.floor(maxPages / 2));
      const endPage = Math.min(totalPages, startPage + maxPages - 1);

      for (let i = startPage; i <= endPage; i++) 
        pages.push(i);

      if (startPage > 1) 
        pages.unshift(1, '...'); 

      if (endPage < totalPages) 
        pages.push('...', totalPages);
    }
    return pages;
  }

  firstPage() {
    if (this.pageIndex !== 1) {
      this.pageIndexChange(1);
    }
  }
  
  previousPage() {
    if (this.pageIndex > 1) {
      this.pageIndexChange(this.pageIndex - 1);
    }
  }
  
  nextPage() {
    const totalPages = Math.ceil(this.TotalRecords / this.pageSize);
    if (this.pageIndex < totalPages) {
      this.pageIndexChange(this.pageIndex + 1);
    }
  }
  
  lastPage() {
    const totalPages = Math.ceil(this.TotalRecords / this.pageSize);
    if (this.pageIndex !== totalPages) {
      this.pageIndexChange(totalPages);
    }
  }
  
}
