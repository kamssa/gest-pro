import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaisseNavBarComponent } from './caisse-nav-bar.component';

describe('CaisseNavBarComponent', () => {
  let component: CaisseNavBarComponent;
  let fixture: ComponentFixture<CaisseNavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaisseNavBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaisseNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
