import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { emailValidator } from 'src/app/utils/validation-email';

@Component({
	selector: 'app-shipment-detail',
	templateUrl: './shipment-detail.component.html',
	styleUrls: ['./shipment-detail.component.scss']
})
export class ShipmentDetailComponent implements OnInit {
	constructor(
		private modalService: NgbModal,
		private formBuilder: FormBuilder,
	) { }

	active = 'Shipment details';
	editActive = 'Shipment details';

	dataAttachments: any[] = [];

	addItemForm!: FormGroup;
	isSubmittedAddItemForm = false;

	shipmentDetailsForm!: FormGroup;
	isShipmentSubmitted = false;

	shipperDetailsForm!: FormGroup;
	isShipperSubmitted = false;

	consigneeDetailsForm!: FormGroup;
	isConsigneeSubmitted = false;

	ngOnInit() {
		this.addItemForm = this.formBuilder.group({
			HSCode: [''],
			CountryOrigin: [''],
			Quantity: ['', Validators.required],
			Amount: ['', Validators.required],
			Currency: ['', Validators.required],
			WeightMeasure: [''],
			Weight: ['', Validators.required],
			Goods: ['', Validators.required],
		}, { updateOn: 'blur' });

		this.shipmentDetailsForm = this.formBuilder.group({
			ShipperName: ['', Validators.required],
			ShippingDate: ['', Validators.required],
			ExpectedDate: ['', Validators.required],
			ProductType: ['', Validators.required],
			CustomsValue: ['', Validators.required],
			CustomsCurrency: ['', Validators.required],
			ShipperBranch: [''],
			GoodsDescription: ['', Validators.required],
			ItemsDescription: ['', Validators.required],
			COD: [false],

			Length: ['', Validators.required],
			Width: ['', Validators.required],
			Height: ['', Validators.required],
			LengthMeasure: ['', Validators.required],
			Weight: ['', Validators.required],
			WeightMeasure: [''],
		}, {updateOn: 'blur'});

		this.shipperDetailsForm = this.formBuilder.group({
			Address: ['', Validators.required],
			Country: ['', Validators.required],
			City: ['', Validators.required],
			Postcode: ['', Validators.required],
			District: [''],
			Latitude: [''],
			Longitude: [''],

			ContactName: ['', Validators.required],
            Email: ['', [Validators.required, emailValidator()]],
			Phone1: ['', Validators.required],
			Phone2: [''],
		}, {updateOn: 'blur'});

		this.consigneeDetailsForm = this.formBuilder.group({
			Address: ['', Validators.required],
			Country: ['', Validators.required],
			City: ['', Validators.required],
			Postcode: ['', Validators.required],
			District: [''],
			Type: [''],
			Latitude: [''],
			Longitude: [''],

			ContactName: ['', Validators.required],
			Email: ['', [Validators.required, emailValidator()]],
			Phone1: ['', Validators.required],
			Phone2: [''],
			CompanyName: [''],
		}, {updateOn: 'blur'});
	}

	handleModal(modal) {
		  this.modalService.open(modal, { 
			  modalDialogClass: 'side-modal', 
			  backdrop : 'static',
			  keyboard : false 
		  });
	}

	eventsShipmentModal(eventsShipment) {
		this.modalService.open(eventsShipment, { 
			modalDialogClass: 'side-modal', 
			backdrop : 'static',
			keyboard : false 
		});
	}


	newItemModal(newItem) {
		this.modalService.open(newItem, { 
			modalDialogClass: 'side-modal', 
			backdrop : 'static',
			keyboard : false 
		});
	}

	editShipmentModal(editShipment) {
		this.modalService.open(editShipment, { 
			modalDialogClass: 'side-modal side-modal-half', 
			backdrop : 'static',
			keyboard : false 
		});
	}

	triggerEditClear() {
		let trigger: HTMLElement;

		if (this.editActive === 'Shipment details') {
			trigger = document.getElementById('shipment-button') as HTMLElement;
		} else if (this.editActive === 'Shipper details') {
			trigger = document.getElementById('shipper-button') as HTMLElement;
		} else if (this.editActive === 'Consignee details') {
			trigger = document.getElementById('consignee-button') as HTMLElement;
		}

    	trigger.click();
	}

	resetShipmentDetailsForm() {
		this.shipmentDetailsForm.reset();	
		this.shipmentDetailsForm.controls.ShipperName.patchValue('');
		this.shipmentDetailsForm.controls.ProductType.patchValue('');
		this.shipmentDetailsForm.controls.CustomsCurrency.patchValue('');
		this.shipmentDetailsForm.controls.ShipperBranch.patchValue('');
		this.shipmentDetailsForm.controls.LengthMeasure.patchValue('');
		this.shipmentDetailsForm.controls.WeightMeasure.patchValue('');
	}

	resetShipperDetailsForm(country, phone1, phone2) {
		this.shipperDetailsForm.reset();	
		country.value = {};		
		phone1.preferredCountries = [];
		phone1.ngOnInit();
		phone2.preferredCountries = [];
		phone2.ngOnInit();
		this.shipperDetailsForm.controls.Country.patchValue('');
		this.shipperDetailsForm.controls.City.patchValue('');
		this.shipperDetailsForm.controls.Phone1.patchValue(' ');
		this.shipperDetailsForm.controls.Phone2.patchValue(' ');
	}

	resetConsigneeDetailsForm(country, phone1, phone2) {
		this.consigneeDetailsForm.reset();	
		country.value = {};
		phone1.preferredCountries = [];
		phone1.ngOnInit();
		phone2.preferredCountries = [];
		phone2.ngOnInit();
		this.consigneeDetailsForm.controls.Country.patchValue('');
		this.consigneeDetailsForm.controls.City.patchValue('');
		this.consigneeDetailsForm.controls.Type.patchValue('');
		this.consigneeDetailsForm.controls.Phone1.patchValue(' ');
		this.consigneeDetailsForm.controls.Phone2.patchValue(' ');
	}

	submitEditShipmentForm(editNav) {
		this.isShipmentSubmitted = true;
		this.isShipperSubmitted = true;
		this.isConsigneeSubmitted = true;

		if (this.shipmentDetailsForm.status === 'INVALID') {
			editNav.select('Shipment details')
		} else if (this.shipperDetailsForm.status === 'INVALID') {
			editNav.select('Shipper details')
		} else if (this.consigneeDetailsForm.status === 'INVALID') {
			editNav.select('Consignee details')
		} 
	}

	onDateChange(event: any, control, form) {		
		this[form].controls[control].patchValue(event);
	}

	handleCountrySelected(form, control, country) {		
		this[form].controls[control].patchValue(country.value.name);
	}

	@ViewChild('errorLengthPopup', { static: true }) errorLengthPopup: ElementRef;
	@ViewChild('editNav', { static: true }) editNav: ElementRef;

	@HostListener('document:keypress', ['$event'])

	onSubmit(event: KeyboardEvent) {   
	  const addItem = document.querySelector('#addItemForm');	  
	  const errorPopup = document.querySelector('#errorLengthPopup');  
	  const addAttachment = document.querySelector('#addAttachmentForm');
	  const editShipment = document.querySelector('#editShipment');

	  if (event.key === 'Enter') {
		if (addItem) {
			this.submitAddItemForm();
		} else if (addAttachment && !errorPopup) {
			this.uploadFile(this.errorLengthPopup)
		} else if (editShipment) {
			const editShipmentButton: HTMLElement = document.querySelector('#edit-shipment-button');
			editShipmentButton.click();
		}
	  }
	}

	componentArray = [{id: 0}];

	addNewComponent() {		
		this.componentArray.push({id: this.componentArray.length});
	}

	uploadFile(errorLengthPopup) {
		const inputElements = document.querySelectorAll('#addAttachmentForm input.add-input');
		const firstInputValue = inputElements[0] as HTMLInputElement;
		if (!firstInputValue.files.length) {
			this.modalService.open(errorLengthPopup, { 
				windowClass: 'attachments-alert-popup',
				size: 'md', 
				centered: true 
			});
		} 
		else {
			for (let i = 0; i < inputElements.length; i++) {
				const inputElement = inputElements[i] as HTMLInputElement;
				var input = inputElement.files;
				
				if (input.length && input[0].size > 2000000) {
					this.modalService.open(errorLengthPopup, { 
						windowClass: 'attachments-alert-popup size-alert',
						size: 'md', 
						centered: true 
					});
					break;
				}
			}
		}
	}

	resetAddItemForm(country) {
		this.addItemForm.reset();
		country.value = {};
		
		this.addItemForm.controls.CountryOrigin.patchValue('');
		this.addItemForm.controls.Currency.patchValue('');
		this.addItemForm.controls.WeightMeasure.patchValue('');
	}

	submitAddItemForm() {
		console.log(this.addItemForm.value);
		this.isSubmittedAddItemForm = true;
	}
}
