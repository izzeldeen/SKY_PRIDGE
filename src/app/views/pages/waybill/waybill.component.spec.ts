import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { WaybillComponent } from './waybill.component';

describe('WaybillComponent', () => {
  let component: WaybillComponent;
  let fixture: ComponentFixture<WaybillComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WaybillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaybillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
