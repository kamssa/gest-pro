import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FourniseurNavBarComponent } from './fourniseur-nav-bar.component';

describe('FourniseurNavBarComponent', () => {
  let component: FourniseurNavBarComponent;
  let fixture: ComponentFixture<FourniseurNavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FourniseurNavBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FourniseurNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
