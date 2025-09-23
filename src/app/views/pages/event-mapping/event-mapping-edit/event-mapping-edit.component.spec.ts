import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EventMappingEditComponent } from './event-mapping-edit.component';

describe('EventMappingEditComponent', () => {
  let component: EventMappingEditComponent;
  let fixture: ComponentFixture<EventMappingEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EventMappingEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventMappingEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
