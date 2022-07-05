import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVersementComponent } from './add-versement.component';

describe('AddVersementComponent', () => {
  let component: AddVersementComponent;
  let fixture: ComponentFixture<AddVersementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddVersementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVersementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
