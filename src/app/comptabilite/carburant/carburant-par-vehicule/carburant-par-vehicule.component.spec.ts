import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarburantParVehiculeComponent } from './carburant-par-vehicule.component';

describe('CarburantParVehiculeComponent', () => {
  let component: CarburantParVehiculeComponent;
  let fixture: ComponentFixture<CarburantParVehiculeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarburantParVehiculeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarburantParVehiculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
