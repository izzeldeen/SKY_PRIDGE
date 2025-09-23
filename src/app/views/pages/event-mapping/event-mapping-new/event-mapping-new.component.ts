import { Component, HostListener, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-event-mapping-new',
	templateUrl: './event-mapping-new.component.html',
	styleUrls: ['./event-mapping-new.component.scss']
})
export class EventMappingNewComponent implements OnInit {
	isSelectedSupplier = false;
	isSubmitted = false;
	eventsArray = [
		{
			GNTeqEvent: '',
			supplierEvents: [{id: 0, value: ''}],
		}
	];

	constructor(
		private modalService: NgbModal,
		private formBuilder: FormBuilder,
	) { }

	createCustomerForm!: FormGroup;

	ngOnInit() {
		this.createCustomerForm = this.formBuilder.group({
			Supplier: ['', Validators.required],
		}, {updateOn: 'blur'});

		console.log(this.createCustomerForm);
	}

	availableEventsModal(availableEvents: any, event) {
		console.log(event);
		
		this.modalService.open(availableEvents, { 
			modalDialogClass: 'side-modal', 
			backdrop : 'static',
			keyboard : false 
		});
	}

	@HostListener('document:keypress', ['$event'])
  
	onSubmit(event: KeyboardEvent) {  
	  if (event.key === 'Enter') {
		this.handleSave();
	  }
	}

	private save() {
		console.log(this.createCustomerForm.value);
		this.isSubmitted = true;
	}

	handleSave(isDraft?: boolean): void {
		if (isDraft) {
			console.log('isDraft');
		}

		this.save();
	}
}
