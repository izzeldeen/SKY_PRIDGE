import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EVENTS } from 'src/app/data/events';
import { cloneDeep } from 'lodash-es';

@Component({
	selector: 'app-event-mapping-edit',
	templateUrl: './event-mapping-edit.component.html',
	styleUrls: ['./event-mapping-edit.component.scss']
})
export class EventMappingEditComponent implements OnInit {
	isSubmitted = false;
	viewEvents = false;
	eventsArray = cloneDeep(EVENTS);

	constructor(
		private modalService: NgbModal,
		private formBuilder: FormBuilder,
	) { }

	createCustomerForm!: FormGroup;

	ngOnInit() {
		this.createCustomerForm = this.formBuilder.group({}, {updateOn: 'blur'});

		console.log(this.createCustomerForm);
	}

	availableEventsModal(availableEvents: any) {
		this.modalService.open(availableEvents, { 
			modalDialogClass: 'side-modal', 
			backdrop : 'static',
			keyboard : false 
		});
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
