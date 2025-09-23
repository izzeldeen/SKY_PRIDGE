import { Component, HostListener, OnInit } from '@angular/core';
import { EVENTSMAP } from 'src/app/data/events';
import { cloneDeep, debounce } from 'lodash-es';

@Component({
	selector: 'app-event-mapping-supplier',
	templateUrl: './event-mapping-supplier.component.html',
	styleUrls: ['./event-mapping-supplier.component.scss']
})
export class EventMappingSupplierComponent implements OnInit {
	eventsArray = cloneDeep(EVENTSMAP);
	
	constructor() { }

	ngOnInit() {}

	blocksLoaded = 15;
	
	@HostListener('window:scroll', ['$event'])

	onScroll = debounce(() => {		
		const scrollTop = window.pageYOffset;
		const windowHeight = window.innerHeight;
		const documentHeight = Math.max(document.body.scrollHeight || 0);
	  
		if (scrollTop + windowHeight >= documentHeight - 100) {
		  this.blocksLoaded += 10;
		}
	}, 200);
}
