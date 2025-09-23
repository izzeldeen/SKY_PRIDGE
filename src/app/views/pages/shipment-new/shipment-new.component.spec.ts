import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ShipmentNewComponent } from './shipment-new.component';

describe('ShipmentNewComponent', () => {
  let component: ShipmentNewComponent;
  let fixture: ComponentFixture<ShipmentNewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ShipmentNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipmentNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
