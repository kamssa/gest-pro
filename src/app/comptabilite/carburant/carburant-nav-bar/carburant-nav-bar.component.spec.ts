import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarburantNavBarComponent } from './carburant-nav-bar.component';

describe('CarburantNavBarComponent', () => {
  let component: CarburantNavBarComponent;
  let fixture: ComponentFixture<CarburantNavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarburantNavBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarburantNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
