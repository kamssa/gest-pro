import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppVehiculeComponent } from './app-vehicule.component';

describe('AppVehiculeComponent', () => {
  let component: AppVehiculeComponent;
  let fixture: ComponentFixture<AppVehiculeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppVehiculeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppVehiculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
