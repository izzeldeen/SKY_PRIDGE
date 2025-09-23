import { Component, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-event-mapping-step2',
	templateUrl: './event-mapping-step2.component.html',
	styleUrls: ['./event-mapping-step2.component.scss']
})
export class EventMappingStep2Component implements OnInit {
	GNTeqPlaceholder = 'Choose GNTeq event';
	SupplierPlaceholder = 'Choose supplier event';

	constructor() { }

	@Input() eventsArray;

	ngOnInit() { }

	@ViewChildren('dropdownSelect') dropdownSelects: QueryList<NgbDropdown>;

	onStatusSelected(status: string, index: number) {
		this.eventsArray[index] = { ...this.eventsArray[index], GNTeqEvent: status }
		this.dropdownSelects.toArray()[index].close();
	}

	onSupplierSelected(event: string, index: number) {
		this.eventsArray[index] = { ...this.eventsArray[index], GNTeqEvent: event }
	}

	removeSupplierEvent(selectElement: any, innerIndex: any, index: number): void {		
		if (selectElement.classList.contains('delete') && this.eventsArray[index].supplierEvents.length > 1) {
			selectElement.closest('.form-control-event').remove();	
			this.eventsArray[index] = [...this.eventsArray[index]].filter((_, i) => i !== innerIndex);		
		}
	}

	handleNewComponent(innerIndex: number, component: any, selectElement: any) {
		const supplierEvents = component.supplierEvents;

		supplierEvents[innerIndex].value = selectElement;	
		
		if (innerIndex + 1 === supplierEvents.length) {
			supplierEvents.push({id: supplierEvents.length, value: ''});
		}
		
		if (supplierEvents.length > 1 
			&& this.eventsArray.indexOf(component) === this.eventsArray.length - 1) {				
				this.eventsArray = [...this.eventsArray, {
					GNTeqEvent: '',
					supplierEvents: [
						{id: 0, value: ''}, 
					],
				}
			]
		}
	}

	removeComponent(event: any, index: number) {
		if (this.eventsArray.length > 1) {		
			event.target.closest('.c-form').remove();	
			this.eventsArray = [...this.eventsArray].filter((_, i) => i !== index);
		} else {
			this.eventsArray[index] = { ...this.eventsArray[index], GNTeqEvent: '', supplierEvents: [{id: 0, value: ''}] }
		}
	}

	isOpen = false;

	checkElementPosition(i: number) {
		const eventsToggles = document.querySelectorAll('.gnt-event-toggle');
		const eventDropdown = eventsToggles[i] as HTMLElement;
		const elementPosition = eventDropdown.getBoundingClientRect().top;
		const windowHeight = window.innerHeight;
		
		if (elementPosition > windowHeight - 450) {
			this.isOpen = true;
		} else {
			this.isOpen = false;
		}
	}
}

