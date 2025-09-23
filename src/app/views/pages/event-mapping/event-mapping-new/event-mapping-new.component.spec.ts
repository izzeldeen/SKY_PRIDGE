import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EventMappingNewComponent } from './event-mapping-new.component';

describe('EventMappingNewComponent', () => {
  let component: EventMappingNewComponent;
  let fixture: ComponentFixture<EventMappingNewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EventMappingNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventMappingNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
