import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-attachments',
	templateUrl: './attachments.component.html'
})

export class AttachmentsComponent implements OnInit {
	constructor(
		private modalService: NgbModal
	) { }

	ngOnInit() { }

	@ViewChild('attacnments') attacnments: ElementRef;
	@ViewChild('curForm') curForm: ElementRef;
	@ViewChild('success') success: ElementRef;

	componentArray = [{id: 0}];

	addNewComponent() {		
		this.componentArray.push({id: this.componentArray.length});
	}

	uploadFile(errorLengthPopup) {
		const inputElements = this.curForm.nativeElement.getElementsByTagName('input');
		let validForm = true;
		
		if (!inputElements[0].files.length) {
			this.modalService.open(errorLengthPopup, { 
				windowClass: 'attachments-alert-popup',
				size: 'md', 
				centered: true 
			});
			validForm = false;
		} else {
			for (let i = 0; i < inputElements.length; i++) {
				var input = inputElements[i].files;
				
				if (input.length && input[0].size > 2000000) {
					this.modalService.open(errorLengthPopup, { 
						windowClass: 'attachments-alert-popup size-alert',
						size: 'md', 
						centered: true 
					});
					validForm = false;
					break;
				}
			}
		}
		
		if (validForm) {
			// place to submit form data

			// this.curForm.nativeElement.submit();
			this.attacnments.nativeElement.style.display = 'none';
			this.success.nativeElement.style.display = 'flex';
		}
	}
}
