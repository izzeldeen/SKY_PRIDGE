import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbModal, NgbNav } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-bulk-upload',
	templateUrl: './bulk-upload.component.html',
	styleUrls: ['./bulk-upload.component.scss']
})
export class BulkUploadComponent implements OnInit {

	active = 'Upload CSV file';
	progressValue = 0;
	step1IsDone = false;
	step2IsDone = false;
	
	constructor(
		private modalService: NgbModal,
	) { }

	ngOnInit() {}

	@ViewChild('nav') nav!: NgbNav;
	@ViewChild('curForm') curForm: ElementRef;

	componentArray = [{id: 0}];

	onProgressUpdated(value: number) {
		this.progressValue = value;
	}

	uploadFile(errorLengthPopup) {
		const inputElements = this.curForm.nativeElement.getElementsByTagName('input');

		console.log(inputElements[0].files);
		
		if (!inputElements[0].files.length) {
			this.modalService.open(errorLengthPopup, { 
				windowClass: 'attachments-alert-popup',
				size: 'md', 
				centered: true 
			});
		} else {
			for (let i = 0; i < inputElements.length; i++) {
				var input = inputElements[i].files;
				
				if (input.length && input[0].size > 2000000) {
					this.modalService.open(errorLengthPopup, { 
						windowClass: 'attachments-alert-popup size-alert',
						size: 'md', 
						centered: true 
					});
					break;
				} else {
					this.nav.select('Check data');
					this.step1IsDone = true;
				}
			}
		}
	}

	addNewComponent(event: any, errorUploadPopup) {
		const file = event.target.files[0];

		if (file && file.type !== 'text/csv') {
			const curInput = event.target.closest('.form-group')?.querySelector('input');
			curInput.value = '';

			this.modalService.open(errorUploadPopup, { 
				windowClass: 'attachments-alert-popup',
				size: 'md', 
				centered: true 
			}); 
		} else {			
			const fileName = event.target.closest('.form-group')?.querySelector('.file-name');
			const fileSize = event.target.closest('.form-group')?.querySelector('.file-size span');

			event.target.closest('.attachment-item').classList.add('show-file-info');

			fileName.textContent = file.name;
			fileSize.textContent = Math.round(file.size / 1000);
		}
	}

	removeFile(event) {
		const curInput = event.target.closest('.form-group')?.querySelector('input');

		event.target.closest('.attachment-item').classList.remove('show-file-info');
		curInput.value = '';		
	}
}