import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechercheCarburantParDateComponent } from './recherche-carburant-par-date.component';

describe('RechercheCarburantParDateComponent', () => {
  let component: RechercheCarburantParDateComponent;
  let fixture: ComponentFixture<RechercheCarburantParDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RechercheCarburantParDateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RechercheCarburantParDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
