import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCustomersDashboardComponent } from './card-customers-dashboard.component';

describe('CardCustomersDashboardComponent', () => {
  let component: CardCustomersDashboardComponent;
  let fixture: ComponentFixture<CardCustomersDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardCustomersDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardCustomersDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
