import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRetraitComponent } from './add-retrait.component';

describe('AddRetraitComponent', () => {
  let component: AddRetraitComponent;
  let fixture: ComponentFixture<AddRetraitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRetraitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRetraitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
