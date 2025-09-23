import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerHistoryInstallmentComponent } from './customer-history-installment.component';

describe('CustomerHistoryInstallmentComponent', () => {
  let component: CustomerHistoryInstallmentComponent;
  let fixture: ComponentFixture<CustomerHistoryInstallmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerHistoryInstallmentComponent]
    });
    fixture = TestBed.createComponent(CustomerHistoryInstallmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
