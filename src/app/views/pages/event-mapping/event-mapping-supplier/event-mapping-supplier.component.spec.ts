import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EventMappingSupplierComponent } from './event-mapping-supplier.component';

describe('EventMappingSupplierComponent', () => {
  let component: EventMappingSupplierComponent;
  let fixture: ComponentFixture<EventMappingSupplierComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EventMappingSupplierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventMappingSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
