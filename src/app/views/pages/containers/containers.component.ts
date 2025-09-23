import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
	selector: 'app-containers',
	templateUrl: './containers.component.html'
})
export class ContainersComponent implements OnInit {
	constructor(
		private modalService: NgbModal,
		private router: Router,
		private formBuilder: FormBuilder
	) { }

	addContainerActive = 'General information';
	editContainerActive = 'General information';
	
	shipment_code: string;
	containerAddForm!: FormGroup;
	isSubmittedContainerAddForm = false;
	containerEditForm!: FormGroup;
	isSubmittedContainerEditForm = false;
	shipmentValue = '';

	ngOnInit() {
		this.containerAddForm = this.formBuilder.group({
			origin: ['', Validators.required],
			destination: ['', Validators.required],
			truckNumber: [''],
			clientReference: [''],
			docType: [''],
		}, { updateOn: 'blur' });

		this.containerEditForm = this.formBuilder.group({
			origin: ['', Validators.required],
			destination: ['', Validators.required],
			truckNumber: [''],
			clientReference: [''],
			docType: [''],
		}, { updateOn: 'blur' });
	}

	newContainerModal(newContainer) {
		this.modalService.open(newContainer, { 
			modalDialogClass: 'side-modal side-modal-half', 
			backdrop : 'static',
			keyboard : false 
		});
	}

	editContainerModal(editContainer) {
		this.modalService.open(editContainer, { 
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

	handleCountrySelected(form, control, country) {		
		this[form].controls[control].patchValue(country.value.name);
	}

	@HostListener('document:keypress', ['$event'])
  
	onSubmit(event: KeyboardEvent) {  
	  const containerAdd = document.querySelector('#containerAddForm');  
	  const containerEdit = document.querySelector('#containerEditForm');  
	  const deleteShipment = document.querySelector('#deleteShipment');	  
	  const saveShipment = document.querySelector('#saveShipment');  
	   
	  if (event.key === 'Enter') {
		if (!deleteShipment && !saveShipment) {
			if (containerAdd) {
				const addContainerButton: HTMLElement = document.querySelector('#add-container-button');
				addContainerButton.click();
			} else if (containerEdit) {
				const editContainerButton: HTMLElement = document.querySelector('#edit-container-button');
				editContainerButton.click();
			}
		}
	  }
	}

	redirect(event: Event) {
		const target = event.target as HTMLInputElement;
		
		if (!target.closest('.row-menu')) {
			this.router.navigateByUrl(target.closest('tr').dataset.link);
		}
	}

	@ViewChild('deleteShipment', { static: true }) deleteShipment: any;

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

	triggerAddContainerClear() {
		let trigger: HTMLElement;

		if (this.addContainerActive === 'General information') {
			trigger = document.getElementById('add-general-button') as HTMLElement;
		} else if (this.addContainerActive === 'Shipments') {
			trigger = document.getElementById('add-shipments-button') as HTMLElement;
		}

    	trigger.click();
	}

	resetGeneralContainerAddForm(addOriginIso, addDestination) {
		this.containerAddForm.reset();
		addOriginIso.value = {};
		addDestination.value = {};
		this.containerAddForm.controls.docType.patchValue('');
		this.containerAddForm.controls.destination.patchValue('');
		this.containerAddForm.controls.origin.patchValue('');
	}

	resetShipmentsContainerAddForm() {
		const textarea = document.getElementById('shipment-code') as HTMLTextAreaElement;
		textarea.value = '';
		this.shipment_code = '';
		this.onTextAreaChange('');
	}

	submitContainerAddForm(saveShipment, addContainerNav) {
		const textarea = document.getElementById('shipment-code') as HTMLTextAreaElement;	

		if (this.containerAddForm.status === 'VALID') {
			if (addContainerNav.activeId === 'Shipments') {
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
			} else if (addContainerNav.activeId === 'General information') {
				addContainerNav.select('Shipments');
			}
		} else {
			addContainerNav.select('General information');
		}
		
		this.isSubmittedContainerAddForm = true;
	}

	triggerEditContainerClear() {
		let trigger: HTMLElement;

		if (this.editContainerActive === 'General information') {
			trigger = document.getElementById('edit-general-button') as HTMLElement;
		} else if (this.editContainerActive === 'Shipments') {
			trigger = document.getElementById('edit-shipments-button') as HTMLElement;
		}

    	trigger.click();
	}

	resetGeneralContainerEditForm(editOriginIso, editDestination) {
		this.containerEditForm.reset();
		editOriginIso.value = {};
		editDestination.value = {};
		this.containerEditForm.controls.docType.patchValue('');
		this.containerEditForm.controls.destination.patchValue('');
		this.containerEditForm.controls.origin.patchValue('');
	}

	resetShipmentsContainerEditForm() {
		const textarea = document.getElementById('shipment-code') as HTMLTextAreaElement;
		textarea.value = '';
		this.shipment_code = '';
		this.onTextAreaChange('');
	}

	submitContainerEditForm(saveShipment, editContainerNav) {
		const textarea = document.getElementById('shipment-code') as HTMLTextAreaElement;	

		if (this.containerEditForm.status === 'VALID') {
			if (editContainerNav.activeId === 'Shipments') {
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
			} else if (editContainerNav.activeId === 'General information') {
				editContainerNav.select('Shipments');
			}
		} else {
			editContainerNav.select('General information');
		}

		this.isSubmittedContainerEditForm = true;
	}
}
