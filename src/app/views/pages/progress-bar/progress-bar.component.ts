import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
	selector: 'app-progress-bar',
	template: `
        <div class="progress-bar-container">
            <div class="progress-bar" [style.width.%]="progressValue">
                <span class="progress-percent">{{ progressValue }}%</span>
            </div>
        </div>
    `,
})
export class ProgressBarComponent implements OnInit {	
	constructor() { }

    progressValue = 0;
    @Output() progressUpdated = new EventEmitter<number>();

	ngOnInit() {
        const increment = () => {
            if (this.progressValue < 100) {
              this.progressValue += 1;
              this.progressUpdated.emit(this.progressValue);
              requestAnimationFrame(increment);
            }            
          };
          requestAnimationFrame(increment);
	}
}