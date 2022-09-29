import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarburantLayoutComponent } from './carburant-layout.component';

describe('CarburantLayoutComponent', () => {
  let component: CarburantLayoutComponent;
  let fixture: ComponentFixture<CarburantLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarburantLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarburantLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
