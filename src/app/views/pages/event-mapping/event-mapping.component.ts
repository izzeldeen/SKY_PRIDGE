import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from "@angular/router";

@Component({
	selector: 'app-event-mapping',
	templateUrl: './event-mapping.component.html',
	styleUrls: ['./event-mapping.component.scss']
})
export class EventMappingComponent implements OnInit {
	constructor(
		private modalService: NgbModal,
		private router: Router
	) { }

	ngOnInit() {
		
	}

	editEventModal(editEventPopup) {
		this.modalService.open(editEventPopup, { 
			modalDialogClass: 'side-modal', 
			backdrop : 'static',
			keyboard : false 
		});
	}

	redirect(event: Event) {
		const target = event.target as HTMLInputElement;
		
		if (!target.closest('.dropdown')) {
			this.router.navigateByUrl(target.closest('tr').dataset.link);
		}
	}
}
