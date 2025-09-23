import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EventMappingStep2Component } from './event-mapping-step2.component';

describe('EventMappingStep2Component', () => {
  let component: EventMappingStep2Component;
  let fixture: ComponentFixture<EventMappingStep2Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EventMappingStep2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventMappingStep2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
