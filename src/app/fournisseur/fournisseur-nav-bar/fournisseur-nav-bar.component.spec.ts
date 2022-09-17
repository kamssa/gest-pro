import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FournisseurNavBarComponent } from './fournisseur-nav-bar.component';

describe('FournisseurNavBarComponent', () => {
  let component: FournisseurNavBarComponent;
  let fixture: ComponentFixture<FournisseurNavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FournisseurNavBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FournisseurNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
