import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechercheParDateComponent } from './recherche-par-date.component';

describe('RechercheParDateComponent', () => {
  let component: RechercheParDateComponent;
  let fixture: ComponentFixture<RechercheParDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RechercheParDateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RechercheParDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
