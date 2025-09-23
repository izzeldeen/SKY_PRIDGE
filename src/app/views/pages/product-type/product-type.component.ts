import { Component, HostListener, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
	FormGroup,
	FormBuilder,
	Validators
  } from '@angular/forms';

@Component({
	selector: 'app-product-type',
	templateUrl: './product-type.component.html',
	styleUrls: ['./product-type.component.scss']
})
export class ProductTypeComponent implements OnInit {
	constructor(
		private modalService: NgbModal,
		private formBuilder: FormBuilder,
	) { }

	addProductTypeForm!: FormGroup;
	isSubmittedAddProductType = false;
	editProductTypeForm!: FormGroup;
	isSubmittedEditProductType = false;

	ngOnInit() {
		this.addProductTypeForm = this.formBuilder.group({
			ProductTypeName: ['', Validators.required],
			ProductTypeCode: ['', Validators.required],
			ProductService: ['', Validators.required],
			Status: ['', Validators.required],
			EnglishTranslation: [''],
			FrenchTranslation: [''],
			ArabicTranslation: [''],
		});

		this.editProductTypeForm = this.formBuilder.group({
			ProductTypeName: [''],
			ProductTypeCode: [''],
			ProductService: [''],
			Status: [''],
			EnglishTranslation: [''],
			FrenchTranslation: [''],
			ArabicTranslation: [''],
		});
	}

	filtersModal(filtersPopup) {
		this.modalService.open(filtersPopup, { 
			modalDialogClass: 'side-modal', 
			backdrop : 'static',
			keyboard : false 
		});
	}

	newTypeModal(newTypePopup) {
		this.modalService.open(newTypePopup, { 
			modalDialogClass: 'side-modal', 
			backdrop: 'static',
			keyboard : false,
		});
	}

	editTypeModal(editTypePopup) {
		this.modalService.open(editTypePopup, { 
			modalDialogClass: 'side-modal', 
			backdrop : 'static',
			keyboard : false 
		});
	}

	@HostListener('document:keypress', ['$event'])

	onSubmit(event: KeyboardEvent) {  
	  const addProductType = document.querySelector('#addProductTypeForm');  
	  const editProductType = document.querySelector('#editProductTypeForm');  
	   
	  if (event.key === 'Enter') {
		if (addProductType) {
		  this.submitAddProductType();
		} else if (editProductType) {
		  this.submitEditProductType();
		}
	  }
	}

	submitAddProductType() {
		console.log(this.addProductTypeForm.value);
		this.isSubmittedAddProductType = true;
	}

	resetAddProductType() {
		this.addProductTypeForm.reset();
		this.addProductTypeForm.controls.ProductService.patchValue('');
        this.addProductTypeForm.controls.Status.patchValue('');
	}

	submitEditProductType() {
		console.log(this.editProductTypeForm.value);
		this.isSubmittedEditProductType = true;
	}

	resetEditProductType() {
		this.editProductTypeForm.reset();
		this.editProductTypeForm.controls.ProductService.patchValue('');
        this.editProductTypeForm.controls.Status.patchValue('');
	}
}
