import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EventMappingAvailableEventsComponent } from './event-mapping-available-events.component';

describe('EventMappingAvailableEventsComponent', () => {
  let component: EventMappingAvailableEventsComponent;
  let fixture: ComponentFixture<EventMappingAvailableEventsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EventMappingAvailableEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventMappingAvailableEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
