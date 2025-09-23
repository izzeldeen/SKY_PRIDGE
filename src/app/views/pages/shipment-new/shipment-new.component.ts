import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbNav } from '@ng-bootstrap/ng-bootstrap';
import { emailValidator } from 'src/app/utils/validation-email';

@Component({
	selector: 'app-shipment-new',
	templateUrl: './shipment-new.component.html',
	styleUrls: ['./shipment-new.component.scss']
})
export class ShipmentNewComponent implements OnInit {

	active = 'Shipment details';

	step1IsDone = false;
	step2IsDone = false;
	step3IsDone = false;
	step4IsDone = false;
	step5IsDone = false;

	shipmentDetailsForm!: FormGroup;
	isShipmentSubmitted = false;

	shipperDetailsForm!: FormGroup;
	isShipperSubmitted = false;

	consigneeDetailsForm!: FormGroup;
	isConsigneeSubmitted = false;

	defaultItemForm!: FormGroup;

	isItemsSubmitted = [];

	isChecked = false;

	itemsForms: FormGroup[] = [];
	
	constructor(
		private modalService: NgbModal,
		private formBuilder: FormBuilder
	) { }
		
	ngOnInit() {
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

		this.defaultItemForm = this.formBuilder.group({
			Quantity: [{value: 1, disabled: true}, Validators.required],
			Amount: [{value: 10000, disabled: true}, Validators.required],
			HSCode: [{value: '', disabled: true}],
			Currency: [{value: 'USD', disabled: true}, Validators.required],
			Weight: [{value: '30', disabled: true}, Validators.required],
			WeightMeasure: [{value: 'kg', disabled: true}],
			Country: [{value: '', disabled: true}],
			Goods: [{value: 'Lorem ipsum dolor sit amet consectetur. Dictum eget scelerisque sapien sollicitudin sit ut. Malesuada at quis arcu egestas neque. Sit eget nunc faucibus sit semper curabitur cras vel aliquam adipiscing.', disabled: true}, Validators.required],
		  }, {updateOn: 'blur'});

   		this.addForm();
	}

	addForm() {
		const form = this.formBuilder.group({
		  Quantity: ['', Validators.required],
		  Amount: ['', Validators.required],
		  HSCode: [''],
		  Currency: ['', Validators.required],
		  Weight: ['', Validators.required],
		  WeightMeasure: [''],
		  Country: [''],
		  Goods: ['', Validators.required],
		}, {updateOn: 'blur'});
	
		this.itemsForms = [...this.itemsForms, form];
		this.isItemsSubmitted = [...this.isItemsSubmitted, false];
	}

	@ViewChild('nav') nav!: NgbNav;

	onDateChange(event: any, control) {		
		this.shipmentDetailsForm.controls[control].patchValue(event);
	}

	handleCountrySelected(form, control, country) {		
		this[form].controls[control].patchValue(country.value.name);
	}

	handleMultipleCountrySelected(control, country, i) {		
		this.itemsForms[i].controls[control].patchValue(country.value.name);
	}

	submitItemsForm(navTab, step, status) {
		this[status].forEach((_, index, array) => {
			array[index] = true;
		});

		let isValid = true;
		for (const itemsForm of this.itemsForms) {
			if (!itemsForm.valid) {
				isValid = false;
				break;
			}
		}
	
		if (isValid || this.isChecked) {
			this.nav.select(navTab)
			this[step] = true;

		  	console.log('All forms are valid!');
		} else {
		  	console.log('Some forms are invalid!');
		}
	}

	handleNext(navTab, step, status, form) {
		this[status] = true;		

		console.log(this[form].value);		
		
		if (this[form].valid) {
			this.nav.select(navTab)
			this[step] = true;
		}
	}

	removeComponent(event: any, index: number) {
		event.target.closest('.step-form').remove();	
		this.itemsForms = [...this.itemsForms].filter((_, i) => i !== index);
		this.isItemsSubmitted = [...this.isItemsSubmitted].filter((_, i) => i !== index);	
	}

	@ViewChild('curForm') curForm: ElementRef;

	componentArray = [{id: 0}];

	addNewAttachment() {		
		this.componentArray.push({id: this.componentArray.length});
	}

	uploadFile(errorLengthPopup) {
		const inputElements = this.curForm.nativeElement.getElementsByTagName('input');
		
		for (let i = 0; i < inputElements.length; i++) {
			var input = inputElements[i].files;
			
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


