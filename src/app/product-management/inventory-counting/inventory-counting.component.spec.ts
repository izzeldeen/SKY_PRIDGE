import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseBalanceListComponent } from './warehouse-balance-list.component';

describe('WarehouseBalanceListComponent', () => {
  let component: WarehouseBalanceListComponent;
  let fixture: ComponentFixture<WarehouseBalanceListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WarehouseBalanceListComponent]
    });
    fixture = TestBed.createComponent(WarehouseBalanceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
