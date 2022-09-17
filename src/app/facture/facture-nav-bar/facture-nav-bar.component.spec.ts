import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactureNavBarComponent } from './facture-nav-bar.component';

describe('FactureNavBarComponent', () => {
  let component: FactureNavBarComponent;
  let fixture: ComponentFixture<FactureNavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FactureNavBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FactureNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
