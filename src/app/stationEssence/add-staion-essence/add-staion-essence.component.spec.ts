import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStaionEssenceComponent } from './add-staion-essence.component';

describe('AddStaionEssenceComponent', () => {
  let component: AddStaionEssenceComponent;
  let fixture: ComponentFixture<AddStaionEssenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddStaionEssenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddStaionEssenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
