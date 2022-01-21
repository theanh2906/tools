import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeCaseComponent } from './change-case.component';

describe('ChangeCaseComponent', () => {
  let component: ChangeCaseComponent;
  let fixture: ComponentFixture<ChangeCaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeCaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
