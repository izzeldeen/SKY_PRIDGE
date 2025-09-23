import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbNav } from '@ng-bootstrap/ng-bootstrap';
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { emailValidator } from 'src/app/utils/validation-email';

@Component({
	selector: 'app-shipments',
	templateUrl: './shipments.component.html',
	styleUrls: ['./shipments.component.scss']
})
export class ShipmentsComponent implements OnInit {
	constructor(
		private modalService: NgbModal,
		private router: Router,
		private formBuilder: FormBuilder,
	) {}

	active = 'Shipments';
	editActive = 'Shipment details';
	assignEventActive = 'General information';

	assignEventForm!: FormGroup;
	isSubmittedAssignEventForm = false;

	addItemForm!: FormGroup;
	isSubmittedAddItemForm = false;

	shipmentDetailsForm!: FormGroup;
	isShipmentSubmitted = false;

	shipperDetailsForm!: FormGroup;
	isShipperSubmitted = false;

	consigneeDetailsForm!: FormGroup;
	isConsigneeSubmitted = false;

	shipmentValue = '';

	ngOnInit() {
		this.assignEventForm = this.formBuilder.group({
			Country: ['', Validators.required],
			City: ['', Validators.required],
			EventType: ['', Validators.required],
			ArrivalTime: ['', Validators.required],
			Notes: [''],
			LengthMeasure: [''],
			Length: [''],
			Width: [''],
			Height: [''],
			WeightMeasure: [''],
			Weight: [''],
		}, { updateOn: 'blur' });

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

	newAttachmentModal(newAttachment) {
		this.modalService.open(newAttachment, { 
			modalDialogClass: 'side-modal', 
			backdrop : 'static',
			keyboard : false 
		});
	}

	newEventModal(newEvent) {
		this.modalService.open(newEvent, { 
			modalDialogClass: 'side-modal side-modal-half', 
			backdrop : 'static',
			keyboard : false 
		});
	}

	deleteShipmentModal(deleteShipment) {
		this.modalService.open(deleteShipment, {
			size: 'md', 
			centered: true
		});
	}

	saveShipmentModal(saveShipment) {
		this.modalService.open(saveShipment, {
			size: 'md', 
			centered: true
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

	@ViewChild('saveShipment', { static: true }) saveShipment: ElementRef;
	@ViewChild('errorLengthPopup', { static: true }) errorLengthPopup: ElementRef;

	@HostListener('document:keypress', ['$event'])
  
	onSubmit(event: KeyboardEvent) {  
	  const assignEvent = document.querySelector('#assignEventForm');  
	  const deleteShipment = document.querySelector('#deleteShipment');  
	  const saveShipment = document.querySelector('#saveShipment');	  
	  const errorPopup = document.querySelector('#errorLengthPopup');  
	  const addItem = document.querySelector('#addItemForm');	  
	  const addAttachment = document.querySelector('#addAttachmentForm');  
	  const editShipment = document.querySelector('#editShipment');

	  if (event.key === 'Enter') {
		if (!deleteShipment && !saveShipment) {
			if (assignEvent) {								
				const assignEventButton: HTMLElement = document.querySelector('#assign-event-button');
				assignEventButton.click();
			} else if (addItem) {
				this.submitAddItemForm();
			} else if (addAttachment && !errorPopup) {
				this.uploadFile(this.errorLengthPopup)
			} else if (editShipment) {
				const editShipmentButton: HTMLElement = document.querySelector('#edit-shipment-button');
				editShipmentButton.click();
			}
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
	
	@ViewChild('deleteShipment', { static: true }) deleteShipment: any;

	shipment_code: string;

	addShipment() {
	  const value = this.shipmentValue.trim();
  
	  if (!value) {
		return;
	  }
  
	  const codes = value.split(',');
	  codes.forEach(code => {
		const tr = document.createElement('tr');
		
		tr.setAttribute('class', 'inactive redirect-link');
		tr.setAttribute('role', 'link');
		tr.setAttribute('data-link', '/pages/shipments/shipment-detail');
		tr.onclick = (event) => this.redirect(event);

		tr.innerHTML = `
		  <td>${code.trim()}</td>
		  <td><span class="status c-badge">Not valid</span></td>
		  <td class="actions">
			<button class="row-menu remove"><span></span></button>
		  </td>
		`;

		const button = tr.querySelector('.remove');
		button.addEventListener('click', () => {
		  this.deleteShipmentModal(this.deleteShipment);
		});

		const shipmentTable = document.getElementById('shipmentTable') as HTMLTextAreaElement;

		shipmentTable.querySelector('tbody').appendChild(tr);
	  });
  
	  const textarea = document.getElementById('shipment-code') as HTMLTextAreaElement;
	  textarea.value = '';
	  this.shipmentValueCheck();
	  this.shipmentValue = '';
	  this.shipment_code = '';
	}

	onDateChange(event: any, control, form) {		
		this[form].controls[control].patchValue(event);
	}

	handleCountrySelected(form, control, country) {		
		this[form].controls[control].patchValue(country.value.name);
	}

	triggerAssignEventClear() {
		let trigger: HTMLElement;

		if (this.assignEventActive === 'General information') {
			trigger = document.getElementById('assign-general-button') as HTMLElement;
		} else if (this.assignEventActive === 'Shipments') {
			trigger = document.getElementById('assign-shipments-button') as HTMLElement;
		}

    	trigger.click();
	}

	resetGeneralAssignEventForm(country) {
		this.assignEventForm.reset();
		
		country.value = {};
		this.assignEventForm.controls.City.patchValue('');
		this.assignEventForm.controls.EventType.patchValue('');
		this.assignEventForm.controls.Country.patchValue('');
		this.assignEventForm.controls.LengthMeasure.patchValue('');
		this.assignEventForm.controls.WeightMeasure.patchValue('');
	}

	resetShipmentsAssignEventForm() {
		const textarea = document.getElementById('shipment-code') as HTMLTextAreaElement;
		textarea.value = '';
		this.shipment_code = '';
		this.onTextAreaChange('');
	}

	submitAssignEventForm(saveShipment, assignEventNav) {
		const textarea = document.getElementById('shipment-code') as HTMLTextAreaElement;
		
		if (this.assignEventForm.status === 'VALID') {
			if (assignEventNav.activeId === 'Shipments') {
				if (textarea.value.length) {
					this.modalService.open(saveShipment, {
						windowClass: 'save-container',
						size: 'md', 
						centered: true
					});
				} else {
					this.modalService.open(saveShipment, {
						windowClass: 'save-container alert-container',
						size: 'md', 
						centered: true
					});
				}
			} else if (assignEventNav.activeId === 'General information') {
				assignEventNav.select('Shipments');
			}
		} else {
			assignEventNav.select('General information');
		}
		
		console.log(this.assignEventForm.value);
		
		this.isSubmittedAssignEventForm = true;
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

	onTextAreaChange(newValue: string) {		
		this.shipmentValue = newValue;
		this.shipmentValueCheck();
	}

	shipmentValueCheck() {
		const table = document.getElementById("shipment-code-table") as HTMLElement;

		if (this.shipmentValue.length) {
			table.style.display = "block";
		} else {
			table.style.display = "none";
		}
	}

	redirect(event: Event) {
		const target = event.target as HTMLInputElement;		
		
		if (!target.closest('.row-menu') && !target.closest('.dropdown-item')) {
			this.router.navigateByUrl(target.closest('tr').dataset.link);
		}
	}
}
