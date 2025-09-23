import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardUserStatisticsComponent } from './card-user-statistics.component';

describe('CardUserStatisticsComponent', () => {
  let component: CardUserStatisticsComponent;
  let fixture: ComponentFixture<CardUserStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardUserStatisticsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardUserStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
