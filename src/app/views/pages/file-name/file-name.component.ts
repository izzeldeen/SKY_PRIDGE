import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-file-name',
	templateUrl: './file-name.component.html',
	styleUrls: ['./file-name.component.scss']
})
export class FileNameComponent implements OnInit {
	constructor() { }

	ngOnInit() {
		
	}

	showTitle(event: MouseEvent) {
		const myDiv = document.getElementById("server-error-hint");
		myDiv.innerHTML = "Shipment wasn’t created in the system due to a server error";
		myDiv.style.top = (event.pageY - 50) + "px";
		myDiv.style.left = (event.pageX - 70) + "px";
		myDiv.style.display = "block";		
	}
	  
	  hideTitle() {
		document.getElementById("server-error-hint").style.display = "none";
	}
}