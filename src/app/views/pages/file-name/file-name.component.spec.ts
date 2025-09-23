import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FileNameComponent } from './file-name.component';

describe('FileNameComponent', () => {
  let component: FileNameComponent;
  let fixture: ComponentFixture<FileNameComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FileNameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
