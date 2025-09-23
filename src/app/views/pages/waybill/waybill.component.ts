import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
	selector: 'app-waybill',
	templateUrl: './waybill.component.html'
})
export class WaybillComponent implements OnInit {
	constructor(
		private modalService: NgbModal,
		private router: Router,
		private formBuilder: FormBuilder
	) { }

	editMawbActive = 'General information';

	dtEdit: string;
	adtEdit: string;
	container_code: string;
	airwaybillEditForm!: FormGroup;
	isSubmittedAirwaybillEditForm = false;
	containerValue = '';

	ngOnInit() {
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
	}

	onDateChange(event: any, control) {		
		this.airwaybillEditForm.controls[control].patchValue(event);
	}

	handleCountrySelected(form, control, country) {		
		this[form].controls[control].patchValue(country.value.name);
	}

	eventsAirwaybillModal(eventsAirwaybill) {
		this.modalService.open(eventsAirwaybill, { 
			modalDialogClass: 'side-modal', 
			backdrop : 'static',
			keyboard : false 
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
	  const airwaybillEdit = document.querySelector('#airwaybillEditForm');  
	  const deleteContainer = document.querySelector('#deleteContainer');  
	  const saveContainer = document.querySelector('#saveContainer');	  
	   
	  if (event.key === 'Enter') {
		if (!deleteContainer && !saveContainer) {
			if (airwaybillEdit) {
				const editMawbButton: HTMLElement = document.querySelector('#edit-mawb-button');
				editMawbButton.click();
			}
		}
	  }
	}

	@ViewChild('deleteContainer', { static: true }) deleteContainer: any;

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

	redirect(event: Event) {
		const target = event.target as HTMLInputElement;

		if (!target.closest('.row-menu')) {
			this.router.navigateByUrl(target.closest('tr').dataset.link);
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

	triggerEditMawbClear() {
		let trigger: HTMLElement;

		if (this.editMawbActive === 'General information') {
			trigger = document.getElementById('edit-general-button') as HTMLElement;
		} else if (this.editMawbActive === 'Containers') {
			trigger = document.getElementById('edit-containers-button') as HTMLElement;
		}

    	trigger.click();
	}

	resetGeneralMawbEditForm(originIso, editNextStop) {
		this.airwaybillEditForm.reset();
		originIso.value = {};
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
