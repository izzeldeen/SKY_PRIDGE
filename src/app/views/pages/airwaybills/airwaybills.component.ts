import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
	selector: 'app-airwaybills',
	templateUrl: './airwaybills.component.html'
})
export class AirwaybillsComponent implements OnInit {
	constructor(
		private modalService: NgbModal,
		private router: Router,
		private formBuilder: FormBuilder
	) { }
	
	dtAdd: string;
	dtEdit: string;
	adtAdd: string;
	adtEdit: string;
	mawb_code: string;
	container_code: string;
	airwaybillAddForm!: FormGroup;
	isSubmittedAirwaybillAddForm = false;
	airwaybillEditForm!: FormGroup;
	isSubmittedAirwaybillEditForm = false;
	containerValue = '';

	addMawbActive = 'General information';
	editMawbActive = 'General information';
	assignEventActive = 'General information';

	assignEventForm!: FormGroup;
	isSubmittedAssignEventForm = false;
	eventValue = '';

	ngOnInit() {
		this.airwaybillAddForm = this.formBuilder.group({
			nextStop: ['', Validators.required],
			airlineNumber: ['', Validators.required],
			flightNumber: [''],
			shippingType: [''],
			departureTime: ['', Validators.required],
			arrivalTime: ['', Validators.required],
			mawbTotalweight: [''],
			mawbChargeableWeight: [''],
			customerCode: ['', Validators.required],
			branchCode: ['', Validators.required],
			numberOfPieces: [''],
			originIso: ['', Validators.required],
		}, { updateOn: 'blur' });

		this.airwaybillEditForm = this.formBuilder.group({
			nextStop: ['', Validators.required],
			airlineNumber: ['', Validators.required],
			flightNumber: [''],
			shippingType: [''],
			departureTime: ['', Validators.required],
			arrivalTime: ['', Validators.required],
			mawbTotalweight: [''],
			mawbChargeableWeight: [''],
			customerCode: ['', Validators.required],
			branchCode: ['', Validators.required],
			numberOfPieces: [''],
			originIso: ['', Validators.required],
		}, { updateOn: 'blur' });

		this.assignEventForm = this.formBuilder.group({
			Country: ['', Validators.required],
			City: ['', Validators.required],
			EventType: ['', Validators.required],
			ArrivalTime: ['', Validators.required],
			Notes: [''],
		}, { updateOn: 'blur' });
	}

	onDateChange(event: any, control, form) {		
		this[form].controls[control].patchValue(event);
	}

	handleCountrySelected(form, control, country) {		
		this[form].controls[control].patchValue(country.value.name);
	}

	newEventModal(newEvent) {
		this.modalService.open(newEvent, { 
			modalDialogClass: 'side-modal side-modal-half', 
			backdrop : 'static',
			keyboard : false 
		});
	}

	deleteAirwaybillModal(deleteAirwaybill) {
		this.modalService.open(deleteAirwaybill, {
			size: 'md', 
			centered: true
		});
	}

	saveAirwaybillModal(saveAirwaybill) {
		this.modalService.open(saveAirwaybill, {
			size: 'md', 
			centered: true
		});
	}

	newAirwaybillModal(newAirwaybill) {
		this.modalService.open(newAirwaybill, { 
			modalDialogClass: 'side-modal side-modal-half', 
			backdrop : 'static',
			keyboard : false,
		});
	}

	editAirwaybillModal(editAirwaybill) {
		this.modalService.open(editAirwaybill, { 
			modalDialogClass: 'side-modal side-modal-half', 
			backdrop : 'static',
			keyboard : false 
		});
	}

	deleteContainerModal(deleteContainer) {
		this.modalService.open(deleteContainer, {
			size: 'md', 
			centered: true
		});
	}

	saveContainerModal(saveContainer) {
		this.modalService.open(saveContainer, {
			size: 'md', 
			centered: true
		});
	}

	@HostListener('document:keypress', ['$event'])
  
	onSubmit(event: KeyboardEvent) {  
	  const airwaybillAdd = document.querySelector('#airwaybillAddForm');  
	  const airwaybillEdit = document.querySelector('#airwaybillEditForm');  
	  const assignEvent = document.querySelector('#assignEventForm');	  
	  const deleteContainer = document.querySelector('#deleteContainer');  
	  const saveContainer = document.querySelector('#saveContainer');  
	  const deleteAirwaybill = document.querySelector('#deleteAirwaybill');  
	  const saveAirwaybill = document.querySelector('#saveAirwaybill');  	  
	   
	  if (event.key === 'Enter') {
		if (assignEvent && !deleteAirwaybill && !saveAirwaybill) {		
			const assignEventButton: HTMLElement = document.querySelector('#assign-event-button');
			assignEventButton.click();				
		}
		
		if (!deleteContainer && !saveContainer) {
			if (airwaybillAdd) {
				const addContainerButton: HTMLElement = document.querySelector('#add-mawb-button');
				addContainerButton.click();
			} else if (airwaybillEdit) {
				const editContainerButton: HTMLElement = document.querySelector('#edit-mawb-button');
				editContainerButton.click();
			}
		}
	  }
	}

	@ViewChild('deleteContainer', { static: true }) deleteContainer: any;
	@ViewChild('deleteAirwaybill', { static: true }) deleteAirwaybill: any;

	addContainer() {
		const value = this.containerValue.trim();
	
		if (!value) {
		  return;
		}

		const codes = value.split(',');
		codes.forEach(code => {
			const tr = document.createElement('tr');

			tr.setAttribute('class', 'inactive redirect-link');
			tr.setAttribute('role', 'link');
			tr.setAttribute('data-link', '/pages/airwaybills/waybill');
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
				this.deleteContainerModal(this.deleteContainer);
			});

			const shipmentTable = document.getElementById('containerTable') as HTMLTextAreaElement;
			shipmentTable.querySelector('tbody').appendChild(tr);
		});
	
		const textarea = document.getElementById('container-code') as HTMLTextAreaElement;
		textarea.value = '';
		this.containerValueCheck();
		this.containerValue = '';
		this.container_code = '';
	}

	addMawb() {
		const value = this.eventValue.trim();
	
		if (!value) {
		  return;
		}

		const codes = value.split(',');
		codes.forEach(code => {
			const tr = document.createElement('tr');

			tr.setAttribute('class', 'inactive redirect-link');
			tr.setAttribute('role', 'link');
			tr.setAttribute('data-link', '/pages/airwaybills/waybill');
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
				this.deleteAirwaybillModal(this.deleteAirwaybill);
			});

			const shipmentTable = document.getElementById('mawbTable') as HTMLTextAreaElement;
			shipmentTable.querySelector('tbody').appendChild(tr);
		});
	
		const textarea = document.getElementById('mawb-code') as HTMLTextAreaElement;
		textarea.value = '';
		this.airwaybillValueCheck();
		this.eventValue = '';
		this.mawb_code = '';
	}

	redirect(event: Event) {
		const target = event.target as HTMLInputElement;
		
		if (!target.closest('.row-menu')) {
			this.router.navigateByUrl(target.closest('tr').dataset.link);
		}
	}

	onAirwaybillTextAreaChange(newValue: string) {
		this.eventValue = newValue;
		this.airwaybillValueCheck();
	}

	airwaybillValueCheck() {
		const table = document.getElementById("shipment-code-table") as HTMLElement;

		if (this.eventValue.length) {
			table.style.display = "block";
		} else {
			table.style.display = "none";
		}
	}

	onTextAreaChange(newValue: string) {
		this.containerValue = newValue;
		this.containerValueCheck();
	}

	containerValueCheck() {
		const table = document.getElementById("container-code-table") as HTMLElement;

		if (this.containerValue.length) {
			table.style.display = "block";
		} else {
			table.style.display = "none";
		}
	}

	triggerAssignEventClear() {
		let trigger: HTMLElement;

		if (this.assignEventActive === 'General information') {
			trigger = document.getElementById('assign-general-button') as HTMLElement;
		} else if (this.assignEventActive === 'Master air waybills') {
			trigger = document.getElementById('assign-mawb-button') as HTMLElement;
		}

    	trigger.click();
	}

	resetGeneralAssignEventForm(eventCountry) {
		this.assignEventForm.reset();
		eventCountry.value = {};
		this.assignEventForm.controls.City.patchValue('');
		this.assignEventForm.controls.EventType.patchValue('');
		this.assignEventForm.controls.Country.patchValue('');
	}

	resetMawbAssignEventForm() {
		const textarea = document.getElementById('mawb-code') as HTMLTextAreaElement;
		textarea.value = '';
		this.mawb_code = '';
		this.onAirwaybillTextAreaChange('');
	}

	submitAssignEventForm(saveAirwaybill, assignEventNav) {
		const textarea = document.getElementById('mawb-code') as HTMLTextAreaElement;

		if (this.assignEventForm.status === 'VALID') {
			if (assignEventNav.activeId === 'Master air waybills') {
				if (textarea.value.length) {
					this.modalService.open(saveAirwaybill, {
						windowClass: 'save-container',
						size: 'md', 
						centered: true
					});
				} else {
					this.modalService.open(saveAirwaybill, {
						windowClass: 'save-container alert-container',
						size: 'md', 
						centered: true
					});
				}
			} else if (assignEventNav.activeId === 'General information') {
				assignEventNav.select('Master air waybills');
			}
		} else {
			assignEventNav.select('General information');
		}

		this.isSubmittedAssignEventForm = true;
	}

	triggerAddMawbClear() {
		let trigger: HTMLElement;

		if (this.addMawbActive === 'General information') {
			trigger = document.getElementById('add-general-button') as HTMLElement;
		} else if (this.addMawbActive === 'Containers') {
			trigger = document.getElementById('add-containers-button') as HTMLElement;
		}

    	trigger.click();
	}

	resetGeneralMawbAddForm(addOriginIso, addNextStop) {
		this.airwaybillAddForm.reset();
		addOriginIso.value = {};
		addNextStop.value = {};
		this.airwaybillAddForm.controls.nextStop.patchValue('');
		this.airwaybillAddForm.controls.originIso.patchValue('');
		this.airwaybillAddForm.controls.shippingType.patchValue('');

		if (this.dtAdd || this.adtAdd) {
			const elementsAdd = document.querySelectorAll('.p-calendar-clear-icon');
			
			elementsAdd.forEach((element) => {
				element.dispatchEvent(new Event('click'));
			});
		}				
	}

	resetContainersMawbAddForm() {
		const textarea = document.getElementById('container-code') as HTMLTextAreaElement;
		textarea.value = '';
		this.container_code = '';
		this.onTextAreaChange('');		
	}

	submitAirwaybillAddForm(saveContainer, addMawbNav) {
		const textarea = document.getElementById('container-code') as HTMLTextAreaElement;
		
		if (this.airwaybillAddForm.status === 'VALID') {
			if (addMawbNav.activeId === 'Containers') {
				if (textarea.value.length) {
					this.modalService.open(saveContainer, {
						windowClass: 'save-container',
						size: 'md', 
						centered: true
					});
				} else {
					this.modalService.open(saveContainer, {
						windowClass: 'save-container alert-container',
						size: 'md', 
						centered: true
					});
				}
			} else if (addMawbNav.activeId === 'General information') {
				addMawbNav.select('Containers');
			}
		} else {
			addMawbNav.select('General information');
		}

		this.isSubmittedAirwaybillAddForm = true;
	}

	triggerEditMawbClear() {
		let trigger: HTMLElement;

		if (this.editMawbActive === 'General information') {
			trigger = document.getElementById('edit-general-button') as HTMLElement;
		} else if (this.editMawbActive === 'Containers') {
			trigger = document.getElementById('edit-containers-button') as HTMLElement;
		}

    	trigger.click();
	}

	resetGeneralMawbEditForm(editOriginIso, editNextStop) {
		this.airwaybillEditForm.reset();		
		editOriginIso.value = {};
		editNextStop.value = {};
		this.airwaybillEditForm.controls.originIso.patchValue('');
		this.airwaybillEditForm.controls.nextStop.patchValue('');
		this.airwaybillEditForm.controls.shippingType.patchValue('');

		if (this.dtEdit || this.adtEdit) {
			const elementsEdit = document.querySelectorAll('.p-calendar-clear-icon');
			
			elementsEdit.forEach((element) => {
				element.dispatchEvent(new Event('click'));
			});
		}
	}

	resetContainersMawbEditForm() {
		const textarea = document.getElementById('container-code') as HTMLTextAreaElement;
		textarea.value = '';
		this.container_code = '';
		this.onTextAreaChange('');	
	}

	submitAirwaybillEditForm(saveContainer, editMawbNav) {
		const textarea = document.getElementById('container-code') as HTMLTextAreaElement;
		
		if (this.airwaybillEditForm.status === 'VALID') {
			if (editMawbNav.activeId === 'Containers') {
				if (textarea.value.length) {
					this.modalService.open(saveContainer, {
						windowClass: 'save-container',
						size: 'md', 
						centered: true
					});
				} else {
					this.modalService.open(saveContainer, {
						windowClass: 'save-container alert-container',
						size: 'md', 
						centered: true
					});
				}
			} else if (editMawbNav.activeId === 'General information') {
				editMawbNav.select('Containers');
			}
		} else {
			editMawbNav.select('General information');
		}

		this.isSubmittedAirwaybillEditForm = true;
	}
}
