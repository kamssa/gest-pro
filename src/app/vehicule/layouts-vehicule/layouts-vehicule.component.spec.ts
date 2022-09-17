import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutsVehiculeComponent } from './layouts-vehicule.component';

describe('LayoutsVehiculeComponent', () => {
  let component: LayoutsVehiculeComponent;
  let fixture: ComponentFixture<LayoutsVehiculeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LayoutsVehiculeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutsVehiculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
