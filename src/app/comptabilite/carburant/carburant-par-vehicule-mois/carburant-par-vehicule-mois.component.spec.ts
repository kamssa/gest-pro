import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarburantParVehiculeMoisComponent } from './carburant-par-vehicule-mois.component';

describe('CarburantParVehiculeMoisComponent', () => {
  let component: CarburantParVehiculeMoisComponent;
  let fixture: ComponentFixture<CarburantParVehiculeMoisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarburantParVehiculeMoisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarburantParVehiculeMoisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
