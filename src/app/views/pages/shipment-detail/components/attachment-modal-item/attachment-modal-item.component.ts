import {Input, Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
	selector: 'app-attachment-modal-item',
	templateUrl: './attachment-modal-item.component.html'
})
export class AttachmentModalItemComponent implements OnInit {
	@Input('id') id: number;
	@ViewChild('curTextarea') curTextarea: ElementRef;
	text = '';

  	constructor() { }

	ngOnInit() { }

	addNewComponent(event: any) {		
		let triggerCreateAttachment: HTMLElement = document.getElementById('create-attachment') as HTMLElement;
    	triggerCreateAttachment.click();

		const file = event.target.files[0];
		
		if (file) {
			const fileName = event.target.closest('.form-group')?.querySelector('.file-name');
			const fileSize = event.target.closest('.form-group')?.querySelector('.file-size span');
			const fileIcon = event.target.closest('.form-group')?.querySelector('.file-icon img');

			event.target.closest('.attachment-item').classList.add('show-file-info');

			fileName.textContent = file.name;
			fileSize.textContent = Math.round(file.size / 1000);

			switch (event.target.files[0].type) {
				case 'application/pdf':
					fileIcon.src = "assets/images/file-extensions/pdf.svg";
					break;

				case 'application/zip':
					fileIcon.src = "assets/images/file-extensions/zip.svg";
					break;

				case 'image/jpeg':
					fileIcon.src = "assets/images/file-extensions/jpg.svg";
					break;

				case 'image/png':
					fileIcon.src = "assets/images/file-extensions/jpg.svg";
					break;

				case 'image/svg+xml':
					fileIcon.src = "assets/images/file-extensions/jpg.svg";
					break;

				case 'video/quicktime':
					fileIcon.src = "assets/images/file-extensions/mov.svg";
					break;

				case 'audio/mpeg':
					fileIcon.src = "assets/images/file-extensions/mp3.svg";
					break;

				case 'application/vnd.ms-powerpoint':
					fileIcon.src = "assets/images/file-extensions/ppt.svg";
					break;

				case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
					fileIcon.src = "assets/images/file-extensions/ppt.svg";
					break;

				case 'application/msword':
					fileIcon.src = "assets/images/file-extensions/word.svg";
					break;

				case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
					fileIcon.src = "assets/images/file-extensions/word.svg";
					break;

				case 'text/csv':
					fileIcon.src = "assets/images/file-extensions/xlsx.svg";
					break;

				case 'application/vnd.ms-excel':
					fileIcon.src = "assets/images/file-extensions/xlsx.svg";
					break;

				case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
					fileIcon.src = "assets/images/file-extensions/xlsx.svg";
					break;
			
				default:
					fileIcon.src = "assets/images/file-extensions/txt.svg";
					break;
			}
		}
	}

	removeFile(event: any) {
		const curInput = event.target.closest('.form-group')?.querySelector('input');

		event.target.closest('.attachment-item').classList.remove('show-file-info');
		curInput.value = '';

		if (!event.target.closest('.attachment-item')?.querySelector('textarea').value.length) {
			event.target.closest('app-attachment-modal-item').remove();
		}
	}

	onTextChange(event: any) {		
		let item = this.curTextarea.nativeElement.closest('app-attachment-modal-item');		

		if (item.previousElementSibling != null && item.nextElementSibling != null && event.length === 0) {
			item.remove()
		}
	}
}
