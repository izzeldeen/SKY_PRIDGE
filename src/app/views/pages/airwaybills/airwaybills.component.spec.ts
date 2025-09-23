import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AirwaybillsComponent } from './airwaybills.component';

describe('AirwaybillsComponent', () => {
  let component: AirwaybillsComponent;
  let fixture: ComponentFixture<AirwaybillsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AirwaybillsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirwaybillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
